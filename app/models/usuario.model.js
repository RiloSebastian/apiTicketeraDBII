const mongoose = require("mongoose");
const Servicio = require('./servicio.model.js');

const UsuarioSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
  fecha_nacimiento: Number,
  fecha_registro: Number,
  tipo: String,
  ubicacion: {},
  servicios: [Servicio.schema],
  area: mongoose.ObjectId,
});

module.exports = mongoose.model("usuario", UsuarioSchema,"usuarios");
