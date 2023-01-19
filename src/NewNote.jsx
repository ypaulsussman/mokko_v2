import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor";

function NewNote() {
  const [note, setNote] = useState();
  return (
    <div className="grid">
      <div className="justify-self-center prose">
        <h1 className="text-center">New Note</h1>
        <RichTextEditor note={note} setNote={setNote} />
      </div>
    </div>
  );
}

export default NewNote;
