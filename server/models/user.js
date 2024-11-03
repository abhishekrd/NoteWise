const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:255
    },
    email:{
        type:String,
        unique:true,
        required:true,
        maxLength:255
    },
    password:{
        type:String,
        required:true,
        maxLength:255
    }
})

module.exports = mongoose.model('User', userSchema)