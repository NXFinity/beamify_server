const mongoose = require('mongoose');

const shippingClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 128
  },
  description: {
    type: String,
    maxlength: 512
  },
  rates: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('ShippingClass', shippingClassSchema); 