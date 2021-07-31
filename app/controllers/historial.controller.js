const Historial = require('../models/historial.model.js');


// POST a Historial
exports.create = (req, res) => {
    // Create a Historial
    const historial = new Historial(req.body);

    // Save a Historial in the MongoDB
    historial.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Historials
exports.findAll = (req, res) => {
    Historial.find()
    .then(historials => {
        res.json(historials);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Historial
exports.findOne = (req, res) => {
    Historial.findById(req.params.historialId)
    .then(historial => {
        if(!historial) {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });            
        }
        res.json(historial);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Historial with id " + req.params.historialId
        });
    });
};

// UPDATE a Historial
exports.update = (req, res) => {
    // Find historial and update it
    Historial.findByIdAndUpdate(req.params.historialId, req.body, {new: true})
    .then(historial => {
        if(!historial) {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });
        }
        res.json(historial);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });                
        }
        return res.status(500).json({
            msg: "Error updating historial with id " + req.params.historialId
        });
    });
};

// DELETE a Historial
exports.delete = (req, res) => {
    Historial.findByIdAndRemove(req.params.historialId)
    .then(historial => {
        if(!historial) {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });
        }
        res.json({msg: "Historial deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Historial not found with id " + req.params.historialId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete historial with id " + req.params.historialId
        });
    });
};