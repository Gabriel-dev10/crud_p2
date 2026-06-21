const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  cilindrada: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Moto', motoSchema);
