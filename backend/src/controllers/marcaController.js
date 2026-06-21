const MarcaRoupa = require('../models/nosql/MarcaRoupa');

exports.create = async (req, res) => {
  try {
    const marca = await MarcaRoupa.create(req.body);
    res.status(201).json(marca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const marcas = await MarcaRoupa.find();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const marca = await MarcaRoupa.findById(req.params.id);
    if (!marca) return res.status(404).json({ error: 'Marca não encontrada' });
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const marca = await MarcaRoupa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!marca) return res.status(404).json({ error: 'Marca não encontrada' });
    res.json(marca);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const marca = await MarcaRoupa.findByIdAndDelete(req.params.id);
    if (!marca) return res.status(404).json({ error: 'Marca não encontrada' });
    res.json({ message: 'Marca removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
