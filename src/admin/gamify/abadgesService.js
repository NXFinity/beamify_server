const Badge = require('../../db/models/gamify/badgeModel');

// Create a badge
exports.createBadge = async (data) => {
  return Badge.create(data);
};

// Get a badge by ID
exports.getBadgeById = async (id) => {
  return Badge.findById(id).populate('user', 'username email');
};

// Get all badges
exports.getAllBadges = async () => {
  return Badge.find().populate('user', 'username email');
};

// Update a badge
exports.updateBadge = async (id, update) => {
  return Badge.findByIdAndUpdate(id, update, { new: true }).populate('user', 'username email');
};

// Delete a badge
exports.deleteBadge = async (id) => {
  return Badge.findByIdAndDelete(id);
};
