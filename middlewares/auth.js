const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { AUTH_REQUIRED } = require('../utils/errorMessages');
const { JWT_DEV_KEY } = require('../utils/serverConfig');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_KEY);
  } catch (err) {
    next(new AuthError(AUTH_REQUIRED));
  }
  req.user = payload;
  next();
};

module.exports = auth;
