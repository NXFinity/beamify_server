// roleCheck.js
// Middleware to check if the authenticated user has a required role

module.exports = function roleCheck(requiredRole) {
  return (req, res, next) => {
    if (!req.user || !Array.isArray(req.user.roles) || !req.user.roles.includes(requiredRole)) {
      console.log(`[ROLECHECK] User failed role check for ${requiredRole}. User:`, req.user ? req.user.username || req.user._id : 'none', 'Roles:', req.user ? req.user.roles : 'none');
      return res.status(403).json({ message: `Forbidden: Requires role ${requiredRole}` });
    }
    console.log(`[ROLECHECK] User ${req.user.username || req.user._id} passed role check for ${requiredRole}`);
    next();
  };
};
