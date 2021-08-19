'use strict'
var express = require('express');
var UserController = require('../controllers/user');
var BookController = require('../controllers/book');
var ChatController = require('../controllers/chat');
var router = express.Router();

//Varibles necesarias para subir imagenes del chat
//
const fs = require('fs');

const uuid = require('uuid');

const path = require('path');

const multer = require('multer');

let storage = multer.diskStorage({
	destination: 'uploads/chats',
	filename: (req, file, cb) => {
		cb(null, uuid.v4() + path.extname(file.originalname));
	}
});

const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');
//

let upload = multer({storage: storage});

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'../uploads/chats'});

router.get('/get-chats-and-more/:userid', ChatController.getChatsAndMore);
router.get('/get-chats/:user', ChatController.getChats);
router.get('/get-chat/:id', ChatController.getChat);
router.post('/upload-image',md_upload,ChatController.updloadImage);
router.get('/get-chatImage/:image',ChatController.getImageMessage);

router.post('/seen-messages', ChatController.seenMessages);

//Probando con Google
router.post('/upload-chat-image-google', md_upload, ChatController.uploadChatImageGoogle);


router.post('/upload-image-chat/', upload.single('file0'), (req, res) => {

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
                'parents': [''], //Id de la carpeta chats, preguntar por él
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

                                return res.status(200).send({
                                    status: 'success',
                                    image: fileLink
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