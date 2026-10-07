import type { ArchiveItem, Quest } from "./types";

// Only facts from REQUIREMENTS.md §4.6. Anything unknown is left out, never invented.
// TODO(owner): add role, screenshots and 3–4 sentences for the three non-Warung quests.
export const quests: Quest[] = [
  {
    slug: "warung-senja",
    title: "Warung Senja 3D",
    tagline: "An interactive 3D street-food shop, built entirely in code.",
    stack: ["Vite", "TypeScript", "Three.js", "GSAP", "Lenis", "Web Audio"],
    links: {
      live: "https://warung-senja-3-d-landing-page.vercel.app",
      repo: "https://github.com/LenstraMod/Warung-Senja-3D-Landing-page",
    },
    art: "warung",
    brief: [
      "An animated, interactive 3D website for a fictional Indonesian-fusion street-food shop: 34 dishes, 6 products and dioramas, all built procedurally in code with no model files.",
    ],
    highlights: [
      "Scroll-driven camera flight",
      "Ember-burn shader page transitions",
      "Post-processing: bloom, ACES tone mapping, vignette, grain",
      "Adaptive quality, custom 3D cursor, day/night toggle",
      "Opt-in synthesized sound, reduced-motion support, code-split routes",
    ],
  },
  {
    slug: "kuzushiji-49",
    title: "Kuzushiji-49 Hiragana Recognizer",
    tagline: "A model that reads cursive hiragana.",
    context: "AI Laboratory, Telkom University",
    stack: ["Python", "TensorFlow", "Keras", "Jupyter"],
    links: {
      repo: "https://github.com/LenstraMod/AI-Laboratory-Telkom-University---Kuzushiji49-Hiragana-Recognizer",
    },
    art: "kuzushiji",
    brief: ["A Kuzushiji-49 hiragana recognition model built in a Jupyter notebook with TensorFlow / Keras."],
    highlights: [],
  },
  {
    slug: "ask-ai-app",
    title: "AskAiApp",
    tagline: "An Android app for asking an AI.",
    context: "Mobile Innovation Laboratory 10.0",
    stack: ["Kotlin", "Jetpack Compose"],
    links: {},
    art: "android",
    brief: ["An Android “Ask AI” app written in Kotlin with Jetpack Compose."],
    highlights: [],
  },
  {
    slug: "tim-lima",
    title: "TIM-LIMA",
    tagline: "A Kotlin app from Motion Hack 5.0.",
    context: "Motion Hack 5.0",
    stack: ["Kotlin"],
    links: { repo: "https://github.com/Motion-Hack-5-0/TIM-LIMA" },
    art: "hack",
    brief: ["A Kotlin app built for the Motion Hack 5.0 competition."],
    highlights: [],
  },
];

export const archive: ArchiveItem[] = [
  { title: "web_tokopedia_design", note: "A Tokopedia-style UI study", stack: "CSS", href: "https://github.com/LenstraMod/web_tokopedia_design" },
  { title: "ASE Lythrum", note: "Game development project", stack: "C#", href: "https://github.com/LenstraMod/ASE_Lythrum_Game-Development" },
  { title: "doc-web-opencontext", note: "Web docs for the opencontext CLI", stack: "TypeScript", href: "https://github.com/LenstraMod/doc-web-opencontext" },
  { title: "Coursework", note: "University software-construction (KPL) modules", stack: "C#" },
];

export const getQuest = (slug: string) => quests.find((q) => q.slug === slug);
