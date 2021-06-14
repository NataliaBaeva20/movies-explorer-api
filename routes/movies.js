const express = require('express');

const { idValidator, movieValidator } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', movieValidator, createMovie);
movieRoutes.delete('/:_id', idValidator, deleteMovie);

module.exports = movieRoutes;
