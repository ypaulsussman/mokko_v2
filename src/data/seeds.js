import { db } from "./db";
import seedData from "./seedData.json";

export async function seedMokkos() {
  let mokkosWithDates = [];
  for (let index = 0; index < seedData.mokkos.length; index++) {
    mokkosWithDates.push({
      ...seedData.mokkos[index],
      date_created: new Date().getTime(),
    });
  }
  try {
    db.mokkos.bulkAdd(mokkosWithDates);
  } catch (error) {
    console.log("Error seeding Mokkos:", error);
  }
}

export async function seedNotes() {
  let builtInNotes = [];
  for (let index = 0; index < seedData.notes.length; index++) {
    builtInNotes.push(seedData.notes[index]);
  }
  try {
    db.notes.bulkAdd(builtInNotes);
  } catch (error) {
    console.log("Error seeding Notes:", error);
  }
}