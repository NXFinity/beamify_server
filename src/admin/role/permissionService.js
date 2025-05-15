const Permission = require('../../db/models/admin/permissionModel');
const fs = require('fs');
const path = require('path');

async function seedPermissions() {
  const filePath = path.join(__dirname, 'assets', 'Permissions.json');
  const permissions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const perm of permissions) {
    const exists = await Permission.findOne({ name: perm.name });
    if (!exists) {
      await Permission.create(perm);
    }
  }
}

// --- Robust CRUD ---
async function createPermission(data) {
  if (!data.name || !data.resource || !data.action) {
    throw new Error('Permission name, resource, and action are required');
  }
  const exists = await Permission.findOne({ name: data.name });
  if (exists) throw new Error('Permission name must be unique');
  return Permission.create({
    name: data.name.toUpperCase(),
    description: data.description || '',
    resource: data.resource,
    action: data.action
  });
}

async function getPermissions() {
  return Permission.find();
}

async function getPermissionById(id) {
  const perm = await Permission.findById(id);
  if (!perm) throw new Error('Permission not found');
  return perm;
}

async function updatePermission(id, data) {
  const perm = await Permission.findById(id);
  if (!perm) throw new Error('Permission not found');
  if (data.name && data.name !== perm.name) {
    const exists = await Permission.findOne({ name: data.name });
    if (exists) throw new Error('Permission name must be unique');
    perm.name = data.name.toUpperCase();
  }
  if (data.description !== undefined) perm.description = data.description;
  if (data.resource !== undefined) perm.resource = data.resource;
  if (data.action !== undefined) perm.action = data.action;
  await perm.save();
  return perm;
}

async function deletePermission(id) {
  const perm = await Permission.findById(id);
  if (!perm) throw new Error('Permission not found');
  await perm.deleteOne();
  return true;
}

module.exports = {
  seedPermissions,
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
};
