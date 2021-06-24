'use strict'
var express = require('express');
var UserController = require('../controllers/user');
const authJwt = require('../middlewares/authJwt');
var router = express.Router();

//var multiparty = require('connect-multiparty');

//var md_upload = multiparty({uploadDir:'./upload/articles'});

//Rutas de prueba 
router.post('/lariza',UserController.datosCurso);

router.post('/save-user',UserController.saveUser); //Ruta para guardar datos de usuario en la base
router.get('/user/:id', UserController.getUser);
router.get('/user-by-name/:nick', UserController.getUserByUsername); //Ruta para obtener un usuario por su nombre de usuario.
router.get('/users', UserController.getUsers);
router.post('/send-mail',UserController.sendMail); //Ruta que envía un correo electrónico de verificación de cuenta.
router.post('/login', UserController.login);

//Rutas para probar inicio de sesión y tokens de dicho inicio.
router.get('/user-panel', authJwt, UserController.userPanel);
router.get('/general-panel', UserController.generalPanel);
router.post("/refreshtoken", UserController.refreshToken);
router.get('/verify-user/:id', UserController.verifyUser);

module.exports = router;