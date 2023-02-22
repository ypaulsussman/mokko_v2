import React, { useEffect, useState } from "react";
import { getUserPreferences } from "../utils/appUtils";
import { db } from "../data/db";

function Preferences() {
  // eslint-disable-next-line no-unused-vars
  const [userPreferences, setUserPreferences] = useState()
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    async function loadPreferences() {
      const {
        prefersDarkMode: appSpecificDarkModePreference,
        ...otherUserPreferences
      } = await getUserPreferences();

      // If the user hasn't set it, defer to browser/os
      if (appSpecificDarkModePreference !== null) {
        setPrefersDarkMode(appSpecificDarkModePreference);
      }

      setUserPreferences(otherUserPreferences)
    }
    loadPreferences();
  }, []);

  const toggleDarkMode = async () => {
    const newDarkModePreference = !prefersDarkMode;

    await db.preferences.update(1, { prefersDarkMode: newDarkModePreference });

    const newDarkModeValue = newDarkModePreference ? "dark" : "garden";
    const htmlTag = document.querySelector("html");
    htmlTag.setAttribute("data-theme", newDarkModeValue);

    setPrefersDarkMode(newDarkModePreference);
  };

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
    </div>
  );
}

export default Preferences;
