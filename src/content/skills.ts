import type { SkillGroup } from "./types";

/** 4 x 3 gapless bento: 4 + 2 + 1 + 1 + 2 + 2 = 12 cells. */
export const skills: SkillGroup[] = [
  {
    id: "frontend",
    title: "Front-end & motion",
    kicker: "The face of the thing",
    items: ["React.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "GSAP", "Three.js", "Vite"],
    forgedIn: ["warung-senja"],
    tile: "md:col-span-2 md:row-span-2",
  },
  {
    id: "backend",
    title: "Back-end",
    kicker: "Behind the gate",
    items: ["Laravel", "REST API integration", "Firebase", "MySQL"],
    forgedIn: [],
    tile: "md:col-span-2",
  },
  {
    id: "mobile",
    title: "Mobile",
    kicker: "In the pocket",
    items: ["Kotlin", "Jetpack Compose"],
    forgedIn: ["ask-ai-app", "tim-lima"],
    tile: "",
  },
  {
    id: "aiml",
    title: "AI / CV",
    kicker: "Machine-sight",
    items: ["TensorFlow / Keras", "scikit-learn", "NumPy"],
    forgedIn: ["kuzushiji-49"],
    tile: "",
  },
  {
    id: "languages",
    title: "Languages",
    kicker: "Spoken to machines",
    items: ["Java", "JavaScript", "PHP", "Python", "Kotlin", "TypeScript", "C#"],
    forgedIn: [],
    tile: "md:col-span-2",
  },
  {
    id: "workflow",
    title: "Workflow",
    kicker: "How the work moves",
    items: ["Git / GitHub", "npm / yarn", "Scrum", "Copywriting & SEO"],
    forgedIn: [],
    tile: "md:col-span-2",
  },
];
