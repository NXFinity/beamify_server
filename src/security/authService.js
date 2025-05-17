const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../db/models/user/userModel');
const { sendEmail } = require('../services/email/emailService');
const verifyEmailTemplate = require('../services/email/templates/verify_email');
const { createGamify } = require('../api/gamify/gamifyService');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '43200';

exports.register = async (data, overrides = {}) => {
  const { email, password, username } = data;
  // Check for existing user
  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.status && existing.status.isBanned) {
      throw new Error("Sorry you're a banned user");
    }
    throw new Error('Email already in use');
  }

  // Check for existing username (case-insensitive)
  const existingUsername = await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });
  if (existingUsername) {
    if (existingUsername.status && existingUsername.status.isBanned) {
      throw new Error("Sorry you're a banned user");
    }
    throw new Error('Username already in use');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  // Create user
  const user = await User.create({
    email,
    username,
    displayName: username,
    passwordHash,
    roles: overrides.roles || ['MEMBER'],
    isVerified: overrides.isVerified ?? false,
    verificationToken: overrides.skipVerification ? undefined : verificationToken,
    verificationTokenExpires: overrides.skipVerification ? undefined : verificationTokenExpires,
    ...(overrides.extraFields || {})
  });

  // Create gamify profile (one-to-one)
  await createGamify({ user: user._id });

  // Send verification email unless skipping
  if (!overrides.skipVerification) {
    const verificationUrl = `${FRONTEND_URL}/verify?token=${verificationToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Verify your Beamify account',
      html: verifyEmailTemplate({
        verificationCode: verificationToken,
        verificationUrl,
        appName: 'Beamify',
        supportEmail: 'support@beamify.online'
      })
    });
  }

  // Issue JWT
  console.log('[DEBUG] JWT_EXPIRES_IN at register:', JWT_EXPIRES_IN);
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const decoded = jwt.decode(token);
  console.log('[DEBUG] JWT issued at:', decoded.iat, 'expires at:', decoded.exp, 'lifetime (s):', decoded.exp - decoded.iat);
  return {
    message: overrides.roles && overrides.roles.includes('SYSTEM_ADMINISTRATOR')
      ? 'Admin account initialized.'
      : 'User registered. Please verify your email.',
    token,
    user: { _id: user._id, email: user.email, username: user.username, roles: user.roles }
  };
};

exports.login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  if (user.status && user.status.isBanned) throw new Error("Sorry you're a banned user");
  if (!user.isVerified) throw new Error('Email not verified');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid email or password');
  console.log('[DEBUG] JWT_EXPIRES_IN at login:', JWT_EXPIRES_IN);
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const decoded = jwt.decode(token);
  console.log('[DEBUG] JWT issued at:', decoded.iat, 'expires at:', decoded.exp, 'lifetime (s):', decoded.exp - decoded.iat);
  return { message: 'User logged in', token, user: { _id: user._id, email: user.email, username: user.username } };
};

exports.verify = async (data) => {
  const { token } = data;
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw new Error('Invalid or expired verification token');
  if (user.verificationTokenExpires < Date.now()) throw new Error('Verification token expired');
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();
  return { message: 'Email verified successfully' };
};

exports.forgot = async (data) => {
  const { email } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user with that email');
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();
  const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Reset your Beamify password',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
  });
  return { message: 'Password reset email sent' };
};

exports.reset = async (data) => {
  const { token, password } = data;
  const user = await User.findOne({ resetPasswordToken: token });
  if (!user) throw new Error('Invalid or expired reset token');
  if (user.resetPasswordExpires < Date.now()) throw new Error('Reset token expired');
  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return { message: 'Password reset successful' };
};

exports.resend = async (data) => {
  const { email } = data;
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user with that email');
  if (user.isVerified) throw new Error('Email already verified');
  // Generate new verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  user.verificationToken = verificationToken;
  user.verificationTokenExpires = verificationTokenExpires;
  await user.save();
  const verificationUrl = `${FRONTEND_URL}/verify?token=${verificationToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Verify your Beamify account',
    html: verifyEmailTemplate({
      verificationCode: verificationToken,
      verificationUrl,
      appName: 'Beamify',
      supportEmail: 'support@beamify.online'
    })
  });
  return { message: 'Verification email resent' };
};

exports.logout = async (req) => {
  // Logout logic goes here (for JWT, usually handled client-side)
  return { message: 'User logged out (placeholder)' };
};

exports.changePassword = async (user, data) => {
  const { oldPassword, newPassword } = data;
  const dbUser = await User.findById(user._id);
  if (!dbUser) throw new Error('User not found');
  const valid = await bcrypt.compare(oldPassword, dbUser.passwordHash);
  if (!valid) throw new Error('Old password is incorrect');
  dbUser.passwordHash = await bcrypt.hash(newPassword, 10);
  await dbUser.save();
  return { message: 'Password changed successfully' };
};

exports.me = async (user) => {
  // Return current user profile without sensitive fields
  const dbUser = await User.findById(user._id).select('-passwordHash -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
  if (!dbUser) throw new Error('User not found');
  return dbUser;
};

exports.resetVerification = async (data) => {
  // Reset verification token logic goes here
  return { message: 'Verification token reset (placeholder)' };
};
