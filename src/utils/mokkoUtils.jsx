import { EMPTY_P_TAG } from "../data/constants";

export function validateMokko(mokko) {
  let validationErrors = null;

  if (!mokko.content || mokko.content === EMPTY_P_TAG) {
    validationErrors = "Please add text to the note.";
  }

  return {
    validatedMokko: mokko,
    validationErrors,
  };
}
