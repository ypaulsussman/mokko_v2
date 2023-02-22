import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserPreferences } from "./utils/appUtils";

import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    async function setDarkMode() {
      let darkModePreference =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      // If the user hasn't set an app-specific preference, defer to browser/os
      const userPreferences = await getUserPreferences();
      if (userPreferences && userPreferences.prefersDarkMode !== null) {
        darkModePreference = userPreferences.prefersDarkMode;
      }

      const darkModeValue = darkModePreference ? "dark" : "garden";
      const htmlTag = document.querySelector("html");
      htmlTag.setAttribute("data-theme", darkModeValue);
    }

    setDarkMode();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
