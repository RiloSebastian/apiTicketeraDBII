module.exports = function(app) {

    const usuario = require('../controllers/usuario.controller.js');
    const auth = require('../controllers/auth.controller.js');

    app.get('/api/auth/user', auth.traerUsuario);
 
    app.post('/api/auth/login', auth.login);

    app.get('/api/auth/logout', auth.logout);
}