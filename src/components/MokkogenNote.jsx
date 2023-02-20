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
  swapOrSkipCallback,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentNote = () => {
    if (isCue) {
      return mokkogenStage === 2;
    } else {
      return mokkogenStage === 1;
    }
  };

  const buildNoteBody = () => {
    if (isCue && !note) {
      return (
        <div className="block">
          <p className="text-center prose-xl">No Cue-Notes Available!</p>
          <p>It looks like this note has no cues that both:</p>
          <ul>
            <li>
              have never before [
              <em>
                intersected, collided, been part of a mokkogen, whatever you
                like to call it
              </em>
              ] with the base note; and
            </li>
            <li>
              are members of the base note&apos;s set of allowed cue-types.
            </li>
          </ul>
          <p>You can:</p>
          <ul>
            <li>
              Click <code>Skip This Base</code> to postpone interacting with the
              base note;
            </li>
            <li>
              Access the base note via `Manage &gt; Notes` in the navbar at
              top-right, then update its set of available cue-types; or
            </li>
            <li>
              Click <code>Onward!</code> to proceed with the mokkogen. (
              <em>
                The new mokko will simply list the base note as both its
                parents.
              </em>
              )
            </li>
          </ul>
        </div>
      );
    }

    return isEditing ? (
      <RichTextEditor
        currentText={note.content}
        handleContentUpdate={handleNoteContentUpdate}
      />
    ) : (
      <SanitizedHTML content={note.content} />
    );
  };

  const buildNoteButtons = () => {
    if (isCue && !note) {
      return <></>;
    }

    return isEditing ? (
      <button className="btn btn-ghost" onClick={saveNoteContent}>
        Save
      </button>
    ) : (
      <div>
        <button
          className="btn btn-ghost mr-2"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        {isCue ? (
          <button className="btn btn-ghost" onClick={swapOrSkipCallback}>
            Swap This Cue
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={swapOrSkipCallback}>
            Skip This Base
          </button>
        )}
      </div>
    );
  };

  const handleNoteContentUpdate = (newText) => {
    // NB future Y: see note re: identical issue in <EditNote>
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
        {buildNoteBody()}

        <div
          className={`flex ${
            isCue && !note ? "justify-end" : "justify-between"
          } mt-4`}
        >
          {buildNoteButtons()}

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
