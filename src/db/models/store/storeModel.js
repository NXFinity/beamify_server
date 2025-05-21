const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128
  },
  description: {
    type: String,
    maxlength: 1024
  },
  logo: {
    type: String // URL or path to logo image
  },
  cover: {
    type: String // URL or path to cover image
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  settings: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Store', storeSchema);
