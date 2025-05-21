const mongoose = require('mongoose');
// Register referenced models to fix populate errors
require('./questModel');
require('./achievementModel');
require('./badgeModel');

const gamifySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One gamification profile per user
  },
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  exp: {
    type: Number,
    default: 0
  },
  crystals: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  quests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest'
  }],
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Gamify', gamifySchema);
