const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded', 'canceled'], default: 'pending' },
  paymentIntentId: { type: String, required: true },
  customerId: { type: String },
  method: { type: String },
  receiptUrl: { type: String },
  metadata: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
