import React, { useState } from "react";
import { ALL_SETTINGS_TABS } from "./data/constants";
import DataImportExport from "./components/DataImportExport";
import Preferences from "./components/Preferences";

const { PREFERENCES, DATA } = ALL_SETTINGS_TABS;

function ManageSettings() {
  const [selectedTab, setSelectedTab] = useState(PREFERENCES);
  return (
    <div className="grid">
      <div className="justify-self-center prose">
        <h1 className="text-center">Settings</h1>

        <div className="tabs flex justify-center mb-8">
          <button
            type="button"
            className={`tab tab-bordered ${
              selectedTab === DATA && "tab-active"
            }`}
            onClick={() => setSelectedTab(DATA)}
          >
            Data Import/Export
          </button>
          <button
            type="button"
            className={`tab tab-bordered ${
              selectedTab === PREFERENCES && "tab-active"
            }`}
            onClick={() => setSelectedTab(PREFERENCES)}
          >
            Preferences
          </button>
        </div>

        {selectedTab === PREFERENCES ? <Preferences /> : <DataImportExport />}
      </div>
    </div>
  );
}

export default ManageSettings;
