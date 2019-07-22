const User = require("../models/users/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req,res)=>{
    User.findOne({username:req.body.username}).exec((err,user)=>{
        console.log(user)
        if(err || !user){
            return res.status(401).json({auth : false, token : null, message : "Username or password incorrect"});
        }
        bcrypt.compare(req.body.password,user.password, function(err, resp) {
            if(err){
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
               }else if(resp){
                     let payload = {
                         user_id : user._id,
                         username : user.username,
                         admin : user.is_admin
                     }
                     let token = jwt.sign(payload, process.env.SESSION,{expiresIn : process.env.EXPIRESIN});
                    return res.status(200).json({id: user._id, username: user.username,token: token });
            }
            else{
                return res.status(401).json({auth : false, token : null, message : "Not Authorised User"});
            }
        });
    })
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