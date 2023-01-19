const CUE_TYPES = {
  oblique: { name: "Oblique Strategies", path: "Oblique_Strategies" },
  scamper: { name: "SCAMPER", path: "SCAMPER" },
  triz: { name: "TRIZ", path: "TRIZ" },
  notes: { name: "collected notes", path: null },
};

function getBuiltInCueString(membership) {
  return (
    <>
      <p>
        This note comes from one of the three built-in cue decks (specifically{" "}
        <a href={`https://en.wikipedia.org/wiki/${CUE_TYPES[membership].path}`}>
          {CUE_TYPES[membership].name}
        </a>
        .)
      </p>
      <p>
        By default, no notes that you add will collide with these builtins; you
        can change that by editing a note's available cue types (or enabling one
        globally in settings.)
      </p>
    </>
  );
}

function getCueOnlyString() {
  return (
    <>
      <p>
        This note is currently selected to function solely as a cue: it will
        never surface on its own, but only when randomly selected to "collide"
        with a base note during mokko generation.
      </p>
      <p>You can change this by toggling its "Cue Only" setting.</p>
    </>
  );
}

function buildScheduleData(next_occurrence, current_interval) {
  if (!next_occurrence) {
    return (
      <>
        <p>
          This note hasn't surfaced yet! You can encounter it sooner, if you
          desire, by changing the number of notes you interact with daily inside
          settings.
        </p>
      </>
    );
  } else {
    return (
      <>
        <p>
          This note is next scheduled to be used for generating a mokko on{" "}
          {next_occurrence.toISOString()}.
        </p>
        <p>
          (It's currently programmed to surface every {current_interval} days.)
        </p>
      </>
    );
  }
}

function buildCueData(use_no_cue, available_cue_types) {
  if (use_no_cue) {
    return (
      <>
        <p>
          This note currently has cues toggled off; when it surfaces, you'll be
          prompted for a mokko (in this case, sans collision, really more of a
          traditional reflection or rumination) without another note as
          secondary input.
        </p>
      </>
    );
  } else {
    return (
      <>
        {available_cue_types.length === 1 ? (
          <p className="mb-12">
            Any time this note surfaces for mokko generation, its partner
            cue-note will be chosen randomly from the{" "}
            {CUE_TYPES[available_cue_types[0]].name} deck.
          </p>
        ) : (
          <>
            <p className="mb-12">
              Any time this note surfaces for mokko generation, its partner
              cue-note will be chosen randomly from the following decks:{" "}
              {available_cue_types.map((cue) => CUE_TYPES[cue].name).join(", ")}.
            </p>
          </>
        )}
      </>
    );
  }
}

export function buildDetailData({
  builtin_cue_membership,
  cue_only,
  next_occurrence,
  current_interval,
  use_no_cue,
  available_cue_types,
}) {
  if (builtin_cue_membership) {
    return getBuiltInCueString(builtin_cue_membership);
  }
  if (cue_only) {
    return getCueOnlyString();
  }
  return (
    <>
      {buildScheduleData(next_occurrence, current_interval)}
      {buildCueData(use_no_cue, available_cue_types)}
    </>
  );
}
