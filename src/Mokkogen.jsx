import React, { useCallback, useEffect, useState } from "react";
import { db } from "./data/db";
import { FITS_ALL_THREE_MOKKOGEN_CARDS, INITIAL_MOKKO_DATA, MOKKOGEN_COMPLETE } from "./data/constants";
import {
  generateBaseNoteNextOccurrence,
  getRandomArrayIndex,
  isBuiltInCueNote,
} from "./utils/noteUtils";
import { validateMokko } from "./utils/mokkoUtils";
import MokkogenNote from "./components/MokkogenNote";
import MokkogenMokko from "./components/MokkogenMokko";

function Mokkogen() {
  const [baseNote, setBaseNote] = useState();
  const [newBaseNoteInterval, setNewBaseNoteInterval] = useState();
  const [cueNote, setCueNote] = useState();
  const [newMokko, setNewMokko] = useState({
    ...INITIAL_MOKKO_DATA,
    base_note_id: null,
    cue_note_id: null,
    date_created: new Date().toISOString().slice(0, 10),
  });
  const [mokkogenStage, setMokkogenStage] = useState(1);

  const getBaseNote = useCallback(async function () {
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
      const randomizerOffset = getRandomArrayIndex(allEligibleBaseNotes.length);
      setBaseNote(allEligibleBaseNotes[randomizerOffset]);
      setNewMokko({
        ...newMokko,
        base_note_id: allEligibleBaseNotes[randomizerOffset].id,
      });
    }
  }, []);

  // load baseNote
  useEffect(() => {
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
      setNewMokko({
        ...newMokko,
        cue_note_id: allEligibleCueNotes[randomizerOffset].id,
      });
      setCueNote(allEligibleCueNotes[randomizerOffset]);
    }

    getCueNote(baseNote.id, baseNote.allowed_cue_types);
  }, [baseNote?.id, baseNote?.allowed_cue_types]);

  const handleMokkoSubmit = async (e) => {
    e.preventDefault();

    const { validatedMokko, validationErrors } = validateMokko(newMokko);
    if (validationErrors) {
      alert(validationErrors);
      return;
    } else {
      const baseNoteNextOccurrence = generateBaseNoteNextOccurrence(
        newBaseNoteInterval,
        baseNote.current_interval
      );

      await db.mokkos.add(validatedMokko);
      await db.notes.update(baseNote.id, {
        prior_mokkogen_interactions: [
          ...baseNote.prior_mokkogen_interactions,
          cueNote.id,
        ],
        current_interval: Number(
          newBaseNoteInterval ? newBaseNoteInterval : baseNote.current_interval
        ),
        next_occurrence: baseNoteNextOccurrence,
      });
      await db.notes.update(cueNote.id, {
        prior_mokkogen_interactions: [
          ...cueNote.prior_mokkogen_interactions,
          baseNote.id,
        ],
      });
      getBaseNote();
      setMokkogenStage(1);
    }
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
    return screen.width >= FITS_ALL_THREE_MOKKOGEN_CARDS ? (
      <div className="flex flex-wrap justify-center gap-8 m-12">
        <MokkogenNote
          note={baseNote}
          setNote={setBaseNote}
          mokkogenStage={mokkogenStage}
          setMokkogenStage={setMokkogenStage}
          isCue={false}
        />
        {[2, 3].includes(mokkogenStage) && cueNote && (
          <MokkogenNote
            note={cueNote}
            setNote={setCueNote}
            mokkogenStage={mokkogenStage}
            setMokkogenStage={setMokkogenStage}
            isCue={true}
          />
        )}
        {mokkogenStage === 3 && (
          <MokkogenMokko
            newMokko={newMokko}
            setNewMokko={setNewMokko}
            currentBaseNoteInterval={baseNote.current_interval}
            newBaseNoteInterval={newBaseNoteInterval}
            setNewBaseNoteInterval={setNewBaseNoteInterval}
            handleMokkoSubmit={handleMokkoSubmit}
          />
        )}
      </div>
    ) : (
      <div className="flex flex-wrap justify-evenly items-center gap-8 m-12">
        <div
          className={`flex flex-wrap justify-center gap-8 ${
            mokkogenStage === 3 && "flex-col"
          }`}
        >
          <MokkogenNote
            note={baseNote}
            setNote={setBaseNote}
            mokkogenStage={mokkogenStage}
            setMokkogenStage={setMokkogenStage}
            isCue={false}
          />
          {[2, 3].includes(mokkogenStage) && cueNote && (
            <MokkogenNote
              note={cueNote}
              setNote={setCueNote}
              mokkogenStage={mokkogenStage}
              setMokkogenStage={setMokkogenStage}
              isCue={true}
            />
          )}
        </div>
        {mokkogenStage === 3 && (
          <MokkogenMokko
            newMokko={newMokko}
            setNewMokko={setNewMokko}
            currentBaseNoteInterval={baseNote.current_interval}
            newBaseNoteInterval={newBaseNoteInterval}
            setNewBaseNoteInterval={setNewBaseNoteInterval}
            handleMokkoSubmit={handleMokkoSubmit}
          />
        )}
      </div>
    );
  }
}

export default Mokkogen;
