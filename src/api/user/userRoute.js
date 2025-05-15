const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require('../../security/validation/passport');

// Public: Get all users
router.get('/', userController.getAllUsers);

// Protected: Get current user profile (must be before /:id)
router.get('/me', passport.authenticate('jwt', { session: false }), userController.getCurrentUser);

// Public: Get user by ID
router.get('/:id', userController.getUserById);

// Protected: Update user
router.put('/:id', passport.authenticate('jwt', { session: false }), userController.updateUser);

// Protected: Delete user
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser);

module.exports = router;
