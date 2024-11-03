const Note = require("../models/note")
const User = require("../models/user")

const postNote = async (req,res) => {
    try{
        const userId = req.params.userId;
        const {note_description} = req.body;
        const newNote = new Note({
            note_description:note_description,
            user_id:userId
        })

        await newNote.save()
        res.status(200).json(newNote);
     }
     catch(err){
         console.log(err);
     }
}

const getAllNotes = async (req,res) => {

    const userId = req.params.userId;

    try{
       const allNotes = await Note.find({user_id:userId})
       console.log("ALLNOTES:",allNotes);
       
       res.status(200).json(allNotes);
    } 
    catch (err) {
      console.log(err)  
    }
}

const getNoteById = async (req,res) => {
    try{
      const noteId = req.params.id;
      const note = await Note.find({_id:noteId})
      res.status(200).json(note);
    }
    catch(err){
        console.log(err);
    } 
}

const updateNote = async (req,res) => {
    try{
     const noteId = req.params.id;
     const description = req.body.note_description;
     const updateNote = await Note.findByIdAndUpdate(noteId, {note_description:description}, {new:true})
     if(!updateNote){
        return res.json("Cannot find the note to update")
     }
     res.status(200).json({
        message: "Note was updated Successfully!",
        note: updateNote
    });
    }
    catch(err){
     console.log(err);
    }
}

const removeNote = async (req,res) => {
    try {
       const noteId = req.params.id;
       const deleteNote = await Note.findByIdAndDelete(noteId)
       if(!deleteNote){
          return res.status(404).json("Cannot find note to Delete")
       }
       res.status(200).json(
        {message:"Note Deleted Successfully!",
         note:deleteNote
        }) 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {postNote, getAllNotes, getNoteById, updateNote, removeNote};