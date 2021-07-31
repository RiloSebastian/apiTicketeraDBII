module.exports = function(app) {
 
    const solucion = require('../controllers/solucion.controller.js');
 
    // Create a new histoial
    app.post('/api/solucion', solucion.create);
 
    // Retrieve all histoial
    app.get('/api/solucion', solucion.findAll);
 
    // Retrieve a single histoial by Id
    app.get('/api/solucion/:solucionId', solucion.findOne);
 
    // Update a histoial with Id
    app.put('/api/solucion/:solucionId', solucion.update);
 
    // Delete a histoial with Id
    app.delete('/api/solucion/:solucionId', solucion.delete);
}