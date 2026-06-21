const User = require('../models/sql/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    user = await User.create({ nome, email, senha });

    res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, senha } = req.body;
    const passwordToCheck = password || senha;
    
    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(passwordToCheck))) {
      res.json({
        token: generateToken(user.id),
        user: {
          id: user.id,
          name: user.nome,
          nome: user.nome,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: 'Email ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
  }
};
