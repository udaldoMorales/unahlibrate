//Modelo de datos para la entidad de libro
'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({
    
    title: String,
    autor:[],//String,
    date:{type:Date,default:Date.now},
    edition: String,
    condition:{
        type:String
    },
    description: String,
    genre: String,
    user: { //Esta campo hace referencia al usuario al que pertenece el libro, es decir, que publico el libro
        type:Schema.ObjectId,
        ref: "User"
    },
    image:{
        type: String,
        default:''
    },
    sold: {
        type: Boolean,
        default:false
    } 
    
});





module.exports = mongoose.model('Book', BookSchema);
