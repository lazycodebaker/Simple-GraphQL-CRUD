
const jwt = require('jsonwebtoken');

const createJwtToken = (user)=>{
    return jwt.sign({ user },'123454',{
        expiresIn : '30 days'
    })
};

module.exports = { createJwtToken };