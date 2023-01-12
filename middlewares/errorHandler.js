const { INTERNAL_ERROR } = require('../utils/errorMessages');

const errorHandler = (err, req, res, next) => {
  const e = err;
  if (!e.statusCode) {
    e.statusCode = 500;
    e.message = INTERNAL_ERROR;
  }
  res.status(e.statusCode).send({ message: e.message });
  next();
};

module.exports = errorHandler;
