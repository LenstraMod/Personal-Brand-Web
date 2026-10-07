import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { quests } from "@/content/quests";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/codex", ...quests.map((q) => `/quests/${q.slug}`)];
  return routes.map((r) => ({ url: `${SITE_URL}${r}`, lastModified: new Date() }));
}
