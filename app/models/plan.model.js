const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema({
  nombre: String,
  cantidad_canales: Number,
  precio_mensual: Number,
  fecha_emision: Number,
  fecha_expiracion: Number,
});

module.exports = mongoose.model("plan", PlanSchema, 'planes');
