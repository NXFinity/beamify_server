const express = require('express');
const router = express.Router();
const paymentController = require('./paymentController');

// Create a payment intent
router.post('/intent', paymentController.createPaymentIntent);

// Create a customer
router.post('/customer', paymentController.createCustomer);

// Create a subscription
router.post('/subscription', paymentController.createSubscription);

// List products
router.get('/products', paymentController.listProducts);

// List prices for a product
router.get('/prices', paymentController.listPrices);

// Refund a payment
router.post('/refund', paymentController.refundPayment);

// Stripe webhook
router.post('/webhook', require('express').raw({ type: 'application/json' }), paymentController.stripeWebhook);

// Create a test payment intent (admin/test only)
router.post('/test-intent', paymentController.testPaymentIntent);

// Payment hook
router.post('/paymentHook', require('express').raw({ type: 'application/json' }), paymentController.paymentHook);

module.exports = router;
