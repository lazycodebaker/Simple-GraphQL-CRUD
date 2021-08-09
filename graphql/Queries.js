
const { GraphQLList, GraphQLString, GraphQLID } = require('graphql');
const { UserType ,PostType } = require('./Types');
const { User,Post,comment } = require('../models/index');

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
}

module.exports = { Users ,user , Posts , post };