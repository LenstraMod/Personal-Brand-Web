import { Button } from "@/components/Button";
import { Words } from "@/components/Words";
import { Scene } from "@/components/Scene";
import { profile } from "@/content/profile";

/** 2 · The Herald (About). Off-grid editorial offset + the one illuminated drop-cap. */
export function Herald() {
  const [first, ...rest] = profile.bio;
  const initial = first[0];
  const remainder = first.slice(1);

  return (
    <section id="herald" aria-labelledby="herald-title" className="section-pad grain relative overflow-hidden bg-ink-2/55">
      {/* narrow vertical side-rail note */}
      <p
        aria-hidden
        className="label absolute left-3 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 md:block"
      >
        Chapter I — Of the Maker
      </p>

      <div className="wrap grid items-start gap-14 lg:grid-cols-12">
        {/* arch portrait, overlapped by the headline */}
        <div className="reveal relative lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div className="keyline relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-[999px]">
            <Scene name="crest" alt="Heraldic crest with the initials A N" />
          </div>
          <ul className="mt-6 space-y-2 border-t border-stone pt-5">
            {profile.marginalia.map((m) => (
              <li key={m} className="label flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-gold" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 lg:row-start-1 lg:-mr-20 lg:pt-24">
          <h2
            id="herald-title"
            className="relative z-10 font-display text-display-l font-light leading-[0.9] tracking-tight"
          >
            <Words text="The Herald" a11y={false} />
            <span className="sr-only">About</span>
          </h2>

          <div className="mt-12 max-w-xl space-y-6 text-bone/90">
            <p className="reveal">
              <span aria-hidden className="float-left mr-4 mt-1 font-black text-[7.5rem] font-bold leading-[0.78] text-gold [text-shadow:0_0_40px_color-mix(in_srgb,var(--gold)_35%,transparent)]">
                {initial}
              </span>
              <span className="sr-only">{initial}</span>
              {remainder}
            </p>
            {rest.map((p, i) => (
              <p key={i} className="reveal" style={{ "--d": `${(i + 1) * 120}ms` } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>

          <div className="reveal mt-10">
            <Button href="/codex" variant="link">
              Read the full codex ↗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
