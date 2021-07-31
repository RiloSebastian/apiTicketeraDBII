const mongoose = require('mongoose');
const Localidad = require('../models/localidad.model.js');
const Usuario = require('../models/usuario.model.js');
const Ticket = require('../models/ticket.model.js');


const AreaSchema = mongoose.Schema({
    nombre: String,
    tipo: String,
	localidad: Localidad.schema,
    personal: [Usuario.schema],
    tickets: [Ticket.schema]
});

module.exports = mongoose.model('area', AreaSchema, 'areas');