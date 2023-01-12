const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');
const { JWT_DEV_KEY } = require('../utils/serverConfig');

const {
  EMAIL_EXIST, WRONG_USER_CREATE_DATA, WRONG_USER_UPDATE_DATA, USER_NOT_FOUND, AUTH_ERROR,
} = require('../utils/errorMessages');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPass) => {
      User.create({
        name,
        email,
        password: hashedPass,
      })
        .then((user) => {
          res
            .status(201)
            .send({
              name: user.name,
              email: user.email,
              _id: user._id,
            });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(WRONG_USER_CREATE_DATA));
          } else if (err.code === 11000) {
            next(new ConflictError(EMAIL_EXIST));
          } else next(err);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_USER_UPDATE_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_EXIST));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 7 * 24,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
        .send({ token });
    })
    .catch(() => {
      next(new AuthError(AUTH_ERROR));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  createUser,
  updateUser,
  login,
  logout,
  getCurrentUser,
};
