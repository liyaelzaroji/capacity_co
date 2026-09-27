import { useState } from "react";

export default function StarRating({ value = 0, onChange, interactive = false, size = 18 }) {
  const [hover, setHover] = useState(0);
  const display = interactive ? hover || value : value;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      onMouseLeave={() => interactive && setHover(0)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Rate from 1 to 5 stars" : `Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(display);
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHover(n)}
            onClick={() => interactive && onChange && onChange(n)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 20 20"
              fill={filled ? "#E8A33D" : "none"}
              stroke={filled ? "#E8A33D" : "#4A5A66"}
              strokeWidth="1.2"
            >
              <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.7z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
