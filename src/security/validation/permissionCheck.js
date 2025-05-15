const User = require('../../db/models/user/userModel');
const Role = require('../../db/models/admin/roleModel');

module.exports = function permissionCheck(requiredPermission) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    // Check direct user Permissions
    if (req.user.permissions && req.user.permissions.includes(requiredPermission)) {
      return next();
    }
    // Check Permissions via roles
    if (req.user.roles && req.user.roles.length > 0) {
      const roles = await Role.find({ name: { $in: req.user.roles } });
      for (const role of roles) {
        if (role.permissions && role.permissions.includes(requiredPermission)) {
          return next();
        }
      }
    }
    return res.status(403).json({ message: `Forbidden: Requires permission ${requiredPermission}` });
  };
};
