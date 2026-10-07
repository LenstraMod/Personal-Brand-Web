import { skills } from "@/content/skills";

const words = skills.flatMap((g) => g.items).filter((v, i, a) => a.indexOf(v) === i);

/** Tilted, endlessly scrolling band of the real stack. Two rows run in opposite directions. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="relative z-20 -mt-10 overflow-x-clip py-8 sm:-mt-14">
    <div className="-rotate-2 select-none overflow-hidden border-y border-gold/50 bg-ink/85 py-4 backdrop-blur-sm">
      {[false, true].map((rev) => (
        <div key={String(rev)} className={`marquee-track ${rev ? "rev" : ""}`} style={{ "--mt": rev ? "46s" : "38s" } as React.CSSProperties}>
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center">
              {row.map((w, i) => (
                <li key={`${w}-${i}`} className="flex items-center whitespace-nowrap">
                  <span className={`px-6 font-display text-4xl font-light sm:text-6xl ${(i + (rev ? 1 : 0)) % 2 ? "outline-text" : "text-bone"}`}>{w}</span>
                  <span className="text-xl text-gold">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}
