var conn = new Mongo();
var db = conn.getDB("Ticketera");


/*var array = db.getCollection("planes").find({}).toArray();

array =  array.map(elem =>{
    return modificarPlan(elem);
});

for(let elem of array){
    db.getCollection('planes').replaceOne({_id: elem._id }, elem);
}

function modificarAreas(areas) {

  return areas.map((area) => {
    if (area.personal.length > 0) {
      area.personal = modificarUsuarios(area.personal);
    }
    return area;
  });
}

function modificarUsuarios(usuarios) {
  return usuarios.map((usuario) => {
    usuario.fecha_nacimiento = Date.parse(usuario.fecha_nacimiento);
    usuario.fecha_registro = Date.parse(usuario.fecha_registro);
    if (usuario.servicios.length > 0) {
      usuario.servicios = modificarServicios(usuario.servicios);
    }
    return usuario;
  });
}

function modificarServicios(servicios) {
  return servicios.map((servicio) => {
    servicio.fecha_alta = Date.parse(servicio.fecha_alta);
    if (servicio.fecha_baja !== null) {
      servicio.fecha_baja = Date.parse(servicio.fecha_baja);
    }
    servicio.plan = modificarPlan(servicio.plan);
    return servicio;
  });
}

function modificarPlan(plan){
    plan.fecha_emision = Date.parse(plan.fecha_emision);
    if (plan.fecha_expiracion !== null) {
      plan.fecha_expiracion = Date.parse(plan.fecha_expiracion);
    }
    return plan;
}*/
