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
    cover: { type: String },
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
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: {
    type: Date
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  bans: [
    {
      type: {
        type: String,
        enum: ["SITEBAN", "TIMEBAN", "CHANNELBAN", "CHATBAN", "USERBAN"],
        required: true
      },
      issuerType: {
        type: String,
        enum: ["ADMIN", "USER"],
        required: true
      },
      issuerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'bans.issuerType'
      },
      targetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel', // or User/Chat as needed
        default: null
      },
      reason: { type: String },
      expiresAt: { type: Date },
      createdAt: { type: Date, default: Date.now },
      status: { type: String, enum: ['active', 'inactive'], default: 'active' }
    }
  ]
}, {
  timestamps: true
});

// Add/update pre-save hook to sync isBanned with bans
userSchema.pre('save', function (next) {
  const user = this;
  const now = new Date();
  // Check for any active SITEBAN or TIMEBAN, ignore inactive bans
  const hasActiveBan = (user.bans || []).some(ban => {
    if (ban.status === 'inactive') return false;
    if (ban.type === 'SITEBAN') return true;
    if (ban.type === 'TIMEBAN' && (!ban.expiresAt || new Date(ban.expiresAt) > now)) return true;
    return false;
  });
  user.status = user.status || {};
  user.status.isBanned = !!hasActiveBan;
  next();
});

module.exports = mongoose.model('User', userSchema);
