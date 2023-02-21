import React, { useEffect, useState } from "react";
import { getAppSpecificDarkModePreference } from "../utils/appUtils";
import { db } from "../data/db";

function Preferences() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    let appSpecificPreference;
    // Can't make useEffect arg an async fn
    async function wrapDarkModeCheck() {
      appSpecificPreference = await getAppSpecificDarkModePreference();
    }
    wrapDarkModeCheck();

    // If the user hasn't set it, defer to browser/os settings
    if (appSpecificPreference !== undefined) {
      setPrefersDarkMode(appSpecificPreference);
    }
  }, []);

  const toggleDarkMode = async () => {
    const newDarkModePreference = !prefersDarkMode;

    await db.settings.update(1, { prefersDarkMode: newDarkModePreference });

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
