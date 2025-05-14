const mongoose = require('mongoose');

const kickSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  kickUserId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  profile: {
    type: Object
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Kick', kickSchema);
