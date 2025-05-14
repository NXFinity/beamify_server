const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  streamKey: {
    type: String,
    required: true,
    unique: true
  },
  streamTitle: {
    type: String,
    required: true,
    maxlength: 128
  },
  description: {
    type: String,
    maxlength: 1024
  },
  isLive: {
    type: Boolean,
    default: false
  },
  thumbnail: {
    type: String
  },
  mediaType: {
    type: String,
    enum: ['live', 'video', 'audio', 'image'],
    default: 'live'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);
