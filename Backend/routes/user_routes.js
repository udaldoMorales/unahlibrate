'use strict'
var expr
const path = require('path');
const express = require('express');
var UserController = require('../controllers/user');
const authJwt = require('../middlewares/authJwt');
var router = express.Router();
const {uploadUserImage} = require('./../middlewares/upload-user-image-to-google');

//Varibles necesarias para subir imagen de perfil de usuario

const user = require('../models/user');

//
const fs = require('fs');

const uuid = require('uuid');

const multer = require('multer');

let storage = multer.diskStorage({
	destination: 'uploads/users',
	filename: (req, file, cb) => {
		cb(null, uuid.v4() + path.extname(file.originalname));
	}
});

const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');
//

let upload = multer({storage: storage});

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
router.get('/search-users/:search',UserController.searchUsers);

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

//Probando con Google
router.post('/upload-image-google/:id', md_upload, UserController.uploadProfileImageGoogle);

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

router.post('/upload-image-user/:id', upload.single('file0'), (req, res) => {

    var userID = req.params.id;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    )

    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    const drive = google.drive({version: 'v3', auth: oauth2Client});

    var fileName = 'imagen no subida';
    var file = req.file;
    if (!file) {
        return res.status(404).send({
            status: 'error',
            message: fileName
        });
    }
    //Conseguir el nombre y la extension del archivo
    var filePath = file.path;
    var fileSplit = filePath.split(`${path.sep}`) //Para linux es /

    //Nombre del archivo
    fileName = fileSplit[fileSplit.length - 1];
    //Extension del archivo
    var extensionSplit = fileName.split('\.');
    var fileExtension = extensionSplit[extensionSplit.length - 1];
    //Comprobar con la extension, solo imagenes, si no es valida borrar el fichero
    if
        (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif') {
        //borrar el archivo
        fs.unlink(filePath, (err) => {
            return res.status(501).send({
                status: 'error',
                message: 'extension de la imagen invalida'
            });
        });
    } else {

        drive.files.create({
              requestBody: {
                'name': fileName,
                'parents': ['1fkDRrc0Le-OsVVBPSvp6jZ9QSOm7F4UU'], //Id de la carpeta users
                   'mimeType': `image/${fileExtension}`
             },
              media: {
                mimeType: `image/${fileExtension}`,
                body: fs.createReadStream(`${filePath}`)
              }
        }, (err, file) => {
            if (err){
                console.log(err);
                return res.status(500).send({
                    status: 'error', 
                    message: 'Error en la subida de la imagen'
                })
            } else {
                console.log('FileId: ' + file.data.id);
                drive.permissions.create({fileId: file.data.id, requestBody: {role: 'reader', type: 'anyone'}}, (err2, permission) => {
                    if (err2) {
                        console.log(err2);
                        return res.status(500).send({
                            status: 'error', 
                            message: 'Error en los permisos de la imagen'
                        });
                    } else {
                        console.log(file.data.id);
                        drive.files.get({fileId: file.data.id, fields: '*'}, (err3, gotFile) => { //fields: 'webViewLink, webContentLink'
                            if (err3){
                                console.log(file.data.id);
                                console.log(err3);
                                return res.status(500).send({
                                    status: 'error', 
                                    message: 'Error en los permisos de la imagen'
                                });
                            } else {
                                let fileLink = gotFile.data.webContentLink.split(`&`)[0];

                                //var {fileLink} = response;

                                user.findOneAndUpdate({ _id: userID }, { imageProfile: fileLink }, { new: true }, (err, userUpdate) => {

                                        if (err || !userUpdate) {
                                            return res.status(404).send({
                                                status: 'error',
                                                message: 'error al guardar la imagen del perfil'
                                            });
                                        }
                                        return res.status(200).send({
                                            status: 'success',
                                            user: userUpdate
                                        });
                                    });

                            }
                        })
                    }
                });
            }
        });
    }

});

module.exports = router;