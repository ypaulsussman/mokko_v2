import Dexie from "dexie";

export const db = new Dexie("mokkoDatabase");

db.version(1).stores({
  notes: "++id, content, *tags, next_occurrence",
  mokkos: "++id, content, *tags, base_note_id",
  preferences: '++id'
});

