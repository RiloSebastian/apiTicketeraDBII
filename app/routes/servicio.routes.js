module.exports = function(app) {
 
    const servicio = require('../controllers/servicio.controller.js');
 
    // Create a new servicio
    app.post('/api/servicio', servicio.create);
 
    // Retrieve all servicio
    app.get('/api/servicio', servicio.findAll);
 
    // Retrieve a single servicio by Id
    app.get('/api/servicio/:servicioId', servicio.findOne);

    // Retrieve all servicio with the same id_cliente
    app.get('/api/servicio-cliente', servicio.obtenerPorIdUsuario);
 
    // Update a servicio with Id
    app.put('/api/servicio/:servicioId', servicio.update);
 
    // Delete a servicio with Id
    app.delete('/api/servicio/:servicioId', servicio.delete);
}