const Carro = require('../models/nosql/Carro');

exports.create = async (req, res) => {
  try {
    const carro = await Carro.create(req.body);
    res.status(201).json(carro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const carros = await Carro.find();
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const carro = await Carro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(carro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const carro = await Carro.findByIdAndDelete(req.params.id);
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json({ message: 'Carro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
