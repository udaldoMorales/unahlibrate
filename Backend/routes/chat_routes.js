'use strict'
var express = require('express');
var UserController = require('../controllers/user');
var BookController = require('../controllers/book');
var ChatController = require('../controllers/chat');
var router = express.Router();

//Varibles necesarias para subir imagenes del chat

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'./uploads/chats'});
 

router.post('/save-book',BookController.saveBook);
router.get('/books',BookController.getBooks);
router.get('/book/:id',BookController.getBookByID);
router.get('/books-user/:id',BookController.getBooksUser);
router.post('/upload-book-image/:id',md_upload,BookController.uploadImageBook);
router.get('/get-book-image/:image',BookController.getImageBook);
router.get('/search-books/:search',BookController.searchBooks);
router.post('/delete-book/:id',BookController.deleteBook);
router.put('/update-book/:id', BookController.updateBook);




module.exports = router;