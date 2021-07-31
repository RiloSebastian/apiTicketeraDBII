const Area = require('../models/area.model.js');


// POST a Area
exports.create = (req, res) => {
    // Create a Area
    const area = new Area(req.body);

    // Save a Area in the MongoDB
    area.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Areas
exports.findAll = (req, res) => {
    Area.find()
    .then(areas => {
        res.json(areas);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Area
exports.findOne = (req, res) => {
    Area.findById(req.params.areaId)
    .then(area => {
        if(!area) {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });            
        }
        res.json(area);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Area with id " + req.params.areaId
        });
    });
};

// UPDATE a Area
exports.update = (req, res) => {
    // Find area and update it
    Area.findByIdAndUpdate(req.params.areaId, req.body, {new: true})
    .then(area => {
        if(!area) {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });
        }
        res.json(area);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });                
        }
        return res.status(500).json({
            msg: "Error updating area with id " + req.params.areaId
        });
    });
};

// DELETE a Area
exports.delete = (req, res) => {
    Area.findByIdAndRemove(req.params.areaId)
    .then(area => {
        if(!area) {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });
        }
        res.json({msg: "Area deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Area not found with id " + req.params.areaId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete area with id " + req.params.areaId
        });
    });
};