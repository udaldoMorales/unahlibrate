'use strict'
const bcrypt = require('bcrypt'); // usar herramienta bycrypt
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,
    password: String,
   // name: String,
   // lastname: String,
    email: String,
    date: {type: Date,default: Date.now},
    
});



module.exports = mongoose.model('User', UserSchema);

