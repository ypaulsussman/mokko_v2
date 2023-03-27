import React from "react";

function About() {
  return (
    <div className="grid my-8">
      <div className="justify-self-center prose">
        <h1 className="text-center">About Mokko</h1>
        <section>
          <p className="text-sm leading-6">
            <em>
              NB: this page elaborates the reasoning behind this application.
            </em>
          </p>
          <p className="text-sm leading-6">
            <em>
              For the most-basic facts to e.g. inform whether this tool even
              merits further engagement, you might want{" "}
              <a href="/">the homepage</a>.
            </em>
          </p>
          <ul className="border-solid border-2 border-slate-300 rounded-md p-6 mt-9 list-none">
            <li className="pb-2">
              <a href="#app-structure">How is the app structured?</a>
            </li>
            <li className="pb-2">
              <a href="#why-build">Why did you build this?</a>
            </li>
            <li className="pb-2">
              <a href="#how-using">How have you been using it?</a>
            </li>
            <li className="pb-2">
              <a href="#feature-selection">
                Why did you choose these features?
              </a>
            </li>
            <li>
              <a href="#which-technologies">What technologies did you use?</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 id="app-structure">How is the app structured?</h2>
          <p>@TODO</p>
          {/* 
          - explain Note && Mokko structure
          - explain mokkogen process
           */}
        </section>

        <section>
          <h2 id="why-build">Why did you build this?</h2>
          <p>
            Partially, I wanted to push back at the hundreds of forces seeking
            to wrest control of my (<em>both conscious and unconscious</em>)
            attention: to dictate, deliberately, what I spend time thinking
            about.
          </p>
          <p>
            Partially, I wanted to test whether I could increase my frequency of
            nifty-idea-generation by juxtaposing snippets of previously-valued
            information in unpredictable ways.
          </p>
          <p>Some examples of influential principles might be:</p>
          <ul>
            <li>
              Gordon Brander&apos;s highlighting of &quot;
              <a
                href="https://subconscious.substack.com/p/ideas-procreate-through-citation"
                target="_blank"
                rel="noopener noreferrer"
              >
                ideas as evolutionary agents
              </a>
              &quot;;
            </li>
            <li>
              The digression in Alan Kay&apos;s &quot;
              <a
                href="https://github.com/osnr/demo2014-kay/blob/master/the-future-doesnt-have-to-be-incremental.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Future Doesn&apos;t Have to Be Incremental
              </a>
              &quot; regarding Ford, Leonardo, and the comparative merits of
              knowledge and IQ;
            </li>
            <li>
              Paul Graham&apos;s brief comments on &quot;
              <a
                href="http://paulgraham.com/getideas.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                How to Get New Ideas
              </a>
              &quot;; and
            </li>
            <li>
              Paul Ricoeur&apos;s (
              <em>possibly misremembered and/or apocryphal</em>) quote that
              &quot;
              <em>the perception of incongruity gives rise to thought</em>
              &quot;.
            </li>
          </ul>
        </section>

        <section>
          <h2 id="how-using">How have you been using it?</h2>
          <p>
            I&apos;ve set a calendar reminder to &quot;mokkogen&quot; (
            <em>
              that is: surface, collide with another note, reflect on their
              juxtaposition, then note down reflections
            </em>
            ) six notes, daily; work/life permits me to hit this ~5/week.
          </p>
          <p>
            (
            <em>
              I&apos;ve been surprised by how time consuming the process can
              sometimes be! I find it consumes 30-45 minutes, occasionally
              running longer.
            </em>
            )
          </p>
          <p>
            Immediately after each such round of mokkogen, I export a JSON
            snapshot of the data&apos;s current state to my local filesystem (
            <em>and then back that up to an external/cloud.</em>)
          </p>
          <hr />
          <p>
            I&apos;ve then set a second calendar reminder, each Sunday, for me
            to open the most-recent snapshot and review the mokkos that I
            generated that week.
          </p>
          <p>
            I usually find myself extracting several promising ideas into my{" "}
            <code>nsu_plans.md</code> doc (
            <em>
              where &quot;NSU&quot; is shorthand for my next toy-app/side
              project
            </em>
            ).{" "}
          </p>
          <p>
            Equally often, however, I&apos;m pleasantly surprised by an
            unexpected, emergent observation on some sub-sub-field that I&apos;m
            not currently engaged in, but nonetheless like to remain cognizant
            of.
          </p>
          <p>
            So far, at least, I&apos;m encouraged to continue using it daily:
            despite the nontrivial time it consumes!
          </p>
          <hr />
          <p>
            One potential caveat: due to some gnarly wrist/forearm RSI, I use
            the keyboard very rarely, relying instead on the excellent{" "}
            <a
              href="https://talonvoice.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talon Voice
            </a>
            . (
            <em>
              For more on that tool, I highly recommend{" "}
              <a
                href="https://www.youtube.com/watch?v=YKuRkGkf5HU"
                target="_blank"
                rel="noopener noreferrer"
              >
                this demonstration
              </a>
              .
            </em>
            )
          </p>
          <p>
            That leaves my personal usage a little idiosyncratic, in that most
            of my mokko text-creation occurs via dictation and automatic
            speech-recognition; I&apos;d be very curious as to the experiences
            of others who input mokko-text via keyboard.
          </p>
          {/* 

- text description of how you, at least, have been using it -- so visitors can get an understanding of what the app offers w/o first signing up.

- Explicitly suggest *how* to use the app, i.e., "_for the next week or so, open the app for a couple minutes, and see if the intersections/collisions of two notes prompt any insights, ideas, or reflections. Or just see if being reminded of their content inserts itself into your daily train of thought productively. It might not! This is largely theoretically-derived and ungrounded in any prior science, even social. But it seems low-risk to test a bit._"
 */}
        </section>

        <section>
          <h2 id="feature-selection">Why did you choose these features?</h2>
          <p>I spend a lot of time in Anki already.</p>
          <p>
            I already maintain my beloved filesystem hierarchy of Markdown
            notes.
          </p>
          <p>
            I have no idea whether I&apos;m going to wake up, one day, and just
            never again want to think about mokko, versus tinkering on something
            new instead.
          </p>
          <p>As such, I wanted to hedge my bets in terms of project scope.</p>
          <hr />
          <p>
            My goal was to follow the Unix philosophy/Single Responsibility
            Principle: this app isn&apos;t designed to be used as a knowledge
            base, a unified notetaking system, or a second brain.
          </p>
          <p>
            Rather, the hope is that it &quot;
            <em>does one thing and does it well</em>&quot;, providing
            composability with whatever other tools you&apos;re is using.
          </p>
          <hr />
          <p>
            Similarly, it&apos;s not really meant to directly/naively consume
            content from any such system.
          </p>
          <p>
            (
            <em>
              Hence its construction as a weird little
              static-site-with-local-data-persistence amphibian, as opposed to a
              simple e.g. Obsidian, Notion, Zotero, etc plugin
            </em>
            ).
          </p>
          <p>
            My personal experience is that the app is most useful when operating
            on content which:
          </p>
          <ol>
            <li>
              you want to be thinking about frequently, and from a variety of
              angles; or
            </li>
            <li>
              is intriguing, abstracted, provocative, etc enough that you
              predict it will combine meaningfully/productively with a variety
              of ideas.
            </li>
          </ol>
        </section>

        <section>
          <h2 id="which-technologies">What technologies did you use?</h2>
          <p>@TODO</p>
          {/* 
- Tech-stack choices
- first important caveat: this is proof-of-concept code. peep all the (nonexistent) typings! or even unit tests! peep how i made two quick passes at tz-agnostic coercion for storage, decided that i don't actually need day-specific fidelity, and just walked away from it! if anything, take the state of the codebase as me doubling down on my assertion that this isn't some stealth SAAS MVP: i have no intention of converting this to a billable product, because that would involve a bunch of hygenic software development that i just don't feel like doing on my weekends-and-evenings.
- now, on to the reasoning behind the tools.
- Selfishly: wanted more practice building in React Hooks; working almost exclusively in Django at work these days, which is fine but [1] has a vastly inferior braces-per-LOC score, and [2] leaves me pretty vulnerable if I find myself unexpectedly needing to pick up a new web-development job.
- Three "innovation tokens" [link the 'choose boring technology' articles] => IndexedDB, Vite, TailwindCSS 
*/}
        </section>
      </div>
    </div>
  );
}

export default About;
