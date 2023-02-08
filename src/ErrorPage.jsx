import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
      <div className="md:col-start-2 md:col-span-2 prose">
        <h1>Bleh.</h1>
        <p>
          Hmm, that&apos;s not great: the following means Mokko wasn&apos;t able to do the
          thing you wanted.
        </p>
        <pre>{error.message || JSON.stringify(error)}</pre>
        <p>
          If you want to do me (Y, the ~creator) a solid, I&apos;d be grateful if you
          copied or screenshot the above as an email to ypaulsussman@gmail.com
          🙇
        </p>
        <p>
          Thank you, and sorry about that! Click <a href="/">here</a> to go back
          to the homepage.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
