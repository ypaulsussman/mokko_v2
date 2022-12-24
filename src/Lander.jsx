function Lander() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-start-2 md:col-span-2 prose">
        <h1>Welcome to Mokko!</h1>

        <p>The very important things:</p>

        <ol>
          <li>
            It's an experiment into using spaced-repetition systems for purposes
            other than boosting retrieval strength.
            <ol type="i">
              <li>
                It attempts to align the concepts of "programmable attention"
                and "combinatorial idea-creation"
              </li>
              <li>
                See the <code>README.md</code> of{" "}
                <a
                  href="https://github.com/ypaulsussman/mokko-web"
                  target="_blank"
                  rel="noopener"
                >
                  this project's v1
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
                This means no logins, data privacy, and no need for an internet
                connection.
              </li>
              <li>
                It also means that you can't share URL's, and that you'll lose
                all data if you delete this browser or break this device.
              </li>
              <li>
                You can, however, export (and reimport) your work as a flat
                file, and store that snapshot/backup anywhere you like.
              </li>
            </ol>
          </li>
          <li>
            It's this way deliberately: I don't want your money, your email,
            your ideas, etc.
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
          <li>Sound good? Click here to set up your local and get started.</li>
        </ol>
      </div>
    </div>
  );
}

export default Lander;
