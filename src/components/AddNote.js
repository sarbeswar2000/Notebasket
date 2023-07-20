import React, { useState } from "react";
import { useContext } from "react";
import notecontext from "../context/notes/NoteContext";
// import Noteitem from "./Noteitem";
function AddNote() {
  const context = useContext(notecontext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });
  const handleOnclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChangeClick = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add note</h2>
      </div>
      <div className="container my-3">
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title "
              onChange={onChangeClick}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={onChangeClick}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleOnclick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
