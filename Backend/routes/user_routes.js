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

//Ruta para pedir un token de restauración de contraseña:
router.put('/forgot-password', UserController.forgotPassword);
//Ruta para cambiar la contraseña por token, después de haber ejecutado antes el forgot-password de la línea de arriba.
router.put('/restore-password', UserController.restorePassword);

//IMPORTANTÍSIMO:
/*
El proceso de recuperación de contraseña debería de ser así:
1- Cuando se de al enlace de "Olvidé mi contraseña" en el login, deberá aparecer un formulario de un campo para insertar el nombre del usuario o el correo (eso debe decidirse, qué valor irá).
2- El formulario hará petición PUT al backend a "/forgot-password", el cual retornará con el envío de un correo al correo del usuario.
El Frontend debería dar un mensaje de que el usuario revise su correo al saber la respuesta del Backend de que ya se mandó el correo.
3- El correo tendrá en su interior un enlace a una página del frontend, esa página deberá ser un formulario con dos campos (la nueva contraseña y confirmació de la nueva contraseña).
El token de restauración estará como parámetro en la URL de la página del frontend. 
4- El frontend deberá hacer una petición PUT al backend a "/restore-password" e incluir:
	+ Un header con key "reset" y como valor el token, que en este caso, es el parámetro en la URL.
	+ La nueva contraseña (validada por el frontend) con el nombre de parámetro "newPass".
5- Si el token expiró, no se podrá actualizar la contraseña.
6- Si el token es válido, la contraseña debería de actualizarse. En el frontend debería de darse un aviso de la contraseña cambiada.
7- No se hará login automáticamente al restaurarse la contraseña, se deberá iniciar sesión para demostrar la recuperación de la cuenta.
*/

//Rutas para probar inicio de sesión y tokens de dicho inicio.
router.get('/user-panel', authJwt, UserController.userPanel);
router.get('/general-panel', UserController.generalPanel);
router.post("/refreshtoken", UserController.refreshToken);
router.get('/verify-user/:id', UserController.verifyUser);

module.exports = router;