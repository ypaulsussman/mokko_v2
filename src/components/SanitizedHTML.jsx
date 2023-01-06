import React from "react";
import DOMPurify from "dompurify";

const SanitizedHTML = ({ content }) => (
  <div
    className="content"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(content),
    }}
  />
);

export default SanitizedHTML;
