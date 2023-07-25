
import NoteContext from "./NoteContext";
import { useState } from "react";
  const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
//Get all notes
const getallNote = async () => {
  // to do api call
  const response = await fetch(
    `${host}/api/notes/fetchallnotes`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      // body: JSON.stringify({title,description}),
    }
    );
    const result=await response.json();
     setNotes(result)
  
};
  // Add notes
  const addNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(
      `${host}/api/notes/addnotes`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },

        body: JSON.stringify({title,description}),
      }
    );
     
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // Delete Notes
  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenotes/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },  
      }
    );
    const result=await response.json();
    console.log(result);
    // setNotes(result);
    // const values = Object.values(notes);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes({newNotes});    
  };
  //Edit note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(
      `${host}/api/notes/updatenotes/${id}`,
      {
        method:"PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },

        body: JSON.stringify({title,description,tag}),
      }
    );
    //  const json= response.json();
    // logic to edit in clients
 let Newnotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index <Newnotes.length; index++) {
      const element = Newnotes[index];
      if (element._id === id) {
        Newnotes[index].title = title;
        Newnotes[index].description = description;
        Newnotes[index].tag = tag;
        break;
      }  
    }
    setNotes(Newnotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote,deleteNote,getallNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState; 


