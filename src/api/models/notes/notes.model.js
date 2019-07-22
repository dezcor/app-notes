const {Schema,model} = require('mongoose')

var notes = new Schema({
    "user_id" : {type : Schema.Types.ObjectId,ref: 'User'},
    "title": {type: String,default: "title"},
    "note": String,
    "create_date": { type: Date, default: Date.now }
})

module.exports = model('Notes',notes);