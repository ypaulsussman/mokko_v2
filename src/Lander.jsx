import React from "react";
import { seedDB } from "./utils/appUtils";

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
                See the <code className="m-0 px-1">README.md</code> of{" "}
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
            It&apos;s this way deliberately: I do <em>not</em> want your money,
            email, ruminations, etc.
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
            <button
              type="button"
              onClick={async () => {
                await seedDB();
              }}
              className="btn btn-link m-0 py-0 pl-2 pr-1"
            >
              <p className="capitalize">Click here</p>
            </button>
            to add some data and get started! (
            <em>
              NB most other pages will be broken without loading that data: but,
              hey, consent matters.
            </em>
            )
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Lander;
