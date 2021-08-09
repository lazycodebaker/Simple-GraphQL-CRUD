
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment :{
        type : String,
        required : true
    },
    userID: {
        type : String,
        required : true        
    },
    postID : {
        type : String,
        required : true
    }
},{ timestamps : true }
);

module.exports = mongoose.model("Comment",CommentSchema);