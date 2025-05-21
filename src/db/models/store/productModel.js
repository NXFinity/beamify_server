const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 256
    // required only for published products
  },
  description: {
    type: String,
    maxlength: 4096
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-z0-9-]+$/
    // required only for published products
  },
  price: {
    type: Number,
    min: 0
    // required only for published products
  },
  salePrice: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'GBP',
    maxlength: 8
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
    // required only for published products
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  image: {
    type: String
  },
  images: [{
    type: String
  }],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  stock: {
    type: Number,
    default: 0
  },
  manageStock: {
    type: Boolean,
    default: false
  },
  stockStatus: {
    type: String,
    enum: ['in_stock', 'out_of_stock', 'backorder'],
    default: 'in_stock'
  },
  weight: {
    type: Number
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  // Shipping class (requires ShippingClass model)
  shippingClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingClass'
  },
  attributes: [
    {
      name: { type: String, required: true },
      values: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 }
    }
  ],
  sku: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Make attributes required for published products
productSchema.pre('validate', function(next) {
  if (this.status === 'published' && (!this.attributes || this.attributes.length === 0)) {
    this.invalidate('attributes', 'At least one attribute (e.g., Size) is required for published products.');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema); 