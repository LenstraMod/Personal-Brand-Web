import { Button } from "@/components/Button";
import { QuestSlices } from "@/components/QuestSlices";
import { Words } from "@/components/Words";
import { Scene } from "@/components/Scene";
import { archive, quests } from "@/content/quests";
import { profile } from "@/content/profile";

/** 4 · The Quests (Projects). Centered-low title over hover-accordion image slices. */
export function Quests() {
  const slices = quests.map((q) => ({
    slug: q.slug,
    title: q.title,
    tagline: q.tagline,
    stack: q.stack,
    year: q.year,
    context: q.context,
    art: <Scene name={q.art} />,
  }));

  return (
    <section id="quests" aria-labelledby="quests-title" className="relative bg-ink/50 pb-[clamp(7rem,14vw,14rem)] pt-[clamp(4rem,8vw,8rem)]">
      <QuestSlices
        slices={slices}
        title={
          <>
            <p className="label reveal" aria-hidden>
              Chapter III
            </p>
            <h2 id="quests-title" className="mt-3 font-display text-display-l font-light leading-[0.9] tracking-tight [text-shadow:0_2px_30px_var(--ink)]">
              <Words text="The Quests" a11y={false} />
              <span className="sr-only">Projects</span>
            </h2>
          </>
        }
      />

      <div className="wrap mt-24">
        <div className="grid gap-10 md:grid-cols-12">
          <h3 className="label reveal md:col-span-3">More from the archive</h3>
          <ul className="md:col-span-9">
            {archive.map((a) => (
              <li key={a.title} className="reveal border-t border-stone first:border-t-0 md:first:border-t">
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-gold"
                  >
                    <span className="font-display text-2xl">{a.title}</span>
                    <span className="text-sm text-bone-dim">{a.note}</span>
                    <span className="font-mono text-xs text-bone-dim">{a.stack} ↗</span>
                  </a>
                ) : (
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                    <span className="font-display text-2xl">{a.title}</span>
                    <span className="text-sm text-bone-dim">{a.note}</span>
                    <span className="font-mono text-xs text-bone-dim">{a.stack}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal mt-12 text-center">
          <Button href={profile.socials.github} variant="ghost">
            Browse every repo on GitHub ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
