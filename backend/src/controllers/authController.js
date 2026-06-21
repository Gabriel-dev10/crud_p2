const User = require('../models/sql/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

const serializeUser = (user) => ({
  id: user.id,
  name: user.nome,
  nome: user.nome,
  email: user.email
});

exports.register = async (req, res) => {
  try {
    const nome = req.body.nome || req.body.name;
    const senha = req.body.senha || req.body.password;
    const { email } = req.body;
    
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    user = await User.create({ nome, email, senha });
    const serializedUser = serializeUser(user);

    res.status(201).json({
      ...serializedUser,
      user: serializedUser,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro no registro' });
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
        user: serializeUser(user)
      });
    } else {
      res.status(401).json({ message: 'Email ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
  }
};
