'use strict'
var validator = require('validator');
const user = require('../models/user');
var fs = require('fs');
var path = require('path');

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
        //console.log(request.body);

        user.find({'$or':[{ 'email': params.email }, { 'user': params.user }]}, (err, existingUser) => {
            console.log(existingUser);
            if (existingUser.length > 0) {
                console.log('No te ejecutés acá, bacteria 1.');
                return response.status(404).send({ status: "error", message: "Correo en uso ya." });
                console.log('No te ejecutés acá, bacteria 2.');
            } else {
                if (err){
                    console.log(err);
                } else {

        //Inicio de todo lo demás
        //Validar los datos con validator
        console.log('Llego');
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

            var userToSave = new user(); //instanciando el modelo de datos

            //Asiganar valores
            userToSave.user = params.user;
            userToSave.password = params.password;
            userToSave.email = params.email;

            //Guardar el usuario a la base
            userToSave.save((err, userStored) => {

                if (err || !userStored) {
                    return response.status(400).send({
                        status: 'error',
                        message: 'El usuario no se ha guardado'
                    });
                } else {
                //Devolver una respuestas
                console.log('Por que te metes aca, metiche.');
                return response.status(200).send({
                    status: 'success',
                    user: userStored
                });
               }
            });
        } else {
            return response.status(401).send({
                status: 'error',
                message: "Los datos no son validos"
            });
        }
            //Fin de todo lo demás.

                }

            }
        });
    },
    //Obtener usuario por ID de la Base de Datos.
    getUser: (request,response) => {
        var userId = request.params.id;

        user.findById(userId, (error, foundUser) => {
            if (error || !foundUser || foundUser == undefined){
                return response.status(404).json({
                    status: 'error',
                    message: 'No se encuentra el usuario.'
                })
            } else {
                return response.status(200).json({
                    status: 'success',
                    user: foundUser
                })
            }
        })
    
    },
    getUsers: (request,response) => {
        user.find({}).sort('-date').exec((error, users) => {
            if (error){
                return response.status(404).send({
                    status: 'error',
                    message: 'Error al devolver los usuarios.'
                });
                }
            else if (!users || users.length == 0){
                return response.status(404).send({
                    status: 'error',
                    message: 'Es que no hay artículos.'
                });
            } else {
            //Si no hay problema con las condiciones anteriores.
            return response.status(200).send({
                status: 'success',
                users
            });
            }
        });
    }        
};

module.exports = controller;