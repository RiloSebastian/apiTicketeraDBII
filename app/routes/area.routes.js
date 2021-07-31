module.exports = function(app) {
 
    const area = require('../controllers/area.controller.js');
 
    // Create a new area
    app.post('/api/area', area.create);
 
    // Retrieve all area
    app.get('/api/area', area.findAll);
 
    // Retrieve a single area by Id
    app.get('/api/area/:areaId', area.findOne);
 
    // Update a area with Id
    app.put('/api/area/:areaId', area.update);
 
    // Delete a area with Id
    app.delete('/api/area/:areaId', area.delete);
}