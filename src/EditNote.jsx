import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import RichTextEditor from "./components/RichTextEditor";

function EditNote() {
  const [note, setNote] = useState();
  const [preexistingTags, setPreexistingTags] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const saveNote = async (e) => {
    e.preventDefault();
    await db.notes.update(Number(noteId), note);
    navigate(`/manage/notes/${noteId}`);
  };

  useEffect(() => {
    async function getFormData(noteId) {
      const noteData = await db.notes.get(Number(noteId));

      const allTags = await db.notes.orderBy("tags").keys((tags) => tags);
      const uniqueUserTags = Array.from(new Set(allTags)).filter(
        (tag) => tag != "builtin_cue"
      );

      setNote(noteData);
      setPreexistingTags(uniqueUserTags);
    }

    getFormData(noteId);
  }, [noteId]);

  if (!note) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center">{`Edit Note #${note.id}`}</h1>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form" aria-label="Edit Note">
            <h2>Content:</h2>
            <RichTextEditor note={note} setNote={setNote} />

            <h2>Tags:</h2>
            {note.tags.map((tag) => (
              <div key={tag} className="badge badge-lg gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {tag}
              </div>
            ))}

            <h2>Details:</h2>
            <div>(foo, bar, baz, other widgets go here later)</div>

            <div className="flex justify-end my-8">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={saveNote}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNote;
