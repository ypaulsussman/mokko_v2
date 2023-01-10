import React, { useEffect, useState } from "react";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";

function goLastPage(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    currentPage: (searchParams.currentPage -= 1),
  });
}

function goNextPage(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    currentPage: (searchParams.currentPage += 1),
  });
}

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
      const notes = await db.notes
        .offset(currentPage * 10)
        .limit(10)
        .toArray();
      setNotes(notes);
    }
    getNotes(searchParams);
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-4">
      <div className="md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-span-1 prose">
        <h1 className="text-center">Your Notes</h1>
        <pre>search UI goes here later</pre>
        <div className="divider"></div>
        {notes.map((note) => (
          <div key={note.id}>
            <SanitizedHTML content={note.content} />
            <div className="divider"></div>
          </div>
        ))}
        {totalNotePageCount > 1 && (
          <div className="grid my-9">
            <div className="btn-group justify-self-center">
              <button
                className="btn"
                disabled={searchParams.currentPage === 0}
                onClick={() => goLastPage(searchParams, setSearchParams)}
              >
                «
              </button>
              <button className="btn">{`Page ${
                searchParams.currentPage + 1
              } (of ${totalNotePageCount})`}</button>
              <button
                className="btn"
                disabled={searchParams.currentPage === totalNotePageCount - 1}
                onClick={() => goNextPage(searchParams, setSearchParams)}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageNotes;
