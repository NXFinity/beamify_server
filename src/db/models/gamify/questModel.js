const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
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
  isCompleted: {
    type: Boolean,
    default: false
  },
  reward: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quest', questSchema);
