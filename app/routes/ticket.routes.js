module.exports = function(app) {
 
    const ticket = require('../controllers/ticket.controller.js');
 
    // Create a new ticket
    app.post('/api/generar-ticket', ticket.guardarTicket);

    app.post('/api/harcodear-ticket', ticket.harcodearTicket);

     // Create a new ticket
    app.post('/api/ticket', ticket.create);
 
    // Retrieve all ticket
    app.get('/api/ticket', ticket.findAll);
 
    // Retrieve a single ticket by Id
    app.get('/api/ticket/:ticketId', ticket.findOne);
 
    // Update a ticket with Id
    app.put('/api/ticket/:ticketId', ticket.update);
 
    // Delete a ticket with Id
    app.delete('/api/ticket/:ticketId', ticket.delete);
}