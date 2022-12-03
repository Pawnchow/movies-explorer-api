const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_ERROR } = require('./errorMessages');

const rateLimiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: RATE_LIMIT_ERROR,
});

module.exports = rateLimiter;
