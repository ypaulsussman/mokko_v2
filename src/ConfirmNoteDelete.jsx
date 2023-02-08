import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";

function ConfirmNoteDelete() {
  const [childMokkos, setChildMokkos] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    async function getChildMokkos(noteId) {
      const baseAndCueMokkos = await db.mokkos
        .filter((mokko) => {
          return (
            mokko.base_note_id === Number(noteId) ||
            mokko.cue_note_id === Number(noteId)
          );
        })
        .toArray();

      setChildMokkos(baseAndCueMokkos);
    }

    getChildMokkos(noteId);
  }, [noteId]);

  const deleteNote = async (e) => {
    e.preventDefault();

    const mokkosToDelete = childMokkos.map((mokko) => mokko.id);

    await db.mokkos.bulkDelete(mokkosToDelete);
    await db.notes.delete(Number(noteId));

    navigate("/manage/notes");
  };

  return (
    <div className="grid mb-12">
      <div className="justify-self-center prose mb-4">
        <h1 className="text-center mb-0">Confirm Note Deletion</h1>
        <p>
          If you&apos;re not 100% sure, you may want to{" "}
          <Link to={"/manage/settings"} className="link">
            export a snapshot
          </Link>{" "}
          of your data prior to removal.
        </p>

        {childMokkos?.length > 0 && (
          <>
            <p>
              In addition, please note that the following mokkos will also be
              deleted:
            </p>
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
          </>
        )}

        <div className="flex justify-end my-8">
          <button
            type="button"
            className="btn btn-outline"
            onClick={deleteNote}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmNoteDelete;
