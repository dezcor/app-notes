const {Schema,model}= require('mongoose')

var notes = new Schema({
    "username": String,
    "email" : String,
    "password": String,
    "is_active": {
        type: Boolean,
        default: true
     },
    "create_date": { type: Date, default: Date.now }
})

module.exports = model('User',notes);