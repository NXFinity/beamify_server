const User = require('../../db/models/user/userModel');
const Photo = require('../../db/models/user/photoModel');

exports.getAllUsers = async () => {
  return User.find().select('-passwordHash -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
};

exports.getUserById = async (id) => {
  return User.findById(id).select('-passwordHash -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
};

// Fetch user by username (public fields only)
exports.getUserByUsername = async (username) => {
  return User.findOne({ username }).select(`
    username 
    profile.avatar 
    profile.displayName 
    profile.bio 
    profile.cover 
    status.isBanned 
    bans.type 
    bans.status 
    bans.expiresAt 
    bans.createdAt 
    bans.reason 
    bans.issuerType 
    bans.issuerId
  `);
};

exports.updateUser = async (id, update) => {
  // Only allow updating profile fields
  const allowed = ['profile.avatar', 'profile.bio', 'profile.displayName'];
  const updateObj = {};
  for (const key of allowed) {
    if (key in update) {
      updateObj[key] = update[key];
    }
  }
  return User.findByIdAndUpdate(id, { $set: updateObj }, { new: true });
};

exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

// Upload avatar: set profile.avatar
exports.uploadAvatar = async (userId, url) => {
  return User.findByIdAndUpdate(userId, { 'profile.avatar': url }, { new: true });
};

// Upload cover: set profile.cover
exports.uploadCover = async (userId, url) => {
  return User.findByIdAndUpdate(userId, { 'profile.cover': url }, { new: true });
};

// Add photo: create Photo entry
exports.addPhoto = async (userId, url, caption) => {
  return Photo.create({ user: userId, url, type: 'photo', caption });
};
