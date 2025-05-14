const User = require('../../db/models/user/userModel');

async function blockIfNoAdmin(req, res, next) {
    // Allow only /v1/auth/init-admin endpoint
    if (req.path === '/v1/auth/init-admin' && req.method === 'POST') return next();

    const userCount = await User.countDocuments();
    if (userCount === 0) {
        return res.status(503).json({ message: 'Admin account not initialized. Please create an admin via /auth/init-admin.' });
    }
    next();
}

module.exports = blockIfNoAdmin;
