const Localidad = require('../models/localidad.model.js');


// POST a Localidad
exports.create = (req, res) => {
    // Create a Localidad
    const localidad = new Localidad(req.body);

    // Save a Localidad in the MongoDB
    localidad.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Localidads
exports.findAll = (req, res) => {
    Localidad.find()
    .then(localidads => {
        res.json(localidads);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Localidad
exports.findOne = (req, res) => {
    Localidad.findById(req.params.localidadId)
    .then(localidad => {
        if(!localidad) {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });            
        }
        res.json(localidad);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Localidad with id " + req.params.localidadId
        });
    });
};

// UPDATE a Localidad
exports.update = (req, res) => {
    // Find localidad and update it
    Localidad.findByIdAndUpdate(req.params.localidadId, req.body, {new: true})
    .then(localidad => {
        if(!localidad) {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });
        }
        res.json(localidad);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });                
        }
        return res.status(500).json({
            msg: "Error updating localidad with id " + req.params.localidadId
        });
    });
};

// DELETE a Localidad
exports.delete = (req, res) => {
    Localidad.findByIdAndRemove(req.params.localidadId)
    .then(localidad => {
        if(!localidad) {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });
        }
        res.json({msg: "Localidad deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Localidad not found with id " + req.params.localidadId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete localidad with id " + req.params.localidadId
        });
    });
};