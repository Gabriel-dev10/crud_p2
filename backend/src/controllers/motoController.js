const Moto = require('../models/nosql/Moto');

exports.create = async (req, res) => {
  try {
    const moto = await Moto.create(req.body);
    res.status(201).json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const motos = await Moto.find();
    res.json(motos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json(moto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const moto = await Moto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json(moto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const moto = await Moto.findByIdAndDelete(req.params.id);
    if (!moto) return res.status(404).json({ error: 'Moto não encontrada' });
    res.json({ message: 'Moto removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
