import React from "react";
import { useContext ,useEffect} from "react";

import notecontext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
export default function Notes() {
  const context = useContext(notecontext);
  const { notes ,getallNote} = context;
   useEffect(()=>{
    getallNote();
   },[])
  return (
    <div>
          <AddNote/>
      <div className="row  my-3">
        <h2>Your note</h2>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} note={notes}/>
        })}
      </div>
    </div>
  );
}
