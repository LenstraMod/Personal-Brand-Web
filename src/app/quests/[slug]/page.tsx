import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Scene } from "@/components/Scene";
import { getQuest, quests } from "@/content/quests";

export const dynamicParams = false;

export function generateStaticParams() {
  return quests.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps<"/quests/[slug]">): Promise<Metadata> {
  const quest = getQuest((await params).slug);
  if (!quest) return {};
  return { title: quest.title, description: quest.tagline, alternates: { canonical: `/quests/${quest.slug}` } };
}

/** Case-study template: hero → brief → stack → highlights → links → prev/next. */
export default async function QuestPage({ params }: PageProps<"/quests/[slug]">) {
  const { slug } = await params;
  const quest = getQuest(slug);
  if (!quest) notFound();

  const i = quests.findIndex((q) => q.slug === slug);
  const prev = quests[(i - 1 + quests.length) % quests.length];
  const next = quests[(i + 1) % quests.length];

  return (
    <article>
      <header className="relative flex min-h-[70svh] items-end overflow-hidden">
        <Scene name={quest.art} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="wrap relative pb-16 pt-40">
          <Link href="/#quests" className="label transition-colors hover:text-gold">
            ← All quests
          </Link>
          <h1 className="mt-6 font-display text-display-l font-light leading-[0.92] tracking-tight">{quest.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-bone/85">{quest.tagline}</p>
          {quest.context && <p className="label mt-6">{quest.context}</p>}
        </div>
      </header>

      <div className="wrap grid gap-16 py-24 md:grid-cols-12">
        <section aria-labelledby="brief" className="md:col-span-7">
          <h2 id="brief" className="label">
            The brief
          </h2>
          <div className="mt-5 space-y-5 font-display text-2xl font-light leading-snug md:text-3xl">
            {quest.brief.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {quest.highlights.length > 0 && (
            <>
              <h2 className="label mt-16">Highlights</h2>
              <ul className="mt-5 divide-y divide-stone border-y border-stone">
                {quest.highlights.map((h) => (
                  <li key={h} className="py-4 text-bone/90">
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <section aria-labelledby="stack">
            <h2 id="stack" className="label">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {quest.stack.map((t) => (
                <li key={t} className="rounded-sm border border-stone px-2.5 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="links" className="space-y-3">
            <h2 id="links" className="label">
              Links
            </h2>
            <div className="flex flex-wrap gap-3">
              {quest.links.live && <Button href={quest.links.live}>Live demo ↗</Button>}
              {quest.links.repo && (
                <Button href={quest.links.repo} variant="ghost">
                  Source ↗
                </Button>
              )}
              {!quest.links.live && !quest.links.repo && <p className="text-sm text-bone-dim">No public link yet.</p>}
            </div>
          </section>
        </aside>
      </div>

      <nav aria-label="More quests" className="wrap grid gap-px border-y border-stone bg-stone md:grid-cols-2">
        {[
          { q: prev, dir: "← Previous" },
          { q: next, dir: "Next →" },
        ].map(({ q, dir }, idx) => (
          <Link key={dir} href={`/quests/${q.slug}`} className={`group bg-ink p-8 transition-colors hover:bg-ink-2 ${idx ? "md:text-right" : ""}`}>
            <span className="label">{dir}</span>
            <span className="mt-3 block font-display text-3xl transition-colors group-hover:text-gold">{q.title}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
