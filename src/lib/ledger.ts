import fallback from "@/content/ledger.fallback.json";
import type { LedgerData } from "@/content/types";

const USER = "LenstraMod";
const DAY = 60 * 60 * 24;

interface Repo {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

/**
 * Public GitHub stats, fetched at build/revalidate time (never from the browser).
 * Any failure returns the committed fallback so the build can't break.
 * Optional: set GITHUB_TOKEN to lift the anonymous rate limit.
 */
export async function getLedger(): Promise<LedgerData> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const opts = { headers, next: { revalidate: DAY } };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, opts),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, opts),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);

    const user = (await userRes.json()) as { public_repos: number };
    const repos = ((await reposRes.json()) as Repo[]).filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const topLanguages = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([n]) => n);

    return {
      generatedAt: new Date().toISOString(),
      publicRepos: user.public_repos,
      topLanguages,
      recent: repos.slice(0, 3).map((r) => ({ repo: r.name, pushedAt: r.pushed_at, url: r.html_url })),
    };
  } catch {
    return fallback as LedgerData;
  }
}
