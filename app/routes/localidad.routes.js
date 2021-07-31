module.exports = function(app) {
 
    const localidad = require('../controllers/localidad.controller.js');
 
    // Create a new localidad
    app.post('/api/localidad', localidad.create);
 
    // Retrieve all localidad
    app.get('/api/localidad', localidad.findAll);
 
    // Retrieve a single localidad by Id
    app.get('/api/localidad/:localidadId', localidad.findOne);
 
    // Update a localidad with Id
    app.put('/api/localidad/:localidadId', localidad.update);
 
    // Delete a localidad with Id
    app.delete('/api/localidad/:localidadId', localidad.delete);
}