'use strict'
var validator = require('validator');
const user = require('../models/user');
const book = require('../models/book');
var fs = require('fs');
var path = require('path');

const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');

var controller = {

    //1. Guardar libros en la base de datos
    saveBook: (request, response) => {

        var params = request.body;


        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateCondition = !validator.isEmpty(params.condition);
            //var validatePrice = !validator.isEmpty(params.price);
        } catch (err) {
            console.log(err);
            return response.status(400).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }

        if (validateTitle && validateCondition) {
            var bookToSave = new book();
            bookToSave.title = params.title;
            bookToSave.autor = params.autor;
            bookToSave.edition = params.edition;
            bookToSave.genre = params.genre;
            bookToSave.condition = params.condition;
            bookToSave.description = params.description;
            bookToSave.user = params.user;
            bookToSave.price = params.price;
            //bookToSave.tags = params.tags;

            bookToSave.save((err, bookSaved) => {
                if (err || !bookSaved) {
                    return response.status(400).send({
                        status: 'error',
                        message: 'El libro no se ha podido guardar'
                    });
                } else {
                    return response.status(200).send({
                        status: 'success',
                        book: bookSaved
                    })
                }
            });
        } else {
            return response.status(401).send({
                status: 'error',
                message: "Los datos no son validos"
            });
        }
    },

    //2a. Obtener todos los libros de la base
    getBooks: (request, response) => {

        book.find({ deleted: 'false' }).sort('-date').exec((err, books) => {
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver los libros'
                });
            } else if (!books || books.length == 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay libros que devolver.'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    books
                })
            }
        });
    },
    //2b. Obtener los últimos libros (dependiendo del número que sean necesarios) de la base.
    getLastBooks: (request, response) => {

        var last = request.params.last;

        book.find({ deleted: 'false' }).limit( parseInt(last) ).sort('-date').exec((err, books) => {
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver los libros'
                });
            } else if (!books || books.length == 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay libros que devolver.'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    books
                })
            }
        });
    },
    //3. Obtener libro por ID
    getBookByID: (request, response) => {
        var bookID = request.params.id;

        book.findById(bookID, (err, foundBook) => {
            user.populate(foundBook, {path:'user'}, (errr, foundBook) => {
                if (err || !foundBook || foundBook == undefined) {
                    return response.status(404).send({
                        status: 'error',
                        message: 'No se encuntra ese libro'
                    });
                } else {
                    return response.status(200).send({
                        status: 'success',
                        book: foundBook
                    });
                }
            });
        });
    },
    //4. Obtener libros disponibles de un determinado usuario
    getBooksUser: (request, response) => {

        var userID = request.params.id;
        /*
        book.find({ user: userID, deleted: 'false' }).sort('-date').exec((err, books) => {
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver los libros'
                });
            } else if (!books || books.length == 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay libros que devolver para ese usuario'
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    books
                })
            }
        });
        */
        book.find({ user: userID, deleted: 'false' }, (err, books)=>{
            user.populate(books, { path: "user" }, (err, booksN)=>{
            if (err) {
                return response.status(400).send({
                    status: 'error',
                    message: 'Error al devolver los libros'
                });
            } else if (!booksN || booksN.length == 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'No hay libros que devolver para ese usuario'
                });
            } else { 
                return response.status(200).send({
                    status: 'success',
                    books:booksN
                });
            }
        });
    });
    },
    //5. Cargar imagen del libro
    uploadImageBook: (req, res) => {
        console.log("Entre aqui");
        //configurar el modulo connect multiparty router/book_routes.js Listo!!

        // Recoger el archivo de la peticion
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
                    book: bookUpdate
                });
            });
        }
    },

    uploadBookImageGoogle: (req, res) => {

    var bookID = req.params.id;

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

    },

    //6. Obtener imagen de un libro por el nombre de la misma
    getImageBook: (req, res) => {
        var file = req.params.image;
        var pathFile = './uploads/books/' + file;
        console.log(pathFile);
        fs.stat(pathFile, (err, exists) => {

            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'imagen no encontrada',
                    error:err
                });
            } else {
                return res.sendFile(path.resolve(pathFile));
            }
        });
    },

    //7. Buscar libros de acuerdo al titulo, autor y descripcion
    searchBooks: (request, response) => {
        var valueToSearch = request.params.search;
        book.find({
            "$or": [
                {
                    "title": { "$regex": valueToSearch, "$options": "i" },
                }, {
                    "autor": { "$regex": valueToSearch, "$options": "i" },
                },
                {
                    "description": { "$regex": valueToSearch, "$options": "i" }
                },
               
            ]
        }).sort([['date', 'descending']]).exec((err, books) => {
            if (err) {
                return response.status(500).send({
                    status: 'error',
                    message: 'error en la peticion'
                });
            }
            if (!books || books.length <= 0) {
                return response.status(404).send({
                    status: 'error',
                    message: 'no hay libros para mostrar con esa busqueda'
                });
            }
            return response.status(200).send({
                status: 'success',
                books
            });
        });
    },
    //8. Eliminar un libro de manera logica por el ID
    deleteBook: (request, response) => {
        var bookID = request.params.id;

        book.findOneAndUpdate({ _id: bookID }, { deleted: true }, { new: true }, (err, deletedBook) => {
            if (err || !deletedBook) {
                return response.status(404).send({
                    status: 'error',
                    message: "El libro no ha podido eliminar."
                });
            } else {
                return response.status(200).send({
                    status: 'success',
                    book: deletedBook
                })
            }
        });
    },

    //9. Actualizar un libro por su ID
    updateBook: (request, response) => {
        var bookID = request.params.id;

        var params = request.body;

        console.log(params);
        //Validar los datos

        book.findOneAndUpdate({ _id: bookID }, params, { new: true }, (err, updatedBook) => {
            if (err) {
                return response.status(500).send({
                    status: 'error',
                    message: "error al actualizar"
                });
            }
            if (!updatedBook) {
                return response.status(404).send({
                    status: 'error',
                    message: "no existe el articulo"
                });
            }

            return response.status(200).send({
                status: 'success',
                book: updatedBook
            });
        });
    }
};


module.exports = controller;