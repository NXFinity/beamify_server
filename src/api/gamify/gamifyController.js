const gamifyService = require('./gamifyService');
const activitiesService = require('./services/activitiesService');
const badgesService = require('./services/badgesService');
const rewardsService = require('./services/rewardsService');
const passport = require('../../security/validation/passport');

exports.createGamify = async (req, res, next) => {
  try {
    const gamify = await gamifyService.createGamify(req.body);
    res.status(201).json(gamify);
  } catch (err) {
    next(err);
  }
};

exports.getAllGamify = async (req, res, next) => {
  try {
    const gamifies = await gamifyService.getAllGamify();
    res.json(gamifies);
  } catch (err) {
    next(err);
  }
};

exports.getGamifyById = async (req, res, next) => {
  try {
    const gamify = await gamifyService.getGamifyById(req.params.id);
    if (!gamify) return res.status(404).json({ message: 'Gamify profile not found' });
    res.json(gamify);
  } catch (err) {
    next(err);
  }
};

exports.updateGamify = async (req, res, next) => {
  try {
    const gamify = await gamifyService.updateGamify(req.params.id, req.body);
    if (!gamify) return res.status(404).json({ message: 'Gamify profile not found' });
    res.json(gamify);
  } catch (err) {
    next(err);
  }
};

exports.deleteGamify = async (req, res, next) => {
  try {
    const gamify = await gamifyService.deleteGamify(req.params.id);
    if (!gamify) return res.status(404).json({ message: 'Gamify profile not found' });
    res.json({ message: 'Gamify profile deleted' });
  } catch (err) {
    next(err);
  }
};

// --- Activities ---
exports.getActivitiesByUsername = async (req, res, next) => {
  try {
    const activities = await activitiesService.getActivitiesByUsername(req.params.username);
    res.json(activities);
  } catch (err) { next(err); }
};
exports.getActivityById = async (req, res, next) => {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (err) { next(err); }
};
exports.getMyActivities = async (req, res, next) => {
  try {
    const activities = await activitiesService.getActivitiesByUserId(req.user._id);
    res.json(activities);
  } catch (err) { next(err); }
};

// --- Badges ---
exports.getBadgesByUsername = async (req, res, next) => {
  try {
    const badges = await badgesService.getBadgesByUsername(req.params.username);
    res.json(badges);
  } catch (err) { next(err); }
};
exports.getBadgeById = async (req, res, next) => {
  try {
    const badge = await badgesService.getBadgeById(req.params.id);
    if (!badge) return res.status(404).json({ message: 'Badge not found' });
    res.json(badge);
  } catch (err) { next(err); }
};
exports.getMyBadges = async (req, res, next) => {
  try {
    const badges = await badgesService.getBadgesByUserId(req.user._id);
    res.json(badges);
  } catch (err) { next(err); }
};

// --- Rewards ---
exports.getRewardsByUsername = async (req, res, next) => {
  try {
    const rewards = await rewardsService.getRewardsByUsername(req.params.username);
    res.json(rewards);
  } catch (err) { next(err); }
};
exports.getRewardById = async (req, res, next) => {
  try {
    const reward = await rewardsService.getRewardById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (err) { next(err); }
};
exports.getMyRewards = async (req, res, next) => {
  try {
    const rewards = await rewardsService.getRewardsByUserId(req.user._id);
    res.json(rewards);
  } catch (err) { next(err); }
};
