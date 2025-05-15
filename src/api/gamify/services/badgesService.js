const Badge = require('../../../db/models/gamify/badgeModel');
const User = require('../../../db/models/user/userModel');

// Core logic: award a badge
exports.awardBadge = async (userId, badgeData) => {
  return Badge.create({ ...badgeData, user: userId });
};

// Public: Get badges by username (no sensitive user data)
exports.getBadgesByUsername = async (username) => {
  const user = await User.findOne({ username }).select('_id');
  if (!user) return [];
  return Badge.find({ user: user._id })
    .select('name description icon createdAt')
    .sort({ createdAt: -1 });
};

// Public: Get badge by ID (no sensitive user data)
exports.getBadgeById = async (id) => {
  return Badge.findById(id).select('name description icon createdAt');
};

// Private: Get all badges for a user (full data)
exports.getBadgesByUserId = async (userId) => {
  return Badge.find({ user: userId }).sort({ createdAt: -1 });
};
