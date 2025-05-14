const mongoose = require('mongoose');

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
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Gamify', gamifySchema);
