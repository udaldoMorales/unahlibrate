'use strict'
var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

//var multiparty = require('connect-multiparty');

//var md_upload = multiparty({uploadDir:'./upload/articles'});

//Rutas de prueba 
router.post('/lariza',UserController.datosCurso);

router.post('/save-user',UserController.saveData); //Ruta para guardar datos de usuario en la base
router.get('/user/:id', UserController.getUser);
router.get('/users', UserController.getUsers);
router.post('/send-mail',UserController.sendMail);

module.exports = router;