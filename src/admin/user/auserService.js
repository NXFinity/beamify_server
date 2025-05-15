const User = require('../../db/models/user/userModel');
const Role = require('../../db/models/admin/roleModel');
const Permission = require('../../db/models/admin/permissionModel');
const bcrypt = require('bcrypt');

// Helper: validate user data for creation
function validateUserData(data, isUpdate = false) {
  const errors = [];
  if (!isUpdate) {
    if (!data.email) errors.push('Email is required');
    if (!data.username) errors.push('Username is required');
    if (!data.password) errors.push('Password is required');
  }
  if (data.username && (data.username.length < 3 || data.username.length > 32)) errors.push('Username must be 3-32 characters');
  if (data.password && data.password.length < 6) errors.push('Password must be at least 6 characters');
  return errors;
}

// Create a new user (admin action)
exports.createUser = async (data) => {
  const errors = validateUserData(data);
  if (errors.length) throw new Error(errors.join(', '));

  // Check for unique email/username
  const existingEmail = await User.findOne({ email: data.email });
  if (existingEmail) throw new Error('Email already in use');
  const existingUsername = await User.findOne({ username: data.username });
  if (existingUsername) throw new Error('Username already in use');

  // Hash password
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Build user object
  const userObj = {
    email: data.email,
    username: data.username,
    passwordHash,
    roles: Array.isArray(data.roles) ? data.roles : ['user'],
    profile: data.profile || {},
    social: data.social || {},
    status: data.status || {},
    isVerified: data.isVerified || false
  };
  return User.create(userObj);
};

// Update an existing user (admin action)
exports.updateUser = async (id, update) => {
  const errors = validateUserData(update, true);
  if (errors.length) throw new Error(errors.join(', '));

  // Prevent direct passwordHash update
  if (update.passwordHash) delete update.passwordHash;

  // If updating password, hash it
  if (update.password) {
    update.passwordHash = await bcrypt.hash(update.password, 10);
    delete update.password;
  }

  // Only allow certain fields to be updated
  const allowed = ['email', 'username', 'roles', 'profile', 'social', 'status', 'isVerified'];
  const updateObj = {};
  for (const key of allowed) {
    if (key in update) updateObj[key] = update[key];
  }
  if (update.passwordHash) updateObj.passwordHash = update.passwordHash;

  return User.findByIdAndUpdate(id, { $set: updateObj }, { new: true });
};

// Delete a user (admin action)
exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

// Ban a user (set status.isBanned = true)
exports.banUser = async (id) => {
  return User.findByIdAndUpdate(id, { 'status.isBanned': true }, { new: true });
};

// Timeout a user (set a timeoutUntil field)
exports.timeoutUser = async (id, timeoutUntil) => {
  return User.findByIdAndUpdate(id, { timeoutUntil }, { new: true });
};

// Suspend a user (set status.isActive = false)
exports.suspendUser = async (id) => {
  return User.findByIdAndUpdate(id, { 'status.isActive': false }, { new: true });
};

// Assign a role to a user
exports.assignRoleToUser = async (userId, roleName) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  const role = await Role.findOne({ name: roleName });
  if (!role) throw new Error('Role not found');
  if (user.roles.includes(roleName)) throw new Error('User already has this role');
  user.roles.push(roleName);
  await user.save();
  return user;
};

// Remove a role from a user
exports.removeRoleFromUser = async (userId, roleName) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (!user.roles.includes(roleName)) throw new Error('User does not have this role');
  user.roles = user.roles.filter(r => r !== roleName);
  await user.save();
  return user;
};

// Assign a permission to a user (direct assignment)
exports.assignPermissionToUser = async (userId, permissionName) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  const perm = await Permission.findOne({ name: permissionName });
  if (!perm) throw new Error('Permission not found');
  if (!user.permissions) user.permissions = [];
  if (user.permissions.includes(permissionName)) throw new Error('User already has this permission');
  user.permissions.push(permissionName);
  await user.save();
  return user;
};

// Remove a permission from a user (direct assignment)
exports.removePermissionFromUser = async (userId, permissionName) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (!user.permissions || !user.permissions.includes(permissionName)) throw new Error('User does not have this permission');
  user.permissions = user.permissions.filter(p => p !== permissionName);
  await user.save();
  return user;
};
