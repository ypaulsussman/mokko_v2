import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAppSpecificDarkModePreference } from "./utils/appUtils";

import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    async function setDarkMode() {
      let darkModePreference =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const appSpecificPreference = await getAppSpecificDarkModePreference();

      if (appSpecificPreference !== undefined) {
        darkModePreference = appSpecificPreference;
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
