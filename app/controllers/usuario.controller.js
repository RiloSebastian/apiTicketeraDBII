const Usuario = require('../models/usuario.model.js');


// POST a Usuario
exports.create = (req, res) => {
    // Create a Usuario
    const usuario = new Usuario(req.body);

    // Save a Usuario in the MongoDB
    usuario.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Usuarios
exports.findAll = (req, res) => {
    Usuario.find()
    .then(usuarios => {
        res.json(usuarios);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Usuario
exports.findOne = (req, res) => {
    Usuario.findById(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });            
        }
        res.json(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Usuario with id " + req.params.usuarioId
        });
    });
};

// UPDATE a Usuario
exports.update = (req, res) => {
    // Find usuario and update it
    Usuario.findByIdAndUpdate(req.params.usuarioId, req.body, {new: true})
    .then(usuario => {
        if(!usuario) {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });
        }
        res.json(usuario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });                
        }
        return res.status(500).json({
            msg: "Error updating usuario with id " + req.params.usuarioId
        });
    });
};

// DELETE a Usuario
exports.delete = (req, res) => {
    Usuario.findByIdAndRemove(req.params.usuarioId)
    .then(usuario => {
        if(!usuario) {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });
        }
        res.json({msg: "Usuario deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Usuario not found with id " + req.params.usuarioId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete usuario with id " + req.params.usuarioId
        });
    });
};