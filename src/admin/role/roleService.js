const Role = require('../../db/models/admin/roleModel');
const Permission = require('../../db/models/admin/permissionModel');
const fs = require('fs');
const path = require('path');
const { seedPermissions } = require('./permissionService');

async function seedRoles() {
  // Seed Permissions first
  await seedPermissions();
  const filePath = path.join(__dirname, 'assets', 'roles.json');
  const roles = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const role of roles) {
    const exists = await Role.findOne({ name: role.name });
    if (!exists) {
      await Role.create(role);
    }
  }
}

// --- Robust CRUD ---
async function createRole(data) {
  if (!data.name) throw new Error('Role name is required');
  const exists = await Role.findOne({ name: data.name });
  if (exists) throw new Error('Role name must be unique');
  // Validate Permissions
  let permissions = [];
  if (data.permissions && Array.isArray(data.permissions)) {
    for (const permName of data.permissions) {
      const perm = await Permission.findOne({ name: permName });
      if (!perm) throw new Error(`Permission not found: ${permName}`);
      permissions.push(perm.name);
    }
  }
  return Role.create({
    name: data.name.toUpperCase(),
    description: data.description || '',
    permissions
  });
}

async function getRoles() {
  return Role.find();
}

async function getRoleById(id) {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');
  return role;
}

async function updateRole(id, data) {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');
  if (data.name && data.name !== role.name) {
    const exists = await Role.findOne({ name: data.name });
    if (exists) throw new Error('Role name must be unique');
    role.name = data.name.toUpperCase();
  }
  if (data.description !== undefined) role.description = data.description;
  if (data.permissions && Array.isArray(data.permissions)) {
    let permissions = [];
    for (const permName of data.permissions) {
      const perm = await Permission.findOne({ name: permName });
      if (!perm) throw new Error(`Permission not found: ${permName}`);
      permissions.push(perm.name);
    }
    role.permissions = permissions;
  }
  await role.save();
  return role;
}

async function deleteRole(id) {
  const role = await Role.findById(id);
  if (!role) throw new Error('Role not found');
  await role.deleteOne();
  return true;
}

module.exports = {
  seedRoles,
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
};
