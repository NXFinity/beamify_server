// Admin Payment Service
const Payment = require('../../db/models/payments/paymentModel');
const stripeUtils = require('../../utils/stripe');

// List all payments (with optional filters)
exports.listPayments = async (filters = {}, options = {}) => {
  // TODO: Add filters, pagination, etc.
  return Payment.find(filters).sort({ createdAt: -1 });
};

// Get payment details by ID
exports.getPaymentById = async (id) => {
  return Payment.findById(id);
};

// Refund a payment (by paymentIntentId, optionally partial)
exports.refundPayment = async (paymentIntentId, amount) => {
  // Use Stripe utility if available
  if (stripeUtils && stripeUtils.refundPayment) {
    return stripeUtils.refundPayment(paymentIntentId, amount);
  }
  // Mock
  return { id: 'mock_refund', paymentIntentId, amount };
};

// List all Stripe customers
exports.listCustomers = async (limit = 20) => {
  if (stripeUtils && stripeUtils.listCustomers) {
    return stripeUtils.listCustomers(limit);
  }
  return [];
};

// Get customer details by ID
exports.getCustomerById = async (customerId) => {
  if (stripeUtils && stripeUtils.getCustomerById) {
    return stripeUtils.getCustomerById(customerId);
  }
  return null;
};

// List all subscriptions
exports.listSubscriptions = async (limit = 20) => {
  if (stripeUtils && stripeUtils.listSubscriptions) {
    return stripeUtils.listSubscriptions(limit);
  }
  return [];
};

// Get subscription details by ID
exports.getSubscriptionById = async (subscriptionId) => {
  if (stripeUtils && stripeUtils.getSubscriptionById) {
    return stripeUtils.getSubscriptionById(subscriptionId);
  }
  return null;
};

// Cancel a subscription
exports.cancelSubscription = async (subscriptionId) => {
  if (stripeUtils && stripeUtils.cancelSubscription) {
    return stripeUtils.cancelSubscription(subscriptionId);
  }
  return { id: subscriptionId, status: 'canceled' };
};

// Create a test payment intent (admin/test only)
exports.createTestPaymentIntent = async ({ amount, currency, customer, metadata }) => {
  if (stripeUtils && stripeUtils.createPaymentIntent) {
    return stripeUtils.createPaymentIntent({ amount, currency, customer, metadata });
  }
  // Mock
  return { clientSecret: 'mock_secret', intent: { amount, currency, customer, metadata } };
};
