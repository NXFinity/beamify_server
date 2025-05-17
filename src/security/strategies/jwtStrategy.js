const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../../db/models/user/userModel');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        console.log('[JWT] Token payload:', jwt_payload);
        const user = await User.findById(jwt_payload.id);
        if (user) {
          if (user.status && user.status.isBanned) {
            console.log(`[JWT] User ${user.username || user._id} is banned. Blocking access.`);
            // User is banned, block access
            return done(null, false);
          }
          console.log(`[JWT] Authenticated user: ${user.username || user._id}`);
          return done(null, user);
        } else {
          console.log(`[JWT] No user found for id: ${jwt_payload.id}`);
          return done(null, false);
        }
      } catch (err) {
        console.log('[JWT] Error during authentication:', err.message);
        return done(err, false);
      }
    })
  );
};
