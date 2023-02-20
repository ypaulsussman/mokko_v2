import React, { useCallback, useEffect, useState } from "react";
import { db } from "./data/db";
import {
  FITS_ALL_THREE_MOKKOGEN_CARDS,
  INITIAL_MOKKO_DATA,
  MOKKOGEN_COMPLETE,
} from "./data/constants";
import {
  generateBaseNoteNextOccurrence,
  getRandomArrayIndex,
  isBuiltInCueNote,
} from "./utils/noteUtils";
import { validateMokko } from "./utils/mokkoUtils";
import MokkogenNote from "./components/MokkogenNote";
import MokkogenMokko from "./components/MokkogenMokko";

const EMPTY_MOKKO = {
  ...INITIAL_MOKKO_DATA,
  base_note_id: null,
  cue_note_id: null,
  date_created: new Date().toISOString().slice(0, 10),
};

function Mokkogen() {
  const [baseNote, setBaseNote] = useState();
  const [newBaseNoteInterval, setNewBaseNoteInterval] = useState();
  const [cueNote, setCueNote] = useState();
  const [newMokko, setNewMokko] = useState();
  const [mokkogenStage, setMokkogenStage] = useState(1);

  const getCueNote = useCallback(async function (
    currentBaseNoteId,
    currentBaseNoteAllowedCueTypes
  ) {
    // Don't search if the next baseNote is "no baseNote"
    if (!currentBaseNoteId) {
      return;
    }

    const allEligibleCueNotes = await db.notes
      .filter(
        ({ id, prior_mokkogen_interactions, cue_type }) =>
          currentBaseNoteAllowedCueTypes.includes(cue_type) &&
          !prior_mokkogen_interactions.includes(currentBaseNoteId) &&
          id !== currentBaseNoteId
      )
      .toArray();

    const randomizerOffset = getRandomArrayIndex(allEligibleCueNotes.length);
    const newCueNote = allEligibleCueNotes[randomizerOffset];
    setCueNote(newCueNote);
  },
  []);

  const getBaseNote = useCallback(
    async function () {
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
        const newBaseNote = allEligibleBaseNotes[randomizerOffset];

        setBaseNote(newBaseNote);
        setNewMokko(EMPTY_MOKKO);
        getCueNote(newBaseNote.id, newBaseNote.allowed_cue_types);
      }
    },
    [getCueNote]
  );

  // initial load of baseNote (and any available cueNote)
  useEffect(() => {
    getBaseNote();
  }, [getBaseNote]);

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

      await db.mokkos.add({
        ...validatedMokko,
        base_note_id: baseNote.id,
        cue_note_id: cueNote?.id ? cueNote.id : baseNote.id,
      });

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
        <p>You&apos;ve completed all the available notes for today!</p>
      </>
    );
  } else {
    return (
      <div className="flex flex-wrap justify-evenly items-center gap-8 m-12">
        <div
          className={`flex flex-wrap justify-center gap-8 ${
            mokkogenStage === 3 &&
            screen.width < FITS_ALL_THREE_MOKKOGEN_CARDS &&
            "flex-col"
          }`}
        >
          <MokkogenNote
            isCue={false}
            mokkogenStage={mokkogenStage}
            setMokkogenStage={setMokkogenStage}
            note={baseNote}
            setNote={setBaseNote}
            swapSkipCallback={() => {
              console.log("sup");
            }}
          />
          {[2, 3].includes(mokkogenStage) && cueNote && (
            <MokkogenNote
              isCue={true}
              mokkogenStage={mokkogenStage}
              setMokkogenStage={setMokkogenStage}
              note={cueNote}
              setNote={setCueNote}
              swapSkipCallback={() => {
                getCueNote(baseNote.id, baseNote.allowed_cue_types);
              }}
            />
          )}
        </div>
        {mokkogenStage === 3 && (
          <MokkogenMokko
            newMokko={newMokko}
            setNewMokko={setNewMokko}
            newBaseNoteInterval={
              // use current_interval as initial value
              // (can't use `defaultValue` in controlled <select>)
              newBaseNoteInterval
                ? newBaseNoteInterval
                : baseNote.current_interval
            }
            setNewBaseNoteInterval={setNewBaseNoteInterval}
            handleMokkoSubmit={handleMokkoSubmit}
          />
        )}
      </div>
    );
  }
}

export default Mokkogen;
