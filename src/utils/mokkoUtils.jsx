import { getNumericArgsFromDateString } from "../utils/appUtils";
import { EMPTY_P_TAG } from "../data/constants";

export function validateMokko(mokko) {
  let validatedMokko = null;
  let validationErrors = null;

  if (!mokko.content || mokko.content === EMPTY_P_TAG) {
    validationErrors = "Please add text to the note.";
  }

  let date_created_UTC;
  try {
    date_created_UTC = new Date(
      Date.UTC(...getNumericArgsFromDateString(mokko.date_created))
    )
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
      date_created: date_created_UTC,
    };
  }

  return {
    validatedMokko,
    validationErrors,
  };
}
