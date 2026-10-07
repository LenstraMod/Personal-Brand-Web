"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/Button";
import { Embers } from "@/components/Embers";
import { profile } from "@/content/profile";

const chips = [
  { label: "React", cls: "left-[3%] top-[26%]", ft: "6s", fd: "0s", depth: 26 },
  { label: "Kotlin", cls: "right-[2%] top-[30%] hidden sm:block", ft: "7s", fd: "-2s", depth: 34 },
  { label: "TensorFlow", cls: "right-[7%] top-[62%] hidden md:block", ft: "8s", fd: "-4s", depth: 18 },
  { label: "Laravel", cls: "left-[15%] top-[44%] hidden md:block", ft: "6.5s", fd: "-1s", depth: 22 },
];

/** Splits a word into masked, individually animated letters. */
function Letters({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className={`${className} inline-block`}>{c}</span>
        </span>
      ))}
    </>
  );
}

/**
 * Hero: the portrait stands inside a frame but his head breaks out of the top edge,
 * in front of a giant name. Intro timeline, mouse parallax and scroll scrub use GSAP;
 * with reduced motion everything is simply visible.
 */
export function HeroStage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".h-in", { opacity: 1 });
        return;
      }

      /* Intro */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .set(".h-in-text", { opacity: 1 })
        .fromTo(".h-frame", { opacity: 0, scaleY: 0.82, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 1 })
        .fromTo(".h-back-char", { yPercent: 118 }, { yPercent: 0, duration: 1.2, stagger: 0.05, ease: "expo.out" }, "-=0.55")
        .fromTo(".h-person", { yPercent: 16, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, ease: "back.out(1.2)" }, "-=0.95")
        .fromTo(".h-front-char", { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" }, "-=0.7")
        .fromTo(".h-chip", { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: "back.out(2.2)" }, "-=0.6")
        .fromTo(".h-up", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.7");

      /* Scroll scrub: layers drift at different speeds */
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".h-back-title", { yPercent: 38, ease: "none", scrollTrigger: st });
      gsap.to(".h-pop", { yPercent: -7, ease: "none", scrollTrigger: st });
      gsap.to(".h-front-title", { yPercent: -60, ease: "none", scrollTrigger: st });
      gsap.to(".h-chips", { yPercent: -35, ease: "none", scrollTrigger: st });

      /* Mouse parallax (desktop only) */
      if (fine) {
        const setBack = gsap.quickTo(".h-mouse-back", "x", { duration: 0.9, ease: "power3" });
        const setPerson = gsap.quickTo(".h-mouse-person", "x", { duration: 0.8, ease: "power3" });
        const tiltPerson = gsap.quickTo(".h-mouse-person", "rotation", { duration: 0.9, ease: "power3" });
        const chipSetters = gsap.utils.toArray<HTMLElement>(".h-chip-mouse").map((c) => ({
          x: gsap.quickTo(c, "x", { duration: 1, ease: "power3" }),
          y: gsap.quickTo(c, "y", { duration: 1, ease: "power3" }),
          d: Number(c.dataset.depth ?? 20),
        }));
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
          setBack(-nx * 26);
          setPerson(nx * 14);
          tiltPerson(nx * 1.6);
          chipSetters.forEach((c) => {
            c.x(nx * c.d);
            c.y(ny * c.d * 0.7);
          });
        };
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="gate" aria-label="Home" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* animated background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_42%,color-mix(in_srgb,var(--oxblood)_80%,transparent),transparent_72%)]" />
        <div className="h-glow absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--ember)_45%,transparent),transparent_65%)] blur-2xl [animation:pulse-glow_5s_ease-in-out_infinite_alternate]" />
        <div className="floor-grid" />
        <Embers count={64} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pt-20">
        {/* stage: back title → frame → portrait → front title */}
        <div className="relative mx-auto w-full" style={{ "--fh": "clamp(280px, min(56svh, 100vw), 640px)", height: "calc(var(--fh) * 1.5)" } as CSSProperties}>
          <h1 className="contents">
            <span className="sr-only">Abraham Nadeak</span>

            <span aria-hidden className="h-back-title h-in-text h-in pointer-events-none absolute inset-x-0 top-0 z-0 text-center font-display whitespace-nowrap text-[clamp(3.6rem,14.5vw,16rem)] font-light uppercase leading-[0.8] tracking-[-0.03em] text-bone/95">
              <span className="h-mouse-back inline-block">
                <Letters text="Abraham" className="h-back-char" />
              </span>
            </span>

            <span aria-hidden className="h-front-title h-in-text h-in pointer-events-none absolute inset-x-0 bottom-[11%] z-30 text-center font-black text-[clamp(3.5rem,12vw,12.5rem)] font-bold leading-[0.85] text-gold [text-shadow:0_6px_40px_rgb(0_0_0/0.65)]">
              <Letters text="Nadeak" className="h-front-char" />
            </span>
          </h1>

          {/* portrait frame; the head rises past its top edge */}
          <div className="h-pop absolute bottom-0 left-1/2 z-10 -translate-x-1/2" style={{ height: "var(--fh)", width: "calc(var(--fh) * 0.884)" }}>
            <div className="h-frame h-in absolute inset-0 bg-gradient-to-b from-oxblood/70 via-ink-2/90 to-ink">
              <div className="frame-border" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ember/25 to-transparent" />
            </div>
            <div className="h-mouse-person absolute inset-0 z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portrait.webp"
                alt="Abraham Nadeak, cut out of his photo, leaning out of the frame"
                width={650}
                height={950}
                fetchPriority="high"
                decoding="async"
                className="h-person h-in absolute bottom-0 left-0 h-[129%] w-full max-w-none object-contain object-bottom [clip-path:inset(-100%_0_0_0)] drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)]"
              />
            </div>
          </div>

          {/* floating stack chips */}
          <div aria-hidden className="h-chips pointer-events-none absolute inset-0 z-[25]">
            {chips.map((c) => (
              <div key={c.label} className={`h-chip h-in absolute ${c.cls}`}>
                <div className="h-chip-mouse" data-depth={c.depth}>
                  <div className="float" style={{ "--ft": c.ft, "--fd": c.fd } as CSSProperties}>
                    <span className="inline-block rounded-full border border-gold/50 bg-ink/70 px-4 py-2 font-mono text-xs text-bone backdrop-blur-md sm:text-sm">
                      <span className="mr-2 text-gold">◆</span>
                      {c.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* spinning badge */}
          <div aria-hidden className="h-chip h-in absolute right-[17%] top-[47%] z-[26] hidden size-28 sm:block">
            <svg viewBox="0 0 120 120" className="spin-slow size-full">
              <defs>
                <path id="badge-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <text className="fill-gold font-label text-[10.5px] tracking-[0.3em]">
                <textPath href="#badge-ring">SOFTWARE ENGINEER ✦ BANDUNG ✦ </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-black text-3xl text-bone">AN</span>
          </div>
        </div>

        {/* info row: flows under the stage on mobile, sits in the corners on desktop */}
        <div className="relative z-40 -mt-2 grid gap-6 pb-12 text-center md:absolute md:inset-x-[clamp(1.25rem,4vw,3rem)] md:bottom-24 md:mt-0 md:flex md:items-end md:justify-between md:pb-0 md:text-left">
          <div className="mx-auto max-w-xs md:mx-0">
            <p className="h-up h-in label !text-bone inline-flex items-center gap-2 [text-shadow:0_1px_14px_var(--ink)]">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-ember" />
              </span>
              {profile.availability}
            </p>
            <p className="h-up h-in mt-4 text-lg text-bone/90 [text-shadow:0_1px_20px_var(--ink)]">{profile.role}</p>
            <div className="h-up h-in mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Button href="/#quests">View the quests</Button>
              <Button href={profile.cv.pdfUrl} variant="ghost">
                Download CV
              </Button>
            </div>
          </div>

          <a href="#herald" className="h-up h-in label hidden items-center gap-3 text-bone/80 transition-colors hover:text-gold md:flex" aria-label="Descend to the next section">
            {profile.location.replace(", ", " · ")} <span aria-hidden className="inline-block animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
