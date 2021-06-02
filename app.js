const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

// подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60b7fa473224d92758d4d449' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());

app.use('/users', require('./routes/users'));

app.listen(PORT);