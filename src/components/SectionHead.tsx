import type { ReactNode } from "react";
import { Words } from "./Words";

/** Chapter label + display heading. The label is decorative; the heading carries the meaning. */
export function SectionHead({
  chapter,
  title,
  meaning,
  className = "",
  children,
}: {
  chapter: string;
  title: string;
  /** Plain-English name for screen readers, e.g. "About". */
  meaning: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={className}>
      <p className="label reveal" aria-hidden>
        {chapter}
      </p>
      <h2 className="mt-4 font-display text-h2 font-light leading-[0.95] tracking-tight">
        <Words text={title} a11y={false} delay={80} />
        <span className="sr-only">{meaning}</span>
      </h2>
      {children}
    </header>
  );
}
