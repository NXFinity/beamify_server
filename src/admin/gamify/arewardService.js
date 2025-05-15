const Achievement = require('../../db/models/gamify/achievementModel');

// Create a reward (achievement)
exports.createReward = async (data) => {
  return Achievement.create(data);
};

// Get a reward by ID
exports.getRewardById = async (id) => {
  return Achievement.findById(id).populate('user', 'username email');
};

// Get all rewards
exports.getAllRewards = async () => {
  return Achievement.find().populate('user', 'username email');
};

// Update a reward
exports.updateReward = async (id, update) => {
  return Achievement.findByIdAndUpdate(id, update, { new: true }).populate('user', 'username email');
};

// Delete a reward
exports.deleteReward = async (id) => {
  return Achievement.findByIdAndDelete(id);
};
