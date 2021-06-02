const express = require('express');

const {
  getUsers, getUserById, getCurrentUser, updateUser
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', updateUser);

module.exports = userRoutes;
