import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import { validateNote } from "./utils/noteUtils";
import RichTextEditor from "./components/RichTextEditor";
import TagEditor from "./components/TagEditor";
import DetailsEditor from "./components/DetailsEditor";

function EditNote() {
  const [note, setNote] = useState();
  const [preexistingTags, setPreexistingTags] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();

  // Initial dataload
  useEffect(() => {
    async function getFormData(noteId) {
      const noteData = await db.notes.get(Number(noteId));
      const unaddableTags = [...noteData.tags, "builtin_cue"];

      const allTags = await db.notes.orderBy("tags").keys((tags) => tags);
      const uniqueTags = Array.from(new Set(allTags));
      const availableTags = uniqueTags.filter(
        (tag) => !unaddableTags.includes(tag)
      );

      setNote(noteData);
      setPreexistingTags(availableTags);
    }

    getFormData(noteId);
  }, [noteId]);

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
    if (note.available_cue_types.includes(target.value)) {
      newValue = note.available_cue_types.filter(
        (cueType) => cueType !== target.value
      );
    } else {
      newValue = [...note.available_cue_types, target.value];
    }
    setNote((note) => ({
      ...note,
      available_cue_types: newValue,
    }));
  };

  const saveNote = async (e) => {
    e.preventDefault();

    const { validatedNote, validationErrors } = validateNote(note);
    if (validationErrors) {
      alert(validationErrors);
      return;
    } else {
      await db.notes.update(Number(noteId), validatedNote);

      navigate(`/manage/notes/${noteId}`);
    }
  };

  if (!note) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center">{`Edit Note #${note.id}`}</h1>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form" aria-label="Edit Note">
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

export default EditNote;
