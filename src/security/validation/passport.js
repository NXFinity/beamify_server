const passport = require('passport');
require('../strategies/jwtStrategy')(passport);

module.exports = passport;
