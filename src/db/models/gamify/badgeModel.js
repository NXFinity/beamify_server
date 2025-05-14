const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 64
  },
  description: {
    type: String,
    maxlength: 512
  },
  icon: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);
