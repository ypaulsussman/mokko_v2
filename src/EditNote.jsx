import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import RichTextEditor from "./components/RichTextEditor";

function EditNote() {
  const [note, setNote] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const saveNote = async (e) => {
    e.preventDefault();
    await db.notes.update(Number(noteId), note);
    navigate(`/manage/notes/${noteId}`);
  };

  useEffect(() => {
    async function getNote(noteId) {
      const noteData = await db.notes.get(Number(noteId));
      setNote(noteData);
    }

    getNote(noteId);
  }, [noteId]);

  if (!note) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center">{`Edit Note #${note.id}`}</h1>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form">
            <RichTextEditor note={note} setNote={setNote} />
            <button type="submit" onClick={saveNote}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNote;
