const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceItemSchema = new Schema({
  productId: { type: String },
  priceId: { type: String },
  quantity: { type: Number, default: 1 },
  amount: { type: Number },
}, { _id: false });

const invoiceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [invoiceItemSchema],
  total: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ['draft', 'open', 'paid', 'uncollectible', 'void'], default: 'draft' },
  invoiceId: { type: String },
  customerId: { type: String },
  paymentIntentId: { type: String },
  dueDate: { type: Date },
  paidAt: { type: Date },
  metadata: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
