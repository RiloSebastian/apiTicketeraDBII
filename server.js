const express = require('express');
const app = express();
app.use(express.json());

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
require('./app/routes/area.routes.js')(app);
require('./app/routes/auth.routes.js')(app);
require('./app/routes/canal.routes.js')(app);
require('./app/routes/historial.routes.js')(app);
require('./app/routes/solucion.routes.js')(app);
require('./app/routes/localidad.routes.js')(app);
require('./app/routes/plan.routes.js')(app);
require('./app/routes/servicio.routes.js')(app);
require('./app/routes/ticket.routes.js')(app);
require('./app/routes/usuario.routes.js')(app);
require('./app/routes/informe.routes.js')(app);

// Create a Server
const server = app.listen(process.env.PORT || 8080);

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    res.json({ rta: "Hola. funcionando con exito"});
  });