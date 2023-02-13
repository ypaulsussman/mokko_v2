import React from "react";
import { ALL_CUE_TYPES, EMPTY_P_TAG, INVALID_DATE } from "../data/constants";

function getBuiltInCueString(membership) {
  return (
    <>
      <p>
        This note comes from one of the three built-in cue decks (specifically{" "}
        <a
          href={`https://en.wikipedia.org/wiki/${ALL_CUE_TYPES[membership].urlPath}`}
        >
          {ALL_CUE_TYPES[membership].name}
        </a>
        .)
      </p>
      <p>
        By default, no notes that you add will collide with these builtins; you
        can change that by editing a note&apos;s available cue types.
      </p>
    </>
  );
}

function buildScheduleData(next_occurrence, current_interval) {
  if (!next_occurrence) {
    return (
      <>
        <p>
          This note isn&apos;t scheduled to generate a mokko! To changed that,
          click &quot;Edit&quot; above and alter its &quot;next surface this
          note&quot; value.
        </p>
      </>
    );
  } else {
    return (
      <>
        <p>
          This note is next scheduled to be used for generating a mokko on{" "}
          {next_occurrence}; after that, it&apos;s programmed to surface every{" "}
          {current_interval} day
          {current_interval > 1 ? "s" : ""}.
        </p>
      </>
    );
  }
}

function buildCueData(suspended, allowed_cue_types) {
  if (suspended) {
    return (
      <>
        <p>
          This note is currently suspended; it&apos;s still visible and
          editable, but will never surface for mokkogen and will never be
          selected as a cue.
        </p>
      </>
    );
  } else {
    return (
      <>
        {allowed_cue_types.length === 1 ? (
          <p className="mb-12">
            Any time this note surfaces for mokko generation, its partner
            cue-note will be chosen randomly from{" "}
            {allowed_cue_types[0] === "notes"
              ? "the pool of all notes that you've added."
              : `the ${ALL_CUE_TYPES[allowed_cue_types[0]].name} deck.`}
          </p>
        ) : (
          <>
            <p className="mb-12">
              Any time this note surfaces for mokko generation, its partner
              cue-note will be chosen randomly from the following decks:{" "}
              {allowed_cue_types
                .map((cue) => ALL_CUE_TYPES[cue].name)
                .join(", ")}
              .
            </p>
          </>
        )}
      </>
    );
  }
}

export function buildDetailData({
  cue_type,
  next_occurrence,
  current_interval,
  suspended,
  allowed_cue_types,
}) {
  if (isBuiltInCueNote(cue_type)) {
    return getBuiltInCueString(cue_type);
  }
  return (
    <>
      {buildScheduleData(next_occurrence, current_interval)}
      {buildCueData(suspended, allowed_cue_types)}
    </>
  );
}

function validateNextOccurrence(next_occurrence) {
  // Empty string is fine
  if (!next_occurrence) {
    return next_occurrence;
  }

  try {
    return new Date(`${next_occurrence}T00:00:00`).toISOString().slice(0, 10);
  } catch (error) {
    return INVALID_DATE;
  }
}

export function validateNote(note) {
  let validatedNote = null;
  let validationErrors = null;

  if (!note.content || note.content === EMPTY_P_TAG) {
    validationErrors = "Please add text to the note.";
  }

  const tz_agnostic_next_occurrence = validateNextOccurrence(
    note.next_occurrence
  );

  if (tz_agnostic_next_occurrence === INVALID_DATE) {
    validationErrors = validationErrors
      ? (validationErrors +=
          " In addition, please set the next occurrence to a valid date, or leave blank.")
      : "Please set the next occurrence to a valid date, or leave blank.";
  }

  if (!validationErrors) {
    validatedNote = {
      ...note,
      next_occurrence: tz_agnostic_next_occurrence,
      cue_type: note.cue_type ? note.cue_type : "notes",
    };
  }

  return { validatedNote, validationErrors };
}

export function isBuiltInCueNote(cue_type) {
  return cue_type !== "notes";
}

export function getRandomArrayIndex(arrayLength) {
  return Math.floor(
    Math.random() * arrayLength
  );
}