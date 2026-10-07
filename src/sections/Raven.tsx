import { Button } from "@/components/Button";
import { CopyEmail } from "@/components/CopyEmail";
import { Scene } from "@/components/Scene";
import { profile } from "@/content/profile";

/** 7 · The Raven (Contact). Image-as-canvas; oversized headline + tiny CTA hint. */
export function Raven() {
  return (
    <section id="raven" aria-labelledby="raven-title" className="relative flex min-h-[90svh] items-center overflow-hidden">
      <Scene name="field" alt="A raven flying over a field at dusk" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      <div className="wrap relative py-32">
        <p className="label reveal text-bone/80" aria-hidden>
          Chapter VI
        </p>
        <h2 id="raven-title" className="reveal mt-5 max-w-4xl font-display text-display-xl font-light leading-[0.88] tracking-tight" style={{ "--d": "100ms" } as React.CSSProperties}>
          Send a <span className="font-black font-bold text-gold">raven.</span>
        </h2>
        <p className="reveal mt-8 max-w-md text-lg text-bone/85" style={{ "--d": "200ms" } as React.CSSProperties}>
          Internships, freelance builds, collaborations. Write to me and I&apos;ll write back.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center gap-4" style={{ "--d": "300ms" } as React.CSSProperties}>
          <Button href={`mailto:${profile.email}`} className="gap-3 !pl-3">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-oxblood text-bone shadow-[inset_0_-3px_6px_rgb(0_0_0/0.45)]">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h18v12H3zM3 7l9 7 9-7" />
              </svg>
            </span>
            Send a raven
          </Button>
          <CopyEmail email={profile.email} />
        </div>
        <p className="label mt-4 text-bone/70">Opens your mail app · {profile.email}</p>

        <ul className="reveal mt-14 flex flex-wrap gap-x-8 gap-y-3" style={{ "--d": "380ms" } as React.CSSProperties}>
          {[
            ["GitHub", profile.socials.github],
            ["Instagram", profile.socials.instagram],
            ["Email", `mailto:${profile.email}`],
          ].map(([label, href]) => (
            <li key={label}>
              <Button href={href} variant="link">
                {label} ↗
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
