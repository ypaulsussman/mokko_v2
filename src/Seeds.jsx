import React from "react";
import { seedDB } from "./utils/appUtils";
import { SEED_FILES } from "./data/constants";

function Seeds() {
  return (
    <div className="grid mt-8 mb-12">
      <div className="justify-self-center prose">
        <h1 className="text-center">Add Demo Data</h1>
        <p className="text-sm leading-6">
          <em>
            NB you can visit this page/reseed the app at any time -- but on each
            occasion it <strong>will</strong> overwrite all preexisting data.
          </em>
        </p>
        <p className="text-sm leading-6">
          <em>
            You can visit the Manage Settings page (via the link at the top
            right) to export your app&apos;s current state, beforehand, if
            you&apos;d like to save it for the option to reimport later.
          </em>
        </p>
        <p>You can seed the app with two sets of data:</p>
        <ol>
          <li>
            <button
              type="button"
              onClick={async () => {
                await seedDB(SEED_FILES.EMPTY);
              }}
              className="btn btn-link m-0 py-0 px-1"
            >
              <p className="text-base capitalize">The Empty Option</p>
            </button>
            <ol type="i">
              <li>
                This import only contains [1] the structure for Notes, Mokkos,
                and Settings, and [2] data for the three types of initial
                &quot;builtin cue notes&quot;.
              </li>
              <li>
                It&apos;s a good choice for if/when you would like to begin
                using the app yourself.
              </li>
              <li>
                You&apos;ll need to upload your own notes, either individually
                (via the UI), or by exporting the seeded schema, manually
                batch-adding JSON objects in a text editor, and reimporting.
              </li>
            </ol>
          </li>
          <li>
            <button
              type="button"
              onClick={async () => {
                await seedDB(SEED_FILES.FULL);
              }}
              className="btn btn-link m-0 py-0 px-1"
            >
              <p className="text-base capitalize">The Full Option</p>
            </button>
            <ol type="i">
              <li>
                This import is a snapshot of my personal app&apos;s state on
                March 31, 2023. It includes [1] the Notes that I&apos;ve
                uploaded, [2] the Mokkos I&apos;ve used them to generate, and
                [3] the settings I&apos;d been testing over that ~week.
              </li>
              <li>
                It&apos;s likely most useful as an example of how the app{" "}
                <em>might</em> end up looking after a couple weeks of sustained
                usage.
                <br /> (
                <em>
                  If you&apos;d like to use it as a point of departure for your
                  own experiments, however, go forth with my blessing and
                  encouragement!
                </em>
                )
              </li>
              <li>
                FWIW, this file&apos;s notes almost exclusively focus on such
                topics as memory, learning, tool- and product-design, and a bit
                of linguistics.
                <br /> (
                <em>
                  I&apos;ve largely been using the app to elicit brainstorming
                  and reflection on feature ideas for a software wraparound that
                  would facilitate more-deliberate engagement with the -- for
                  me, at least -- dense, thorny, supercool content in
                  nonacademic CS textbooks.
                </em>
                )
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Seeds;
