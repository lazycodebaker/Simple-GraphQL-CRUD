
const mongoose = require('mongoose');

const connectDB = async (URI)=>{
    const conn = await mongoose.connect(URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    console.log('Connected to Mongo Database...');
};

module.exports = { connectDB };