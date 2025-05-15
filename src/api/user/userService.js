const User = require('../../db/models/user/userModel');

exports.getAllUsers = async () => {
  return User.find().select('-passwordHash -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
};

exports.getUserById = async (id) => {
  return User.findById(id).select('-passwordHash -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires');
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
