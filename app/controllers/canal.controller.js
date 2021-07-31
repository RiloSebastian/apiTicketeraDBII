const Canal = require('../models/canal.model.js');


// POST a Canal
exports.create = (req, res) => {
    // Create a Canal
    const canal = new Canal(req.body);

    // Save a Canal in the MongoDB
    canal.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Canals
exports.findAll = (req, res) => {
    Canal.find()
    .then(canals => {
        res.json(canals);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Canal
exports.findOne = (req, res) => {
    Canal.findById(req.params.canalId)
    .then(canal => {
        if(!canal) {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });            
        }
        res.json(canal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Canal with id " + req.params.canalId
        });
    });
};

// UPDATE a Canal
exports.update = (req, res) => {
    // Find canal and update it
    Canal.findByIdAndUpdate(req.params.canalId, req.body, {new: true})
    .then(canal => {
        if(!canal) {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });
        }
        res.json(canal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });                
        }
        return res.status(500).json({
            msg: "Error updating canal with id " + req.params.canalId
        });
    });
};

// DELETE a Canal
exports.delete = (req, res) => {
    Canal.findByIdAndRemove(req.params.canalId)
    .then(canal => {
        if(!canal) {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });
        }
        res.json({msg: "Canal deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Canal not found with id " + req.params.canalId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete canal with id " + req.params.canalId
        });
    });
};