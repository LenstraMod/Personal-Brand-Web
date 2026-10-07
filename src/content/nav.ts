/** Visible chapter name + plain-English meaning (shown on hover/focus and as aria-label). */
export const chapters = [
  { id: "gate", label: "The Gate", meaning: "Home" },
  { id: "herald", label: "Herald", meaning: "About" },
  { id: "armory", label: "Armory", meaning: "Skills" },
  { id: "quests", label: "Quests", meaning: "Projects" },
  { id: "chronicle", label: "Chronicle", meaning: "Experience & education" },
  { id: "ledger", label: "Ledger", meaning: "GitHub activity" },
  { id: "raven", label: "Raven", meaning: "Contact" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
