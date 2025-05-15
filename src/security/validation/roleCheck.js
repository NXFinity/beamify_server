// roleCheck.js
// Middleware to check if the authenticated user has a required role

module.exports = function roleCheck(requiredRole) {
  return (req, res, next) => {
    if (!req.user || !Array.isArray(req.user.roles) || !req.user.roles.includes(requiredRole)) {
      return res.status(403).json({ message: `Forbidden: Requires role ${requiredRole}` });
    }
    next();
  };
};
