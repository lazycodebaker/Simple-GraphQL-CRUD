
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { Register, Login ,AddPost ,AddComment ,updatePost,deletePost } = require('./Mutations');
const { Users , user ,Posts , post , Comments , userComment} = require('./Queries');


//define querytype
const QueryType = new GraphQLObjectType({
    name : 'QueryType',
    description : 'Queries',
    fields : { Users ,user ,Posts , post ,Comments , userComment}
});

//define mutationtype
const MutationType = new GraphQLObjectType({
    name : 'MutationType',
    description : 'Mutations',
    fields : { Register , Login , AddPost ,AddComment ,updatePost,deletePost }
});

module.exports = new GraphQLSchema({
    query : QueryType,
    mutation : MutationType    
});