import type { Profile } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abrahamnadeak.vercel.app"; // TODO(owner): final domain

export const profile: Profile = {
  name: "Abraham Nadeak",
  handle: "LenstraMod",
  role: "Software engineer — web, mobile & computer vision.",
  location: "Bandung, Indonesia",
  email: "63a.nadeak2006@gmail.com",
  tagline: "I build web, mobile and machine-sight.",
  availability: "Open to internships & freelance",
  // The first word must start with "A": the illuminated drop-cap opens it.
  bio: [
    "A software engineer from Bandung, building web and mobile apps with Laravel, React and Kotlin, and training small computer-vision models on the side.",
    "I work comfortably with MySQL, responsive Tailwind layouts, API integration and performance tuning. Right now I study Software Engineering at Telkom University.",
  ],
  marginalia: ["Based in Bandung", "Telkom University, S1 Software Engineering"],
  socials: {
    github: "https://github.com/LenstraMod",
    instagram: "https://instagram.com/abeee.me",
  },
  // TODO(owner): drop the ATS CV into public/cv/ with this exact name.
  cv: { pdfUrl: "/cv/Abraham-Shalom-Nadeak-CV.pdf" },
};
