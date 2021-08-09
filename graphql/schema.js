
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { Register, Login ,AddPost ,AddComment } = require('./Mutations');
const { Users , user ,Posts , post } = require('./Queries');


//define querytype
const QueryType = new GraphQLObjectType({
    name : 'QueryType',
    description : 'Queries',
    fields : { Users ,user ,Posts , post }
});

//define mutationtype
const MutationType = new GraphQLObjectType({
    name : 'MutationType',
    description : 'Mutations',
    fields : { Register , Login , AddPost ,AddComment}
});

module.exports = new GraphQLSchema({
    query : QueryType,
    mutation : MutationType    
});