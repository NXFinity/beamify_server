const Gamify = require('../../db/models/gamify/gamifyModel');

// View a gamify profile by ID
exports.getGamifyById = async (id) => {
  return Gamify.findById(id)
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};

// Edit (update) a gamify profile
exports.updateGamify = async (id, update) => {
  return Gamify.findByIdAndUpdate(id, update, { new: true })
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};

// Add/remove points
exports.addPoints = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { points: amount } }, { new: true });
};
exports.removePoints = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { points: -amount } }, { new: true });
};

// Add/remove levels
exports.addLevel = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { level: amount } }, { new: true });
};
exports.removeLevel = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { level: -amount } }, { new: true });
};

// Add/remove experience
exports.addExp = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { exp: amount } }, { new: true });
};
exports.removeExp = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { exp: -amount } }, { new: true });
};

// Add/remove crystals
exports.addCrystals = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { crystals: amount } }, { new: true });
};
exports.removeCrystals = async (id, amount) => {
  return Gamify.findByIdAndUpdate(id, { $inc: { crystals: -amount } }, { new: true });
};

// List all gamify profiles
exports.getAllGamify = async () => {
  return Gamify.find()
    .populate('user', 'username email')
    .populate('achievements')
    .populate('quests')
    .populate('badges');
};
