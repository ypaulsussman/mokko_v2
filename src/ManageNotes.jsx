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

function toggleBuiltins(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    noBuiltins: !searchParams.noBuiltins,
  });
}

function ManageNotes() {
  const [totalNotePageCount, setTotalNotePageCount] = useState();
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useState({
    currentPage: 0,
    searchContent: true,
    searchTags: true,
    noBuiltins: true,
  });

  useEffect(() => {
    async function getNotes({ currentPage, noBuiltins }) {
      const notes = await db.notes.filter((note) => {
        if (noBuiltins) {
          return !note.builtin_cue_membership;
        } else {
          return true;
        }
      });

      const totalNotes = await notes.count();

      const paginatedNotes = await notes
        .offset(currentPage * 10)
        .limit(10)
        .toArray();

      setTotalNotePageCount(Math.ceil(totalNotes / 10));
      setNotes(paginatedNotes);
    }

    getNotes(searchParams);
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-4">
      <div className="md:col-start-2 md:col-span-2 xl:col-start-2 xl:col-span-1 prose">
        <h1 className="text-center">Your Notes</h1>
        <div className="grid mt-8">
          <form className="grid justify-self-center w-5/6">
            <input
              type="text"
              placeholder="Search..."
              disabled={
                !(searchParams.searchContent && searchParams.searchTags)
              }
              className="input input-bordered w-full justify-self-center"
            />
            <div className="flex flex-row flex-wrap justify-evenly gap-x-4 mt-2">
              <label className="label">
                Search content
                <input type="checkbox" checked className="checkbox ml-2" />
              </label>
              <label className="label">
                Search tags
                <input type="checkbox" checked className="checkbox ml-2" />
              </label>
              <label className="label">
                Exclude built-in cue notes
                <input
                  type="checkbox"
                  checked={searchParams.noBuiltins}
                  onChange={() => toggleBuiltins(searchParams, setSearchParams)}
                  className="checkbox ml-2"
                />
              </label>
            </div>
          </form>
        </div>
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
