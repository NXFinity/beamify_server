const paymentService = require('./paymentService');
const Payment = require('../../db/models/payments/paymentModel');
const stripeUtils = require('../../utils/stripe');
const stripe = stripeUtils.stripe;

// Create a payment intent
async function createPaymentIntent(req, res) {
  try {
    const { amount, currency, customer, metadata } = req.body;
    const intent = await paymentService.createPaymentIntent({ amount, currency, customer, metadata });
    res.json({ clientSecret: intent.client_secret, intent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Create a customer
async function createCustomer(req, res) {
  try {
    const { email, name, metadata } = req.body;
    const customer = await paymentService.createCustomer({ email, name, metadata });
    res.json({ customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Create a subscription
async function createSubscription(req, res) {
  try {
    const { customerId, priceId, trial_period_days, metadata } = req.body;
    const subscription = await paymentService.createSubscription({ customerId, priceId, trial_period_days, metadata });
    res.json({ subscription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// List products
async function listProducts(req, res) {
  try {
    const { limit } = req.query;
    const products = await paymentService.listProducts(Number(limit) || 10);
    res.json({ products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// List prices for a product
async function listPrices(req, res) {
  try {
    const { productId, limit } = req.query;
    const prices = await paymentService.listPrices(productId, Number(limit) || 10);
    res.json({ prices });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Refund a payment
async function refundPayment(req, res) {
  try {
    const { paymentIntentId, amount } = req.body;
    const refund = await paymentService.refundPayment(paymentIntentId, amount);
    res.json({ refund });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Stripe webhook handler
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = paymentService.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // TODO: handle event types (payment_intent.succeeded, invoice.paid, etc.)
  res.json({ received: true });
}

// Create a test payment intent (admin/test only)
async function testPaymentIntent(req, res) {
  try {
    // Default to $1.00 USD if not provided
    const amount = req.body.amount || 100;
    const currency = req.body.currency || 'usd';
    // Optionally allow metadata or customer
    const { customer, metadata } = req.body;
    const intent = await paymentService.createPaymentIntent({ amount, currency, customer, metadata });
    res.json({ clientSecret: intent.client_secret, intent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        // Upsert payment in DB
        await Payment.findOneAndUpdate(
          { paymentIntentId: pi.id },
          {
            user: pi.metadata && pi.metadata.userId ? pi.metadata.userId : undefined,
            amount: pi.amount,
            currency: pi.currency,
            status: 'succeeded',
            paymentIntentId: pi.id,
            customerId: pi.customer,
            method: pi.payment_method_types ? pi.payment_method_types[0] : undefined,
            receiptUrl: pi.charges && pi.charges.data[0] ? pi.charges.data[0].receipt_url : undefined,
            metadata: pi.metadata || {},
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object;
        await Payment.findOneAndUpdate(
          { paymentIntentId: pi.id },
          { status: 'failed' }
        );
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object;
        await Payment.findOneAndUpdate(
          { paymentIntentId: charge.payment_intent },
          { status: 'refunded' }
        );
        break;
      }
      // Add more event types as needed (e.g., subscription events)
      default:
        // Unhandled event type
        break;
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('[Stripe Webhook] Handler error:', err);
    res.status(500).send('Webhook handler failed');
  }
};

exports.paymentHook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe PaymentHook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.amount_capturable_updated':
      case 'payment_intent.canceled':
      case 'payment_intent.created':
      case 'payment_intent.partially_funded':
      case 'payment_intent.payment_failed':
      case 'payment_intent.processing':
      case 'payment_intent.requires_action':
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        // Upsert payment in DB
        await Payment.findOneAndUpdate(
          { paymentIntentId: pi.id },
          {
            user: pi.metadata && pi.metadata.userId ? pi.metadata.userId : undefined,
            amount: pi.amount,
            currency: pi.currency,
            status: pi.status,
            paymentIntentId: pi.id,
            customerId: pi.customer,
            method: pi.payment_method_types ? pi.payment_method_types[0] : undefined,
            receiptUrl: pi.charges && pi.charges.data[0] ? pi.charges.data[0].receipt_url : undefined,
            metadata: pi.metadata || {},
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        break;
      }
      default:
        console.log(`[Stripe PaymentHook] Unhandled event type: ${event.type}`);
        break;
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('[Stripe PaymentHook] Handler error:', err);
    res.status(500).send('Webhook handler failed');
  }
};

module.exports = {
  createPaymentIntent,
  createCustomer,
  createSubscription,
  listProducts,
  listPrices,
  refundPayment,
  handleWebhook,
  testPaymentIntent,
  stripeWebhook,
  paymentHook,
};
