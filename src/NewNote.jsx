import { useState } from "react";
import RichTextEditor from "./components/RichTextEditor";

function NewNote() {
const [editorText, setEditorText] = useState('Text goes here...')
  return (
    <div className="grid">
      <div className="justify-self-center prose">
        <h1 className="text-center">New Note</h1>
        <RichTextEditor setEditorText={setEditorText}/>
      </div>
    </div>
  );
}

export default NewNote;
