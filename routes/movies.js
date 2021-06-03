const express = require('express');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/:id', deleteMovie);

module.exports = movieRoutes;
