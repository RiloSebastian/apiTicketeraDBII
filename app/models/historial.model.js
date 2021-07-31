const mongoose = require('mongoose');

const HistorialSchema = mongoose.Schema({
    id_ticket: mongoose.ObjectId,
	historial: [{id_usuarioGenerador: mongoose.ObjectId, descripcion: String, fecha_emision: Number}]
});

module.exports = mongoose.model('historial_ticket', HistorialSchema, 'historial_tickets');