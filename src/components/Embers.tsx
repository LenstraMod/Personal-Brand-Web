"use client";

import { useEffect, useRef } from "react";

type Ember = { x: number; y: number; r: number; vx: number; vy: number; a: number; life: number };

/** Drifting ember particles. Skipped for reduced-motion / save-data; pauses off-screen. */
export function Embers({ count = 46 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const spawn = (fromBottom: boolean): Ember => ({
      x: Math.random() * w,
      y: fromBottom ? h + 10 : Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.25 + Math.random() * 0.7),
      a: 0.25 + Math.random() * 0.6,
      life: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const embers = Array.from({ length: count }, () => spawn(false));

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const e of embers) {
        e.life += 0.02;
        e.x += e.vx + Math.sin(e.life) * 0.25;
        e.y += e.vy;
        if (e.y < -10) Object.assign(e, spawn(true));
        const flicker = 0.6 + Math.sin(e.life * 2.3) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, ${150 + Math.floor(e.r * 30)}, 70, ${e.a * flicker})`;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
