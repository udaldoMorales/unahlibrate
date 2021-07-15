'use strict'
var validator = require('validator');
const user = require('../models/user');
const book = require('../models/book');
var fs = require('fs');
var path = require('path');
const { request, response } = require('express');


var controller = {

    //1. Guardar libros en la base de datos
    saveBook: (request, response) => {

        var params = request.body;

        var bookToSave = new book();

        bookToSave.title = params.title;
        bookToSave.autor = params.autor;
        bookToSave.edition = params.edition;
        bookToSave.condition = params.condition;
        bookToSave.description = params.description;
        bookToSave.user = params.user;

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
    },

    //2. Obtener todos lo libros de la base
    getBooks: (request, response) => {

        book.find({}).sort('-date').exec((err, books) => {
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
    },
    //4. Obtener libros de un determinado usuario
    getBooksUser: (request, response) => {

        var userID = request.params.id;

        book.find({ user: userID }).sort('-date').exec((err, books) => {
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
        var fileSplit = filePath.split('\\') //Para linux es /

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
                    user: bookUpdate
                });
            });
        }
    },

    //6. Obtener imagen de un libro con el nombre
    getImageBook: (req, res) => {
        var file = req.params.image;
        var pathFile = './uploads/books/' + file;
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
                }
            ]
        }).sort([['date','descending']]).exec((err,books)=>{
            if(err){
                return response.status(500).send({
                    status: 'error',
                    message:'error en la peticion'
                });
            }
            if(!books || books.length<=0){
                return response.status(404).send({
                    status: 'error',
                    message:'no hay libros para mostrar con esa busqueda'
                });
            }
            return response.status(200).send({
                status: 'success',
                books
            });
        });
    }

};


module.exports = controller;