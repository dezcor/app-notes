const bcrypt = require('bcrypt')
const User = require("./users.model");
const saltRounds = 10;

exports.create = async (req,res)=>{
    isExist = await User.find({$or :[{"email":req.body.email},{"username":req.body.username}]}).count()
    if(!isExist)
    {
        bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
            user = new User({
                "username": req.body.username,
                "email" : req.body.email,
                "password": hash,
            })
            await user.save();
            res.json({ message: "Users Details fetched Successfully",data:user});
          });
        
    }
    else
    {
        res.json({"message":"El usuario ya existe"})
    }
};

exports.findAll = async (req,res)=>{
    await User.find({},(err,users)=>{
        if(err){
            return res.status(401).json({message : err});
        }
        res.status(200).json({ message: "Users Details fetched Successfully", data : users});
    });
};

exports.findOne = async (req,res)=>{
    User.findOne({_id:req.params.id}).exec((err,user) =>{
        if(err){
            return res.status(500).json({message : err});
        }

        if( user=== null)
            res.status(400).json({message:"User Detail fetched faild"})
        res.status(200).json({ message: "User Details fetched Successfully", data : user});
    });
};

exports.delete = async (req,res)=>{
    users = await User.findByIdAndDelete(req.params.id);
    console.log(users)
    if(users)
        res.json({"message":"the user was remove at list"});
    else
        res.json({"message":"the user not exist"})
};