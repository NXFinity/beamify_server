const mongoose = require('mongoose');

const twitchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  twitchUserId: {
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

module.exports = mongoose.model('Twitch', twitchSchema);
