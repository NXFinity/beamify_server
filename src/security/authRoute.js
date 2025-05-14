const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Verify email
router.post('/verify', authController.verify);

// Forgot password
router.post('/forgot', authController.forgot);

// Reset password
router.post('/reset', authController.reset);

// Resend verification email
router.post('/resend', authController.resend);

module.exports = router;
