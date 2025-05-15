const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require('./validation/passport');

// Initialize Administrator Account (available only if no admin exists)
router.post('/init-admin', authController.initAdmin);

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

// Logout
router.post('/logout', authController.logout);

// Protected: Change password
router.post('/change-password', passport.authenticate('jwt', { session: false }), authController.changePassword);

// Protected: Get current user
router.get('/me', passport.authenticate('jwt', { session: false }), authController.me);

// Reset verification token
router.post('/reset-verification', authController.resetVerification);

module.exports = router;
