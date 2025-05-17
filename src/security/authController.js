/**
 * Authentication and Authorisation
 */
const authService = require('./authService');
const User = require('../db/models/user/userModel');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const result = await authService.verify(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.forgot = async (req, res, next) => {
  try {
    const result = await authService.forgot(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.reset = async (req, res, next) => {
  try {
    const result = await authService.reset(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.resend = async (req, res, next) => {
  try {
    const result = await authService.resend(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user, req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const result = await authService.me(req.user);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

exports.resetVerification = async (req, res, next) => {
  try {
    const result = await authService.resetVerification(req.body);
    res.json(result);
  } catch (err) {
    if (err.message === "Sorry you're a banned user") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

// Initialize the Administrator Account
exports.initAdmin = async (req, res, next) => {
  try {
    // Check if an admin already exists
    const adminExists = await User.exists({ roles: 'SYSTEM_ADMINISTRATOR' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin account already initialized.' });
    }
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    // Use the same registration logic, but override roles and verification
    const result = await authService.register(
      { email, username, password },
      { roles: ['SYSTEM_ADMINISTRATOR'], isVerified: true, skipVerification: true }
    );
    return res.status(201).json({ message: result.message, user: result.user });
  } catch (err) {
    next(err);
  }
};
