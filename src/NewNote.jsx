import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./data/db";
import { BUILTIN_CUE_TAG, INITIAL_NOTE_DATA } from "./data/constants";
import { validateNote } from "./utils/noteUtils";
import RichTextEditor from "./components/RichTextEditor";
import TagEditor from "./components/TagEditor";
import DetailsEditor from "./components/DetailsEditor";

function NewNote() {
  const [note, setNote] = useState({
    ...INITIAL_NOTE_DATA,
    next_occurrence: new Date().toISOString().slice(0, 10),
  });
  const [preexistingTags, setPreexistingTags] = useState();
  const navigate = useNavigate();

  // Initial dataload
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

  const handleContentUpdate = (newText) => {
    // NB future Y: like the similar comment below, the usage of callback-function-as-argument-to-setFoo-rather-than-fooValue-itself stems from a bizarre bug in which the other keys inside `note` are ignored (and thus reset) on `setNote` invocation here-but-only-here -- presumably a result of some stale cache of the value being consumed by the RTE, perhaps from interactions with its imperative-DOM-behaviors?
    setNote((note) => ({ ...note, content: newText }));
  };

  const handleAddTag = (tagToAdd, setTagToAdd) => {
    if (tagToAdd) {
      setNote((note) => ({ ...note, tags: [...note.tags, tagToAdd] }));
      setPreexistingTags((preexistingTags) =>
        preexistingTags.filter((tag) => tag !== tagToAdd)
      );
      setTagToAdd("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNote((note) => ({
      ...note,
      tags: note.tags.filter((tag) => tag !== tagToRemove),
    }));
    setPreexistingTags((preexistingTags) => [...preexistingTags, tagToRemove]);
  };

  const handleNextOccurrenceChange = ({ target }) => {
    setNote((note) => ({
      ...note,
      next_occurrence: target.value,
    }));
  };

  const handleSuspendedChange = ({ target }) => {
    setNote((note) => ({
      ...note,
      suspended: target.checked,
    }));
  };

  const handleAvailableCuesChange = ({ target }) => {
    let newValue;
    if (note.allowed_cue_types.includes(target.value)) {
      newValue = note.allowed_cue_types.filter(
        (cueType) => cueType !== target.value
      );
    } else {
      newValue = [...note.allowed_cue_types, target.value];
    }
    setNote((note) => ({
      ...note,
      allowed_cue_types: newValue,
    }));
  };

  const saveNote = async (e) => {
    e.preventDefault();

    const { validatedNote, validationErrors } = validateNote(note);
    if (validationErrors) {
      alert(validationErrors);
      return;
    } else {
      const newNoteId = await db.notes.add(validatedNote);
      navigate(`/manage/notes/${newNoteId}`);
    }
  };

  if (!preexistingTags) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center">{`New Note`}</h1>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form" aria-label="New Note">
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={saveNote}
              >
                Save Changes
              </button>
            </div>

            <h2 className="mt-0">Content:</h2>
            <RichTextEditor
              currentText={note.content}
              handleContentUpdate={handleContentUpdate}
            />

            <div className="divider" />
            <h2>Tags:</h2>
            <TagEditor
              currentTags={note.tags}
              preexistingTags={preexistingTags}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
            />

            <h2>Details:</h2>
            <DetailsEditor
              note={note}
              handleNextOccurrenceChange={handleNextOccurrenceChange}
              handleSuspendedChange={handleSuspendedChange}
              handleAvailableCuesChange={handleAvailableCuesChange}
            />

            <div className="flex justify-end my-8">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={saveNote}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNote;
