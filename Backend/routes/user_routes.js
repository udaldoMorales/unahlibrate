'use strict'
var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

//var multiparty = require('connect-multiparty');

//var md_upload = multiparty({uploadDir:'./upload/articles'});

//Rutas de prueba 
router.post('/lariza',UserController.datosCurso);

router.post('/save-user',UserController.saveUser); //Ruta para guardar datos de usuario en la base
router.get('/user/:id', UserController.getUser);
router.get('/users', UserController.getUsers);
router.post('/send-mail',UserController.sendMail); //Ruta que envía un correo electrónico de verificación de cuenta.
router.post('/login', UserController.login);

module.exports = router;