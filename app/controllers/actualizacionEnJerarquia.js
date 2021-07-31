const ObjectId = require("mongoose").Types.ObjectId;
const Ticket = require("../models/ticket.model.js");
const Area = require("../models/area.model.js");
const Servicio = require("../models/servicio.model.js");
const Usuario = require("../models/usuario.model.js");
const Historial = require("../models/historial.model.js");
const Solucion = require("../models/solucion.model.js");

exports.actualizarTicketSolucion = (objeto) => {
	let ticket = objeto.obj;
	return recorrerAux(ticket.soluciones,ticket).then(array =>{
        ticket.soluciones = array;
        return ticket;
    });
};

async function recorrerAux (soluciones, ticket){
    return await Promise.all(soluciones.map((solucion) => {
		solucion.id_ticket = ticket._id;
		return Solucion.findByIdAndUpdate({ _id: solucion._id }, solucion, { upsert: true, new: true })
			.then((solucionDoc) => {
				return solucionDoc;
			}).catch((err) => {
				console.log(`actualizo objeto en ticket error: (${err})`);
				return { msg: err };
			});
	}));
}

exports.actualizarTicketHistorial = (objeto) => {
	let ticket = objeto.obj;
	ticket.historial.id_ticket = ticket._id;
	return Historial.findByIdAndUpdate({ _id: ticket.historial._id }, ticket.historial, { upsert: true, new: true })
		.then((doc) => {
			ticket.historial = doc;
			return ticket;
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarSolucionTicket = (objeto) => {
	let solucion = objeto.obj;
	return Ticket.findOne({ _id: solucion.id_ticket })
		.then((doc) => {
			doc.soluciones = abmDocEmbebido(doc.soluciones, solucion, objeto.operacion);
			return encontrarYActualizar(Ticket, doc).then((val) => {
				objeto.obj = val;
				return exports.actualizarServicio(objeto);
			});
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarHistorialTicket = (objeto) => {
	let historial = objeto.obj;
	return Ticket.findOne({ _id: historial.id_ticket })
		.then((doc) => {
			doc.historial = historial;
			return encontrarYActualizar(Ticket, doc).then((val) => {
				objeto.obj = val;
				return exports.actualizarServicio(objeto);
			});
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarPlanServicio = (objeto) => {
	let plan = objeto.obj;
	let retorno = null;
	return Servicio.find({ "plan._id": plan._id })
		.then((docs) => {
			docs.forEach((doc) => {
				doc.plan = plan;
				retorno = encontrarYActualizar(Servicio, doc).then((val) => {
					objeto.obj = val;
					return exports.actualizarUsuario(objeto);
				});
			});
			return retorno;
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarLocalidadServicio = (objeto) => {
	let localidad = objeto.obj;
	let retorno = null;
	return Servicio.find({ "localidad._id": localidad._id })
		.then((docs) => {
			docs.forEach((doc) => {
				doc.plan = plan;
				retorno = encontrarYActualizar(Servicio, doc).then((val) => {
					objeto.obj = val;
					return exports.actualizarUsuario(objeto);
				});
			});
			return retorno;
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarCanalArrayServicio = (objeto) => {
	let canal = objeto.obj;
	let retorno = null;
	return Servicio.findOne({ "plan_canales._id": canal._id })
		.then((docs) => {
			docs.forEach((doc) => {
				doc.plan_canales = abmDocEmbebido(doc.plan_canales, canal, objeto.operacion);
				retorno = encontrarYActualizar(Servicio, doc).then((val) => {
					objeto.obj = val;
					return exports.actualizarUsuario(objeto);
				});
			});
		})
		.catch((err) => {
			console.log(`actualizo objeto en ticket error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarServicio = (objeto) => {
	let ticket = objeto.obj;
	return Servicio.findOne({ _id: ticket.id_servicio })
		.then((doc) => {
			doc.tickets = abmDocEmbebido(doc.tickets, ticket, objeto.operacion);
			return encontrarYActualizar(Servicio, doc)
				.then((val) => {
					objeto.obj = val;
					return exports.actualizarUsuario(objeto).then((valDos) => {
						if (ticket.id_area != null) {
							objeto.obj = ticket;
                            console.log(ticket);
							return exports.actualizarAreaTicket(objeto);
						}
						console.log("el ticket no tiene un area identificada");
						return valDos;
					});
				})
				.catch((err) => {
					return { msg: err };
				});
		})
		.catch((err) => {
			console.log(`actualizo ticket en Servicio error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarUsuario = (objeto) => {
	let servicio = objeto.obj;
	return Usuario.findOne({ _id: servicio.id_cliente })
		.then((doc) => {
			doc.servicios = abmDocEmbebido(doc.servicios, servicio, objeto.operacion);
			return encontrarYActualizar(Usuario, doc)
				.then((val) => {
					objeto.obj = val;
					if (val.area !== null) {
						return exports.actualizarAreaUsuario(objeto);
					} else {
						return objeto;
					}
				})
				.catch((err) => {
					return { msg: err };
				});
		})
		.catch((err) => {
			console.log(`actualizo servicio en usuario error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarAreaTicket = (objeto) => {
	let ticket = objeto.obj;
	return Area.findOne({ _id: ticket.id_area })
		.then((doc) => {
			doc.tickets = abmDocEmbebido(doc.tickets, ticket, objeto.operacion);
			return encontrarYActualizar(Area, doc)
				.then((val) => {
					objeto.obj = val;
					return objeto;
				})
				.catch((err) => {
					return { msg: err };
				});
		})
		.catch((err) => {
			console.log(`actualizo ticket en area error: (${err})`);
			return { msg: err };
		});
};

exports.actualizarAreaUsuario = (objeto) => {
	let usuario = objeto.obj;
	return Area.findOne({ _id: usuario.area })
		.then((doc) => {
			doc.personal = abmDocEmbebido(doc.personal, usuario, objeto.operacion);
			return encontrarYActualizar(Area, doc)
				.then((val) => {
					objeto.obj = val;
					return objeto;
				})
				.catch((err) => {
					return { msg: err };
				});
		})
		.catch((err) => {
			console.log(`actualizo usuario en area error: (${err})`);
			return { msg: err };
		});
};

function encontrarYActualizar(schema, doc) {
	return schema
		.findOneAndUpdate({ _id: ObjectId(doc._id) }, doc, { new: true })
		.then((val) => {
			console.log(`actualizo objeto en el documento del tipo: ${schema.modelName}`);
			return val;
		})
		.catch((err) => {
			console.log(`error al actualizar objeto en el documento del tipo ${schema.modelName}: (${err})`);
			return { msg: err };
		});
}

function abmDocEmbebido(arrayDocs, doc, tipoOperacion) {
	let index = arrayDocs.findIndex((docA) => docA._id.toString() === doc._id.toString());
	if (tipoOperacion === "AM") {
		if (index == -1) {
			arrayDocs.push(doc);
		} else {
			arrayDocs[index] = doc;
		}
	} else if (tipoOperacion === "B" && index != -1) {
		arrayDocs.splice(index, 1);
	}
	return arrayDocs;
}
