const Activity = require('../../../db/models/gamify/activityModel');
const User = require('../../../db/models/user/userModel');

// Core logic: log an activity
exports.logActivity = async (userId, type, meta = {}) => {
  return Activity.create({ user: userId, type, meta });
};

// Public: Get activities by username (no sensitive user data)
exports.getActivitiesByUsername = async (username) => {
  const user = await User.findOne({ username }).select('_id');
  if (!user) return [];
  return Activity.find({ user: user._id })
    .select('-user')
    .sort({ createdAt: -1 });
};

// Public: Get activity by ID (no sensitive user data)
exports.getActivityById = async (id) => {
  return Activity.findById(id).select('-user');
};

// Private: Get all activities for a user (full data)
exports.getActivitiesByUserId = async (userId) => {
  return Activity.find({ user: userId }).sort({ createdAt: -1 });
};
