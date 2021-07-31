const mongoose = require('mongoose');
const Historial = require('./historial.model.js');
const Solucion = require('./solucion.model.js');
const Usuario = require('./usuario.model');


const TicketSchema = mongoose.Schema({
	id_cliente: mongoose.ObjectId,
	id_servicio: mongoose.ObjectId,
	id_area: mongoose.ObjectId,
	id_encargadosAnteriores: [ mongoose.ObjectId ],
	id_encargado: mongoose.ObjectId,
	historial: Historial.schema,
	soluciones: [ Solucion.schema ],
	data: { tipo: String, descripcion: String, estado: String },
	fecha_creacion: Number,
	fecha_modificacion: Number
});

module.exports = mongoose.model('ticket', TicketSchema, 'tickets');