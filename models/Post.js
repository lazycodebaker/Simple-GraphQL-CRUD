
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userID : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
},{
    timestamps : true
});

module.exports = mongoose.model('Post',PostSchema);