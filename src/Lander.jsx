import React from "react";
import { seedMokkos, seedNotes } from "./data/seeds";

async function seedDB() {
  seedNotes();
  if (import.meta.env.MODE === "development") {
    seedMokkos();
  }
}

function Lander() {
  return (
    <div className="grid mt-8">
      <div className="justify-self-center prose">
        <h1>Welcome to Mokko!</h1>

        <p>The very important things:</p>

        <ol>
          <li>
            It&apos;s an experiment into using spaced-repetition systems for
            purposes other than boosting memory-retrieval strength.
            <ol type="i">
              <li>
                It attempts to align the concepts of &quot;programmable
                attention&quot; and &quot;combinatorial idea-creation&quot;.
              </li>
              <li>
                See the <code>README.md</code> of{" "}
                <a
                  href="https://github.com/ypaulsussman/mokko-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this project&apos;s v1
                </a>{" "}
                for more.
              </li>
            </ol>
          </li>
          <li>
            It uses IndexedDB for storage.
            <ol type="i">
              <li>
                Any data you enter lives only on this machine, and only on this
                browser.
              </li>
              <li>
                This means no logins, no tracking, and no need for an internet
                connection.
              </li>
              <li>
                It also means that you can&apos;t share URL&apos;s with others,
                and that you&apos;ll lose all data if you delete this browser or
                break this device.
              </li>
              <li>
                You can, however, export (and reimport) your work as a flat
                file, and store that snapshot/backup anywhere you like.
              </li>
            </ol>
          </li>
          <li>
            It&apos;s this way deliberately: I don&apos;t (badly) want your
            money, email, ideas, etc.
            <ol type="i">
              <li>
                I do, however, go ham over the ways technology might improve
                teaching, thinking, language, and learning!
              </li>
              <li>
                Hit me up to rap further; I always like to hear what others are
                up to. :)
              </li>
            </ol>
          </li>
          <li>
            Sound good?
            <button type="button" onClick={seedDB} className="btn btn-link">
              Click here
            </button>
            to add some data and get started!
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Lander;
