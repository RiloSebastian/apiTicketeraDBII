const Solucion = require('../models/solucion.model.js');


// POST a Solucion
exports.create = (req, res) => {
    // Create a Solucion
    const solucion = new Solucion(req.body);

    // Save a Solucion in the MongoDB
    solucion.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Solucions
exports.findAll = (req, res) => {
    Solucion.find()
    .then(solucions => {
        res.json(solucions);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Solucion
exports.findOne = (req, res) => {
    Solucion.findById(req.params.solucionId)
    .then(solucion => {
        if(!solucion) {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });            
        }
        res.json(solucion);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Solucion with id " + req.params.solucionId
        });
    });
};

// UPDATE a Solucion
exports.update = (req, res) => {
    // Find solucion and update it
    Solucion.findByIdAndUpdate(req.params.solucionId, req.body, {new: true})
    .then(solucion => {
        if(!solucion) {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });
        }
        res.json(solucion);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });                
        }
        return res.status(500).json({
            msg: "Error updating solucion with id " + req.params.solucionId
        });
    });
};

// DELETE a Solucion
exports.delete = (req, res) => {
    Solucion.findByIdAndRemove(req.params.solucionId)
    .then(solucion => {
        if(!solucion) {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });
        }
        res.json({msg: "Solucion deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Solucion not found with id " + req.params.solucionId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete solucion with id " + req.params.solucionId
        });
    });
};