'use strict'
var validator = require('validator');
const user = require('../models/user');
const book = require('../models/book');
const chat = require('../models/chat');
var fs = require('fs');
var path = require('path');
const { updateOne } = require('../models/chat');
const { request } = require('http');
const { urlencoded } = require('body-parser');

const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');

var controller = {

    //falta verificar que el chat entre los dos usuarios no esta en la base
    saveChat: (request, response) => {
        var params = request.body;
        var chatToSave = new chat();

        chatToSave.user = [params.user1, params.user2];
        chatToSave.messages = [];

        chatToSave.save((err, chatSaved) => {
            if (err || !chatSaved) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al guardar chat'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    chat: chatSaved
                });
            }
        });
    },

    updloadImage: (request, response) => {

        //configurar el modulo connect multiparty router/chat_routes.js Listo!!
        //Conseguir el nombre y la extension del archivo
        var fileName = '';
        var files = request.files;

        //Verificar que si vienen files
        if (!files) {
            return response.status(404).send({
                status: 'error',
                message: fileName
            });
        }

        var filePath = request.files.file0.path;
        var fileSplit = filePath.split(`${path.sep}`) //Para linux es /
        //Nombre del archivo
        fileName = fileSplit[fileSplit.length - 1];
        //Extension del archivo
        var extensionSplit = fileName.split('\.');
        var fileExtension = extensionSplit[extensionSplit.length - 1];

        if
            (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif') {
            //borrar el archivo
            fs.unlink(filePath, (err) => {
                return response.status(200).send({
                    status: 'error',
                    message: 'extension de la imagen invalida'
                });
            });
        } else {
            //Si todo es valido, sacar ide de la URL
            return response.status(200).send({
                status: 'success',
                image: fileName
            });
        }
    },

    uploadChatImageGoogle: (req, res) => {

    //var userID = req.params.id;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    )

    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    const drive = google.drive({version: 'v3', auth: oauth2Client});

    var fileName = 'imagen no subida';
    var files = req.files;
    if (!files) {
        return res.status(404).send({
            status: 'error',
            message: fileName
        });
    }
    //Conseguir el nombre y la extension del archivo
    var filePath = req.files.file0.path;
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
                'parents': ['1MgUHECnic5i2GXAfCBQ-0A6njtoqnVfo'], //Id de la carpeta chats
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

    },

    getChats: (request, response) => {
        var userID = request.params.user;
        console.log(userID);

        chat.find({ users: { "$all": [userID] }, deleted: false }).sort('-date').exec((err, chats) => {
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver los chats'
                });
            } else if (!chats || chats.length == 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay chats que devolver para ese usuario'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    chats
                })
            }
        });
    },

    getChat: (request, response) => {
        var chatID = request.params.id;
        chat.findById(chatID, (err, foundChat) => {
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver chat'
                });
            } else if (!foundChat) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay chat'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    messages: foundChat
                })
            }
        });
    },
    getChatsAndMore: (request, response) => {
        var userId = request.params.userid;
        console.log(userId);
        chat.find({ users: { "$all": [userId] }, deleted: false }).sort('-updatedAt').exec((err, chats) => {
            user.populate(chats, { path: 'users' }, (errr, chatss) => {
                if (err || errr || !chats) {
                    console.log(errr);
                    response.status(500).send({
                        status: 'error',
                        message: 'Something happened'
                    })
                } else {
                    //console.log(chatss);
                    response.status(200).send({
                        status: 'success',
                        chats: chatss
                    });
                }
            });
        });

    },

    getImageMessage: (req, res) => {
        var file = req.params.image;
        var pathFile = './uploads/chats/' + file;
        console.log(pathFile);
        fs.stat(pathFile, (err, exists) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'imagen no encontrada'
                });
            } else {
                return res.sendFile(path.resolve(pathFile));
            }
        });
    },
    //Eliminar
    deleteChat: (request, response) => {
        var chatID = request.params.id;

        chat.findOneAndUpdate({ _id: chatID }, { deleted: true }, { new: true }, (err, deletedChat) => {
            if (err || !deletedChat) {
                return response.status(404).send({
                    status: 'error',
                    message: "El chat no ha podido eliminar."
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    chat: deletedChat
                })
            }
        });
    }, 

    seenMessages: (request, response) => {

        var {sender, receiver} = request.body;
        
        chat.findOneAndUpdate({ users: { "$all": [sender, receiver] } }, {notificationTo: '', alerts: 0}, { new: true }, (err, foundChat) => {
        
            if (err){
                return response.status(500).send({
                    status: 'error',
                    message: 'No se pudo actualizar chat.'
                });
            } else {
                chat.find({ users: { "$all": [sender] }, deleted: false }).sort('-updatedAt').exec((err, chats) => {
                    user.populate(chats, { path: 'users' }, (errr, chatss) => {
                        if (err || errr || !chats) {
                            console.log(errr);
                            response.status(500).send({
                                status: 'error',
                                message: 'Something happened'
                            })
                        } else {
                            //console.log(chatss);
                            response.status(200).send({
                                status: 'success',
                                chats: chatss
                            });
                        }
                    });
                });
            }

        });
    }

};

module.exports = controller;