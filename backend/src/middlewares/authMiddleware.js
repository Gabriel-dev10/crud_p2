const jwt = require('jsonwebtoken');
const User = require('../models/sql/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['senha'] }
      });

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Não autorizado, sem token' });
  }
};

module.exports = { protect };
