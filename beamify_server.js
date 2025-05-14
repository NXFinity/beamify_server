var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src//index');
var usersRouter = require('./src/api/user/userRoute');

var beamify_server = express();

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

// catch 404 and forward to error handler
beamify_server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
beamify_server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = beamify_server;
