const express = require('express');
const router = express.Router();
const gamifyController = require('./gamifyController');
const passport = require('../../security/validation/passport');

// Get all gamify profiles
router.get('/', gamifyController.getAllGamify);

// Get a gamify profile by ID
router.get('/:id', gamifyController.getGamifyById);

// Update a gamify profile
router.put('/:id', gamifyController.updateGamify);

// Delete a gamify profile
router.delete('/:id', gamifyController.deleteGamify);

// --- Activities ---
router.get('/activities/user/:username', gamifyController.getActivitiesByUsername);
router.get('/activities/:id', gamifyController.getActivityById);
router.get('/activities/me', passport.authenticate('jwt', { session: false }), gamifyController.getMyActivities);

// --- Badges ---
router.get('/badges/user/:username', gamifyController.getBadgesByUsername);
router.get('/badges/:id', gamifyController.getBadgeById);
router.get('/badges/me', passport.authenticate('jwt', { session: false }), gamifyController.getMyBadges);

// --- Rewards ---
router.get('/rewards/user/:username', gamifyController.getRewardsByUsername);
router.get('/rewards/:id', gamifyController.getRewardById);
router.get('/rewards/me', passport.authenticate('jwt', { session: false }), gamifyController.getMyRewards);

module.exports = router;
