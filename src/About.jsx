import React from "react";

function About() {
  return (
    <div className="grid mt-8 mb-12">
      <div className="justify-self-center prose">
        <h1 className="text-center">About Mokko</h1>
        <section>
          <p className="text-sm">
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
                Why did you choose these particular features?
              </a>
            </li>
            <li>
              <a href="#which-technologies">What technologies did you use?</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 id="app-structure">How is the app structured?</h2>
          <p>
            It revolves around two resources, <code>Notes</code> and{" "}
            <code>Mokkos</code>.
          </p>
          <p>
            Both represent snippets of text: they each have a rich-text{" "}
            <code>content</code> field, and a list of searchable{" "}
            <code>tags</code> for appending metadata (
            <em>as well as several other, resource-unique fields.</em>)
          </p>
          <p>
            Notes are meant to contain anything thought-provoking, anything
            you&apos;d like to ruminate on in the future: insightful excerpts
            from something you&apos;ve read, incomplete observations you&apos;d
            like to hone and worry at further, a friend&apos;s
            counterintuitive-yet-compelling claim, or even a quotidian fact you
            find yourself struck by.
          </p>
          <p>
            This app is not meant to be your sole repository of these
            miscellanea; instead, it allows you to program how often you&apos;ll
            be prompted/invited to consider each Note.
          </p>
          <p>
            Though it&apos;s sometimes superfluous, I&apos;ve found that
            juxtaposing the selected Note with a randomly-selected other helps
            me engage with that base Note from other angles; in my experience,
            it facilitates rewarding, productive contemplation.
          </p>
          <p>
            A Mokko is the place to record any durable output from any given
            contemplation.
          </p>
          <p>
            The <code>Manage</code> tab at the top right contains pages for
            create/read/update/delete actions on those two resources, as well as
            a data-export utility and a couple settings that I&apos;d found
            myself wanting to experiment with.
          </p>
          <p>
            The <code>Mokkogen</code> tab, when clicked, will ~randomly select
            one Note which is scheduled to be surfaced today or prior, to serve
            as the &quot;base&quot;; it will also randomly select one
            &quot;cue&quot; Note to pair it with. When you&apos;re ready, you
            can then save any new thoughts or ideas you&apos;d like to persist
            into the sibling Mokko form.
          </p>
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
              my dumb shorthand for the process of surfacing a note; colliding
              it with another note; reflecting on it, them, their juxtaposition,
              etc; then noting down those reflections
            </em>
            ) daily; work/life permits me to hit this ~5/week.
          </p>
          <p>
            (
            <em>
              I&apos;ve been surprised by how time consuming the process can
              sometimes be! I find my typical ~six-note regimen consumes 30-45
              minutes, occasionally running longer.
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
          <h2 id="feature-selection">
            Why did you choose these particular features?
          </h2>
          <p>I spend a lot of time in Anki already.</p>
          <p>
            I already maintain my beloved filesystem hierarchy of Markdown
            notes.
          </p>
          <p>
            (<em>Much as I wish it were otherwise!</em>) I have no idea whether
            I&apos;m going to wake up, one day, and just never really want to
            think about mokko again versus e.g. tinkering on something new.
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
          <p>
            An important caveat: everything in the repo is proof-of-concept
            code.
          </p>
          <p>
            Peep all the (<em>nonexistent</em>) typings, or even (
            <em>...equally-nonexistent</em>) unit tests! Marvel at how I made
            two quick passes at tz-agnostic coercion for storage, decided that I
            don&apos;t actually need day-specific fidelity, and... just walked
            away from it!{" "}
          </p>
          <p>
            That is, any technical discussion should start from the
            understanding that the alternative is not &quot;
            <em>a better technical decision</em>&quot;, but &quot;
            <em>
              me reaching my daily level of exhaustion and just e.g. running a
              D&D campaign instead
            </em>
            &quot;.
          </p>
          <p>
            (
            <em>
              If anything, take the state of the codebase as good-faith proof of
              my assertion that this isn&apos;t some stealth SAAS MVP -- I have
              no intention of converting this to a billable product, because
              that would involve a bunch of hygenic software development that I
              100% don&apos;t feel like doing on my evenings and weekends.
            </em>
            )
          </p>
          <hr />
          <p>Now: on to the tools, and reasoning behind them.</p>
          <p>
            Mokko is a SPA built in React: mostly, I wanted more practice using
            Hooks, as I came of age in the class-component era and haven&apos;t
            engaged much with the library since.
          </p>
          <p>
            (
            <em>
              I&apos;m working almost exclusively in Django at the office, these
              days, which is pleasant enough but 1. has vastly inferior
              braces-per-LOC, and 2. leaves me pretty vulnerable if I find
              myself unexpectedly needing to pick up a new web-development job.
            </em>
            )
          </p>
          <p>
            It&apos;s hosted with manual deploys to Netlify, which thus far has
            served admirably.
          </p>
          <p>
            I&apos;ve permitted myself three{" "}
            <a
              href="https://boringtechnology.club/#17"
              target="_blank"
              rel="noopener noreferrer"
            >
              innovation tokens
            </a>
            , spent on Vite, Dexie (
            <em>to wrap the otherwise-forbidding IndexedDB</em>), and
            TailwindCSS. Nothing but good things to say about the learnability
            and ergonomics of each.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
