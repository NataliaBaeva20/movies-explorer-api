const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(err);
        res.send({message: 'Переданы некорректные данные'});
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        // throw new NotFoundError('Запрашиваемый пользователь не найден');
        res.send({message: 'Запрашиваемый пользователь не найден'})
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new InvalidRequestError('Переданы некорректные данные'));
        res.send({message: 'Переданы некорректные данные'});
      }
      // else if (err.name === 'Error') {
      //   next(err);
      // }
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        // throw new NotFoundError('Запрашиваемый пользователь не найден');
        res.send({message: 'Запрашиваемый пользователь не найден'})
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // next(new InvalidRequestError('Переданы некорректные данные'));
        res.send({message: 'Переданы некорректные данные'});
      }
      // else if (err.name === 'Error') {
      //   next(err);
      // }
    });
};

module.exports.updateUser = (req, res) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он будет создан
  })
    .orFail(new Error('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ data: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.message === 'NotFoundId') {
        res.status(404).send({ message: 'Пользователя нет в базе данных' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

