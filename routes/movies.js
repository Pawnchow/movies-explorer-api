const moviesRouter = require('express').Router();
const {
  movieIdValid,
  createMovieValid,
} = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValid, createMovie);
moviesRouter.delete('/:movieId', movieIdValid, deleteMovie);

module.exports = moviesRouter;
