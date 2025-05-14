const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One vendor profile per user
  },
  storeName: {
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
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
