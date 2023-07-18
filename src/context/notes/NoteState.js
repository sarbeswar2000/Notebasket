
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const notesInitial=[
    {
      "_id": "64b56887bc4c5db4e61defdd",
      "user": "64b562b03ce3381b237ab5d4",
      "title": "notebook",
      "description": "Lovestory of two unkwon person .....",
      "tag": "general",
      "date": "2023-07-17T16:12:55.186Z",
      "__v": 0
    },
    {
      "_id": "64b56bd211d06214c8cb9142",
      "user": "64b562b03ce3381b237ab5d4",
      "title": "notebook",
      "description": "Lovestory of two unkwon person .....",
      "tag": "general",
      "date": "2023-07-17T16:26:58.141Z",
      "__v": 0
    },
    {
      "_id": "64b56bd211d06214c8cb9144",
      "user": "64b562b03ce3381b237ab5d4",
      "title": "notebook",
      "description": "Lovestory of two unkwon person .....",
      "tag": "general",
      "date": "2023-07-17T16:26:58.737Z",
      "__v": 0
    },
    {
      "_id": "64b56bda11d06214c8cb9146",
      "user": "64b562b03ce3381b237ab5d4",
      "title": "notebook",
      "description": "Lovestory of two unkwon person .....",
      "tag": "general",
      "date": "2023-07-17T16:27:06.252Z",
      "__v": 0
    }
  ]
  const[notes,setNotes]=useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
