import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import { BUILTIN_CUE_TAG } from "./data/constants";
import { isBuiltInCueNote, validateNote } from "./utils/noteUtils";
import RichTextEditor from "./components/RichTextEditor";

function Mokkogen() {
  const [baseNotes, setBaseNotes] = useState(null);
  const [currentBaseNote, setCurrentBaseNote] = useState();
  const [currentCueNote, setCurrentCueNote] = useState();
  const [currentMokko, setCurrentMokko] = useState();

  useEffect(() => {
    async function getBaseNotes() {
      const todayString = new Date().toISOString().slice(0, 10);
      const [firstEligibleBaseNote, ...otherEligibleBaseNotes] = await db.notes
        .filter(
          ({ suspended, cue_type, next_occurrence }) =>
            !suspended &&
            !isBuiltInCueNote(cue_type) &&
            next_occurrence <= todayString
        )
        .toArray();
      if (!firstEligibleBaseNote) {
        setBaseNotes([]);
      } else {
        setCurrentBaseNote(firstEligibleBaseNote);
        setBaseNotes(otherEligibleBaseNotes);
      }
    }
    getBaseNotes();
  }, []);

  useEffect(() => {
    if (!currentBaseNote?.id) {
      return;
    }

    async function getCueNote(
      currentBaseNoteId,
      currentBaseNoteAllowedCueTypes
    ) {
      const [firstEligibleCueNote] = await db.notes
        .filter(
          ({ id, prior_mokkogen_interactions, cue_type }) =>
            currentBaseNoteAllowedCueTypes.includes(cue_type) &&
            !prior_mokkogen_interactions.includes(currentBaseNoteId) &&
            id !== currentBaseNoteId
        )
        .limit(1)
        .toArray();

      setCurrentCueNote(firstEligibleCueNote);
    }

    getCueNote(currentBaseNote.id, currentBaseNote.allowed_cue_types);
  }, [currentBaseNote?.id, currentBaseNote?.allowed_cue_types]);

  if (!baseNotes) {
    return <></>;
  } else if (baseNotes && !baseNotes.length) {
    return (
      <>
        <p>You've completed all the available notes for today!</p>
      </>
    );
  } else {
    return (
      <>
        <p>mokkogen goes here, later</p>
      </>
    );
  }
}

export default Mokkogen;
