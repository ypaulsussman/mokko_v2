import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";
import { buildDetailData } from "./utils/noteUtils";

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
      <div className="grid mb-12">
        <div className="justify-self-center prose">
          <div className="grid grid-cols-3">
            <Link to={"/"} className="link block text-left">
              Delete
            </Link>
            <h1 className="text-center mb-0">{`Note #${note.id}`}</h1>
            <Link to={"edit"} className="link block text-right">
              Edit
            </Link>
          </div>

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
          {buildDetailData(note)}
        </div>
      </div>
    );
  }
}

export default NoteDetail;
