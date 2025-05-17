module.exports = function banCheck(req, res, next) {
  if (req.user && req.user.status && req.user.status.isBanned) {
    console.log(`[BANCHECK] User ${req.user.username || req.user._id} is banned. Blocking access.`);
    return res.status(403).json({ message: "Your account is banned." });
  }
  if (req.user) {
    console.log(`[BANCHECK] User ${req.user.username || req.user._id} passed ban check.`);
  }
  next();
};
