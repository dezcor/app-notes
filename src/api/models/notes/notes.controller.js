const Note = require('./notes.model');
const User = require('../users/users.model');
var ObjectId = require("mongoose").Types.ObjectId

exports.create = async (req,res) =>{
    user_id = req.body.user_id;

    User.findOne({_id:user_id}).exec(async (err,user) =>{
        if(err){
            return res.status(500).json({message : err});
        }
        if( !user)
            res.status(400).json({message:"User Detail fetched faild"})
        
        note = await Note({
            "user_id" : ObjectId(user_id),
            "note": req.body.note})
        await note.save()
        
        res.status(200).json({ message: "Note add to User Successfully", data : note});
    });
    
};

exports.findAll = async (req,res) =>{
    user_id = req.body.user_id;

    Note.find({user_id:user_id}).populate('user_id').exec((err,notes)=>{
        if(err){
            return res.status(500).json({message : err});
        }

        res.status(200).json({ message: "Notes Details at User, fetched Successfully", data : notes});
    })
    
}

exports.findOne = async (req,res) =>{
    user_id = req.body.user_id;
    note_id = req.params.id;
    Note.findOne({user_id:user_id,_id:note_id}).exec((err,notes)=>{
        if(err){
            return res.status(500).json({message : err});
        }

        res.status(200).json({ message: "Notes Details at User, fetched Successfully", data : notes});
    })
    
};

exports.update = async (req,res) =>{
    user_id = req.body.user_id;
    note_id = req.params.id;
    Note.findOneAndUpdate({user_id:user_id,_id:note_id},{note:req.body.note}).exec((err,notes)=>{
        if(err){
            return res.status(500).json({message : err});
        }

        res.status(200).json({ message: "Notes Update Details at User, fetched Successfully", data : notes});
    })
    
};

exports.delete = async (req,res) =>{
    note_id = req.params.id;

    Note.findByIdAndDelete(note_id).exec((err,note)=>{
        if(err)
            return res.status(500).json({message : err});

        res.status(200).json({ message: "Notes was Delete Successfully", data : note});
    })
}
