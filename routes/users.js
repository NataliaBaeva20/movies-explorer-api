const express = require('express');

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', updateUser);

module.exports = userRoutes;
