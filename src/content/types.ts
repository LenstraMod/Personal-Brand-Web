/** Shape of every content file. Sections receive these as props; they never fetch. */

export interface Profile {
  name: string;
  handle: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  availability: string;
  bio: string[];
  marginalia: string[];
  socials: { github: string; instagram: string };
  cv: { pdfUrl: string };
}

export interface SkillGroup {
  id: "frontend" | "backend" | "mobile" | "aiml" | "languages" | "workflow";
  title: string;
  kicker: string;
  items: string[];
  /** Quest slugs that used this skill ("Forged in"). */
  forgedIn: string[];
  /** Grid placement inside the 4x3 bento (Tailwind classes). */
  tile: string;
}

export interface Quest {
  slug: string;
  title: string;
  tagline: string;
  year?: number;
  context?: string;
  role?: string;
  stack: string[];
  links: { live?: string; repo?: string };
  /** Name of the art slot in public/images (falls back to the SVG scene). */
  art: "warung" | "kuzushiji" | "android" | "hack";
  brief: string[];
  highlights: string[];
}

export interface ChronicleEntry {
  id: string;
  kind: "work" | "edu";
  period: string;
  org: string;
  place?: string;
  role: string;
  bullets: string[];
}

export interface ArchiveItem {
  title: string;
  note: string;
  stack: string;
  href?: string;
}

export interface LedgerData {
  generatedAt: string;
  publicRepos: number;
  topLanguages: string[];
  recent: { repo: string; pushedAt: string; url: string }[];
}
