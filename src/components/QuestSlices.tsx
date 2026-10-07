"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export interface SliceData {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  year?: number;
  context?: string;
  /** Pre-rendered server `<Scene>` for this slice. */
  art: ReactNode;
}

/**
 * Hover/focus accordion (desktop) that collapses to stacked cards on mobile,
 * where every card shows its details. Each slice header is a real <button>.
 */
export function QuestSlices({ slices, title }: { slices: SliceData[]; title: ReactNode }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <ul className="flex flex-col gap-px bg-stone md:h-[min(82svh,820px)] md:flex-row md:border-y md:border-stone">
        {slices.map((s, i) => {
          const on = i === active;
          return (
            <li
              key={s.slug}
              data-active={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative min-h-[26rem] overflow-hidden bg-ink transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-0 md:min-w-0 md:flex-1 md:data-[active=true]:flex-[5]"
            >
              <div className="absolute inset-0 transition-[filter,transform] duration-700 md:grayscale-[0.85] md:group-data-[active=true]:scale-105 md:group-data-[active=true]:grayscale-0">
                {s.art}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />

              {/* collapsed label (desktop) / header (mobile) */}
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`slice-${s.slug}`}
                onClick={() => setActive(i)}
                className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 text-left md:inset-y-0 md:flex-col md:items-center md:justify-start md:gap-5 md:pt-8 md:group-data-[active=true]:pointer-events-none md:group-data-[active=true]:opacity-0"
              >
                <span className="label text-bone/80">0{i + 1}</span>
                <span className="font-display text-2xl md:[writing-mode:vertical-rl] md:rotate-180 md:text-3xl">{s.title}</span>
              </button>

              <div
                id={`slice-${s.slug}`}
                className="absolute inset-x-0 top-14 z-10 p-6 transition-opacity duration-500 md:top-0 md:p-9 md:opacity-0 md:group-data-[active=true]:opacity-100 md:group-data-[active=true]:delay-200"
              >
                <p className="label text-bone/80">
                  0{i + 1}
                  {s.context ? ` · ${s.context}` : ""}
                </p>
                <h3 className="mt-3 max-w-md font-display text-4xl font-light leading-none md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-sm text-bone/85">{s.tagline}</p>
                <ul className="mt-5 flex max-w-md flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t} className="rounded-sm border border-bone/30 bg-ink/50 px-2.5 py-1 font-mono text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/quests/${s.slug}`}
                  className="mt-6 inline-block underline decoration-gold/70 underline-offset-[6px] transition-colors hover:text-gold md:pointer-events-none md:group-data-[active=true]:pointer-events-auto"
                >
                  Open quest ↗
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {/* title sits in the lower part of the slices (desktop), above them on mobile */}
      <div className="pointer-events-none mt-12 text-center md:absolute md:inset-x-0 md:bottom-10 md:mt-0">{title}</div>
    </div>
  );
}
