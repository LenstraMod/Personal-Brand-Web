import { Button } from "@/components/Button";
import { profile } from "@/content/profile";
import { getLedger } from "@/lib/ledger";

const fmt = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** 6 · The Ledger (GitHub). Mini, calm, stacked-center. Only real numbers. */
export async function Ledger() {
  const data = await getLedger();
  const last = data.recent[0];

  return (
    <section id="ledger" aria-labelledby="ledger-title" className="grain relative bg-ink/40 py-[clamp(5rem,9vw,9rem)]">
      <div className="wrap text-center">
        <p className="label reveal" aria-hidden>
          Chapter V
        </p>
        <h2 id="ledger-title" className="sr-only">
          GitHub activity
        </h2>

        <dl className="mt-8 grid items-end gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="reveal">
            <dd className="font-display text-[clamp(6rem,17vw,15rem)] font-light leading-[0.8] tracking-tight text-gold">
              {data.publicRepos}
            </dd>
            <dt className="label mt-5">Public repositories</dt>
          </div>
          <div className="reveal" style={{ "--d": "120ms" } as React.CSSProperties}>
            <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] font-light leading-none">{data.topLanguages.length}</dd>
            <dt className="label mt-4">Languages</dt>
            <p className="mt-2 font-mono text-xs text-bone-dim">{data.topLanguages.join(" · ")}</p>
          </div>
          {last && (
            <div className="reveal" style={{ "--d": "240ms" } as React.CSSProperties}>
              <dd className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-tight">{fmt.format(new Date(last.pushedAt))}</dd>
              <dt className="label mt-4">Last push</dt>
              <p className="mt-2 font-mono text-xs text-bone-dim">{last.repo}</p>
            </div>
          )}
        </dl>

        <ul className="mx-auto mt-14 max-w-xl divide-y divide-stone border-y border-stone text-left">
          {data.recent.map((r) => (
            <li key={r.repo} className="reveal">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-gold">
                <span className="font-mono text-sm">{r.repo}</span>
                <span className="label">{fmt.format(new Date(r.pushedAt))}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal mt-10">
          <Button href={profile.socials.github} variant="ghost">
            See all {data.publicRepos} repos ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
