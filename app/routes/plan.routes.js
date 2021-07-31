module.exports = function(app) {
 
    const plan = require('../controllers/plan.controller.js');
 
    // Create a new plan
    app.post('/api/plan', plan.create);
 
    // Retrieve all plan
    app.get('/api/plan', plan.findAll);
 
    // Retrieve a single plan by Id
    app.get('/api/plan/:planId', plan.findOne);
 
    // Update a plan with Id
    app.put('/api/plan/:planId', plan.update);
 
    // Delete a plan with Id
    app.delete('/api/plan/:planId', plan.delete);
}