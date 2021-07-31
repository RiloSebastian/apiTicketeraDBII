const ObjectId = require("mongoose").Types.ObjectId;
const Servicio = require("../models/servicio.model.js");

// POST a Servicio
exports.create = (req, res) => {
  let json = req.body;
  json.plan.fecha_emision = new Date(json.plan.fecha_emision);
  json.fecha_alta = new Date(json.fecha_alta);
  // Create a Servicio
  const servicio = new Servicio(req.body);

  // Save a Servicio in the MongoDB
  servicio
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.message,
      });
    });
};

// FETCH all Servicios
exports.findAll = (req, res) => {
  Servicio.find()
    .then((servicios) => {
      res.json(servicios);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message,
      });
    });
};

// FIND a Servicio
exports.findOne = (req, res) => {
  Servicio.findById(req.params.servicioId)
    .then((servicio) => {
      if (!servicio) {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      res.json(servicio);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      return res.status(500).json({
        msg: "Error retrieving Servicio with id " + req.params.servicioId,
      });
    });
};

exports.obtenerPorIdUsuario = (req, res) => {
    Servicio.find({ id_cliente: ObjectId(req.query.servicioUserId) }).then((servicios) => {
      if (!servicios) {
        return res.status(404).json({
          msg: "Servicios not found with id of user" + req.query.servicioUserId,
        });
      }
      res.json(servicios);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          msg: "Servicio not found with id of user" + req.query.servicioUserId,
        });
      }
      return res.status(500).json({msg: err});
    });
};

// UPDATE a Servicio
exports.update = (req, res) => {
  // Find servicio and update it
  Servicio.findByIdAndUpdate(req.params.servicioId, req.body, { new: true })
    .then((servicio) => {
      if (!servicio) {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      res.json(servicio);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      return res.status(500).json({
        msg: "Error updating servicio with id " + req.params.servicioId,
      });
    });
};

// DELETE a Servicio
exports.delete = (req, res) => {
  Servicio.findByIdAndRemove(req.params.servicioId)
    .then((servicio) => {
      if (!servicio) {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      res.json({ msg: "Servicio deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          msg: "Servicio not found with id " + req.params.servicioId,
        });
      }
      return res.status(500).json({
        msg: "Could not delete servicio with id " + req.params.servicioId,
      });
    });
};
