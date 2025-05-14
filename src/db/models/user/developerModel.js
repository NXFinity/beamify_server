const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64
  },
  description: {
    type: String,
    maxlength: 512
  },
  website: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  apiSecret: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Developer', developerSchema);
