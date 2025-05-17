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
const apaymentService = require('./payment/apaymentService');

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
    const { type, issuerType, issuerId, targetId, reason, expiresAt } = req.body;
    const user = await auserService.banUser(req.params.id, {
      type,
      issuerType,
      issuerId: issuerId || req.user._id,
      targetId,
      reason,
      expiresAt
    });
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

exports.unbanUser = async (req, res, next) => {
  try {
    const { type, targetId } = req.body;
    const user = await auserService.unbanUser(req.params.id, { type, targetId });
    await logger.logAudit({
      user: req.user._id,
      action: 'UNBAN_USER',
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

// Get total user count
exports.getUserCount = async (req, res, next) => {
  try {
    const count = await auserService.getUserCount();
    res.json({ count });
  } catch (err) {
    next(err);
  }
};

// Get total verified user count
exports.getVerifiedUserCount = async (req, res, next) => {
  try {
    const count = await auserService.getVerifiedUserCount();
    res.json({ count });
  } catch (err) {
    next(err);
  }
};

// Get total banned user count
exports.getBannedUserCount = async (req, res, next) => {
  try {
    const count = await auserService.getBannedUserCount();
    res.json({ count });
  } catch (err) {
    next(err);
  }
};

// Get total timed out user count
exports.getTimedOutUserCount = async (req, res, next) => {
  try {
    const count = await auserService.getTimedOutUserCount();
    res.json({ count });
  } catch (err) {
    next(err);
  }
};

// Advanced: Get all users with pagination, search, and filtering
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, search, role, status } = req.query;
    const result = await auserService.getAllUsers({ page, limit, search, role, status });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// --- Admin Payment Management ---
exports.listPayments = async (req, res, next) => {
  try {
    const payments = await apaymentService.listPayments(req.query, {});
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await apaymentService.getPaymentById(req.params.id);
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.refundPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const refund = await apaymentService.refundPayment(req.params.id, amount);
    res.json(refund);
  } catch (err) {
    next(err);
  }
};

exports.listCustomers = async (req, res, next) => {
  try {
    const customers = await apaymentService.listCustomers(Number(req.query.limit) || 20);
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await apaymentService.getCustomerById(req.params.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.listSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await apaymentService.listSubscriptions(Number(req.query.limit) || 20);
    res.json(subscriptions);
  } catch (err) {
    next(err);
  }
};

exports.getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await apaymentService.getSubscriptionById(req.params.id);
    res.json(subscription);
  } catch (err) {
    next(err);
  }
};

exports.cancelSubscription = async (req, res, next) => {
  try {
    const result = await apaymentService.cancelSubscription(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Create a test payment intent (admin/test only)
exports.adminTestPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency, customer, metadata } = req.body;
    const result = await apaymentService.createTestPaymentIntent({ amount, currency, customer, metadata });
    res.json({
      clientSecret: result.client_secret,
      intent: result
    });
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
