//Modelo de datos para la entidad de libro
'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = Schema({

    users: {type:Array,require:true},
    messages: [],//String,
    date: { type: Date, default: Date.now },
    deleted:{
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Chat', ChatSchema);

/*
{
        date: { type: Date, default: Date.now },
        content: String,
        sender: {
            type: Schema.ObjectId,
            ref: "User"
        }
    }
*/