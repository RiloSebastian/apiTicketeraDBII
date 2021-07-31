const mongoose = require("mongoose");
const Usuario = require('../models/usuario.model');
//const connection = mongoose.connection;

exports.traerUsuario = (req, res) => {
  /*usuarioLogueadoInfo().then((usuario) => {
    if (usuario != null) {
      res.json(usuario);
    } else {
      res.json({ status: "error", rta: "no hay un usuario logueado" });
    }
  });*/
};

exports.login = (req, res) => {
  let dataU = req.body;
  mongoose.connection.db.collection('auths').findOne({ username: dataU.username, password: dataU.password}).then(data =>{
    Usuario.findById(data.id_usuario).then(doc => {
      res.json(doc);
    });
  }).catch(err =>{
    res.json(err);
  })
  /*connection.db.admin().command()
  usuarioLogueadoInfo().then((usuario) => {
    if (usuario == null) {
      connection.db.command({
        authenticate: 1,
        user: data.user,
        pwd: data.pass,
        authMechanism: "DEFAULT"
      }).then(respuesta =>{
          res.json(respuesta);
      });
    } else {
      res.json({
        status: "error",
        rta: "ya existe un usuario conectado: (" + usuario.user + ")",
      });
    }
  });*/

};

exports.logout = (req, res) => {
  /*let rta = connection.db.command({ logout: 1 });
  res.json(rta);*/
};

/*async function usuarioLogueadoInfo() {
  let usuarioConnectado = await connection.db.command({ connectionStatus: 1 });
  console.log(usuarioConnectado.authInfo.authenticatedUsers.length);
  if (usuarioConnectado.authInfo.authenticatedUsers.length != 0) {
    return usuarioConnectado.authInfo.authenticatedUsers[0];
  } else {
    return null;
  }
}*/
