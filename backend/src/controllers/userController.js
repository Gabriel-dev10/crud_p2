const User = require('../models/sql/User');

const serializeUser = (user) => ({
  id: user.id,
  name: user.nome,
  nome: user.nome,
  email: user.email,
  role: 'user'
});

exports.create = async (req, res) => {
  try {
    const nome = req.body.nome || req.body.name;
    const senha = req.body.senha || req.body.password;
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = await User.create({ nome, email, senha });
    res.status(201).json(serializeUser(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['senha'] },
      order: [['id', 'ASC']]
    });
    res.json(users.map(serializeUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
    });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(serializeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const updates = {};
    if (req.body.nome || req.body.name) updates.nome = req.body.nome || req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.senha || req.body.password) updates.senha = req.body.senha || req.body.password;

    await user.update(updates);
    res.json(serializeUser(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.destroy();
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
