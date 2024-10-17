const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  id_carrito: {
    type: Number,
    required: true
  },
  posicion: {
    type: String,
    required: true
  },
  trayectoria: {
    type: String,
    required: true
  },
  interseccion: {
    type: Number,
    required: true
  },
  peatones: {
    type: Number,
    required: true
  },
  vehiculos: {
    type: Number,
    required: true
  },
  paradas: {
    type: Number,
    required: true
  },
  duracion_paradas: {
    type: mongoose.Decimal128, // Mongoose soporta Decimal128 para precisión en decimales
    required: true
  }
});

const Carrito = mongoose.model('Carrito', carritoSchema, 'infoCarritos');

module.exports = Carrito;
