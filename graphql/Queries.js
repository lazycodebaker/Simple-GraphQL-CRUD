
const { GraphQLList, GraphQLString, GraphQLID } = require('graphql');
const { UserType ,PostType, CommentType } = require('./Types');
const { User,Post, Comment } = require('../models/index');

const Users = {
    type : new GraphQLList(UserType),
    description : "All Users List",
    resolve(parent,args){
        return User.find();
    },
};

const user = {
    type : UserType,
    description : "Get One User Using it's ID ",
    args : { 
        id : { type : GraphQLID }
    },
    resolve(parent,args){
        return User.findById(args.id)
    }
};

const Posts = {
    type : new GraphQLList(PostType),
    description : "Get All Posts",
    resolve(parent,args){
        return Post.find()
    }
};

const post = {
    type : PostType,
    description : "get Post Of User",
    args : {
        id : { type : GraphQLID }
    },
    resolve(parent,args){
        return Post.findById(args.id)
    }
};


const Comments = {
    type : new GraphQLList(CommentType),
    description : "Get All Comments",
    resolve(parent,args){
        return Comment.find()
    }
};

const userComment = {
    type : CommentType,
    description : "get Comment Of User",
    args : {
        id : { type : GraphQLID }
    },
    resolve(parent,args){
        return Comment.findById(args.id)
    }
}

module.exports = { Users ,user , Posts , post , Comments , userComment };