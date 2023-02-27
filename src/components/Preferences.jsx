import React, { useCallback, useEffect, useState } from "react";
import { getUserPreferences } from "../utils/appUtils";
import { BASE_NOTE_PRIORITIES } from "../data/constants";
import { db } from "../data/db";

function Preferences() {
  const [userPreferences, setUserPreferences] = useState();
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const loadPreferences = useCallback(async function () {
    const {
      prefersDarkMode: appSpecificDarkModePreference,
      ...otherUserPreferences
    } = await getUserPreferences();

    // If the user hasn't set it, defer to browser/os
    if (appSpecificDarkModePreference !== null) {
      setPrefersDarkMode(appSpecificDarkModePreference);
    }

    setUserPreferences(otherUserPreferences);
  }, []);

  // initial dataload
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const toggleDarkMode = async () => {
    const newDarkModePreference = !prefersDarkMode;

    await db.preferences.update(1, { prefersDarkMode: newDarkModePreference });

    const newDarkModeValue = newDarkModePreference ? "dark" : "garden";
    const htmlTag = document.querySelector("html");
    htmlTag.setAttribute("data-theme", newDarkModeValue);

    setPrefersDarkMode(newDarkModePreference);
  };

  const handleDailyLimitChange = async ({ target: { value } }) => {
    const newDailyLimit = value ? Number(value) : 0;
    await db.preferences.toCollection().modify((preferences) => {
      preferences.mokkogenDailyLimit.ceiling = newDailyLimit;
      return;
    });
    await loadPreferences();
  };

  const handleBaseNotePrioritizationChange = async ({ target: { value } }) => {
    await db.preferences.update(1, { baseNotePrioritization: value });
    await loadPreferences();
  };

  if (!userPreferences) {
    return <></>;
  } else {
    return (
      <div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Toggle Dark Mode</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={toggleDarkMode}
              checked={prefersDarkMode}
            />
          </label>
        </div>

        <div className="form-control mt-8">
          <label className="label">
            <span className="label-text">
              Maximum daily notes for mokkogen:
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={userPreferences.mokkogenDailyLimit.ceiling}
            onChange={handleDailyLimitChange}
          />
          <label className="label">
            <span className="label-text-alt">
              Leave blank or set to &quot;0&quot; to remove daily limit
            </span>
          </label>
        </div>

        <div className="form-control w-full max-w-xs mt-4">
          <label className="label">
            <span className="label-text">
              When selecting base notes for mokkogen:
            </span>
          </label>
          <select
            className="select select-bordered"
            name="allowed_cue_types"
            value={userPreferences.baseNotePrioritization}
            onChange={handleBaseNotePrioritizationChange}
          >
            {Object.entries(BASE_NOTE_PRIORITIES).map(
              ([key, { name, value }]) => (
                <option key={key} value={value}>
                  {name}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    );
  }
}

export default Preferences;
