"use client";

import { useEffect, useRef } from "react";

/** Thin vertical gold reading-progress line on the right edge. */
export function Rail() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.current?.style.setProperty("transform", `scaleY(${Math.min(1, Math.max(0, p))})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="no-print pointer-events-none fixed right-3 top-0 z-40 hidden h-screen w-px bg-stone/60 md:block">
      <span ref={bar} className="block h-full w-px origin-top bg-gold" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
