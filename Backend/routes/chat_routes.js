'use strict'
var express = require('express');
var UserController = require('../controllers/user');
var BookController = require('../controllers/book');
var ChatController = require('../controllers/chat');
var router = express.Router();

//Varibles necesarias para subir imagenes del chat

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'./uploads/chats'});

router.get('/get-chats-and-more/:userid', ChatController.getChatsAndMore);
router.get('/get-chats/:user', ChatController.getChats);
router.get('/get-chat/:id', ChatController.getChat);
router.post('/upload-image',md_upload,ChatController.updloadImage);
router.get('/get-chatImage/:image',ChatController.getImageMessage);

router.post('/seen-messages', ChatController.seenMessages);

module.exports = router;