const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  cor: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Carro', carroSchema);
