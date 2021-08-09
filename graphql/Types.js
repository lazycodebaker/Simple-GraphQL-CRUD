
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const { User,Post,Comment } = require('../models/index');

const UserType = new GraphQLObjectType({
    name : 'User',
    description : 'UserType',
    fields : ()=>({
        id : { type : GraphQLID },
        username : { type : GraphQLString },
        email : { type : GraphQLString },
        displayName : { type : GraphQLString }
    })    
});

const PostType = new GraphQLObjectType({
    name : 'Post',
    description : 'PostType',
    fields : ()=>({
        id : { type : GraphQLID },
        title : { type : GraphQLString },
        body : { type : GraphQLString },
        user : {
            type : UserType,
            resolve(parent,args){
                return User.findById(parent.userID)
            }
        },
        comments : {
            type : GraphQLList(CommentType),
            resolve(parent,args){
                return Comment.findById({ postID : parent.id})
            }
        }        
    })    
});

const CommentType = new GraphQLObjectType({
    name : 'CommentType',
    description : 'CommentType',
    fields : ()=>({
        id : { type : GraphQLID },
        comment : {type : GraphQLString },
        user : {
            type : UserType,
            resolve(parent,args){
                return User.findById(parent.userID)
            }
        },
        post : {
            type : PostType,
            resolve(parent,args){
                return Post.findById(parent.postID)
            }
        }
    })
});

module.exports = { UserType , PostType, CommentType };