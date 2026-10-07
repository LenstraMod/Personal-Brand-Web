"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chapters } from "@/content/nav";
import { profile } from "@/content/profile";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = chapters.filter((c) => c.id !== "gate");

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 bg-gradient-to-b from-ink/90 to-transparent backdrop-blur-[2px]">
        <Link href="/" className="whitespace-nowrap font-label text-xs tracking-[0.22em] text-bone sm:text-sm sm:tracking-[0.3em]" aria-label="Abraham Nadeak — home">
          ABRAHAM <span className="text-gold">NADEAK</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((c) => (
            <Link
              key={c.id}
              href={`/#${c.id}`}
              aria-label={`${c.label} — ${c.meaning}`}
              title={c.meaning}
              className="label transition-colors hover:text-gold"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href={profile.cv.pdfUrl} variant="ghost" className="!px-5 !py-2.5">
              CV ↓
            </Button>
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-bone/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-px w-4 bg-bone before:mb-1.5 before:block before:h-px before:w-4 before:bg-bone after:mt-1.5 after:block after:h-px after:w-4 after:bg-bone" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap grid gap-1 bg-ink pb-6 lg:hidden">
          {links.map((c) => (
            <Link
              key={c.id}
              href={`/#${c.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-stone py-4 font-display text-3xl"
            >
              {c.label}
              <span className="label">{c.meaning}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
