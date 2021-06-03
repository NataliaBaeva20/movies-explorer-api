const jwt = require('jsonwebtoken');
const InvalidAuthError = require('../errors/invalid-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidAuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new InvalidAuthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
