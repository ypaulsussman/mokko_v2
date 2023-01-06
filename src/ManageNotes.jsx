import React, { useEffect, useState } from "react";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";

function ManageNotes() {
  const [totalNotePageCount, setTotalNotePageCount] = useState();
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useState({ currentPage: 0 });

  useEffect(() => {
    async function getTotalNoteCount() {
      const noteCount = await db.notes.count();
      const notePages = Math.ceil(noteCount / 10);
      setTotalNotePageCount(notePages);
    }
    getTotalNoteCount();
  }, []);

  useEffect(() => {
    async function getNotes({ currentPage }) {
      const notes = await db.notes.offset(currentPage).limit(10).toArray();
      setNotes(notes);
    }
    getNotes(searchParams);
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-start-2 prose">
        <h1 className="text-center">Your Notes</h1>
        <pre>search UI goes here later</pre>
        {notes.map((note) => (
          <div className={totalNotePageCount} key={note.id}>
            <SanitizedHTML content={note.content} />
          </div>
        ))}
        {totalNotePageCount > 1 && (
          <div className="grid">
          <div className="btn-group justify-self-center">
            <button className="btn">«</button>
            <button className="btn">{`Page ${searchParams.currentPage + 1}`}</button>
            <button className="btn">»</button>
          </div>
          </div>            
        )}
      </div>
    </div>
  );
}

export default ManageNotes;
