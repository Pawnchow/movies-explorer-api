const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const {
  signInValid,
  signUpValid,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/errorMessages');

router.post('/signin', signInValid, login);
router.post('/signup', signUpValid, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
