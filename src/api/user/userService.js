const User = require('../../db/models/user/userModel');

exports.getAllUsers = async () => {
  return User.find();
};

exports.getUserById = async (id) => {
  return User.findById(id);
};

exports.updateUser = async (id, update) => {
  return User.findByIdAndUpdate(id, update, { new: true });
};

exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};
