import React from "react";

function About() {
  return (
    <div className="grid mt-8">
      <div className="justify-self-center prose">
        <h1 className="text-center">About Mokko</h1>

        <p>
          <em>
            NB: this page elaborates the reasoning behind this application.
          </em>
        </p>
        <p>
          <em>
            For the most-basic facts to e.g. inform whether this tool even
            merits further engagement, you might want{" "}
            <a href="/">the homepage</a>.
          </em>
        </p>
        <hr />

        <h2>Why did you build this?</h2>
        <p>
          Partially, I wanted to push back at the hundreds of forces seeking to
          wrest control of my (<em>both conscious and unconscious</em>)
          attention: to dictate, deliberately, what I spend time thinking about.
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
            <em>possibly misremembered and/or apocryphal</em>) quote that &quot;
            <em>the perception of incongruity gives rise to thought</em>&quot;.
          </li>
        </ul>
        <hr />

        <h2>Why did you choose these features?</h2>
        <p>I spend a lot of time in Anki already.</p>
        <p>
          I already maintain my beloved filesystem hierarchy of Markdown notes.
        </p>
        <p>
          I have no idea whether I&apos;m going to wake up, one day, and
          viscerally want never again to think about mokko, but to immediately
          start tinkering on something else instead.
        </p>
        <p>As such, I wanted to hedge my bets in terms of project scope.</p>
        <hr />
        <p>
          My goal was to follow the Unix philosophy/Single Responsibility
          Principle: this app isn&apos;t really designed to be used as a
          knowledge base, a unified notetaking system, or a second brain.
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
            is intriguing, abstracted, provocative, etc enough that you predict
            it will combine meaningfully/productively with a variety of ideas.
          </li>
        </ol>

        <hr />

        <h2>How have you been using it?</h2>

        <h2>What technology did you use?</h2>
        {/* 

- Explicitly suggest *how* to use the app, i.e., "_for the next week or so, open the app for a couple minutes, and see if the intersections/collisions of two notes prompt any insights, ideas, or reflections. Or just see if being reminded of their content inserts itself into your daily train of thought productively. It might not! This is largely theoretically-derived and ungrounded in any prior science, even social. But it seems low-risk to test a bit._"

- Video walkthrough -- nah, just text description --  of how you, at least, have been using it -- so visitors can get an understanding of what the app offers w/o first signing up.

- Tech-stack choices
  - Selfishly: wanted more practice building in React Hooks; working almost exclusively in Django at work these days, which is fine but [1] has a vastly inferior braces-per-LOC score, and [2] leaves me pretty vulnerable if I find myself unexpectedly needing to pick up a new web-development job.
  - Three "innovation tokens" => IndexedDB, Vite, TailwindCSS 
*/}
      </div>
    </div>
  );
}

export default About;
