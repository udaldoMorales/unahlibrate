'use strict'
const bcrypt = require('bcrypt'); // usar herramienta bycrypt
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    phone: {
        type:String,
        default:''
    },
    ubication: {
        type:String,
        default:''
    },
    imageProfile : {
        type:String,default: ''
    },
    verified: {
        type: Boolean, default: false
    },
    date: {type: Date,default: Date.now},
    restoreToken: String
});



module.exports = mongoose.model('User', UserSchema);

