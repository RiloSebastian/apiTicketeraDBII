module.exports = function(app) {
    const informe = require('../controllers/informe.controller.js');

    app.get('/api/informe/clienteMasTickets', informe.clienteMasTickets);

    app.get("/api/informe/clientesTicketsSinResolver", informe.clientesTicketsSinResolver);

    app.get('/api/informe/masClientesPorZona', informe.masClientesPorZona);

    app.get('/api/informe/clientesEmpleadosConTickets', informe.clientesEmpleadosConTickets);

    app.get('/api/informe/atencionPorZona', informe.atencionPorZona);

    app.get('/api/informe/desperfectoPorZona', informe.desperfectoPorZona);

    app.get('/api/informe/personalMasTrabaja', informe.personalMasTrabaja);

    app.get('/api/informe/horarioMasTrabajo', informe.horarioMasTrabajo);

    app.get('/api/informe/personalTicketsSinResolver', informe.personalTicketsSinResolver);

    app.get('/api/informe/desperfectoPorFecha', informe.desperfectoPorFecha);

    app.get('/api/informe/desperfectoRecurrencia', informe.desperfectoRecurrencia);

    app.post('/api/informe/cincoUsuariosMasCercanos', informe.cincoUsuariosMasCercanosAUsuarioActual);
}