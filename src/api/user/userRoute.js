const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require('../../security/validation/passport');
const banCheck = require('../../security/validation/banCheck');

// Public: Get all users
router.get('/', userController.getAllUsers);

// Public: Get user by username (must be before /:id)
router.get('/username/:username', userController.getUserByUsername);

// Protected: Get current user profile (must be before /:id)
router.get('/me', passport.authenticate('jwt', { session: false }), banCheck, userController.getCurrentUser);

// Protected: Upload avatar, cover, photo
router.post('/:id/avatar', passport.authenticate('jwt', { session: false }), banCheck, userController.uploadAvatar);
router.post('/:id/cover', passport.authenticate('jwt', { session: false }), banCheck, userController.uploadCover);
router.post('/:id/photos', passport.authenticate('jwt', { session: false }), banCheck, userController.uploadPhoto);

// Public: Get user by ID
router.get('/:id', userController.getUserById);

// Protected: Update user
router.put('/:id', passport.authenticate('jwt', { session: false }), banCheck, userController.updateUser);

// Protected: Delete user
router.delete('/:id', passport.authenticate('jwt', { session: false }), banCheck, userController.deleteUser);

module.exports = router;
