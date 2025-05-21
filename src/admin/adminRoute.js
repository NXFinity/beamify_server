const express = require('express');
const passport = require('../security/validation/passport');
const roleCheck = require('../security/validation/roleCheck');
const banCheck = require('../security/validation/banCheck');
const adminController = require('./adminController');

const router = express.Router();

// All routes require SYSTEM_ADMINISTRATOR
const adminAuth = [passport.authenticate('jwt', { session: false }), banCheck, roleCheck('SYSTEM_ADMINISTRATOR')];

// --- User Management ---
router.post('/users', adminAuth, adminController.createUser);
router.put('/users/:id', adminAuth, adminController.updateUser);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.post('/users/:id/ban', adminAuth, adminController.banUser);
router.delete('/users/:id/ban', adminAuth, adminController.unbanUser);
router.post('/users/:id/timeout', adminAuth, adminController.timeoutUser);
router.post('/users/:id/suspend', adminAuth, adminController.suspendUser);
router.get('/users/count', adminAuth, adminController.getUserCount);
router.get('/users/count-verified', adminAuth, adminController.getVerifiedUserCount);
router.get('/users/count-banned', adminAuth, adminController.getBannedUserCount);
router.get('/users/count-timedout', adminAuth, adminController.getTimedOutUserCount);
router.get('/users', adminAuth, adminController.getAllUsers);

// --- Role Management ---
router.post('/roles', adminAuth, adminController.createRole);
router.get('/roles', adminAuth, adminController.getRoles);
router.get('/roles/:id', adminAuth, adminController.getRoleById);
router.put('/roles/:id', adminAuth, adminController.updateRole);
router.delete('/roles/:id', adminAuth, adminController.deleteRole);

// --- Permission Management ---
router.post('/permissions', adminAuth, adminController.createPermission);
router.get('/permissions', adminAuth, adminController.getPermissions);
router.get('/permissions/:id', adminAuth, adminController.getPermissionById);
router.put('/permissions/:id', adminAuth, adminController.updatePermission);
router.delete('/permissions/:id', adminAuth, adminController.deletePermission);

// --- User Role/Permission Assignment ---
router.post('/users/:id/roles', adminAuth, adminController.assignRoleToUser);
router.delete('/users/:id/roles', adminAuth, adminController.removeRoleFromUser);
router.post('/users/:id/permissions', adminAuth, adminController.assignPermissionToUser);
router.delete('/users/:id/permissions', adminAuth, adminController.removePermissionFromUser);

// --- Admin Gamify Management ---
router.get('/gamify', adminAuth, adminController.getAllGamify);
router.get('/gamify/:id', adminAuth, adminController.getGamifyById);
router.put('/gamify/:id', adminAuth, adminController.updateGamify);
router.post('/gamify/:id/add-points', adminAuth, adminController.addPoints);
router.post('/gamify/:id/remove-points', adminAuth, adminController.removePoints);
router.post('/gamify/:id/add-level', adminAuth, adminController.addLevel);
router.post('/gamify/:id/remove-level', adminAuth, adminController.removeLevel);
router.post('/gamify/:id/add-exp', adminAuth, adminController.addExp);
router.post('/gamify/:id/remove-exp', adminAuth, adminController.removeExp);
router.post('/gamify/:id/add-crystals', adminAuth, adminController.addCrystals);
router.post('/gamify/:id/remove-crystals', adminAuth, adminController.removeCrystals);

// --- Admin Badge Management ---
router.post('/badges', adminAuth, adminController.createBadge);
router.get('/badges', adminAuth, adminController.getAllBadges);
router.get('/badges/:id', adminAuth, adminController.getBadgeById);
router.put('/badges/:id', adminAuth, adminController.updateBadge);
router.delete('/badges/:id', adminAuth, adminController.deleteBadge);

// --- Admin Reward Management ---
router.post('/rewards', adminAuth, adminController.createReward);
router.get('/rewards', adminAuth, adminController.getAllRewards);
router.get('/rewards/:id', adminAuth, adminController.getRewardById);
router.put('/rewards/:id', adminAuth, adminController.updateReward);
router.delete('/rewards/:id', adminAuth, adminController.deleteReward);

// --- Admin Payment Management ---
router.get('/payments', adminAuth, adminController.listPayments);
router.get('/payments/:id', adminAuth, adminController.getPaymentById);
router.post('/payments/:id/refund', adminAuth, adminController.refundPayment);
router.get('/customers', adminAuth, adminController.listCustomers);
router.get('/customers/:id', adminAuth, adminController.getCustomerById);
router.get('/subscriptions', adminAuth, adminController.listSubscriptions);
router.get('/subscriptions/:id', adminAuth, adminController.getSubscriptionById);
router.post('/subscriptions/:id/cancel', adminAuth, adminController.cancelSubscription);
// Test payment intent (admin only)
router.post('/payment/test-intent', adminAuth, adminController.adminTestPaymentIntent);

// --- Store Management ---
router.post('/store', adminAuth, adminController.createStore);
router.get('/store', adminAuth, adminController.getStore);
router.put('/store', adminAuth, adminController.updateStore);
router.delete('/store', adminAuth, adminController.deleteStore);

// --- Category Management ---
router.post('/categories', adminAuth, adminController.createCategory);
router.get('/categories', adminAuth, adminController.getCategories);
router.get('/categories/:id', adminAuth, adminController.getCategory);
router.put('/categories/:id', adminAuth, adminController.updateCategory);
router.delete('/categories/:id', adminAuth, adminController.deleteCategory);

// --- Tag Management ---
router.post('/tags', adminAuth, adminController.createTag);
router.get('/tags', adminAuth, adminController.getTags);
router.get('/tags/:id', adminAuth, adminController.getTag);
router.put('/tags/:id', adminAuth, adminController.updateTag);
router.delete('/tags/:id', adminAuth, adminController.deleteTag);

// --- Product Management ---
router.post('/products', adminAuth, adminController.createProduct);
router.get('/products', adminAuth, adminController.getProducts);
router.get('/products/:id', adminAuth, adminController.getProduct);
router.put('/products/:id', adminAuth, adminController.updateProduct);
router.delete('/products/:id', adminAuth, adminController.deleteProduct);

// --- Asset Upload ---
router.post('/assets/upload', adminAuth, adminController.uploadAsset);

// --- Shipping Class Management ---
router.post('/shipping-classes', adminAuth, adminController.createShippingClass);
router.get('/shipping-classes', adminAuth, adminController.getAllShippingClasses);
router.get('/shipping-classes/:id', adminAuth, adminController.getShippingClassById);
router.put('/shipping-classes/:id', adminAuth, adminController.updateShippingClass);
router.delete('/shipping-classes/:id', adminAuth, adminController.deleteShippingClass);

module.exports = router;
