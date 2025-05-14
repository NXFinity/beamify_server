const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 128
  },
  description: {
    type: String,
    maxlength: 1024
  },
  icon: {
    type: String
  },
  dateAchieved: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
