const jwt =require('jsonwebtoken');


exports.ensureAuthenticated = function(req, res, next) {
    var token = req.headers['x-access-token'];
    console.log(req.url)
    if(!token){
        return res.status(403).json({auth: false, message: "No Token"});
    }

    jwt.verify(token,  process.env.SESSION,{expiresIn : process.env.EXPIRESIN}, function(err, decoded){
        if(err){
             return res.status(401).json({auth: false, message: "Not An Authorized User"+err});
        }
  
        req.body.user_id = decoded.user_id;
        req.body.username = decoded.username;
        next();
    });
}