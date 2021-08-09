
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : { 
        type : String,
        required : true,

    },
    password : { 
        type : String,
        required : true,
        select : false
    },
    email    : { 
        type : String,
        required : true,
        unique : true,
        match :[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please Enter A Valid EMail"                       
        ]
    },
    displayName : { 
        type : String,
        required : true,
    }},
    { timestamps : true }
);

module.exports = mongoose.model('User',UserSchema);