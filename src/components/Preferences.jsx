import React, { useCallback, useEffect, useState } from "react";
import { getUserPreferences } from "../utils/appUtils";
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
    console.log("value: ", value);
    const newDailyLimit = value ? Number(value) : 0;
    await db.preferences.toCollection().modify((preferences) => {
      preferences.mokkogenDailyLimit.ceiling = newDailyLimit;
      return;
    });
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
            <span className="label-text">Maximum daily notes for mokkogen:</span>
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
      </div>
    );
  }
}

export default Preferences;
