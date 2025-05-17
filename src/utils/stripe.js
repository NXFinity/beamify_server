const Stripe = require('stripe');
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'development';
const stripeKey = isDev ? process.env.TEST_STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY;
console.log('[Stripe] isDev:', isDev, '| Using key:', stripeKey);
const stripe = new Stripe(stripeKey);

// Create a payment intent (one-time payment)
async function createPaymentIntent({ amount, currency, customer, metadata }) {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    customer,
    metadata,
  });
}

// Create a customer
async function createCustomer({ email, name, metadata }) {
  return await stripe.customers.create({
    email,
    name,
    metadata,
  });
}

// Create a subscription
async function createSubscription({ customerId, priceId, trial_period_days, metadata }) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    trial_period_days,
    metadata,
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}

// List products
async function listProducts(limit = 10) {
  return await stripe.products.list({ limit });
}

// List prices for a product
async function listPrices(productId, limit = 10) {
  return await stripe.prices.list({ product: productId, limit });
}

// Refund a payment
async function refundPayment(paymentIntentId, amount) {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
  });
}

// Handle Stripe webhook events (to be used in controller)
function constructEvent(rawBody, sig, endpointSecret) {
  return stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
}

module.exports = {
  stripe,
  createPaymentIntent,
  createCustomer,
  createSubscription,
  listProducts,
  listPrices,
  refundPayment,
  constructEvent,
};
