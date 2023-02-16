import React, { useState } from "react";
import { db } from "../data/db";
import { validateNote } from "../utils/noteUtils";
import RichTextEditor from "./RichTextEditor";
import SanitizedHTML from "./SanitizedHTML";

function MokkogenNote({
  note,
  setNote,
  isCue,
  mokkogenStage,
  setMokkogenStage,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentNote = () => {
    if (isCue) {
      return mokkogenStage === 2;
    } else {
      return mokkogenStage === 1;
    }
  };

  const handleNoteContentUpdate = (newText) => {
    // NB future Y: see same weird issue in <EditNote>
    setNote((note) => ({ ...note, content: newText }));
  };

  async function saveNoteContent(e) {
    e.preventDefault();

    const { validatedNote, validationErrors } = validateNote(note);
    if (validationErrors) {
      alert(validationErrors);
      return;
    } else {
      await db.notes.update(note.id, validatedNote);

      setIsEditing(false);
    }
  }

  return (
    <div className="card card-bordered shadow-lg shadow-gray-500 prose">
      <div className="card-body flex-col justify-between">
        {isEditing ? (
          <RichTextEditor
            currentText={note.content}
            handleContentUpdate={handleNoteContentUpdate}
          />
        ) : (
          <SanitizedHTML content={note.content} />
        )}

        <div className="flex justify-between mt-4">
          {isEditing ? (
            <button className="btn btn-ghost" onClick={saveNoteContent}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-ghost"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          {isCurrentNote() && !isEditing && (
            <button
              className="btn btn-ghost"
              onClick={() =>
                setMokkogenStage((mokkogenStage) => mokkogenStage + 1)
              }
            >
              Onward!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MokkogenNote;
