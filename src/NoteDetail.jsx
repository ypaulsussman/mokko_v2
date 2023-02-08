import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";
import { buildDetailData } from "./utils/noteUtils";

function NoteDetail() {
  const [note, setNote] = useState();
  const [childMokkos, setChildMokkos] = useState();
  const { noteId } = useParams();

  useEffect(() => {
    async function getNoteWithChildMokkos(noteId) {
      const noteData = await db.notes.get(Number(noteId));

      const baseAndCueMokkos = await db.mokkos
        .filter((mokko) => {
          return (
            mokko.base_note_id === Number(noteId) ||
            mokko.cue_note_id === Number(noteId)
          );
        })
        .toArray();

      setNote(noteData);
      setChildMokkos(baseAndCueMokkos);
    }

    getNoteWithChildMokkos(noteId);
  }, [noteId]);

  if (!note) {
    return <></>;
  } else {
    return (
      <div className="grid mb-12">
        <div className="justify-self-center prose mb-4">
          <div className="grid grid-cols-3">
            <Link to={"delete"} className="link block text-left">
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

          {childMokkos.length > 0 && (
            <details>
              <summary className="header-2-sibling mb-4">
                {/* `inline` required to work with `::marker` pseudoelement; see also `main.css` */}
                <h2 className="inline">Child Mokkos</h2>
              </summary>
              {childMokkos.map((mokko) => (
                <div key={mokko.id}>
                  {/* undo font-styling applied by `prose` class to link-text*/}
                  <Link
                    to={`/manage/mokkos/${mokko.id}`}
                    className="no-underline font-normal"
                  >
                    <div className="card card-bordered shadow-lg shadow-gray-500">
                      <div className="card-body">
                        <SanitizedHTML content={mokko.content} />
                      </div>
                    </div>
                  </Link>
                  <div className="divider"></div>
                </div>
              ))}

              <Link
                to={"newMokko"}
                className="link block text-right text-sm font-light"
              >
                Add New Mokko
              </Link>
            </details>
          )}
        </div>
      </div>
    );
  }
}

export default NoteDetail;
