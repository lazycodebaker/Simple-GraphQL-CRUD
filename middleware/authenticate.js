
const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next)=>{

    const token = req.headers.authorization;

    try{
        const verified = jwt.decode(token,'123454');
        req.verifiedUser = verified;
        next();
    }
    catch(err){
        console.log('Verfication Failed');
        next();
    };
};

module.exports = { authenticateToken };