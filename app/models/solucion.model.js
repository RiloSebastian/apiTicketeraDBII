const mongoose = require('mongoose');

const SolucionSchema = mongoose.Schema({
    id_usuarioGenerador: mongoose.ObjectId,
	id_ticket: mongoose.ObjectId,
	descripcion: String,
	estado: String,
	fecha_emision: Number,
	fecha_modificacion: Number
});

module.exports = mongoose.model('solucion_ticket', SolucionSchema, 'solucion_tickets');