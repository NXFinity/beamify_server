const Achievement = require('../../../db/models/gamify/achievementModel');
const User = require('../../../db/models/user/userModel');

// Core logic: grant a reward (achievement)
exports.grantReward = async (userId, rewardData) => {
  return Achievement.create({ ...rewardData, user: userId });
};

// Public: Get rewards by username (no sensitive user data)
exports.getRewardsByUsername = async (username) => {
  const user = await User.findOne({ username }).select('_id');
  if (!user) return [];
  return Achievement.find({ user: user._id })
    .select('title description icon dateAchieved createdAt')
    .sort({ createdAt: -1 });
};

// Public: Get reward by ID (no sensitive user data)
exports.getRewardById = async (id) => {
  return Achievement.findById(id).select('title description icon dateAchieved createdAt');
};

// Private: Get all rewards for a user (full data)
exports.getRewardsByUserId = async (userId) => {
  return Achievement.find({ user: userId }).sort({ createdAt: -1 });
};
