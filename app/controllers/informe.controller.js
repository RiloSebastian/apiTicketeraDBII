const ObjectId = require("mongoose").Types.ObjectId;
const Ticket = require("../models/ticket.model.js");
const Usuario = require("../models/usuario.model.js");
const Area = require("../models/area.model.js");
const Localidad = require("../models/localidad.model.js");
const Servicio = require("../models/servicio.model.js");
const Historial = require("../models/historial.model.js");

//devuelve al usuario con mas tickets. lista los tickets
//busca todos los tickets
//busca el id de referencia mas veces encontrado
//obtiene el doc de ese id y lo adjunta a un array de tickets suyos
exports.clienteMasTickets = (req, res) => {
	Ticket.aggregate([{ $group: { _id: { cliente: "$id_cliente" }, cantidad: { $sum: 1 } } }, { $sort: { cantidad: -1 } }, { $limit: 1 }]).then(
		(docs) => {
			return Usuario.findById(docs[0]._id.cliente).then((cliente) => {
				res.json(cliente);
			});
		}
	);
};

//devuelve a los clientes que tienen tickets en estado sin resolver. lista sus tickets
//busca los tickets en estado sin resolver. los agrupa por id de cliente
//encuentra los clientes de dichos id y los lista
exports.clientesTicketsSinResolver = (req, res) => {
	Ticket.aggregate([
		{ $match: { "data.estado": { $ne: "solucionado" } } },
		{ $group: { _id: { cliente: "$id_cliente" }, cantidad: { $sum: 1 } } },
		{ $sort: { cantidad: -1 } }
	]).then((docs) => {
		Promise.all(
			docs.map((doc) => {
				console.log(doc._id.cliente);
				return Usuario.findById(doc._id.cliente);
			})
		).then((clientes) => {
			console.log(docs);
			res.json(clientes);
		});
	});
};

//muestra la zona con mas clientes. lista los clientes (usuarios) de dicha zona
//obtiene ambas zonas
//agrupa por id de cliente los servicios que se encuentran en dichas zonas
//busca y lista esos clientes
exports.masClientesPorZona = (req, res) => {
	Area.aggregate([{ $group: { _id: { _id: "$localidad._id", geometry: "$localidad.ubicacion" } } }]).then((zonas) => {
		Promise.all(
			zonas.map((zonaA) => {
				return Servicio.aggregate([
					{ $match: { "localidad.ubicacion": { $geoWithin: { $geometry: zonaA._id.geometry } } } },
					{ $group: { _id: { id_cliente: "$id_cliente" } } }
				])
					.then((clientesA) => {
						return { ...{ zona: zonaA._id._id, clientes: clientesA } };
					})
					.catch((err) => {
						err.json(err);
					});
			})
		).then((zonasClientes) => {
			idZona = zonasClientes
				.sort((zonaA, zonaB) => {
					zonaA.clientes.length - zonaB.clientes.length;
				})
				.reverse()[0].zona;
			return Promise.all(
				zonasClientes[0].clientes.map((cliente) => {
					return Usuario.findById(cliente._id.id_cliente, "-servicios").then((usuario) => {
						return { ...usuario._doc };
					});
				})
			).then((clientesAux) => {
				zonasClientes[0].clientes = clientesAux;
				return Localidad.findById(idZona).then((localidad) => {
					res.json({ zona: localidad.descripcion, clientes: zonasClientes[0].clientes });
				});
			});
		});
	});
};

//lista a los empleados con tickets. muestra los tickets
//busca a todos los usuarios que no sean clientes y que no tengan servicios. luego filtra a aquellos que tengan tickets en sus servicios
//
exports.clientesEmpleadosConTickets = (req, res) => {
	//{tipo :{$ne: "Cliente"}, "servicios.tickets": { $exists: true, $ne: [] }}
	Usuario.find({ tipo: { $ne: "Cliente" }, "servicios.tickets": { $elemMatch: { $ne: [] } } }, "-servicios").then((usuarios) => {
		res.json(usuarios);
	});
};

//lista los tickets que fueron inspeccionados agrupados por zona
exports.atencionPorZona = (req, res) => {
	//traer todas las zonas
	//agrupar todos los servicios por interseccion con zonas, filtrar tickets para que no tengan estado pendiente y listar esos tickets
	Area.aggregate([{ $group: { _id: { _id: "$localidad._id", geometry: "$localidad.ubicacion", descripcion: "$localidad.descripcion" } } }]).then(
		(zonas) => {
			Promise.all(
				zonas.map((zonaA) => {
					return Servicio.aggregate([
						{
							$match: {
								"localidad.ubicacion": { $geoWithin: { $geometry: zonaA._id.geometry } },
								tickets: { $elemMatch: { "data.estado": { $ne: "pendiente" } } }
							}
						},
						{ $project: { tickets: 1 } },
						{ $unwind: "$tickets" },
						{ $group: { _id: "$tickets" } }
					]);
				})
			).then((zonasTickets) => {
				arr = zonas.map((zonaA, indice) => {
					return { zona: zonaA._id.descripcion, tickets: zonasTickets[indice].map((tickets) => tickets._id) };
				});
				res.json(arr);
			});
		}
	);
};

exports.cincoUsuariosMasCercanosAUsuarioActual = (req, res) => {
	usuarioActual = req.body;
	Usuario.aggregate([{$geoNear: { near: usuarioActual.ubicacion, distanceField: "distancia_a_usuario", maxDistance: 20000, minDistance: 100}},{$limit: 5}]).then(data=>{
		res.json(data);
	})
};

//lista los tickets por desperfecto agrupados por zona
exports.desperfectoPorZona = (req, res) => {
	Area.aggregate([{ $group: { _id: { _id: "$localidad._id", geometry: "$localidad.ubicacion", descripcion: "$localidad.descripcion" } } }]).then(
		(zonas) => {
			Promise.all(
				zonas.map((zonaA) => {
					return Servicio.aggregate([
						{
							$match: {
								"localidad.ubicacion": { $geoWithin: { $geometry: zonaA._id.geometry } },
								tickets: { $elemMatch: { "data.tipo": "desperfecto" } }
							}
						},
						{ $project: { tickets: 1 } },
						{ $unwind: "$tickets" },
						{ $group: { _id: "$tickets" } }
					]);
				})
			).then((zonasTickets) => {
				arr = zonas.map((zonaA, indice) => {
					return { zona: zonaA._id.descripcion, tickets: zonasTickets[indice].map((tickets) => tickets._id) };
				});
				res.json(arr);
			});
		}
	);
};

//lista al usuario que en mas tickets participo. lista dichos tickets
exports.personalMasTrabaja = (req, res) => {
	Ticket.aggregate([
		{ $unwind: "$id_encargadosAnteriores" },
		{ $project: { id_encargadosAnteriores: 1 } },
		{ $group: { _id: { personal: "$id_encargadosAnteriores" }, cantidad: { $sum: 1 } } },
		{ $sort: { cantidad: -1 } },
		{ $limit: 1 }
	])
		.then((personal) => {
			return Usuario.aggregate([
				{ $match: { _id: personal[0]._id.personal } },
				{ $lookup: { from: "tickets", foreignField: "id_encargadosAnteriores", as: "ticketsInspeccionados", localField: "_id" } },
				{ $project: { nombre: 1, apellido: 1, ticketsInspeccionados: 1 } }
			]);
		})
		.then((data) => {
			res.json(data);
		});
};

//muestra la hora donde hay mas trabajo. basandose en historial
exports.horarioMasTrabajo = (req, res) => {
	Historial.aggregate([
		{ $unwind: { path: "$historial" } },
		{ $addFields: { fecha: { $toDate: "$historial.fecha_emision" } } },
		{ $project: { fecha: 1 } },
		{
			$group: {
				_id: { dia: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } }, hora: { $dateToString: { format: "%H", date: "$fecha" } } },
				cantidad_de_acciones: { $sum: 1 }
			}
		},
		{ $sort: { cantidad_de_acciones: -1 } }
	]).then((data) => {
		res.json(data);
	});
};

//lista todos los tickets sin resolver
exports.personalTicketsSinResolver = (req, res) => {
	Ticket.find({ "data.estado": { $ne: "solucionado" } }).then((data) => {
		res.json(data);
	});
};

//lista solo los desperfectos
exports.soloDesperfectos = (req, res) => {
	Ticket.find({ "data.tipo": "desperfecto" }).then((data) => {
		res.json(data);
	});
};

//lista los desperfectos por fecha
exports.desperfectoPorFecha = (req, res) => {
	Ticket.aggregate([
		{ $match: { "data.tipo": "desperfecto" } },
		{ $addFields: { fecha: { $toDate: "$fecha_creacion" } } },
		{ $group: { _id: { dia: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } } }, tickets: { $push: "$$CURRENT" } } },
		{ $project: { "tickets.fecha": 0 } }
	]).then((data) => {
		res.json(data);
	});
};

//muestra la recurrencia de un desperfecto. lista los desperfectos
exports.desperfectoRecurrencia = (req, res) => {
	Ticket.aggregate([{ $match: { "data.tipo": "desperfecto" } }, { $group: { _id: "$data.descripcion", tickets: { $push: "$$CURRENT" } } }]).then(
		(data) => {
			res.json(data);
		}
	);
};
