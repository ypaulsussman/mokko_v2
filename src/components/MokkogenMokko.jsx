import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

function MokkogenMokko({ newMokko, setNewMokko, handleMokkoSubmit }) {
  return (
    <div className="card card-bordered shadow-lg shadow-gray-500 prose">
      <div className="card-body flex-col justify-between">
        <RichTextEditor
          currentText={newMokko.content}
          handleContentUpdate={setNewMokko}
        />
        <div className="flex justify-end mt-4">
          <button className="btn btn-ghost" onClick={handleMokkoSubmit}>
            Save Mokko
          </button>
        </div>
      </div>
    </div>
  );
}

export default MokkogenMokko;
