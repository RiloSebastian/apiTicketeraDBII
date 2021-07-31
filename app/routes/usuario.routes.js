module.exports = function(app) {
 
    const usuario = require('../controllers/usuario.controller.js');
 
    // Create a new usuario
    app.post('/api/usuario', usuario.create);
 
    // Retrieve all usuario
    app.get('/api/usuario', usuario.findAll);
 
    // Retrieve a single usuario by Id
    app.get('/api/usuario/:usuarioId', usuario.findOne);
 
    // Update a usuario with Id
    app.put('/api/usuario/:usuarioId', usuario.update);
 
    // Delete a usuario with Id
    app.delete('/api/usuario/:usuarioId', usuario.delete);
}