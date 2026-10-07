import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { chapters } from "@/content/nav";
import { profile } from "@/content/profile";

/** 8 · The Colophon (Footer). Mini, stacked-center, oxblood/ink diptych. */
export function Colophon() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-gold/30">
      {/* flat color-block diptych */}
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-2">
        <div className="bg-oxblood" />
        <div className="bg-ink" />
      </div>
      <div aria-hidden className="absolute inset-y-0 left-1/2 -z-10 w-px bg-gold/50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 to-ink/60" />

      <div className="wrap py-20 text-center">
        <a href="#gate" aria-label="Back to top" className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/60 font-black text-2xl text-gold transition-colors hover:bg-gold hover:text-on-gold">
          AN
        </a>

        <p className="mt-8 font-label text-lg tracking-[0.4em]">
          ABRAHAM <span className="text-gold">NADEAK</span>
        </p>
        <p className="label mt-3">{profile.tagline}</p>

        <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {chapters.map((c) => (
            <Link key={c.id} href={`/#${c.id}`} title={c.meaning} aria-label={`${c.label} — ${c.meaning}`} className="label transition-colors hover:text-gold">
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex items-center justify-center gap-4">
          <ThemeToggle />
        </div>

        <p className="mt-12 text-sm text-bone-dim">
          © {new Date().getFullYear()} Abraham Shalom Nadeak · @{profile.handle} · Built with Next.js, React &amp; Tailwind.
          <br />
          No cookies, no trackers.
        </p>
      </div>
    </footer>
  );
}
