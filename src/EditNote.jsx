import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import RichTextEditor from "./components/RichTextEditor";
import TagEditor from "./components/TagEditor";

function EditNote() {
  const [note, setNote] = useState();
  const [preexistingTags, setPreexistingTags] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const handleAddTag = (tagToAdd, setTagToAdd) => {
    if (tagToAdd) {
      setNote((note) => ({ ...note, tags: [...note.tags, tagToAdd] }));
      setPreexistingTags(preexistingTags.filter((tag) => tag !== tagToAdd));
      setTagToAdd("");
    }
  };

  const handleContentUpdate = (newText) => {
    setNote((note) => ({ ...note, content: newText }));
  };

  const saveNote = async (e) => {
    e.preventDefault();
    await db.notes.update(Number(noteId), note);
    navigate(`/manage/notes/${noteId}`);
  };

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

  if (!note) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center">{`Edit Note #${note.id}`}</h1>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form" aria-label="Edit Note">
            <h2>Content:</h2>
            <RichTextEditor
              currentText={note.content}
              handleContentUpdate={handleContentUpdate}
            />

            <h2>Tags:</h2>
            <TagEditor
              currentTags={note.tags}
              preexistingTags={preexistingTags}
              handleAddTag={handleAddTag}
            />

            <h2>Details:</h2>
            <div>(foo, bar, baz, other widgets go here later)</div>

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
