import { CUE_TYPES } from "../data/constants";

function DetailsEditor({
  note,
  handleNextOccurrenceChange,
  handleSuspendedChange,
  handleAvailableCuesChange,
}) {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label pt-0">
          <span className="label-text">
            Next surface this note for mokkogen on:
          </span>
        </label>
        <input
          type="text"
          name="next_occurrence"
          value={note.next_occurrence ? note.next_occurrence : ""}
          onChange={handleNextOccurrenceChange}
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label">
          <span className="label-text-alt">
            Please use YYYY-MM-DD format, or keep empty to use this note solely
            as a cue for other notes.
          </span>
        </label>
      </div>

      <div className="form-control w-full max-w-xs mt-4">
        <label className="label">
          <span className="label-text">
            Select which decks to draw cue notes from:
          </span>
        </label>
        <select
          className="select select-bordered"
          multiple={true}
          name="available_cue_types"
          value={note.available_cue_types}
          onChange={handleAvailableCuesChange}
        >
          {Object.keys(CUE_TYPES).map((cue_key) => (
            <option key={cue_key} value={cue_key}>
              {CUE_TYPES[cue_key].name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs mt-5">
        <label className="label cursor-pointer">
          <span className="label-text">Suspend this note for now</span>
          <input
            type="checkbox"
            name="suspended"
            checked={note.suspended}
            onChange={handleSuspendedChange}
            className="checkbox"
          />
        </label>
      </div>
    </>
  );
}

export default DetailsEditor;
