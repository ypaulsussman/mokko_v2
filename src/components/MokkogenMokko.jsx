import React, { useEffect, useState } from "react";
import { db } from "../data/db";
import { BASE_NOTE_INTERVALS, BUILTIN_CUE_TAG } from "../data/constants";
import RichTextEditor from "./RichTextEditor";
import TagEditor from "./TagEditor";

function MokkogenMokko({
  newMokko,
  setNewMokko,
  currentBaseNoteInterval,
  newBaseNoteInterval,
  setNewBaseNoteInterval,
  handleMokkoSubmit,
}) {
  const [preexistingTags, setPreexistingTags] = useState();

  useEffect(() => {
    async function getPreexistingTags() {
      const [noteTags, mokkoTags] = await Promise.all([
        db.notes.orderBy("tags").keys((tags) => tags),
        db.mokkos.orderBy("tags").keys((tags) => tags),
      ]);

      const uniqueTags = Array.from(new Set([...noteTags, ...mokkoTags]));
      const availableTags = uniqueTags.filter((tag) => tag !== BUILTIN_CUE_TAG);

      setPreexistingTags(availableTags);
    }

    getPreexistingTags();
  }, []);

  const handleAddTag = (tagToAdd, setTagToAdd) => {
    if (tagToAdd) {
      setNewMokko((mokko) => {
        return {
          ...mokko,
          tags: [...mokko.tags, tagToAdd],
        };
      });
      setPreexistingTags((preexistingTags) =>
        preexistingTags.filter((tag) => tag !== tagToAdd)
      );
      setTagToAdd("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewMokko((mokko) => ({
      ...mokko,
      tags: mokko.tags.filter((tag) => tag !== tagToRemove),
    }));
    setPreexistingTags((preexistingTags) => [...preexistingTags, tagToRemove]);
  };

  const handleNewMokkoContentUpdate = (newText) => {
    // NB future Y: see same weird issue in <EditNote>
    setNewMokko((newMokko) => ({ ...newMokko, content: newText }));
  };

  if (!preexistingTags) {
    return <></>;
  } else {
    return (
      <div className="card card-bordered shadow-lg shadow-gray-500 prose">
        <div className="card-body flex-col grow-0 justify-between">
          <RichTextEditor
            currentText={newMokko.content}
            handleContentUpdate={handleNewMokkoContentUpdate}
          />

          <div className="divider" />
          <p className="my-0">Add tags:</p>
          <TagEditor
            currentTags={newMokko.tags}
            preexistingTags={preexistingTags}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
          />

          <div className="flex justify-start items-center mt-4">
            <p htmlFor="baseNoteInterval" className="grow-0 mr-2">
              Surface the base note again in
            </p>
            <select
              id="baseNoteInterval"
              name="baseNoteInterval"
              defaultValue={currentBaseNoteInterval}
              value={newBaseNoteInterval}
              onChange={(e) => setNewBaseNoteInterval(e.target.value)}
              className="select select-bordered "
              aria-label="Select number of days until base note's next mokkogen"
            >
              {BASE_NOTE_INTERVALS.map((interval) => (
                <option
                  key={interval}
                  value={interval}
                  className={interval === newBaseNoteInterval ? "selected" : ""}
                >
                  {interval}
                </option>
              ))}
            </select>
            <p className="ml-2">{`day${
              newBaseNoteInterval === 1 ? "" : "s"
            }`}</p>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn btn-ghost" onClick={handleMokkoSubmit}>
              Save Mokko
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MokkogenMokko;
