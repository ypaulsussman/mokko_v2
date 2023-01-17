import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";

function NoteDetail() {
  const [note, setNote] = useState();
  const { noteId } = useParams();

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
          <h1 className="text-center">{`Note #${note.id}`}</h1>

          <h2>Content:</h2>
          <SanitizedHTML content={note.content} />

          <h2>Tags:</h2>
          {/* https://tailwindcss.com/docs/list-style-type#arbitrary-values */}
          <ul className="list-['-']">
            {note.tags.map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>

          <h2>Details:</h2>
          {}

          {/* 
  "builtin_cue_membership": "",
  
  "cue_only": false,
  
  "next_occurrence": "",
  "current_interval": 1,
  
  "use_no_cue": false,
  "available_cue_types": ["notes"] 
  */}
        </div>
      </div>
    );
  }
}

export default NoteDetail;
