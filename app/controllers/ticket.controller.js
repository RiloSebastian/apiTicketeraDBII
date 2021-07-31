const ObjectId = require("mongoose").Types.ObjectId;
const Ticket = require("../models/ticket.model.js");
const scriptJerarquias = require("./actualizacionEnJerarquia.js");

exports.create = (req, res) => {
	// Create a Ticket
	const ticket = new Ticket(req.body);
	// Save a Ticket in the MongoDB
	ticket
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json({
				msg: err.message
			});
		});
};

// FETCH all Tickets
exports.findAll = (req, res) => {
	Ticket.find()
		.then((tickets) => {
			res.json(tickets);
		})
		.catch((err) => {
			res.status(500).send({
				msg: err.message
			});
		});
};

// FIND a Ticket
exports.findOne = (req, res) => {
	Ticket.findById(req.params.ticketId)
		.then((ticket) => {
			if (!ticket) {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			res.json(ticket);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			return res.status(500).json({
				msg: "Error retrieving Ticket with id " + req.params.ticketId
			});
		});
};

// UPDATE a Ticket
exports.update = (req, res) => {
	Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true })
		.then((ticket) => {
			if (!ticket) {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			res.json(ticket);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			return res.status(500).json({
				msg: "Error updating ticket with id " + req.params.ticketId
			});
		});
};

// DELETE a Ticket
exports.delete = (req, res) => {
	Ticket.findByIdAndRemove(req.params.ticketId)
		.then((ticket) => {
			if (!ticket) {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			res.json({ msg: "Ticket deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).json({
					msg: "Ticket not found with id " + req.params.ticketId
				});
			}
			return res.status(500).json({
				msg: "Could not delete ticket with id " + req.params.ticketId
			});
		});
};

// generar un ticket y actualizar a todos sus padres
exports.guardarTicket = (req, res) => {
	let objeto = req.body;
	const ticket = new Ticket(objeto.obj);
	ticket
		.save()
		.then((data) => {
			console.log("genera ticket");
			objeto.obj = data;
			scriptJerarquias.actualizarServicio(objeto).then((docServ) => {
				res.json(data);
			});
		})
		.catch((err) => {
			res.status(500).json({
				msg: err
			});
		});
};

exports.harcodearTicket = (req, res) => {
	let objeto = req.body;
	const ticket = new Ticket(objeto.obj);
	ticket
		.save()
		.then((data) => {
			console.log("genera ticket");
			if (data.soluciones.length > 0) {
				objeto.obj = data;
				scriptJerarquias.actualizarTicketSolucion(objeto).then((ticket) => {
					objeto.obj = ticket;
					scriptJerarquias.actualizarTicketHistorial(objeto).then((ticket2) => {
						objeto.obj = ticket2;
						scriptJerarquias.actualizarServicio(objeto).then((docServ) => {
							res.json(data);
						});
					});
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				msg: err
			});
		});
};
