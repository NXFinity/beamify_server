const {
  createPaymentIntent: stripeCreatePaymentIntent,
  createCustomer: stripeCreateCustomer,
  createSubscription: stripeCreateSubscription,
  listProducts: stripeListProducts,
  listPrices: stripeListPrices,
  refundPayment: stripeRefundPayment,
  constructEvent: stripeConstructEvent,
} = require('../../utils/stripe');
const Payment = require('../../db/models/payments/paymentModel');
const Invoice = require('../../db/models/payments/invoiceModel');

// Create a payment intent and store in DB
async function createPaymentIntent({ user, items, total, currency, customer, metadata }) {
  // 1. Create Invoice (order) in DB
  const invoice = await Invoice.create({
    user,
    items,
    total,
    currency,
    status: 'open',
    metadata,
  });
  // 2. Create PaymentIntent with Stripe
  const intent = await stripeCreatePaymentIntent({ amount: total, currency, customer, metadata });
  // 3. Create Payment record and link to Invoice
  await Payment.create({
    user,
    amount: total,
    currency,
    status: 'pending',
    paymentIntentId: intent.id,
    customerId: customer,
    metadata,
    invoiceId: invoice._id,
  });
  // 4. Update Invoice with PaymentIntentId
  invoice.paymentIntentId = intent.id;
  await invoice.save();
  return { invoice, intent };
}

// Create a customer (Stripe only)
async function createCustomer({ email, name, metadata }) {
  return await stripeCreateCustomer({ email, name, metadata });
}

// Create a subscription (Stripe only)
async function createSubscription({ customerId, priceId, trial_period_days, metadata }) {
  return await stripeCreateSubscription({ customerId, priceId, trial_period_days, metadata });
}

// List products (Stripe only)
async function listProducts(limit = 10) {
  return await stripeListProducts(limit);
}

// List prices for a product (Stripe only)
async function listPrices(productId, limit = 10) {
  return await stripeListPrices(productId, limit);
}

// Refund a payment and update DB
async function refundPayment(paymentIntentId, amount) {
  const refund = await stripeRefundPayment(paymentIntentId, amount);
  await Payment.findOneAndUpdate(
    { paymentIntentId },
    { status: 'refunded' }
  );
  return refund;
}

// Handle Stripe webhook events (to be used in controller)
function constructEvent(rawBody, sig, endpointSecret) {
  return stripeConstructEvent(rawBody, sig, endpointSecret);
}

module.exports = {
  createPaymentIntent,
  createCustomer,
  createSubscription,
  listProducts,
  listPrices,
  refundPayment,
  constructEvent,
};
