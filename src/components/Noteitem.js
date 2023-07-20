import React from "react";
import { useContext } from "react";

import notecontext from "../context/notes/NoteContext";
export default function Noteitem(props) {
  const context = useContext(notecontext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <div className="col md-3s">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}

            <i className="far  fa-trash-alt mx-1"onClick={()=>{deleteNote(note._id)}}></i>
            <i className="far fa-edit mx-1 "></i>
          </p>
        </div>
      </div>
    </div>
  );
}
