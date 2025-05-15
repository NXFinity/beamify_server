/**
 * Admin Controller
 */
const auserService = require('./user/auserService');
const roleService = require('./role/roleService');
const permissionService = require('./role/permissionService');
const logger = require('../logs/logger');
const agamifyService = require('./gamify/agamifyService');
const abadgesService = require('./gamify/abadgesService');
const arewardService = require('./gamify/arewardService');

exports.createUser = async (req, res, next) => {
  try {
    const user = await auserService.createUser(req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'CREATE_USER',
      target: 'User',
      targetId: user._id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await auserService.updateUser(req.params.id, req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'UPDATE_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await auserService.deleteUser(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'DELETE_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json({ message: 'User deleted' });
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const user = await auserService.banUser(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'BAN_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.timeoutUser = async (req, res, next) => {
  try {
    const user = await auserService.timeoutUser(req.params.id, req.body.timeoutUntil);
    await logger.logAudit({
      user: req.user._id,
      action: 'TIMEOUT_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.suspendUser = async (req, res, next) => {
  try {
    const user = await auserService.suspendUser(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'SUSPEND_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

// --- Role Management ---
exports.createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'CREATE_ROLE',
      target: 'Role',
      targetId: role._id,
      details: req.body,
      ip: req.ip
    });
    res.json(role);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.getRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_ROLES',
      target: 'Roles',
      targetId: undefined,
      details: undefined,
      ip: req.ip
    });
    res.json(roles);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: undefined
    });
    next(err);
  }
};
exports.getRoleById = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_ROLE_BY_ID',
      target: 'Role',
      targetId: req.params.id,
      details: undefined,
      ip: req.ip
    });
    res.json(role);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: undefined
    });
    next(err);
  }
};
exports.updateRole = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'UPDATE_ROLE',
      target: 'Role',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(role);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.deleteRole = async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'DELETE_ROLE',
      target: 'Role',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

// --- Permission Management ---
exports.createPermission = async (req, res, next) => {
  try {
    const perm = await permissionService.createPermission(req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'CREATE_PERMISSION',
      target: 'Permission',
      targetId: perm._id,
      details: req.body,
      ip: req.ip
    });
    res.json(perm);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.getPermissions = async (req, res, next) => {
  try {
    const perms = await permissionService.getPermissions();
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_PERMISSIONS',
      target: 'Permissions',
      targetId: undefined,
      details: undefined,
      ip: req.ip
    });
    res.json(perms);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: undefined
    });
    next(err);
  }
};
exports.getPermissionById = async (req, res, next) => {
  try {
    const perm = await permissionService.getPermissionById(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_PERMISSION_BY_ID',
      target: 'Permission',
      targetId: req.params.id,
      details: undefined,
      ip: req.ip
    });
    res.json(perm);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: undefined
    });
    next(err);
  }
};
exports.updatePermission = async (req, res, next) => {
  try {
    const perm = await permissionService.updatePermission(req.params.id, req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'UPDATE_PERMISSION',
      target: 'Permission',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(perm);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.deletePermission = async (req, res, next) => {
  try {
    await permissionService.deletePermission(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'DELETE_PERMISSION',
      target: 'Permission',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json({ message: 'Permission deleted' });
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

// --- User Role/Permission Assignment ---
exports.assignRoleToUser = async (req, res, next) => {
  try {
    const user = await auserService.assignRoleToUser(req.params.id, req.body.role);
    await logger.logAudit({
      user: req.user._id,
      action: 'ASSIGN_ROLE_TO_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.removeRoleFromUser = async (req, res, next) => {
  try {
    const user = await auserService.removeRoleFromUser(req.params.id, req.body.role);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_ROLE_FROM_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.assignPermissionToUser = async (req, res, next) => {
  try {
    const user = await auserService.assignPermissionToUser(req.params.id, req.body.permission);
    await logger.logAudit({
      user: req.user._id,
      action: 'ASSIGN_PERMISSION_TO_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};
exports.removePermissionFromUser = async (req, res, next) => {
  try {
    const user = await auserService.removePermissionFromUser(req.params.id, req.body.permission);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_PERMISSION_FROM_USER',
      target: 'User',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(user);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

// --- Admin Gamify Management ---
exports.getAllGamify = async (req, res, next) => {
  try {
    const profiles = await agamifyService.getAllGamify();
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_ALL_GAMIFY',
      target: 'Gamify',
      ip: req.ip
    });
    res.json(profiles);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method
    });
    next(err);
  }
};

exports.getGamifyById = async (req, res, next) => {
  try {
    const profile = await agamifyService.getGamifyById(req.params.id);
    await logger.logAudit({
      user: req.user._id,
      action: 'GET_GAMIFY_BY_ID',
      target: 'Gamify',
      targetId: req.params.id,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method
    });
    next(err);
  }
};

exports.updateGamify = async (req, res, next) => {
  try {
    const profile = await agamifyService.updateGamify(req.params.id, req.body);
    await logger.logAudit({
      user: req.user._id,
      action: 'UPDATE_GAMIFY',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.addPoints = async (req, res, next) => {
  try {
    const profile = await agamifyService.addPoints(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'ADD_POINTS',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.removePoints = async (req, res, next) => {
  try {
    const profile = await agamifyService.removePoints(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_POINTS',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.addLevel = async (req, res, next) => {
  try {
    const profile = await agamifyService.addLevel(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'ADD_LEVEL',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.removeLevel = async (req, res, next) => {
  try {
    const profile = await agamifyService.removeLevel(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_LEVEL',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.addExp = async (req, res, next) => {
  try {
    const profile = await agamifyService.addExp(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'ADD_EXP',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.removeExp = async (req, res, next) => {
  try {
    const profile = await agamifyService.removeExp(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_EXP',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.addCrystals = async (req, res, next) => {
  try {
    const profile = await agamifyService.addCrystals(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'ADD_CRYSTALS',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

exports.removeCrystals = async (req, res, next) => {
  try {
    const profile = await agamifyService.removeCrystals(req.params.id, req.body.amount);
    await logger.logAudit({
      user: req.user._id,
      action: 'REMOVE_CRYSTALS',
      target: 'Gamify',
      targetId: req.params.id,
      details: req.body,
      ip: req.ip
    });
    res.json(profile);
  } catch (err) {
    await logger.logError({
      message: err.message,
      stack: err.stack,
      user: req.user ? req.user._id : undefined,
      endpoint: req.originalUrl,
      method: req.method,
      details: req.body
    });
    next(err);
  }
};

// --- Admin Badge Management ---
exports.createBadge = async (req, res, next) => {
  try {
    const badge = await abadgesService.createBadge(req.body);
    await logger.logAudit({ user: req.user._id, action: 'CREATE_BADGE', target: 'Badge', targetId: badge._id, details: req.body, ip: req.ip });
    res.json(badge);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method, details: req.body });
    next(err);
  }
};
exports.getBadgeById = async (req, res, next) => {
  try {
    const badge = await abadgesService.getBadgeById(req.params.id);
    await logger.logAudit({ user: req.user._id, action: 'GET_BADGE_BY_ID', target: 'Badge', targetId: req.params.id, ip: req.ip });
    res.json(badge);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};
exports.getAllBadges = async (req, res, next) => {
  try {
    const badges = await abadgesService.getAllBadges();
    await logger.logAudit({ user: req.user._id, action: 'GET_ALL_BADGES', target: 'Badge', ip: req.ip });
    res.json(badges);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};
exports.updateBadge = async (req, res, next) => {
  try {
    const badge = await abadgesService.updateBadge(req.params.id, req.body);
    await logger.logAudit({ user: req.user._id, action: 'UPDATE_BADGE', target: 'Badge', targetId: req.params.id, details: req.body, ip: req.ip });
    res.json(badge);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method, details: req.body });
    next(err);
  }
};
exports.deleteBadge = async (req, res, next) => {
  try {
    await abadgesService.deleteBadge(req.params.id);
    await logger.logAudit({ user: req.user._id, action: 'DELETE_BADGE', target: 'Badge', targetId: req.params.id, ip: req.ip });
    res.json({ message: 'Badge deleted' });
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};

// --- Admin Reward Management ---
exports.createReward = async (req, res, next) => {
  try {
    const reward = await arewardService.createReward(req.body);
    await logger.logAudit({ user: req.user._id, action: 'CREATE_REWARD', target: 'Reward', targetId: reward._id, details: req.body, ip: req.ip });
    res.json(reward);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method, details: req.body });
    next(err);
  }
};
exports.getRewardById = async (req, res, next) => {
  try {
    const reward = await arewardService.getRewardById(req.params.id);
    await logger.logAudit({ user: req.user._id, action: 'GET_REWARD_BY_ID', target: 'Reward', targetId: req.params.id, ip: req.ip });
    res.json(reward);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};
exports.getAllRewards = async (req, res, next) => {
  try {
    const rewards = await arewardService.getAllRewards();
    await logger.logAudit({ user: req.user._id, action: 'GET_ALL_REWARDS', target: 'Reward', ip: req.ip });
    res.json(rewards);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};
exports.updateReward = async (req, res, next) => {
  try {
    const reward = await arewardService.updateReward(req.params.id, req.body);
    await logger.logAudit({ user: req.user._id, action: 'UPDATE_REWARD', target: 'Reward', targetId: req.params.id, details: req.body, ip: req.ip });
    res.json(reward);
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method, details: req.body });
    next(err);
  }
};
exports.deleteReward = async (req, res, next) => {
  try {
    await arewardService.deleteReward(req.params.id);
    await logger.logAudit({ user: req.user._id, action: 'DELETE_REWARD', target: 'Reward', targetId: req.params.id, ip: req.ip });
    res.json({ message: 'Reward deleted' });
  } catch (err) {
    await logger.logError({ message: err.message, stack: err.stack, user: req.user ? req.user._id : undefined, endpoint: req.originalUrl, method: req.method });
    next(err);
  }
};
