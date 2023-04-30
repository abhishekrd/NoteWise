import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Note = () => {

  const navigate = useNavigate()
  const [notes, setNotes] = useState([]);
  const [noteDesc, setNoteDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [note, setNote] = useState("");
  const [add, setAdd] = useState(false);
  const [authUser, setAuthUser] = useState("");
  const [token, setToken] = useState("")
  const [show, setShow] = useState(false);


  const getAllNotes = async () => {
    try {
      const data = await fetch(`http://localhost:5000/notes/${authUser.user_id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      });
      const res = await data.json();
      const sortedRes = await res && res.sort((a, b) => a.notes_id - b.notes_id);
      console.log(sortedRes);
      setNotes(sortedRes)

    }
    catch (err) {
      console.log(err);
    }
  }

  const getUser = () => {

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("jwt");
      if (!user || !token) {
        navigate("/")
        return alert("please Log in first!")
      }
      setAuthUser(user);
      // console.log(authUser);
      setToken(token);

    }
    catch (err) {
      console.log(err);
    }
  }

  const editHandler = async () => {
    try {
      const editedNote = await fetch(`http://localhost:5000/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          note_description: noteDesc
        })
      })
      console.log(editedNote);
      getAllNotes()
      setNoteDesc("");
      setEdit(false)
    } catch (err) {
      console.log(err);
    }
  }

  const editor = (noteId) => {
    setEdit(true);
    setId(noteId);
    console.log(noteId);
  }

  const deletor = async (noteId) => {
    setId(noteId);
    console.log(id);
    console.log(noteId);
    if (window.confirm("Are you sure to delete the note?")) {
      try {
        const deleted = await fetch(`http://localhost:5000/note/${noteId}`, {
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        })
        console.log(deleted);
        getAllNotes();
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      return;
    }
  }

  const addNote = async (req, res) => {
    try {
      const addedNote = await fetch(`http://localhost:5000/note/${authUser.user_id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          note_description: note
        })
      })
      getAllNotes();
      console.log(addedNote);
      setAdd(false)
      setNote("")
    } catch (error) {
      console.log(error);
    }
  }

  const adder = () => {
    setAdd(true);
  }

  const showProfile = () => {
    setShow(!show);
  }

  const logoutHandler = () => {
    window.localStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    // getUser();
    // authUser && getAllNotes();
    const persistData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.log(error);
      }
    }
    persistData();
  }, [])

  useEffect(() => {
    const getTheData = async () => {
      try {
        authUser && await getAllNotes();
      } catch (error) {
        console.log(error);
      }
    }

    getTheData();

  }, [authUser])



  return (

    <div className='md:m-16 md:p-16 p-4 m-2 bg-blue-100 rounded-xl shadow-xl'>
      <div className='flex justify-between items-start'>
        <p className='text-2xl font'>Hello <br></br><span className='text-blue-600'>{authUser.name}!</span></p>

        {show ? <div className='flex justify-center items-center flex-col'>
          <span onClick={showProfile} className="material-symbols-outlined cursor-pointer text-red-800">
            cancel
          </span>
          <div className='flex justify-center items-center flex-col bg-white rounded-lg p-4 shadow-lg'>
            <p className='font'>{authUser.name}</p>
            <p className='font'>{authUser.email}</p>
            <button onClick={logoutHandler} className='exploreBtn font' id='cancelBtn'>Logout</button>
          </div>
        </div> : <div className='flex justify-center items-center flex-col'>
          <span onClick={showProfile} className="material-symbols-outlined text-4xl cursor-pointer">
            account_circle
          </span>

        </div>}


      </div>
      <div className='flex justify-between items-center md:flex-row flex-col my-8'>
        <p className='text-4xl font'><span className="text-blue-600">Note</span>Wise</p>
        <button className='exploreBtn font hover:shadow-lg' id='saveBtn' onClick={adder} >Add Note +</button>

      </div>
      {add ? <div className='flex justify-around items-center md:flex-row flex-col gap-2 my-6'>
        <input type='text' onChange={(e) => setNote(e.target.value)} className='w-[90%]  border-2 px-4 py-3 font hover:shadow-lg outline-none focus:shadow-lg focus:border-2 focus:border-blue-600 rounded-xl transition-all transition-duration-300' placeholder='Enter your Note here...'></input>
        <div className='flex justify-center items-center gap-1'><button className='exploreBtn font hover:shadow-lg ' id='save' onClick={addNote} >Save</button> <button className='exploreBtn font hover:shadow-lg hover:bg-red-400' id='cancel' onClick={(e) => setAdd(false)} >Cancel</button></div>
      </div> : ""}
      <div className='flex justify-center items-center flex-col md:grid md:grid-cols-3'>
        {notes.map(note => {
          return <div className='rounded-2xl md:p-12 md:m-8 p-4 m-3 bg-white flex items-start flex-col justify-start shadow-lg' key={note.notes_id}>
            <div className='flex justify-end items-center gap-2 py-4'><button className='' onClick={() => editor(note.notes_id)}><span className="material-symbols-outlined">
              edit
            </span></button>
              <button className='' onClick={() => deletor(note.notes_id)}><span className="material-symbols-outlined">
                delete
              </span></button></div>
            <p className='text-xl font'>{note.note_description}</p>

            {edit && note.notes_id === id ? <> <input className='px-4 my-2 border-2 focus:shadow-lg transition-all ease-in transition-duration-300 rounded-lg font outline-none active:border-2 focus:border-2 focus:border-blue-500 active:border-blue-500 py-2' onChange={(e) => setNoteDesc(e.target.value)} placeholder='edit note...'></input><div className='flex justify-center items-center gap-2'><button className='exploreBtn font hover:shadow-lg' id='saveBtn' onClick={editHandler} >Save</button> <button className='exploreBtn font hover:shadow-lg hover:bg-red-400' id='cancelBtn' onClick={(e) => setEdit(false)} >Cancel</button></div></> : ""}

          </div>
        })}
      </div>
    </div>
  )
}

export default Note