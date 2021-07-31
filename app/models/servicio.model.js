const mongoose = require('mongoose');
const Localidad = require('./localidad.model.js');
const Plan = require('./plan.model.js');
const Canal = require('./canal.model.js');
const Ticket = require('./ticket.model.js');

const ServicioSchema = mongoose.Schema({
    id_cliente: mongoose.ObjectId,
	localidad: Localidad.schema,
	plan: Plan.schema,
	plan_canales: [Canal.schema],
	tickets: [Ticket.schema],
	fecha_alta:Number,
	fecha_baja: Number,
	estado: Boolean
});

module.exports = mongoose.model('servicio', ServicioSchema, 'servicios');