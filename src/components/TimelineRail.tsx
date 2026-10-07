"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Wraps a list and draws a vertical gold line as the wrapper scrolls through the viewport. */
export function TimelineRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
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
    <div ref={ref} className={`relative ${className}`} style={{ "--p": 1 } as React.CSSProperties}>
      <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-stone" />
      <span
        aria-hidden
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gold"
        style={{ transform: "scaleY(var(--p))" }}
      />
      {children}
    </div>
  );
}
