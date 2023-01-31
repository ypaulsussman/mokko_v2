import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

function toggleSearchContent(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    searchContent: !searchParams.searchContent,
  });
}

function toggleSearchTags(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    searchTags: !searchParams.searchTags,
  });
}

function updateQueryString(e, searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    queryString: e.target.value,
  });
}

function ManageNotes() {
  const [totalNotePageCount, setTotalNotePageCount] = useState();
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useState({
    currentPage: 0,
    queryString: "",
    searchContent: true,
    searchTags: true,
    noBuiltins: true,
  });

  useEffect(() => {
    async function getNotes({
      currentPage,
      queryString,
      searchContent,
      searchTags,
      noBuiltins,
    }) {
      const notes = await db.notes
        .filter((note) => {
          if (noBuiltins) {
            return !note.builtin_cue_membership;
          } else {
            return true;
          }
        })
        .filter((note) => {
          if (!queryString) {
            return true;
          } else {
            let target = "";
            target = searchContent ? target + note.content : target;
            target = searchTags ? target + note.tags.toString() : target;
            return target.toLowerCase().includes(queryString.toLowerCase());
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
    <div className="grid">
      <div className="justify-self-center prose">
        <div className="grid grid-cols-3">
          <div className="col-start-2">
            <h1 className="text-center">Your Notes</h1>
          </div>
          <Link to={"new"} className="link block text-right">
            New Note
          </Link>
        </div>

        {/* Search Widget */}
        <div className="grid">
          <form className="grid justify-self-center w-5/6">
            <input
              type="text"
              value={searchParams.queryString}
              onChange={(e) => {
                updateQueryString(e, searchParams, setSearchParams);
              }}
              placeholder="Search..."
              disabled={!searchParams.searchContent && !searchParams.searchTags}
              className="input input-bordered w-full justify-self-center"
            />
            <div className="flex flex-row flex-wrap justify-evenly gap-x-4 mt-2">
              <label className="label">
                Search content
                <input
                  type="checkbox"
                  checked={searchParams.searchContent}
                  onChange={() =>
                    toggleSearchContent(searchParams, setSearchParams)
                  }
                  className="checkbox ml-2"
                />
              </label>
              <label className="label">
                Search tags
                <input
                  type="checkbox"
                  checked={searchParams.searchTags}
                  onChange={() =>
                    toggleSearchTags(searchParams, setSearchParams)
                  }
                  className="checkbox ml-2"
                />
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

        {/* Notes List */}
        <div className="divider"></div>
        {notes.map((note) => (
          <div key={note.id}>
            {/* undo font-styling applied by `prose` class to link-text*/}
            <Link to={`${note.id}`} className="no-underline font-normal">
              <div className="card card-bordered shadow-xl">
                <div className="card-body">
                  <SanitizedHTML content={note.content} />
                </div>
              </div>
            </Link>
            <div className="divider"></div>
          </div>
        ))}

        {/* Paginator */}
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
