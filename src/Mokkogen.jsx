import React, { useCallback, useEffect, useState } from "react";
import { db } from "./data/db";
import {
  FITS_ALL_THREE_MOKKOGEN_CARDS,
  INITIAL_MOKKO_DATA,
  MOKKOGEN_COMPLETE,
  MOKKOGEN_DAILY_LIMIT_REACHED,
} from "./data/constants";
import {
  getMokkogenCompleteHTML,
  getMokkogenDailyLimitReachedHTML,
  getUserPreferences,
} from "./utils/appUtils";
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
    currentBaseNoteAllowedCueTypes,
    currentCueNoteIdToSwap = null
  ) {
    if (!currentBaseNoteId) {
      return;
    }

    const allEligibleCueNotes = await db.notes
      .filter(
        ({ id, prior_mokkogen_interactions, cue_type }) =>
          currentBaseNoteAllowedCueTypes.includes(cue_type) &&
          !prior_mokkogen_interactions.includes(currentBaseNoteId) &&
          ![currentBaseNoteId, currentCueNoteIdToSwap].includes(id)
      )
      .toArray();

    const randomizerOffset = getRandomArrayIndex(allEligibleCueNotes.length);
    const newCueNote = allEligibleCueNotes[randomizerOffset];
    setCueNote(newCueNote);
  },
  []);

  const getBaseNote = useCallback(
    async function () {
      const { mokkogenDailyLimit } = await getUserPreferences();
      if (mokkogenDailyLimit.current >= mokkogenDailyLimit.ceiling) {
        setBaseNote(MOKKOGEN_DAILY_LIMIT_REACHED);
        return;
      }

      const todayString = new Date().toISOString().slice(0, 10);
      const allEligibleBaseNotes = await db.notes
        .filter(
          ({ suspended, cue_type, next_occurrence }) =>
            !suspended &&
            !isBuiltInCueNote(cue_type) &&
            next_occurrence <= todayString
        )
        .toArray();

      if (allEligibleBaseNotes.length === 0) {
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

  // On initial pageload: retrieve first baseNote (and any available cueNote), and
  // [2] potentially reset dailyMokkoLimit (if first time running mokkogen today)
  useEffect(() => {
    async function manageDailyMokkoLimit() {
      const todayString = new Date().toISOString().slice(0, 10);
      const { mokkogenDailyLimit } = await getUserPreferences();

      if (mokkogenDailyLimit.resetOn <= todayString) {
        let todayDateObject = new Date();
        todayDateObject.setDate(todayDateObject.getDate() + 1);
        const tomorrowString = todayDateObject.toISOString().slice(0, 10);

        await db.preferences.toCollection().modify((preferences) => {
          preferences.mokkogenDailyLimit.current = 0;
          preferences.mokkogenDailyLimit.resetOn = tomorrowString;
          return;
        });
      }
    }

    manageDailyMokkoLimit();
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
          cueNote?.id,
        ],
        current_interval: Number(
          newBaseNoteInterval ? newBaseNoteInterval : baseNote.current_interval
        ),
        next_occurrence: baseNoteNextOccurrence,
      });

      if (cueNote) {
        await db.notes.update(cueNote.id, {
          prior_mokkogen_interactions: [
            ...cueNote.prior_mokkogen_interactions,
            baseNote.id,
          ],
        });
      }

      await db.preferences.toCollection().modify((preferences) => {
        preferences.mokkogenDailyLimit.current =
          preferences.mokkogenDailyLimit.current + 1;
        return;
      });

      getBaseNote();
      setMokkogenStage(1);
    }
  };

  if (!baseNote) {
    return <></>;
  } else if (baseNote === MOKKOGEN_COMPLETE) {
    return getMokkogenCompleteHTML();
  } else if (baseNote === MOKKOGEN_DAILY_LIMIT_REACHED) {
    return getMokkogenDailyLimitReachedHTML();
  } else {
    return (
      <div className="flex flex-wrap justify-evenly items-center gap-8 m-12">
        <div
          className={`flex flex-wrap justify-center gap-8 ${
            mokkogenStage === 3 &&
            window.innerWidth < FITS_ALL_THREE_MOKKOGEN_CARDS &&
            "flex-col"
          }`}
        >
          <MokkogenNote
            isCue={false}
            mokkogenStage={mokkogenStage}
            setMokkogenStage={setMokkogenStage}
            note={baseNote}
            setNote={setBaseNote}
            swapOrSkipCallback={async () => {
              await db.notes.update(baseNote.id, {
                next_occurrence: generateBaseNoteNextOccurrence(
                  null,
                  baseNote.current_interval
                ),
              });

              getBaseNote();
              setMokkogenStage(1);
            }}
          />
          {[2, 3].includes(mokkogenStage) && (
            <MokkogenNote
              isCue={true}
              mokkogenStage={mokkogenStage}
              setMokkogenStage={setMokkogenStage}
              note={cueNote}
              setNote={setCueNote}
              swapOrSkipCallback={() => {
                getCueNote(
                  baseNote.id,
                  baseNote.allowed_cue_types,
                  cueNote?.id
                );
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
