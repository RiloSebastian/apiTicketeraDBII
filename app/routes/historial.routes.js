module.exports = function(app) {
 
    const historial = require('../controllers/historial.controller.js');
 
    // Create a new histoial
    app.post('/api/historial', historial.create);
 
    // Retrieve all histoial
    app.get('/api/historial', historial.findAll);
 
    // Retrieve a single histoial by Id
    app.get('/api/historial/:historialId', historial.findOne);
 
    // Update a histoial with Id
    app.put('/api/historial/:historialId', historial.update);
 
    // Delete a histoial with Id
    app.delete('/api/historial/:historialId', historial.delete);
}