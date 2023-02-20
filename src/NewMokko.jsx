import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import { BUILTIN_CUE_TAG, INITIAL_MOKKO_DATA } from "./data/constants";
import { validateMokko } from "./utils/mokkoUtils";
import RichTextEditor from "./components/RichTextEditor";
import TagEditor from "./components/TagEditor";
import SanitizedHTML from "./components/SanitizedHTML";

function NewMokko() {
  const { noteId: parentNoteId } = useParams();
  const [mokko, setMokko] = useState({
    ...INITIAL_MOKKO_DATA,
    base_note_id: parentNoteId,
    cue_note_id: parentNoteId,
    date_created: new Date().toISOString().slice(0, 10),
  });
  const [preexistingTags, setPreexistingTags] = useState();
  const [parentNoteContent, setParentNoteContent] = useState("");
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

    async function getParentNoteContent() {
      const parentNote = await db.notes.get(Number(parentNoteId));

      setParentNoteContent(parentNote.content);
    }

    getPreexistingTags();
    getParentNoteContent();
  }, [parentNoteId]);

  const handleContentUpdate = (newText) => {
    // NB future Y: like the similar comment below, the usage of callback-function-as-argument-to-setFoo-rather-than-fooValue-itself stems from a bizarre bug in which the other keys inside `mokko` are ignored (and thus reset) on `setMokko` invocation here-but-only-here -- presumably a result of some stale cache of the value being consumed by the RTE, perhaps from interactions with its imperative-DOM-behaviors?
    setMokko((mokko) => ({ ...mokko, content: newText }));
  };

  const handleAddTag = (tagToAdd, setTagToAdd) => {
    if (tagToAdd) {
      setMokko((mokko) => ({ ...mokko, tags: [...mokko.tags, tagToAdd] }));
      setPreexistingTags((preexistingTags) =>
        preexistingTags.filter((tag) => tag !== tagToAdd)
      );
      setTagToAdd("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setMokko((mokko) => ({
      ...mokko,
      tags: mokko.tags.filter((tag) => tag !== tagToRemove),
    }));
    setPreexistingTags((preexistingTags) => [...preexistingTags, tagToRemove]);
  };

  const saveMokko = async (e) => {
    e.preventDefault();

    const { validatedMokko, validationErrors } = validateMokko(mokko);
    if (validationErrors) {
      alert(validationErrors);
      return;
    } else {
      const newMokkoId = await db.mokkos.add(validatedMokko);
      navigate(`/manage/mokkos/${newMokkoId}`);
    }
  };

  if (!preexistingTags) {
    return <></>;
  } else {
    return (
      <div className="grid">
        <div className="justify-self-center prose">
          <h1 className="text-center mb-0">Add Mokko</h1>
          <p className="text-center mb-8">(outside of Mokkogen schedule)</p>
          {/* NB future Y: you spent hours trying to figure out what HTML property of the <form> tag causes the entire page to rerender when hitting one of the tiptap buttons but _not_ when actually adding/removing text from the editor... smdh this is ugly af but at least doesn't totally break accessibility... :/ Consider getting to the bottom of this as a fun task for your next vacation lol? */}
          <div role="form" aria-label="New Mokko">
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={saveMokko}
              >
                Save Changes
              </button>
            </div>

            <h2 className="mt-0">Content:</h2>
            <RichTextEditor
              currentText={mokko.content}
              handleContentUpdate={handleContentUpdate}
            />

            <div className="divider" />
            <h2>Tags:</h2>
            <TagEditor
              currentTags={mokko.tags}
              preexistingTags={preexistingTags}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
            />

            <div
              tabIndex={0}
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box mt-8"
            >
              <div className="collapse-title">Parent-Note Reference:</div>

              <div className="collapse-content">
                <SanitizedHTML content={parentNoteContent} />
              </div>
            </div>

            <div className="flex justify-end my-8">
              <button
                type="submit"
                className="btn btn-outline"
                onClick={saveMokko}
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

export default NewMokko;
