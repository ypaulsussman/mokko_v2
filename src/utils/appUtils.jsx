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

// (Probably incorrectly) following date-creation advice here:
// https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/#aa-creating-dates-with-arguments
// and UTC-conversion advice here:
// https://stackoverflow.com/a/11957822 (cf also discussion between `user1944491` and `FFF`; the
// TLDR -- confirmed in browser -- is that `toISOString` returns the date w/ zero UTC offset)
export function getNumericArgsFromDateString(dateInISO) {
  let dateArgs = dateInISO.split("-").map((string) => Number(string));
  // Zero-indexed months... >_<
  dateArgs[1] = dateArgs[1] - 1;
  return dateArgs;
}