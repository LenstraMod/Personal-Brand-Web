import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { chronicle } from "@/content/chronicle";
import { profile } from "@/content/profile";
import { quests } from "@/content/quests";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "Codex — CV",
  description: `CV of Abraham Shalom Nadeak: ${profile.role}`,
  alternates: { canonical: "/codex" },
};

/** Plain semantic HTML, ATS-friendly, with a print stylesheet (see globals.css @media print). */
export default function Codex() {
  return (
    <div className="wrap max-w-3xl py-32 print:py-0">
      <header className="border-b border-stone pb-8">
        <h1 className="font-display text-display-l font-light leading-none">Abraham Shalom Nadeak</h1>
        <p className="mt-4 text-lg">{profile.role}</p>
        <p className="mt-2 text-bone-dim">
          {profile.location} ·{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>{" "}
          · <a href={profile.socials.github} className="underline underline-offset-4">github.com/{profile.handle}</a>
        </p>
        <div className="no-print mt-6">
          <Button href={profile.cv.pdfUrl}>Download PDF ↓</Button>
        </div>
      </header>

      <section aria-labelledby="summary" className="mt-10">
        <h2 id="summary" className="label">Profile</h2>
        <div className="mt-3 space-y-3">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills" className="mt-10">
        <h2 id="skills" className="label">Skills</h2>
        <dl className="mt-3 space-y-2">
          {skills.map((g) => (
            <div key={g.id} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
              <dt className="font-medium">{g.title}</dt>
              <dd className="text-bone/90">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="experience" className="mt-10">
        <h2 id="experience" className="label">Experience & education</h2>
        <ol className="mt-3 space-y-6">
          {chronicle.map((e) => (
            <li key={e.id}>
              <p className="font-medium">
                {e.role} — {e.org}
                {e.place ? `, ${e.place}` : ""}
              </p>
              <p className="text-sm text-bone-dim">{e.period}</p>
              {e.bullets.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="projects" className="mt-10">
        <h2 id="projects" className="label">Selected projects</h2>
        <ul className="mt-3 space-y-3">
          {quests.map((q) => (
            <li key={q.slug}>
              <p className="font-medium">
                {q.title} <span className="font-mono text-xs text-bone-dim">({q.stack.join(", ")})</span>
              </p>
              <p>{q.tagline}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
