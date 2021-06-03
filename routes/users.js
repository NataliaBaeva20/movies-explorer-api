const express = require('express');

const { userInfoValidavor } = require('../middlewares/validation');

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', userInfoValidavor, updateUser);

module.exports = userRoutes;
