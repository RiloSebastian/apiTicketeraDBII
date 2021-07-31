const mongoose = require('mongoose');

const CanalSchema = mongoose.Schema({
    nombre: String,
    numeracion: Number,
    categoria: String,	
    descripcion: String
});

module.exports = mongoose.model('canal', CanalSchema, 'canales');