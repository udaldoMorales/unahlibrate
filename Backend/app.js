//Creación del Servidor WEB.
'use strict';

//Cargar módulos de Node.
const express = require('express');

//Ejecutar express.
const app = express();

//Cargar ficheros rutas.

var user_routes = require('./routes/user_routes');
var book_routes = require('./routes/book_routes');

//Cargar Middlewares.
//app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());


//CORS (para permitir peticiones desde el FrontEnd)
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, reset');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a las rutas y Cargar las rutas.
app.use("/api", user_routes)
app.use("/api", book_routes)

//Ruta o método de prueba para el API:

app.get('/datos', (request, response) => {
	console.log('Hola Mundo');
	return response.status(200).send({
		proyecto: 'UNAHLibrate'
	});
})

app.get("/", (request, response) => {
	return response.status(200).send('Este es el backend del Proyecto.') 
})

//Exportar el módulo (fichero actual).
module.exports = app;