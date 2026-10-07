import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { getQuest } from "@/content/quests";
import { skills } from "@/content/skills";

/** 3 · The Armory (Skills). Gapless bento on ink; hairlines instead of gaps. */
export function Armory() {
  return (
    <section id="armory" aria-labelledby="armory-title" className="section-pad grain relative bg-ink/45">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12">
          <SectionHead chapter="Chapter II" title="The Armory" meaning="Skills" className="md:col-span-7" />
          <p className="reveal self-end text-bone-dim md:col-span-4 md:col-start-9">
            Grouped by what I reach for, not rated out of ten. Where a tool shipped in a real project, it says so.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px border border-stone bg-stone md:grid-cols-4 md:grid-rows-3">
          {skills.map((g, i) => (
            <li
              key={g.id}
              className={`reveal spot group relative flex min-h-48 flex-col justify-between bg-ink/65 p-7 transition-colors duration-500 hover:bg-ink-2/90 ${g.tile}`}
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              {/* forge underglow on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ember/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <p className="label">{g.kicker}</p>
                <h3 className="mt-3 font-display text-3xl font-light md:text-4xl">{g.title}</h3>
              </div>
              <div className="relative mt-8">
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-sm border border-stone px-2.5 py-1 font-mono text-xs text-bone/85">
                      {it}
                    </li>
                  ))}
                </ul>
                {g.forgedIn.length > 0 && (
                  <p className="mt-5 text-sm text-bone-dim">
                    <span className="label mr-2">Forged in →</span>
                    {g.forgedIn.map((slug, idx) => (
                      <span key={slug}>
                        {idx > 0 && ", "}
                        <Link href={`/quests/${slug}`} className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
                          {getQuest(slug)?.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
