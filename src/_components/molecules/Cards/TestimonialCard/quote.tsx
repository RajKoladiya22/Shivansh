import React, { useState, useLayoutEffect, useRef } from "react";
import type { TestimonialQuoteProps } from "../../types/card.type";

export function TestimonialQuote({ text, lines = 4 }: TestimonialQuoteProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    // Determine overflow by comparing scrollHeight and clientHeight
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, [text]);

  return (
    <div className="mb-6">
      <p
        ref={ref}
        className={`flex-1 text-lg font-medium text-gray-800 ${
          !expanded ? `line-clamp-${lines}` : "line-clamp-none"
        }`}
      >
        {`"${text}"`}
      </p>
      {isTruncated && (
        <button
        aria-label="Click-to-read-more"
          className="text-sm font-semibold text-blue-600"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
