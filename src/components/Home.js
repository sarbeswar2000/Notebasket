import React from "react";
import { useContext } from "react";
import notecontext from "../context/notes/NoteContext";
export default function Home() {
  const context =useContext(notecontext);
  const {notes,setNotes}=context;
  return (
    <div>
      <div className="container my-3">
        <h2>Add note</h2>
      </div>
      <div className="container my-3">
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="container my-3">
        <h2>Your note</h2>
     {notes.map((notes)=>{
          return notes.title;
          
     })}
      </div>
      </div>
    </div>
  );
}
