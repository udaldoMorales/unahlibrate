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
        var fileSplit = filePath.split('\\') //Para linux es /
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
            console.log(chats.length);
            console.log(err);
            user.populate(chats, { path: 'users' }, (errr, chatss) => {
                if (err || errr || !chats) {
                    console.log(errr);
                    response.status(500).send({
                        status: 'error',
                        message: 'Something happened'
                    })
                } else {
                    console.log(chatss);
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

        book.findOneAndUpdate({ _id: chatID }, { deleted: true }, { new: true }, (err, deletedChat) => {
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
    }

};

module.exports = controller;