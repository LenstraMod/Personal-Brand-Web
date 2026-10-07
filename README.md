# Abraham Nadeak — Personal Brand Site

Next.js (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Static-first, no database.
Full spec: [REQUIREMENTS.md](REQUIREMENTS.md).

## Commands

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build
npm run check    # lint + typecheck
```

## Where to change things

| I want to change…              | Edit                                   |
| ------------------------------ | -------------------------------------- |
| Name, bio, email, socials, CV  | `src/content/profile.ts`               |
| Skills (Armory bento)          | `src/content/skills.ts`                |
| Projects / archive             | `src/content/quests.ts`                |
| Experience & education         | `src/content/chronicle.ts`             |
| Nav / chapter names            | `src/content/nav.ts`                   |
| Colours, fonts, type scale     | `src/app/globals.css` (`:root`, `@theme`) |
| A page section's layout        | `src/sections/<Name>.tsx`              |
| Real images                    | drop into `public/images/` (see below) |

Rule of thumb: **content in `content/`, layout in `sections/`, reusable bits in `components/`**.
Sections only receive data, they never fetch (the one exception is `Ledger`, which reads
`src/lib/ledger.ts` at build time and falls back to `src/content/ledger.fallback.json`).

## Adding real art (no code changes)

Every visual is a `<Scene name="…">`. It renders `public/images/<name>.avif|webp|jpg|png`
if the file exists, otherwise the built-in SVG placeholder.

Names: `gate` (hero) · `crest` (herald portrait) · `desk` (chronicle) · `field` (contact) ·
`warung` · `kuzushiji` · `android` · `hack` (quest slices/covers).

## TODO(owner)

- Put the CV at `public/cv/Abraham-Shalom-Nadeak-CV.pdf`.
- Set `NEXT_PUBLIC_SITE_URL` once the domain is chosen (default is a placeholder in `profile.ts`).
- Descriptions, roles and screenshots for the three non-Warung quests (`quests.ts`).
- Optional `GITHUB_TOKEN` env var to avoid GitHub API rate limits at build time.
