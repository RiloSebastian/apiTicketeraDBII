const Plan = require('../models/plan.model.js');


// POST a Plan
exports.create = (req, res) => {
    // Create a Plan
    const pan = new Plan(req.body);

    // Save a Plan in the MongoDB
    pan.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};


// FETCH all Plans
exports.findAll = (req, res) => {
    Plan.find()
    .then(pans => {
        res.json(pans);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};


// FIND a Plan
exports.findOne = (req, res) => {
    Plan.findById(req.params.planId)
    .then(pan => {
        if(!pan) {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });            
        }
        res.json(pan);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Plan with id " + req.params.planId
        });
    });
};

// UPDATE a Plan
exports.update = (req, res) => {
    // Find pan and update it
    Plan.findByIdAndUpdate(req.params.planId, req.body, {new: true})
    .then(pan => {
        if(!pan) {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });
        }
        res.json(pan);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });                
        }
        return res.status(500).json({
            msg: "Error updating pan with id " + req.params.planId
        });
    });
};

// DELETE a Plan
exports.delete = (req, res) => {
    Plan.findByIdAndRemove(req.params.planId)
    .then(pan => {
        if(!pan) {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });
        }
        res.json({msg: "Plan deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Plan not found with id " + req.params.planId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete pan with id " + req.params.planId
        });
    });
};