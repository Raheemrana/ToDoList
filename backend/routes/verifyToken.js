const jwt = require('jsonwebtoken');
const secret = require('../SecretKey')

module.exports = function(req,res,next){
    try{
        var token = req.query.token;
    }catch(e){
        console.log(e)
    }

    if (!token){
        token = req.body.token
    }
    if (!token){
        token = req.body.data.token
    }
    if(!token) return res.status(401).send('Access Denied');

    try{
        console.log("token received")
        //it will return back the user name of logged in user
        const verified = jwt.verify(token, secret);
        console.log('->>>', verified )
        req.user_name = verified._id;
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}