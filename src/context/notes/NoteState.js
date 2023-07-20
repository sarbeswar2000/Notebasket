
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYyYjAzY2UzMzgxYjIzN2FiNWQ0In0sImlhdCI6MTY4OTYwOTg5MX0.EWYOjH4I4jSffIiVerj46bKG6gAb9HnPqZKumgEYGyg"
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
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYyYjAzY2UzMzgxYjIzN2FiNWQ0In0sImlhdCI6MTY4OTYwOTg5MX0.EWYOjH4I4jSffIiVerj46bKG6gAb9HnPqZKumgEYGyg"
        },

        body: JSON.stringify({title,description}),
      }
    );
     
    const note = {
      _id: "64b56887bc4c5db4e61wdefddst",
      user: "64b562b03ce3381b237ab5d4",
      title: title,
      description: description,
      tag: tag,
      date: "2023-07-17T16:12:55.186Z",
      __v: 0,
    };
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
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYyYjAzY2UzMzgxYjIzN2FiNWQ0In0sImlhdCI6MTY4OTYwOTg5MX0.EWYOjH4I4jSffIiVerj46bKG6gAb9HnPqZKumgEYGyg"
        },

        
      }
    );
    const result=await response.json();
    setNotes(result);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(
      `${host}/api/notes/updatenotes/${id}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYyYjAzY2UzMzgxYjIzN2FiNWQ0In0sImlhdCI6MTY4OTYwOTg5MX0.EWYOjH4I4jSffIiVerj46bKG6gAb9HnPqZKumgEYGyg"
        },

        body: JSON.stringify({title,description,tag}),
      }
    );
    //  const json= response.json();

    // logic to edit in clients

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getallNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
