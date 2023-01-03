import Dexie from "dexie";

export const db = new Dexie("mokkoDatabase");

db.version(1).stores({
  notes: "++id, content, *tags, cue_only, next_occurrence",
  mokkos: "++id, content, base_note_id"
});

