import React, { useState } from "react";

function TagEditor({
  currentTags,
  preexistingTags,
  handleAddTag,
  handleRemoveTag,
}) {
  const [tagToAdd, setTagToAdd] = useState("");

  return (
    <>
      <div className="mb-4">
        {currentTags.map((tag) => (
          <div key={tag} className="badge badge-lg gap-2 mr-4">
            <button onClick={() => handleRemoveTag(tag)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {tag}
            </button>
          </div>
        ))}
      </div>

      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            list="tags"
            id="tagToAdd"
            value={tagToAdd}
            onChange={(e) => setTagToAdd(e.target.value)}
            placeholder="Enter tag to add"
            className="input input-bordered"
            aria-label="Select a tag, or enter a new one"
          />
          <button
            type="button"
            onClick={() => handleAddTag(tagToAdd, setTagToAdd)}
            disabled={!tagToAdd}
            aria-label="Add tag"
            className="btn btn-square"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11,-1 V22 M-1,11 H22"
              />
            </svg>
          </button>
        </div>
      </div>

      <datalist id="tags">
        {preexistingTags.map((tags) => (
          <option key={tags} value={tags} />
        ))}
      </datalist>
    </>
  );
}

export default TagEditor;
