import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";

function MokkoDetail() {
  const [mokko, setMokko] = useState();
  const { mokkoId } = useParams();

  useEffect(() => {
    async function getMokko(mokkoId) {
      const mokkoData = await db.mokkos.get(Number(mokkoId));

      // await Promise.all(mokkoData.map (async mokko => {
      [mokkoData.baseNote, mokkoData.cueNote] = await Promise.all([
        db.notes.get(Number(mokkoData.base_note_id)),
        db.notes.get(Number(mokkoData.cue_note_id)),
      ]);
      // }));

      setMokko(mokkoData);
    }

    getMokko(mokkoId);
  }, [mokkoId]);

  if (!mokko) {
    return <></>;
  } else {
    return (
      <div className="grid mb-12">
        <div className="justify-self-center prose">
          <div className="grid grid-cols-3">
            <Link to={"/"} className="link block text-left">
              Delete
            </Link>
            <h1 className="text-center mb-0">{`Mokko #${mokko.id}`}</h1>
            <Link to={"edit"} className="link block text-right">
              Edit
            </Link>
          </div>

          <h2>Content:</h2>
          <SanitizedHTML content={mokko.content} />

          <h2>Tags:</h2>
          {/* https://tailwindcss.com/docs/list-style-type#arbitrary-values */}
          <ul className="list-['-']">
            {mokko.tags.map((tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>

          <h2>Details:</h2>
          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
          >
            <div className="collapse-title text-xl font-medium">
              Base Note <span className="font-light text-sm">(</span>
              <Link
                to={`/manage/notes/${mokko.baseNote.id}`}
                className="font-light text-sm px-1"
              >
                visit
              </Link>
              <span className="font-light text-sm">)</span>
            </div>

            <div className="collapse-content">
              <SanitizedHTML content={mokko.baseNote.content} />
            </div>
          </div>

          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-4"
          >
            <div className="collapse-title text-xl font-medium">
              Cue Note <span className="font-light text-sm">(</span>
              <Link
                to={`/manage/notes/${mokko.cueNote.id}`}
                className="font-light text-sm px-1"
              >
                visit
              </Link>
              <span className="font-light text-sm">)</span>
            </div>

            <div className="collapse-content">
              <SanitizedHTML content={mokko.cueNote.content} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MokkoDetail;
