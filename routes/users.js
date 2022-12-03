const usersRouter = require('express').Router();
const { updateUserValid } = require('../middlewares/validation');
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserValid, updateUser);

module.exports = usersRouter;
