import { db } from "../data/db";
import seedData from "../data/seedData.json";

export async function getAppSpecificDarkModePreference() {
  // so. hacky. fix this someday, and hope nobody notices in the interim
  const userSettings = await db.settings.toCollection().first();
  
  return userSettings ? userSettings.prefersDarkMode : undefined;
}

export async function seedMokkos() {
  try {
    await db.mokkos.bulkAdd(seedData.mokkos);
  } catch (error) {
    console.log("Error seeding Mokkos:", error);
  }
}

export async function seedNotes() {
  try {
    await db.settings.bulkAdd(seedData.settings);
    await db.notes.bulkAdd(seedData.notes);
  } catch (error) {
    console.log("Error seeding Notes:", error);
  }
}
