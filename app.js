//Creación del Servidor WEB.
'use strict';

//Cargar módulos de Node.
const express = require('express');

//Ejecutar express.
const app = express();
const path = require('path');
//Cargar el socket.io
const http = require('http');
const socketio = require('socket.io');
var httpServer = http.createServer(app);
var io = socketio(httpServer);

//Cargar ficheros rutas.

var user_routes = require('./routes/user_routes');
var book_routes = require('./routes/book_routes');
var chat_routes = require('./routes/chat_routes');

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
app.use("/api", chat_routes)


//Ruta o método de prueba para el API:

app.get('/datos', (request, response) => {
	console.log('Hola Mundo');
	return response.status(200).send({
		proyecto: 'UNAHLibrate'
	});
})

/*
app.get("/", (request, response) => {
	return response.status(200).send('Este es el backend del Proyecto.') 
})
*/

if (process.env.NODE_ENV === 'production'){

    //Poner la(s) carpeta(s) pública(s) para la subida de archivos:
    app.use(express.static( path.resolve('uploads/books') ) );
    app.use(express.static( path.resolve('uploads/users') ) );
    app.use(express.static( path.resolve('uploads/chats') ) );

    app.use(express.static(`Frontend/unahlibrate-react/build`));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'Frontend', 'unahlibrate-react', 'build', 'index.html'));
    })
}

//Exportar el módulo (fichero actual).
module.exports = {
    app, httpServer, io 
};

require('./sockets/socket');