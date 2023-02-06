import { EMPTY_P_TAG } from "../data/constants";

export function validateMokko(mokko) {
  let validatedMokko = null;
  let validationErrors = null;

  if (!mokko.content || mokko.content === EMPTY_P_TAG) {
    validationErrors = "Please add text to the note.";
  }

  let tz_agnostic_date_created;
  try {
    tz_agnostic_date_created = new Date(`${mokko.date_created}T00:00:00`)
      .toISOString()
      .slice(0, 10);
  } catch (error) {
    validationErrors = validationErrors
      ? (validationErrors +=
          " In addition, please refresh the page to set the date created to a valid date.")
      : "Please refresh the page to set the date created to a valid date.";
  }

  if (!validationErrors) {
    validatedMokko = {
      ...mokko,
      date_created: tz_agnostic_date_created,
    };
  }

  return {
    validatedMokko,
    validationErrors,
  };
}
