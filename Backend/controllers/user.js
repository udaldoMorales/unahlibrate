'use strict'
var validator = require('validator');
const user = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshtoken');

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
    saveUser: (request, response) => {
        //Recoger los paremetros por post
        var params = request.body;
        //console.log(request.body);

        user.find({ '$or': [{ 'email': params.email }, { 'user': params.user }] }, (err, existingUser) => {

            if (existingUser.length > 0) {
                console.log('No te ejecutés acá, bacteria 1.');
                return response.status(404).send({ status: "error", message: "Correo en uso ya." });
            } else {
                if (err) {
                    console.log(err);
                } else {

                    //Inicio de todo lo demás
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
                    if (validateUser && validatePassword) { //Deberiamos validar el nombre tambien 

                        //Encriptando la contrasena
                        const hash =  bcrypt.hashSync(params.password, 10)
                        //Crear el objeto a guardar

                        var userToSave = new user(); //instanciando el modelo de datos

                        //Asiganar valores
                        userToSave.user = params.user;
                        userToSave.password = hash;
                        userToSave.email = params.email;

                        //Guardar el usuario a la base
                        userToSave.save((err, userStored) => {
                            console.log(userStored,err)
                            if (err || !userStored) {
                                return response.status(400).send({
                                    status: 'error',
                                    message: 'El usuario no se ha guardado'
                                });
                            } else {
                                //Devolver una respuestas
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
    getUser: (request, response) => {
        var userId = request.params.id;

        user.findById(userId, (error, foundUser) => {
            if (error || !foundUser || foundUser == undefined) {
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
    getUsers: (request, response) => {
        user.find({}).sort('-date').exec((error, users) => {
            if (error) {
                return response.status(404).send({
                    status: 'error',
                    message: 'Error al devolver los usuarios.'
                });
            }
            else if (!users || users.length == 0) {
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
    },
    login: (request, response) => {
        var params = request.body;
        var username = params.user;
        var password = params.password;

        console.log(username);
        console.log(password);

        //Buscar el usuario.

        user.findOne({user: username}, (err, userFound) => {
            if (!userFound) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario.'
                });
            }
            if (err) {
                console.log(error);
            } else {
                //Verificando la contraseña.
                var contrasenaCompatible = bcrypt.compareSync(password, userFound.password);
                if (!contrasenaCompatible){ //No hay acceso.
                    response.status(403).send({
                        status: 'error',
                        message: 'Tu contraseña es incorrecta, man..'
                    });
                } else { //Hay acceso.
                    //Generación del Token.
                    jwt.sign({user: userFound.user, email: userFound.email}, 'secretkey', {expiresIn: '1m'}, (err, token) => {
                        if (err || !token || token == undefined){

                            response.status(404).send({
                                status: 'failed',
                                message: 'Ocurrio un error.'
                            });
                        } else {

                            //Creación del refresh token
                            var refreshToken;
                            RefreshToken.createToken(userFound)
                            .then(data => {
                                console.log(data)
                                refreshToken = data; 
                                if (refreshToken) {
                                    response.status(200).send({
                                        status: 'success',
                                        message: 'Acceso concedido.',
                                        token,
                                        refreshToken
                                    });                                    
                                }
                            })
                            .catch(err => console.log(err));


                        }

                    });
                }
            }
        })

        //return response.status(200).json(params);
    },

    refreshToken: async (req, res) => {
          const { refreshToken: requestToken } = req.body;

          if (requestToken == null) {
            return res.status(403).json({ message: "Refresh Token is required!" });
          }

          try {
            let refreshToken = await RefreshToken.findOne({ token: requestToken });

            if (!refreshToken) {
              res.status(403).json({ message: "Refresh token is not in database!" });
              return;
            }

            if (RefreshToken.verifyExpiration(refreshToken)) {
              RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
              
              res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
              });
              return;
            }

            let newAccessToken = jwt.sign({ id: refreshToken.user._id }, 'secretkey', {
              expiresIn: '1m',
            });

            return res.status(200).json({
              accessToken: newAccessToken,
              refreshToken: refreshToken.token,
            });
          } catch (err) {
            console.log(err);
            return res.status(500).send({ message: err });
          }
    },

    //Metodo para enviar correo electronico
    sendMail: (request, response) => {
        //Con servidor de prueba llamada Ethereal
        //Primero configuramos los datos del servidor de correo
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'bruce.hintz@ethereal.email',
                pass: 'BR7VrTAq1fG3g3bVvR'
            }
        });
        //Luego establecemos la opciones de envio

        var mailOptions = {
            from: "bruce.hintz@ethereal.email",
            to: request.body.email,
            subject: "Esto es una prueba desde nodemailer",
            text: "Holaaaa, soy sexi XD"
        }
        //Finalmente se envia el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("hubo error")
                return response.status(500).send(error.message);
            } else {
                console.log("Email enviando");
                return response.status(200).send({
                    status: "success",
                    userMailSent: request.body.email
                });
            }
        });
    },

    //Método para probar el acceso a recursos con usuario autenticado.
    userPanel: (request, response) => {
        /*
        response.status(200).json({
            status: 'success',
            message: 'Acceso concedido al contenido.'
        });
        */
        return response.status(200).send({
            status: 'success',
            message: 'Tienes acceso, es permitido.',
            loggedUser: response.userData
        });
    },

    //Método de acceso público (que no necesita acceso de usuario).
    generalPanel: (request, response) => {
        return response.status(200).send({
            status: 'success'
        })
    }
};



module.exports = controller;