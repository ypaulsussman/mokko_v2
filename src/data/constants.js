export const CUE_TYPES = {
  oblique: { name: "Oblique Strategies", path: "Oblique_Strategies" },
  scamper: { name: "SCAMPER", path: "SCAMPER" },
  triz: { name: "TRIZ", path: "TRIZ" },
  notes: { name: "Your Collected Notes", path: null },
};

export const EMPTY_P_TAG = "<p></p>"

export const INITIAL_NOTE_DATA = {
  content: "",
  current_interval: 1,
  next_occurrence: null,
  tags: [],
  suspended: false,
  builtin_cue_membership: "",
  available_cue_types: ["notes"],
};

export const INVALID_DATE = 'Invalid Date'

