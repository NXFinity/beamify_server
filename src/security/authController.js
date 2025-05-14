const authService = require('./authService');

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const result = await authService.verify(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.forgot = async (req, res, next) => {
  try {
    const result = await authService.forgot(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.reset = async (req, res, next) => {
  try {
    const result = await authService.reset(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.resend = async (req, res, next) => {
  try {
    const result = await authService.resend(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
