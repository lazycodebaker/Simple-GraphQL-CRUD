
//IMPORTING MODULES
const express =  require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db/index');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticateToken } = require('./middleware/authenticate');

//DOTENV CONFIG
dotenv.config();

//APP
const app = express();

//DB
const URI = process.env.MONGO_URI;
connectDB(URI);

app.use(authenticateToken);

//simple route
app.get('/' , (req , res)=>{
    console.log(req.verifiedUser);
    res.json({msg : "Welcome to social Backend .."});
});

//GRaphiql UI
app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql : true
}));

//AUTH JWT
app.use('/auth',(req,res)=>{
});

//PORT LISTEN
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server Running on PORT :: ${PORT}`)
});