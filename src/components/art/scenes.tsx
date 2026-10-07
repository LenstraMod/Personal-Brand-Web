/**
 * Placeholder art scenes drawn in the site palette (REQUIREMENTS §6.3).
 * Real photography/AI art overrides them: drop `public/images/<name>.jpg|webp|avif`
 * and <Scene name="…"> picks it up automatically at build time. No code changes.
 */
import type { ReactNode } from "react";

const S = (c: string) => ({ stopColor: `var(--${c})` });

function Svg({ vb, children, label }: { vb: string; children: ReactNode; label?: string }) {
  return (
    <svg
      viewBox={vb}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** Castle gate at dusk with torches (Hero). */
export function GateScene() {
  return (
    <Svg vb="0 0 1600 900">
      <defs>
        <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={S("ink")} />
          <stop offset=".45" stopColor="#43201a" />
          <stop offset=".78" style={S("oxblood")} />
          <stop offset="1" stopColor="#d9792e" />
        </linearGradient>
        <radialGradient id="g-glow" cx=".5" cy=".72" r=".5">
          <stop offset="0" style={S("ember")} stopOpacity=".55" />
          <stop offset="1" style={S("ember")} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-door" cx=".5" cy=".7" r=".7">
          <stop offset="0" stopColor="#ffd68a" />
          <stop offset=".5" style={S("ember")} />
          <stop offset="1" stopColor="#5a1c10" />
        </radialGradient>
        <radialGradient id="g-torch" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd68a" stopOpacity=".9" />
          <stop offset="1" style={S("ember")} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120c09" />
          <stop offset="1" style={S("ink")} />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#g-sky)" />
      <rect width="1600" height="900" fill="url(#g-glow)" />
      {/* stars */}
      {[[210, 90], [420, 160], [660, 70], [980, 120], [1240, 60], [1420, 190], [1130, 230], [300, 280]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" fill="var(--bone)" opacity=".55" />
      ))}
      {/* far hills */}
      <path d="M0 640 Q250 560 520 625 T1040 600 T1600 640 V900 H0Z" fill="#1d1210" />
      {/* castle */}
      <g fill="#0f0a08">
        <rect x="380" y="430" width="840" height="300" />
        <path d="M380 430h840" stroke="#0f0a08" strokeWidth="26" strokeDasharray="28 22" transform="translate(0 -20)" />
        <rect x="290" y="300" width="150" height="430" />
        <path d="M280 300 L365 190 L450 300Z" />
        <rect x="1160" y="300" width="150" height="430" />
        <path d="M1150 300 L1235 190 L1320 300Z" />
        <rect x="690" y="250" width="220" height="250" />
        <path d="M680 250 L800 100 L920 250Z" />
        <rect x="796" y="60" width="3" height="46" />
        <path d="M799 62h42l-12 10 12 10h-42Z" fill="var(--oxblood)" />
      </g>
      {/* lit windows */}
      {[[345, 380], [1235, 380], [790, 330]].map(([x, y]) => (
        <path key={x} d={`M${x} ${y}v-34a14 14 0 0 1 28 0v34Z`} fill="#ffb75e" opacity=".85" />
      ))}
      {/* gate */}
      <path d="M700 735 V560 a100 100 0 0 1 200 0 V735Z" fill="url(#g-door)" />
      <g stroke="#0f0a08" strokeWidth="6">
        {[730, 765, 800, 835, 870].map((x) => (
          <path key={x} d={`M${x} 470 V735`} />
        ))}
        {[520, 580, 640, 700].map((y) => (
          <path key={y} d={`M700 ${y} H900`} />
        ))}
      </g>
      {/* torches */}
      {[600, 1000].map((x) => (
        <g key={x}>
          <circle cx={x} cy="610" r="90" fill="url(#g-torch)" />
          <rect x={x - 4} y="630" width="8" height="110" fill="#0f0a08" />
          <path d={`M${x} 566 q22 28 0 60 q-22 -32 0 -60Z`} fill="#ffc46b" />
        </g>
      ))}
      <path d="M0 735 H1600 V900 H0Z" fill="url(#g-ground)" />
      <path d="M560 735 Q800 790 1040 735 L1100 900 H500Z" fill="#2a1511" opacity=".55" />
    </Svg>
  );
}

/** Dusk field with a raven (Contact). Single-tone oxblood/gold grade. */
export function FieldScene() {
  return (
    <Svg vb="0 0 1600 900">
      <defs>
        <linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={S("ink")} />
          <stop offset=".55" style={S("oxblood")} />
          <stop offset="1" stopColor="#c9854a" />
        </linearGradient>
        <radialGradient id="f-sun" cx=".7" cy=".58" r=".35">
          <stop offset="0" stopColor="#ffd68a" stopOpacity=".9" />
          <stop offset="1" style={S("ember")} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#f-sky)" />
      <rect width="1600" height="900" fill="url(#f-sun)" />
      <circle cx="1120" cy="520" r="60" fill="#ffe2a8" opacity=".85" />
      <path d="M0 560 Q400 520 800 560 T1600 540 V900 H0Z" fill="#2a1511" />
      {/* field rows */}
      <g stroke="#120c09" strokeWidth="2" opacity=".75" fill="none">
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${-100 + i * 140} 900 L${700 + (i - 7) * 24} 575`} />
        ))}
      </g>
      <path d="M0 780 Q500 740 1000 790 T1600 760 V900 H0Z" fill="#0d0a08" />
      {/* raven */}
      <g transform="translate(360 250) rotate(-8)" fill="#0d0a08">
        <ellipse cx="0" cy="0" rx="62" ry="20" />
        <path d="M-52 -6 L-150 -88 Q-96 -20 -34 14Z" />
        <path d="M52 -6 L150 -80 Q96 -14 34 14Z" />
        <path d="M-58 8 L-118 34 L-52 22Z" />
        <circle cx="64" cy="-12" r="11" />
        <path d="M72 -14 L102 -8 L72 -3Z" />
      </g>
      {/* fence */}
      <g fill="#0d0a08">
        {[120, 260, 400].map((x) => (
          <rect key={x} x={x} y="640" width="10" height="150" />
        ))}
        <rect x="100" y="670" width="330" height="7" />
      </g>
    </Svg>
  );
}

/** Scribe's desk, oxblood/gold duotone (Chronicle). */
export function DeskScene() {
  return (
    <Svg vb="0 0 1000 1000">
      <defs>
        <linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={S("oxblood")} />
          <stop offset="1" style={S("ink")} />
        </linearGradient>
        <radialGradient id="d-candle" cx=".3" cy=".42" r=".55">
          <stop offset="0" style={S("gold")} stopOpacity=".7" />
          <stop offset="1" style={S("gold")} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1000" height="1000" fill="url(#d-bg)" />
      <rect width="1000" height="1000" fill="url(#d-candle)" />
      {/* window arch */}
      <path d="M620 560 V260 a130 130 0 0 1 260 0 V560Z" fill="none" stroke="var(--gold)" strokeWidth="2" opacity=".55" />
      <path d="M750 130 V560 M620 330 H880" stroke="var(--gold)" strokeWidth="1.5" opacity=".4" />
      {/* desk */}
      <path d="M0 700 H1000 V1000 H0Z" fill="#0d0a08" opacity=".85" />
      <path d="M0 700 H1000" stroke="var(--gold)" strokeWidth="1.5" opacity=".6" />
      {/* open book */}
      <path d="M260 740 L500 700 L740 740 L740 800 L500 764 L260 800Z" fill="var(--bone)" opacity=".85" />
      <path d="M500 700 V764" stroke="#0d0a08" strokeWidth="3" />
      <g stroke="#0d0a08" strokeWidth="2" opacity=".5">
        {[722, 738, 754].map((y, i) => (
          <path key={y} d={`M${290 + i * 4} ${y + 6} L${470} ${y - 12}M${530} ${y - 12} L${710 - i * 4} ${y + 6}`} />
        ))}
      </g>
      {/* candle */}
      <rect x="236" y="560" width="28" height="140" fill="var(--bone)" opacity=".9" />
      <path d="M250 500 q20 30 0 56 q-20 -26 0 -56Z" fill="#ffd68a" />
      {/* quill */}
      <path d="M800 640 L690 760" stroke="var(--bone)" strokeWidth="3" />
      <path d="M800 640 Q860 600 880 540 Q820 580 800 640Z" fill="var(--bone)" opacity=".85" />
      <rect x="740" y="720" width="46" height="46" fill="#0d0a08" stroke="var(--gold)" strokeWidth="1.5" />
    </Svg>
  );
}

/** Quest covers: tall abstract compositions, one motif each. */
export function QuestScene({ kind }: { kind: "warung" | "kuzushiji" | "android" | "hack" }) {
  const bg: Record<typeof kind, [string, string]> = {
    warung: ["#3a1810", "#e2792d"],
    kuzushiji: ["#17110d", "#6e1f1f"],
    android: ["#0d0a08", "#2a211b"],
    hack: ["#2a1511", "#c9a24b"],
  };
  const [a, b] = bg[kind];
  return (
    <Svg vb="0 0 600 1000">
      <defs>
        <linearGradient id={`q-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`q-${kind}-l`} cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#ffd68a" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffd68a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="1000" fill={`url(#q-${kind})`} />
      {kind === "warung" && (
        <g>
          <circle cx="300" cy="560" r="300" fill={`url(#q-${kind}-l)`} />
          <path d="M80 520 H520 L480 430 H120Z" fill="var(--oxblood)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${80 + i * 88} 520 q44 40 88 0Z`} fill={i % 2 ? "var(--bone)" : "var(--oxblood)"} opacity=".9" />
          ))}
          <rect x="120" y="560" width="360" height="200" fill="#0d0a08" opacity=".85" />
          {[170, 300, 430].map((x) => (
            <g key={x}>
              <path d={`M${x} 380 V430`} stroke="#0d0a08" strokeWidth="2" />
              <ellipse cx={x} cy="456" rx="20" ry="26" fill="#ffb75e" />
            </g>
          ))}
        </g>
      )}
      {kind === "kuzushiji" && (
        <g fill="none" stroke="var(--bone)" strokeLinecap="round">
          <rect x="60" y="120" width="480" height="640" stroke="var(--gold)" strokeWidth="1.5" opacity=".5" />
          <path d="M300 120V760M60 440H540" stroke="var(--gold)" strokeWidth="1" opacity=".3" strokeDasharray="6 8" />
          <path d="M170 260 Q330 220 420 280 M290 190 Q270 380 330 470 Q400 560 300 640 M200 470 Q330 400 440 500" strokeWidth="26" opacity=".92" />
        </g>
      )}
      {kind === "android" && (
        <g>
          <rect x="150" y="150" width="300" height="640" rx="40" fill="#0d0a08" stroke="var(--gold)" strokeWidth="2" />
          <rect x="180" y="240" width="190" height="64" rx="14" fill="var(--stone)" />
          <rect x="230" y="334" width="190" height="96" rx="14" fill="var(--gold)" opacity=".9" />
          <rect x="180" y="464" width="150" height="48" rx="14" fill="var(--stone)" />
          <rect x="180" y="690" width="240" height="52" rx="26" fill="none" stroke="var(--bone)" strokeWidth="1.5" opacity=".6" />
        </g>
      )}
      {kind === "hack" && (
        <g>
          <circle cx="300" cy="470" r="250" fill={`url(#q-${kind}-l)`} />
          <path d="M150 220 H450 L300 470Z M150 720 H450 L300 470Z" fill="none" stroke="var(--bone)" strokeWidth="3" />
          <path d="M150 220 L300 470 L450 220Z" fill="var(--oxblood)" opacity=".85" />
          <path d="M150 720 L300 470 L450 720Z" fill="#0d0a08" opacity=".7" />
        </g>
      )}
    </Svg>
  );
}

/** Heraldic crest used when no portrait is supplied (Herald). */
export function CrestScene() {
  return (
    <Svg vb="0 0 600 800" label="Heraldic crest with the letters A and N">
      <defs>
        <linearGradient id="c-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={S("ink-2")} />
          <stop offset="1" style={S("stone")} />
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#c-bg)" />
      <path d="M130 200 H470 V420 Q470 560 300 640 Q130 560 130 420Z" fill="var(--oxblood)" stroke="var(--gold)" strokeWidth="3" />
      <path d="M160 230 H440 V420 Q440 535 300 606 Q160 535 160 420Z" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity=".6" />
      <text x="300" y="450" textAnchor="middle" fontSize="150" fill="var(--gold)" style={{ fontFamily: "var(--font-fraktur)" }}>
        AN
      </text>
      <g stroke="var(--gold)" strokeWidth="1.5" opacity=".7">
        <path d="M300 120 V170 M270 146 H330" />
      </g>
    </Svg>
  );
}
