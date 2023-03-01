import React, { useState } from "react";
import { db } from "../data/db";

function DataImportExport() {
  const [exportableData, setExportableData] = useState(null);

  const prepareDataForExport = async () => {
    const data = {};
    [data.notes, data.mokkos, data.preferences] = await Promise.all([
      db.notes.toArray(),
      db.mokkos.toArray(),
      db.preferences.toArray(),
    ]);

    setExportableData(JSON.stringify(data));
  };

  const importDataFromFile = async () => {
    const backupFile = document.getElementById("mokko_backup").files[0];
    if (!backupFile) {
      alert("Please first upload a file from which to import.");
      return;
    }
    const fileText = await backupFile.text();
    const {
      notes: newNotes,
      mokkos: newMokkos,
      preferences: newPreferences,
    } = JSON.parse(fileText);

    await Promise.all([
      db.notes.clear(),
      db.mokkos.clear(),
      db.preferences.clear(),
    ]);

    await Promise.all([
      db.notes.bulkAdd(newNotes),
      db.mokkos.bulkAdd(newMokkos),
      db.preferences.bulkAdd(newPreferences),
    ]);
  };

  return (
    <div className="mb-12">
      <div>
        <h2>Export Data</h2>
        <p>
          Click the button below to begin the file-creation process. (
          <em>It might take a couple seconds.</em>)
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={prepareDataForExport}
        >
          Generate Backup Data
        </button>
        <p>When the file is ready, a download link will appear below:</p>
        {exportableData && (
          <a
            href={`${
              "data:Application/octet-stream," +
              encodeURIComponent(exportableData)
            }`}
            download={`backup_${new Date().toISOString().slice(0, 10)}.json`}
          >
            Download Backup Data
          </a>
        )}
      </div>

      <hr />

      <div>
        <h2>Import Data</h2>
        <p>Be careful when using this:</p>
        <ul>
          <li>the backup file must be JSON;</li>
          <li>
            that file must follow the same schema as the (
            <em>exportable above</em>) backup files; and
          </li>
          <li>
            regardless of success or failure, this will wipe all data currently
            in mokko.
          </li>
        </ul>
        <p>
          It never hurts to pull down a backup (
          <em>see section immediately above</em>) prior.
        </p>

        <label htmlFor="mokko_backup">
          When ready, upload your JSON file below:
        </label>

        <input
          type="file"
          id="mokko_backup"
          name="mokko_backup"
          className="file-input file-input-bordered my-4"
          accept=".json"
        />

        <p>
          Finally, click the button below to overwrite your browser&apos;s mokko
          data with that of the uploaded file:
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={importDataFromFile}
        >
          Import Data from File
        </button>
      </div>
    </div>
  );
}

export default DataImportExport;
