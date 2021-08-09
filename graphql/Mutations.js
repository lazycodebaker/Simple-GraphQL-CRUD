
const { GraphQLString, GraphQLID } = require('graphql');
const { User,Post,Comment } = require('../models/index');
const { PostType ,CommentType } = require('./Types');
const { createJwtToken } = require('../utils/auth');

const Register = {
    type : GraphQLString,
    description : "Register a new User",
    args :{
        username : {type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString },
        displayName : { type : GraphQLString } 
    },
    async resolve(parent,args){
        const { username , email , password , displayName } = args;
        const newUser = new User({
            username ,
            email ,
            password ,
            displayName
        });

        await newUser.save();
        const token = createJwtToken(newUser);
        return token;
    }
};

const Login = {
    type : GraphQLString,
    description : "Login a user",
    args:{
        email : { type : GraphQLString },
        password : { type : GraphQLString }
    },
    async resolve(parent,args){
        const user = await User.findOne({ email : args.email }).select('+password');

        if(!user || args.password !== user.password){
            throw new Error("Invalid User");
        }

        const token = createJwtToken(user);
        return token;
    }
};

const AddPost = {
    type : PostType,
    description : "Add A New Post",
    args:{
        title : { type :  GraphQLString},
        body : { type :  GraphQLString}        
    },
    resolve(parent,args,{ verifiedUser }){
        if(!verifiedUser){
            throw new Error("User not been Verified .");
        }
        const newPost = new Post({
            userID : verifiedUser.user._id,
            title : args.title,
            body : args.body
        });
        return newPost.save();
    }
};

const updatePost = {
    type : PostType,
    description : "Update User Post",
    args:{
        id : { type : GraphQLID },
        title :{ type : GraphQLString },
        body : { type : GraphQLString }, 
    },
    async resolve(parent,args ,{ verifiedUser }){
        if(!verifiedUser){
            throw new Error("User not authenticated");
        }        
        
        const updatePost = await Post.findOneAndUpdate({
            _id : args.id,
            userID:verifiedUser.user._id            
        },
        { 
            title : args.title ,
            body : args.body 
        },{
            new : true,
            runValidators : true
        });
        
        if(!updatePost){
            throw new Error("No Post found with the given ID");
        }
        return updatePost;        
    }
};


const AddComment = {
    type : CommentType,
    description : "Add A Comment",
    args:{
        comment : { type : GraphQLString },
        postID : { type  : GraphQLString },
    },
    resolve(parent,args,{ verifiedUser }){
        if(!verifiedUser){
            throw new Error("User not been Verified .");
        }

        const newComment = new Comment({
            userID : verifiedUser.user._id,
            comment : args.comment,
            postID : args.postID
        });

        return newComment.save();
    }
};

const deletePost = {
    type : PostType,
    description : "Deleting post",
    args:{
        postID:{ type : GraphQLString }
    },
    resolve(parent,args,{ verifiedUser }){
        const post = await Post.findByIdAndDelete({
            _id:args.id,userID:verifiedUser.user._id
        })
    }
};


module.exports = { Register , Login ,AddPost ,AddComment , updatePost , deletePost};