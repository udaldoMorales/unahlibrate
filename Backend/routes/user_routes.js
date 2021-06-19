'use strict'
var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

//var multiparty = require('connect-multiparty');

//var md_upload = multiparty({uploadDir:'./upload/articles'});

//Rutas de prueba
router.post('/lariza',UserController.datosCurso);
//Ruta para guardar los archivos

router.post('/save',UserController.saveData);

module.exports = router;