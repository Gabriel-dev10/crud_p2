const mongoose = require('mongoose');

const marcaRoupaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  fundador: {
    type: String,
  },
  anoFundacao: {
    type: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('MarcaRoupa', marcaRoupaSchema);
