export const BUILTIN_CUE_TAG = "builtin_cue";

export const INVALID_DATE = "Invalid Date";

export const MOKKOGEN_COMPLETE = "Mokkogen Complete";

export const MOKKOGEN_DAILY_LIMIT_REACHED = "Mokkogen Daily Limit Reached";

export const ALL_CUE_TYPES = {
  oblique: { name: "Oblique Strategies", urlPath: "Oblique_Strategies" },
  scamper: { name: "SCAMPER", urlPath: "SCAMPER" },
  triz: { name: "TRIZ", urlPath: "TRIZ" },
  notes: { name: "Your Collected Notes", urlPath: null },
};

export const EMPTY_P_TAG = "<p></p>";

export const INITIAL_NOTE_DATA = {
  content: "",
  current_interval: 1,
  next_occurrence: null,
  tags: [],
  suspended: false,
  cue_type: "notes",
  allowed_cue_types: ["notes"],
};

export const INITIAL_MOKKO_DATA = {
  content: "",
  tags: [],
};

export const NOTES_PER_PAGE = 10;

export const MOKKOS_PER_PAGE = 10;

export const BASE_NOTE_INTERVALS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

export const FITS_ALL_THREE_MOKKOGEN_CARDS = 1920;

export const ALL_SETTINGS_TABS = {
  PREFERENCES: "preferences",
  DATA: "data",
};
