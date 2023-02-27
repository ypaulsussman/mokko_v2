import React from "react";
import { db } from "../data/db";
import devSeedData from "../data/seedDataForDev.json";
import prodSeedData from "../data/seedDataForProd.json";

export async function getUserPreferences() {
  // so. hacky. fix/rearchitect this someday, and hope nobody notices in the interim
  const userPreferences = await db.preferences.toCollection().first();
  return userPreferences;
}

export async function seedDB() {
  const { notes, mokkos, preferences } =
    import.meta.env.MODE === "development" ? devSeedData : prodSeedData;
  try {
    await db.notes.bulkAdd(notes);
    await db.mokkos.bulkAdd(mokkos);
    await db.preferences.bulkAdd(preferences);
  } catch (error) {
    console.log("Error seeding initial data:", error);
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

export function getMokkogenCompleteHTML() {
  return (
    <div className="flex flex-col justify-evenly items-center gap-8 m-12">
      <p className="text-2xl">
        Noiiiiice: you&apos;ve finished all of today&apos;s notes! 🤘
      </p>
    </div>
  );
}

export function getMokkogenDailyLimitReachedHTML() {
  return (
    <div className="flex flex-col justify-evenly items-center gap-8 m-12">
      <p className="text-2xl">
        Congrats! You&apos;ve reached your daily limit of mokkogens 🤙
      </p>
      <p className="text-xl">
        (You can increase/decrease this limit in{" "}
        <code className="m-0 px-1">Preferences</code>, under{" "}
        <code className="m-0 px-1">Settings</code> at the top-right)
      </p>
    </div>
  );
}
