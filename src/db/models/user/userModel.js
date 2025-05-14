const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['user']
  },
  profile: {
    avatar: { type: String },
    bio: { type: String, maxlength: 512 },
    displayName: { type: String, maxlength: 64 }
  },
  social: {
    discordId: { type: String },
    twitchId: { type: String },
    twitterId: { type: String }
  },
  status: {
    isActive: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false }
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Developer',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
