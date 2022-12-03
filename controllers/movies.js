const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  WRONG_MOVIE_CREATE_DATA, MOVIE_NOT_FOUND, MOVIE_DELETE_FORBIDDEN, WRONG_MOVIE_DELETE_DATA,
} = require('../utils/errorMessages');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_MOVIE_CREATE_DATA));
      } else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError(MOVIE_NOT_FOUND))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        next(new ForbiddenError(MOVIE_DELETE_FORBIDDEN));
      } else {
        movie.remove()
          .then(() => res.send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(WRONG_MOVIE_DELETE_DATA));
      } else next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
