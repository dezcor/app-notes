const router = require('express').Router();

// const Messages = require('../models/messages/messages.model');

//Logger ================================================
require('../auth/auth.router').router(router);

//User rest ============================================
require('../models/users/users.router').router(router);

//notes rest =======================================================
require('../models/notes/notes.router').router(router);

//Mensajes=============================

// router.post("/user/message", async (req,res) =>{
//     Messages.create({
//         "from" : req.body.from,
//         "to" : req.body.to,
//         "message" : req.body.message,
//     },(err,message) =>{
//         if(err){
//             return res.status(500).json({message : err});
//         }
//         res.status(200).json({ message: "Message was send Successfully", data : message});
//     })
    
// })

// router.get("/user/:id/message/:to_id", async (req,res) =>{
//     user_id = req.params.id;
//     to_id = req.params.to_id;
//     Messages.find({$or: [{from:user_id,to:to_id},{from:to_id,to:user_id}]}).exec((err,messages)=>{
//         if(err){
//             return res.status(500).json({message : err});
//         }

//         res.status(200).json({ message: "Message Details at User, fetched Successfully", data : messages});
//     })
    
// })

// router.delete("/user/:id/to/:to_id/message/:ms_id", async (req,res) =>{
//     user_id = req.params.id;
//     to_id = req.params.to_id;
//     ms_id = req.params.ms_id;
//     Messages.findOneAndDelete({_id:ms_id}).exec((err,messages)=>{
//         if(err){
//             return res.status(500).json({message : err});
//         }

//         res.status(200).json({ message: "Messaga delete fetched Successfully", data : messages});
//     })
    
// })




module.exports = router;