const pool = require("../db")

const postNote = async (req,res) => {
    try{
        const userId = req.params.userId;
        const {note_description} = req.body;
        const newNote = await pool.query("INSERT INTO Notes (note_description, user_id) VALUES($1,$2) RETURNING *",[note_description, userId])
        res.json(newNote.rows);
     }
     catch(err){
         console.log(err);
     }
}

const getAllNotes = async (req,res) => {

    const userId = req.params.userId;

    try{
       const allNotes = await pool.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
       res.json(allNotes.rows);
    } 
    catch (err) {
      console.log(err)  
    }
}

const getNoteById = async (req,res) => {
    try{
      const noteId = req.params.id;
      const note = await pool.query("SELECT * FROM notes WHERE notes_id = $1",[noteId]);
      res.json(note.rows);
    }
    catch(err){
        console.log(err);
    } 
}

const updateNote = async (req,res) => {
    try{
     const noteId = req.params.id;
     const description = req.body.note_description;
     const updatenote = await pool.query("UPDATE notes SET note_description = $1 WHERE notes_id = $2",[description,noteId]);
     res.json("Note was updated Successfully!");
    }
    catch(err){
     console.log(err);
    }
}

const removeNote = async (req,res) => {
    try {
       const noteId = req.params.id;
       const deleteNote = await pool.query("DELETE FROM notes WHERE notes_id = $1",[noteId]);
       res.json("Note Deleted Successfully!") 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {postNote, getAllNotes, getNoteById, updateNote, removeNote};