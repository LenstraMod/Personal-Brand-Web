import fs from "node:fs";
import path from "node:path";
import {
  CrestScene,
  DeskScene,
  FieldScene,
  GateScene,
  QuestScene,
} from "./art/scenes";

export type SceneName =
  | "gate"
  | "field"
  | "desk"
  | "crest"
  | "warung"
  | "kuzushiji"
  | "android"
  | "hack";

const EXTS = ["avif", "webp", "jpg", "jpeg", "png"] as const;

/** First `public/images/<name>.<ext>` that exists at build time, if any. */
function findImage(name: string): string | null {
  for (const ext of EXTS) {
    const file = path.join(process.cwd(), "public", "images", `${name}.${ext}`);
    if (fs.existsSync(file)) return `/images/${name}.${ext}`;
  }
  return null;
}

/**
 * Fills its (relatively positioned) parent. Uses real art from public/images when
 * present; otherwise the palette-matched SVG placeholder. Server component.
 */
export function Scene({ name, alt = "", priority = false }: { name: SceneName; alt?: string; priority?: boolean }) {
  const src = findImage(name);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    );
  }
  switch (name) {
    case "gate":
      return <GateScene />;
    case "field":
      return <FieldScene />;
    case "desk":
      return <DeskScene />;
    case "crest":
      return <CrestScene />;
    default:
      return <QuestScene kind={name} />;
  }
}
