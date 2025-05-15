const User = require('../../db/models/user/userModel');

async function blockIfNoAdmin(req, res, next) {
    // Allow /v1/auth/init-admin and all /v1/docs endpoints if no admin exists
    const isInitAdmin = req.path === '/v1/auth/init-admin' && req.method === 'POST';
    const isSwagger = req.path.startsWith('/v1/docs');
    const adminExists = await User.exists({ roles: 'SYSTEM_ADMINISTRATOR' });

    if (!adminExists) {
        if (isInitAdmin || isSwagger) return next();
        return res.status(503).json({ message: 'Admin account not initialized. Please create an admin via /auth/init-admin.' });
    }
    next();
}

module.exports = blockIfNoAdmin;
