const Gamify = require('../../db/models/gamify/gamifyModel');

// Create a new gamify profile
exports.createGamify = async (data) => {
  return Gamify.create(data);
};

// Get all gamify profiles
exports.getAllGamify = async () => {
  return Gamify.find()
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};

// Get a gamify profile by ID
exports.getGamifyById = async (id) => {
  return Gamify.findById(id)
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};

// Update a gamify profile
exports.updateGamify = async (id, update) => {
  return Gamify.findByIdAndUpdate(id, update, { new: true })
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};

// Delete a gamify profile
exports.deleteGamify = async (id) => {
  return Gamify.findByIdAndDelete(id);
};
