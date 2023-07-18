import Navbar from "./components/Navbar";
import Home from "./components/Home";
import React from "react";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
    <NoteState>
      <Router>
          <Navbar></Navbar>
       <div className="container my3">
          <Routes>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/About" element={<About />}></Route>
          </Routes>
      </div>
      </Router>
        </NoteState> 
    </>
  );
}
 
export default App;
