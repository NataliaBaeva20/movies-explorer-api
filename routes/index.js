const express = require('express');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signupValidavor, loginValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');

const router = express.Router();

router.post('/signup', signupValidavor, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = router;
