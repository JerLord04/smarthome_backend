const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const Token = req.body
    console.log(Token.token);
    if(!Token){
        const msg = {
            status : false,
            txt : "required_token"
        }
        return res.send(msg);
    }
    try {
        const decoded = jwt.verify(Token.token,process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        const msg = {
            status : false,
            txt : "invalid_token"
        }
        return res.send(msg)
    }
    return next();
}

module.exports = verifyToken;