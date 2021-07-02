'use strict'
var express = require('express');
var UserController = require('../controllers/user');
const authJwt = require('../middlewares/authJwt');
var router = express.Router();

//Varibles necesarias para subir imagen de perfil de usuario

var multiparty = require('connect-multiparty');

var md_upload = multiparty({uploadDir:'./uploads/users'});


//Rutas de prueba 
router.post('/lariza',UserController.datosCurso);

router.post('/save-user',UserController.saveUser); //Ruta para guardar datos de usuario en la base
router.get('/user/:id', UserController.getUser);
router.get('/user-by-name/:nick', UserController.getUserByUsername); //Ruta para obtener un usuario por su nombre de usuario.
router.get('/users', UserController.getUsers);
router.post('/send-mail',UserController.sendMail); //Ruta que envía un correo electrónico de verificación de cuenta.
router.post('/login', UserController.login);

//Ruta para subir imagen de perfil del usuario registrado y obtenerla
router.post('/upload-image/:id',md_upload,UserController.uploadProfileImage);
router.get('/get-image/:image',UserController.getProfileImage);

//Ruta para actualizar información de perfil de usuario -sin tocar la contraseña-.
router.put('/update-user/:id', UserController.updateUser);

//Ruta para actualización de contraseña de usuario.
router.put('/change-password/:id', UserController.changePassword);

//Rutas para probar inicio de sesión y tokens de dicho inicio.
router.get('/user-panel', authJwt, UserController.userPanel);
router.get('/general-panel', UserController.generalPanel);
router.post("/refreshtoken", UserController.refreshToken);
router.get('/verify-user/:id', UserController.verifyUser);

module.exports = router;