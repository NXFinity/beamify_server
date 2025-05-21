const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { seedRoles } = require('./src/admin/role/roleService');
const adminBlock = require('./src/security/validation/adminBlock');
const cors = require("cors");
const corsConfig = require('./src/utils/cors.config.json');

// Connect to the database
require('./src/db/database');

const indexRouter = require('./src/index');
const usersRouter = require('./src/api/user/userRoute');
const authRouter = require('./src/security/authRoute');
const setupSwagger = require("./src/swagger/swagger");
const adminRouter = require('./src/admin/adminRoute');
const gamifyRouter = require('./src/api/gamify/gamifyRoute');
const productsRouter = require('./src/api/store/products/productRoute');

const beamify_server = express();

// Apply CORS globally before any other middleware
beamify_server.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (corsConfig.allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Custom middleware to skip adminBlock for /v1/auth/init-admin
beamify_server.use((req, res, next) => {
  if (req.path === '/v1/auth/init-admin') {
    return next();
  }
  adminBlock(req, res, next);
});

// view engine setup
beamify_server.set('views', path.join(__dirname, 'views'));
beamify_server.set('view engine', 'ejs');

beamify_server.use(logger('dev'));
beamify_server.use(express.json());
beamify_server.use(express.urlencoded({ extended: false }));
beamify_server.use(cookieParser());
beamify_server.use(express.static(path.join(__dirname, 'public')));

// Add global prefix for all endpoints
beamify_server.use('/v1', indexRouter);
beamify_server.use('/v1/users', usersRouter);
beamify_server.use('/v1/auth', authRouter);
beamify_server.use('/v1/admin', adminRouter);
beamify_server.use('/v1/gamify', gamifyRouter);
beamify_server.use('/v1/products', productsRouter);

// Swagger docs (after all routes)
setupSwagger(beamify_server);

// catch 404 and forward to error handler
beamify_server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
beamify_server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

(async () => {
  try {
    await seedRoles();
    console.log('Roles and Permissions seeded.');
  } catch (err) {
    console.error('Error seeding roles/Permissions:', err);
  }
})();

module.exports = beamify_server;
