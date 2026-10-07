import { Button } from "@/components/Button";
import { Scene } from "@/components/Scene";
import { Words } from "@/components/Words";
import { TimelineRail } from "@/components/TimelineRail";
import { chronicle } from "@/content/chronicle";
import { profile } from "@/content/profile";

/** 5 · The Chronicle (Experience & education). Right-third captions, left-two-thirds duotone visual. */
export function Chronicle() {
  return (
    <section id="chronicle" aria-labelledby="chronicle-title" className="relative bg-ink/50">
      <div className="grid lg:grid-cols-3">
        {/* sticky duotone visual (2/3) */}
        <div className="relative h-[60svh] lg:sticky lg:top-0 lg:col-span-2 lg:h-screen">
          <Scene name="desk" alt="A scribe's desk lit by a single candle" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-30% to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 pb-14 sm:p-12 lg:pb-24">
            <p className="label reveal" aria-hidden>
              Chapter IV
            </p>
            <h2 id="chronicle-title" className="mt-4 font-display text-display-l font-light leading-[0.9] tracking-tight">
              <Words text="The Chronicle" a11y={false} />
              <span className="sr-only">Experience and education</span>
            </h2>
            <div className="reveal mt-8">
              <Button href={profile.cv.pdfUrl} variant="link">
                Download CV (PDF) ↗
              </Button>
              <span className="mx-3 text-stone" aria-hidden>
                /
              </span>
              <Button href="/codex" variant="link">
                Read it on the page
              </Button>
            </div>
          </div>
        </div>

        {/* entries (1/3) */}
        <div className="px-6 py-24 sm:px-12 lg:px-10 lg:py-[30vh]">
          <TimelineRail>
            <ol className="space-y-24 lg:space-y-[28vh]">
              {chronicle.map((e) => (
                <li key={e.id} className="reveal relative pl-10">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-2 h-[15px] w-[15px] rotate-45 border border-gold ${
                      e.kind === "work" ? "bg-gold" : "bg-ink"
                    }`}
                  />
                  <p className="label">
                    {e.period} · {e.kind === "work" ? "Work" : "Education"}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-light leading-tight">{e.role}</h3>
                  <p className="mt-2 text-bone/90">
                    {e.org}
                    {e.place ? `, ${e.place}` : ""}
                  </p>
                  {e.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-bone-dim">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </TimelineRail>
        </div>
      </div>
    </section>
  );
}
