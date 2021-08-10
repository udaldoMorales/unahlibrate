'use strict'

const { app, httpServer } = require('./app');

//Para enviar correo de confirmacion
//const nodemailer = require('nodemailer');

//Para conectarse con mongo
const mongoose = require('mongoose'); //para usar mongoose
const url ='mongodb://localhost:27017/unahlibrate'; //url de la base de datos local - En el localhost, esta es la línea a usar.
//const url = 'mongodb+srv://admin:123@unahlibrate.f26v3.mongodb.net/unahlibrate?retryWrites=true&w=majority' //En producción, esta línea se tiene que usar.
//Variable para el puerto de la aplicación
const port = process.env.PORT || 3900;

//conexion con mongoDB

mongoose.set('useFindAndModify',false)
mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true })
    .then(() => {
        //Crear servidor y ponerme a escuchar peticiones HTTP
        /*app.listen(port,() => {
            console.log("Servidor corriendo en http://localhost:"+port + " conectado con la base correctamente");
        });*/
        httpServer.listen(port, () => {
            console.log(`Servidor http en http://localhost:${port} conectado`);
        })
    }).catch(err => console.log(err));



/*Prueba de enviar correo con nodemailer
app.listen(port, () => {
    console.log(`Server listening on ${port} port.`);
});

app.post("/send-mail",(request, response)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'bruce.hintz@ethereal.email',
            pass: 'BR7VrTAq1fG3g3bVvR'
        }
    });

    var mailOptions = {
        from : "bruce.hintz@ethereal.email",
        to: "maholy.sandoval@gmail.com",
        subject: "Esto es una prueba desde nodemailer",
        text: "Holaaaa, soy sexi XD"
    }
    
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("hubo error")
            response.status(500).send(error.message);
        }else{
            console.log("Email enviando");
            response.status(200).json(request.body)
        }
    });
});

*/
module.exports = {
    port
};