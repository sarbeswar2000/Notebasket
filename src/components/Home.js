import React from "react";
import Notes from "./Notes";
export default function Home() {
  return (
    <div>
      {!localStorage.getItem("token") ? (
        <div>hi this is home page</div>
      ) : (
        <Notes />
      )}
    </div>
  );
}
