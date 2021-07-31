const mongoose = require('mongoose');

const LocalidadSchema = mongoose.Schema({
    codigo_postal: Number,
    ubicacion: {},
    descripcion: String
});

module.exports = mongoose.model('localidad', LocalidadSchema, 'localidades');