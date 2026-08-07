import React from 'react';

// Parses a lightweight "[label](url)" link syntax inside plain description
// text, so a single word (e.g. a publisher name) can carry a hyperlink
// without switching the whole field over to raw HTML.
export const renderWithLinks = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    return (
      <a
        key={i}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-academic-400 hover:text-academic-900"
      >
        {match[1]}
      </a>
    );
  });
};
