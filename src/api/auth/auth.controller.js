const User = require("../models/users/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req,res)=>{
    user = await User.findOneAndUpdate({username:req.body.username},{is_active:true});

    if( user ){
        bcrypt.compare(req.body.password,user.password, function(err, resp) {
            if(err){
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
               }else if(resp){
                     let payload = {
                         user_id : user._id,
                         username : user.username
                     }
                     let token = jwt.sign(payload, process.env.SESSION,{expiresIn : process.env.EXPIRESIN});
                    return res.status(200).json({auth : true, token : token, message : "User Logged In Successfully"});
            }
            else{
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
            }
        });
    }
};

//sign in ==============================================

exports.signin = async (req,res)=>{
    User.findOneAndUpdate({username:req.body.username},{is_active:false})
    .exec((err,notes)=>{
        if(err){
            return res.status(500).json({message : err});
        }

        res.status(200).json({auth : false, token : null, message : "User Logged out Successfully"});
    })
}