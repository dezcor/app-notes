const bcrypt = require('bcrypt')
const User = require("./users.model");
const saltRounds = 10;
const data = {_id:"",username:"",email:"",create_date:"",is_active:""}

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
            res.json({ message: "Users Details fetched Successfully"});
          });
        
    }
    else
    {
        res.json({"message":"El usuario ya existe"})
    }
};

exports.findAll = async (req,res)=>{
    await User.find({},data,(err,users)=>{
        if(err){
            return res.status(401).json({message : err});
        }
        res.status(200).json({ message: "Users Details fetched Successfully", data : users});
    });
};

exports.findOne = async (req,res)=>{
    User.findOne({_id:req.params.id},data).exec((err,user) =>{
        if(err){
            return res.status(500).json({message : err});
        }

        if( user=== null)
            res.status(400).json({message:"User Detail fetched faild"})
        res.status(200).json(user);
    });
};

exports.delete = async (req,res)=>{
    is_admin = req.body.is_admin;
    if(is_admin){
        id  = req.params.id;
        users = await User.findByIdAndRemove(id);
        console.log(users)
        if(users)
            res.status(200).json({"message":"the user was remove at list"});
        else
            res.status(400).json({"message":"the user not exist"})
    }else{
        res.status(400).json({"message":"you don't have permission"})
    }
};