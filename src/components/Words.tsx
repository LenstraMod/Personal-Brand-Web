import { Fragment, type CSSProperties } from "react";

/**
 * Splits text into words that slide up from a mask when `.is-in` is added
 * (by <Reveals />). Visually-hidden full text keeps it readable by assistive tech.
 */
export function Words({ text, className = "", delay = 0, a11y = true }: { text: string; className?: string; delay?: number; a11y?: boolean }) {
  return (
    <span className={`words reveal-words ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {a11y && <span className="sr-only">{text}</span>}
      <span aria-hidden>
        {text.split(" ").map((w, i) => (
          <Fragment key={i}>
            <span className="w" style={{ "--i": i } as CSSProperties}>
              <span>{w}</span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
