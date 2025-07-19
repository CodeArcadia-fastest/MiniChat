const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret';

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Нет токена' });
  try {
    const { username } = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = { username };
    next();
  } catch {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

const getUserFromToken = async (token) => {
  try {
    const { username } = jwt.verify(token, JWT_SECRET);
    return { username };
  } catch {
    return null;
  }
};

module.exports = { authMiddleware, getUserFromToken };