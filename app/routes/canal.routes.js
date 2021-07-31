module.exports = function(app) {
 
    const canal = require('../controllers/canal.controller.js');
 
    // Create a new canal
    app.post('/api/canal', canal.create);
 
    // Retrieve all canal
    app.get('/api/canal', canal.findAll);
 
    // Retrieve a single canal by Id
    app.get('/api/canal/:canalId', canal.findOne);
 
    // Update a canal with Id
    app.put('/api/canal/:canalId', canal.update);
 
    // Delete a canal with Id
    app.delete('/api/canal/:canalId', canal.delete);
}