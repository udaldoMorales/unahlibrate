'use strict'

const app = require('./app');

//Para conectarse con mongo
const mongoose = require('mongoose'); //para usar mongoose
const url ='mongodb://localhost:27017/unahlibrate'; //url de la base de datos local

//Variable para el puerto de la aplicación
const port = 3900;


//conexion con mongoDB
mongoose.set('useFindAndModify',false)
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true })
    .then(() => {
        //Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port,() => {
            console.log("Servidor corriendo en http://localhost:"+port + " conectado con la base correctamente");
        });
    }).catch(err => console.log(err));

//app.listen(port, () => {
//	console.log(`Server listening on ${port} port.`);
//})