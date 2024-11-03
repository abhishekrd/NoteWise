const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
      note_description:{
        type:String,
        required:true
      },
      user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      }
})

module.exports = mongoose.model('Note',noteSchema);