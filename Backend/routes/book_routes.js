'use strict'
var express = require('express');
var UserController = require('../controllers/user');
var BookController = require('../controllers/book');
var router = express.Router();

const book = require('../models/book');
//Varibles necesarias para subir imagen del libro

//
const fs = require('fs');

const uuid = require('uuid');

const path = require('path');

const multer = require('multer');

let storage = multer.diskStorage({
	destination: 'uploads/books',
	filename: (req, file, cb) => {
		cb(null, uuid.v4() + path.extname(file.originalname));
	}
});

const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');
//

let upload = multer({storage: storage});

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'./uploads/books'});


router.post('/save-book',BookController.saveBook);
router.get('/books',BookController.getBooks);
router.get('/book/:id',BookController.getBookByID);
router.get('/books-user/:id',BookController.getBooksUser);
router.post('/upload-book-image/:id',md_upload,BookController.uploadImageBook);
router.get('/get-book-image/:image',BookController.getImageBook);
router.get('/search-books/:search',BookController.searchBooks);
router.post('/delete-book/:id',BookController.deleteBook);
router.put('/update-book/:id', BookController.updateBook);

//Probando con Google
router.post('/upload-book-image-google/:id', md_upload, BookController.uploadBookImageGoogle);

/*
router.post('/upload-image-book/:id', upload.single('file0'), (req, res) => {

        console.log("Entre aqui");
        //configurar el modulo connect multiparty router/book_routes.js Listo!!

        // Recoger el archivo de la peticion
        var fileName = 'imagen no subida';
        var file = req.file;
        if (!file) {
            return res.status(404).send({
                status: 'error',
                message: fileName
            });
        }
        //Conseguir el nombre y la extension del archivo
        var filePath = req.file.path;
        var fileSplit = filePath.split(`${path.sep}`) //Para linux es /

        //Nombre del archivo
        fileName = fileSplit[fileSplit.length- 1];
        //Extension del archivo
        var extensionSplit = fileName.split('\.');
        var fileExtension = extensionSplit[extensionSplit.length - 1];
        //Comprobar con la extension, solo imagenes, si no es valida borrar el fichero
        if
            (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif') {
            //borrar el archivo
            fs.unlink(filePath, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'extension de la imagen invalida'
                });
            });
        } else {
            //Si todo es valido, sacar ide de la URL
            var bookID = req.params.id;
            //Si todo es valido, buscar el articulo, asiganar le la imagen y actulizarlo
            book.findOneAndUpdate({ _id: bookID }, { image: fileName }, { new: true }, (err, bookUpdate) => {

                if (err || !bookUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'error al guardar la imagen del libro'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    filePath,
                    book: bookUpdate
                });
            });
        }

});
*/

router.post('/upload-image-book/:id', upload.single('file0'), (req, res) => {

	var bookID = req.params.id;

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
    console.log(filePath);
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
                'parents': ['1KsPknf51p4ydsMylnWBNM3rUDG9skEba'], //Id de la carpeta books
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

                                book.findOneAndUpdate({ _id: bookID }, { image: fileLink }, { new: true }, (err, bookUpdate) => {

                                        if (err || !bookUpdate) {
                                            return res.status(404).send({
                                                status: 'error',
                                                message: 'error al guardar la imagen del perfil'
                                            });
                                        }
                                        return res.status(200).send({
                                            status: 'success',
                                            book: bookUpdate
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
