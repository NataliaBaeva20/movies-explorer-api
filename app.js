const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { signupValidavor, loginValidator } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use('/signup', signupValidavor, createUser);
app.use('/signin', loginValidator, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT);
