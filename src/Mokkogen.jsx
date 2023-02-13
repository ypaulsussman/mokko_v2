import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";
import { MOKKOGEN_COMPLETE } from "./data/constants";
import { getRandomArrayIndex, isBuiltInCueNote } from "./utils/noteUtils";
import MokkogenNote from "./components/MokkogenNote";

function Mokkogen() {
  const [baseNote, setBaseNote] = useState();
  const [cueNote, setCueNote] = useState();
  // const [currentMokko, setCurrentMokko] = useState();
  const [mokkogenStage, setMokkogenStage] = useState(1);

  // load baseNote
  useEffect(() => {
    async function getBaseNote() {
      const todayString = new Date().toISOString().slice(0, 10);
      const allEligibleBaseNotes = await db.notes
        .filter(
          ({ suspended, cue_type, next_occurrence }) =>
            !suspended &&
            !isBuiltInCueNote(cue_type) &&
            next_occurrence <= todayString
        )
        .toArray();

      if (!allEligibleBaseNotes) {
        setBaseNote(MOKKOGEN_COMPLETE);
      } else {
        const randomizerOffset = getRandomArrayIndex(
          allEligibleBaseNotes.length
        );
        setBaseNote(allEligibleBaseNotes[randomizerOffset]);
      }
    }
    getBaseNote();
  }, []);

  // load cueNote
  useEffect(() => {
    // Don't search if the next baseNote is "no baseNote"
    if (!baseNote?.id) {
      return;
    }

    async function getCueNote(
      currentBaseNoteId,
      currentBaseNoteAllowedCueTypes
    ) {
      const allEligibleCueNotes = await db.notes
        .filter(
          ({ id, prior_mokkogen_interactions, cue_type }) =>
            currentBaseNoteAllowedCueTypes.includes(cue_type) &&
            !prior_mokkogen_interactions.includes(currentBaseNoteId) &&
            id !== currentBaseNoteId
        )
        .toArray();

      const randomizerOffset = getRandomArrayIndex(allEligibleCueNotes.length);
      setCueNote(allEligibleCueNotes[randomizerOffset]);
    }

    getCueNote(baseNote.id, baseNote.allowed_cue_types);
  }, [baseNote?.id, baseNote?.allowed_cue_types]);

  const handleBaseNoteUpdate = (newText) => {
    // NB future Y: see same weird issue in <EditNote>
    setBaseNote((baseNote) => ({ ...baseNote, content: newText }));
  };

  const handleCueNoteUpdate = (newText) => {
    // NB future Y: see same weird issue in <EditNote>
    setCueNote((cueNote) => ({ ...cueNote, content: newText }));
  };

  if (!baseNote) {
    return <></>;
  } else if (baseNote === MOKKOGEN_COMPLETE) {
    return (
      <>
        <p>You've completed all the available notes for today!</p>
      </>
    );
  } else {
    return (
      <div className="flex flex-wrap justify-center gap-8 m-12">
        <MokkogenNote
          note={baseNote}
          setNote={handleBaseNoteUpdate}
          mokkogenStage={mokkogenStage}
          setMokkogenStage={setMokkogenStage}
          isCue={false}
        />
        {[2, 3].includes(mokkogenStage) && cueNote && (
          <MokkogenNote
            note={cueNote}
            setNote={handleCueNoteUpdate}
            mokkogenStage={mokkogenStage}
            setMokkogenStage={setMokkogenStage}
            isCue={true}
          />
        )}
      </div>
    );
  }
}

export default Mokkogen;
