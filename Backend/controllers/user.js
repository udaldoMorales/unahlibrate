'use strict'
var validator = require('validator');
const user = require('../models/user');
var fs = require('fs');
var path = require('path');

var User = require('../models/user'); //importar el modelo

var controller = {
    //metodo de prueba
    datosCurso: (req, res) => {
        console.log("Hola mundo");
        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Master en FramWorks JS',
            autor: 'Lariza XD',
            url: 'no tengo xD',
            hola
        });
    },
    //Guardar datos en la base de datos
    saveData: (request, response) => {
        //Recoger los paremetros por post
        var params = request.body;
        console.log(request.body);

        //Validar los datos con validator
        try {
            var validateUser = !validator.isEmpty(params.user);
            var validatePassword = !validator.isEmpty(params.password);
        } catch (err) {
            return response.status(400).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        //Si los datos son validos
        if (validateUser && validatePassword) {

            //Crear el objeto a guardar

            var user = new User(); //instanciando el modelo de datos

            //Asiganar valores
            user.user = params.user;
            user.password = params.password;

            //Guardar el usuario a la base
            user.save((err, userStored) => {

                if (err || !userStored) {
                    return response.status(400).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                //Devolver una respuestas
                return res.status(200).send({
                    status: 'success',
                    user: userStored
                });
            });
        } else {
            return response.status(401).send({
                status: 'error',
                message: "Los datos no son validos"
            });
        }
    }
};

module.exports = controller;