'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    date: {type: Date,default: Date.now},
    
});

module.exports = mongoose.model('User', UserSchema);

//articles --> guarda documentos de este tipo y de esta estrcutura dentro de la coleccion