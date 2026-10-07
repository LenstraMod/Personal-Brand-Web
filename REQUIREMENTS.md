# Personal Brand Website — Requirements & System Design

> **Working title:** *The Codex of Abraham* (codename `codex`)
> **Owner:** Abraham Shalom Nadeak · GitHub `LenstraMod` · IG `@abeee.me`
> **Status:** Draft v0.1 — requirements & design only, no code yet
> **Sources:** GitHub profile `LenstraMod` (46 repos), CV "Abraham Shalom Nadeak_CV ATS.pdf", Warung Senja README, `imagegen-frontend-web` design skill
> **Date:** 2026-10-07

---

## 0. How to read this document

| Part | What it answers |
|---|---|
| 1–3 | Why the site exists, who it is for, what it must do |
| 4 | The raw facts we have about the owner (the content source of truth) |
| 5–7 | Creative direction: concept, visual system, motion |
| 8 | Page-by-page / section-by-section spec (8 sections) |
| 9–12 | Architecture, tech stack, data model, folder structure |
| 13–16 | Performance, accessibility, SEO, security / privacy |
| 17–19 | Image-generation plan, milestones, acceptance criteria |
| 20–21 | Risks and open questions you need to answer |

---

## 1. Vision & goals

### 1.1 One-line pitch
A medieval-fantasy, **modern-hype** portfolio where a software engineering student presents himself as the keeper of his own codex — every project a quest, every skill a piece of armour, every scroll of the page a step deeper into the keep.

### 1.2 Why it exists
1. **Get hired / get internships** — recruiters and engineers land here from a CV link and must understand "who is this, what has he built, how do I contact him" in under 30 seconds.
2. **Be memorable** — a personal *brand*, not a template. The experience itself is proof of front-end / motion / 3D ability (it is a portfolio piece that is also a portfolio).
3. **Single source of truth** — one canonical URL for CV, GitHub, projects and contact.

### 1.3 Success metrics
| Metric | Target |
|---|---|
| Time for a recruiter to find name + role + contact | ≤ 10 s from landing |
| Lighthouse (mobile, 4G throttled) | Perf ≥ 90, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95 |
| LCP | ≤ 2.5 s (mobile), ≤ 1.8 s (desktop) |
| CLS | ≤ 0.05 |
| CV download + contact clicks | Tracked (privacy-friendly analytics) |
| "Wow" factor | Qualitative: shared by peers; submitted to Awwwards / CSSDA-style galleries (stretch) |

### 1.4 Non-goals (v1)
- No CMS / admin panel (content lives in typed data files in the repo).
- No blog or newsletter (reserved for v2 — "The Scriptorium").
- No user accounts, no comments, no e-commerce.
- No mandatory WebGL — the site must be fully usable without it.

---

## 2. Audience & user journeys

| Persona | Wants | Journey |
|---|---|---|
| **Recruiter / HR (ATS-minded)** | Name, role, stack, experience, contact, CV PDF | Hero → skim "Chronicle" → download CV → email |
| **Engineering lead / interviewer** | Real projects, code quality, depth | Hero → "Quests" → project detail → GitHub repo / live demo |
| **Peer / competition judge / lab mate** | Style, craft, collab potential | Scroll the whole experience → Instagram / GitHub |
| **Client (freelance, web / landing page)** | Visual taste, delivery proof | "Quests" (Warung Senja, web designs) → contact |

**Primary conversion:** *Send a raven* (contact: email) and *Download the scroll* (CV PDF).
**Secondary conversion:** open GitHub / live project demos.

---

## 3. Functional requirements

Priority: **P0** = launch blocker · **P1** = launch target · **P2** = post-launch.

### 3.1 Content & navigation
| ID | Requirement | Pri |
|---|---|---|
| F-01 | Single-page "Realm" home composed of 8 sections (see §8) with anchored navigation | P0 |
| F-02 | Sticky minimal nav (wordmark, section links, CV button, theme toggle) that hides on scroll-down, shows on scroll-up | P0 |
| F-03 | Project detail pages `/quests/:slug` (case study: problem, role, stack, highlights, links, gallery) | P0 |
| F-04 | `/codex` — printable/ATS-friendly CV page, plus direct PDF download | P0 |
| F-05 | Custom 404 page (in-theme: "Here be dragons") | P1 |
| F-06 | Live "Ledger" section pulling public repo stats from the GitHub API (fetched at **build time**, revalidated via scheduled rebuild; graceful static fallback) | P1 |
| F-07 | Bilingual content: **EN default**, **ID (Bahasa Indonesia)** toggle — CV is written in Indonesian, local recruiters matter | P1 |
| F-08 | Contact: `mailto:` + "copy email" button; optional form via serverless function | P0 / P1 |
| F-09 | Social links: GitHub, Instagram, Email (LinkedIn only if owner provides one) | P0 |
| F-10 | Open Graph / Twitter card images, per-page metadata | P0 |

### 3.2 Experience & interaction
| ID | Requirement | Pri |
|---|---|---|
| X-01 | **Gate intro / loader**: gate/portcullis opens as assets finish loading; skippable; shown once per session | P1 |
| X-02 | Smooth scrolling (Lenis) with scroll-linked animations (GSAP ScrollTrigger) | P0 |
| X-03 | Hero: full-bleed art-directed image with parallax layers + ember particle layer | P0 |
| X-04 | Pinned narrative section(s) (Chronicle timeline / Quests accordion) | P0 |
| X-05 | Custom cursor ("torch glow" on desktop; disabled on touch) with magnetic hover on CTAs | P1 |
| X-06 | **Wax-seal page transition** between routes | P1 |
| X-07 | Theme toggle: **Torchlit (dark, default)** ↔ **Daylight / Parchment (light)** | P1 |
| X-08 | Optional ambient sound (opt-in, off by default, synthesized via Web Audio, no big files) | P2 |
| X-09 | Easter egg (Konami code → dragon flyby / ember burst) | P2 |
| X-10 | Hover-accordion project slices that expand to preview the quest | P0 |
| X-11 | Skills "Armory" bento grid with hover reveal of proficiency / what was built with it | P0 |
| X-12 | Reading-progress rail (thin vertical gold line) on the page edge | P1 |

### 3.3 Hard rules for motion & fallbacks
- `prefers-reduced-motion: reduce` → no scroll-jacking, no parallax, no particles, instant transitions; content identical.
- **All real text is in the DOM** (not baked into canvas/images) so it is selectable, searchable, translatable and ATS/SEO-readable.
- WebGL / particle layers are **progressive enhancement**: lazy-loaded, adaptive quality (high/medium/low), and fully skipped on low-power / `saveData` / no-WebGL.
- Site is fully keyboard navigable; focus order matches reading order.

---

## 4. Content source of truth (owner facts)

> Everything on the site must trace back to this section. Anything not listed here is a **TODO(owner)**, never invented.

### 4.1 Identity
| Field | Value | Source |
|---|---|---|
| Name | Abraham Shalom Nadeak | GitHub / CV |
| Handle | `LenstraMod` (GitHub), `@abeee.me` (Instagram) | GitHub |
| Role | Software Engineer (S1 student) | CV |
| Location | Bandung, Indonesia (Bojongsoang, Kab. Bandung) | GitHub / CV |
| Public email | 63a.nadeak2006@gmail.com | GitHub / CV |
| Phone | present on CV — **NOT published on the site** (spam/privacy; see §16) | CV |
| Bio (GitHub) | "Software Engineering student @ Telkom University · building web, mobile & AI/Computer Vision projects from Bandung, Indonesia" | GitHub |

### 4.2 Profile summary (from CV, translated/condensed)
Software engineer with experience building **web and mobile** apps with **Laravel, React.js and Kotlin**, plus small-scale **AI / Computer Vision** models. Strong with **MySQL**, responsive design with **Tailwind CSS**, API integration, performance optimisation, and front-end / mobile / back-end / ML best practices. Communicates well and works in technical teams.

### 4.3 Skills (the "Armory")
| Category | Items |
|---|---|
| Front-end | React.js, Tailwind CSS, HTML5, CSS3, JavaScript (ES6+), TypeScript |
| Back-end | Laravel, REST API integration, Firebase |
| Mobile | Kotlin, Jetpack Compose (Android) |
| AI / ML | NumPy, scikit-learn, TensorFlow / Keras (Computer Vision) |
| Database | MySQL |
| Languages | Java, JavaScript, PHP, Python, Kotlin, TypeScript, C# |
| Creative / 3D / motion | Three.js, GSAP, Lenis, Vite (from Warung Senja) |
| Tools & workflow | Git / GitHub, npm / yarn, Scrum |
| Content | Copywriting & SEO |

### 4.4 Experience (the "Chronicle")
| Period | Role | Org | Highlights (from CV) |
|---|---|---|---|
| Jan 2023 – Apr 2023 | Front-end Developer (Intern) | Indigo Space, Medan | Built user main page with React.js + Tailwind CSS; integrated UI with backend via REST API; collaborated with devs so design/function work across devices |
| Jul 2023 – Oct 2023 | Copywriter & SEO Specialist (Intern) | Upper Digital Agency, Medan | Wrote/optimised SEO articles; wrote/edited for target audience, consistent tone; built & managed company-profile websites on WordPress (layout, performance) |

### 4.5 Education
| Period | Institution | Programme |
|---|---|---|
| 2021 – 2024 | SMKS Multi Karya | Rekayasa Perangkat Lunak (Software Engineering) |
| 2024 – now | Telkom University (Bandung) | S1 Rekayasa Perangkat Lunak |

### 4.6 Projects ("Quests") — candidates from GitHub
46 public repos total. Tiering below; **owner to confirm which are featured**.

| Tier | Repo | What we know | Stack | Notes |
|---|---|---|---|---|
| **Featured** | `Warung-Senja-3D-Landing-page` | Animated, interactive 3D website for a fictional Indonesian-fusion street-food shop. 34 dishes, 6 products, dioramas — **all procedurally built in code, no model files**. Scroll-driven camera flight, ember-burn shader page transitions, post-processing (bloom, ACES, vignette, grain), adaptive quality, custom 3D cursor, day/night toggle, opt-in synthesized sound, reduced-motion support, code-split routes | Vite, TypeScript, Three.js, GSAP (ScrollTrigger/Flip/SplitText), Lenis, Web Audio | **Live:** warung-senja-3-d-landing-page.vercel.app — flagship; proves 3D + motion ability |
| **Featured** | `AI-Laboratory-Telkom-University---Kuzushiji49-Hiragana-Recognizer` | Hiragana (Kuzushiji-49) recognition model | Jupyter Notebook, Python, TensorFlow/Keras | AI/CV proof. TODO(owner): accuracy, approach, dataset notes |
| **Featured** | `Mobile-Innovation-Laboratory-10-0/Android-…-AskAiApp` | Android "Ask AI" app (archived) | Kotlin, Jetpack Compose | TODO(owner): what it does, screenshots |
| **Featured** | `Motion-Hack-5-0/TIM-LIMA` | Kotlin app from Motion Hack 5.0 (archived) | Kotlin | TODO(owner): competition, result, role |
| Supporting | `Tel-Used` | HTML — most recently pushed (2026-10-06) | HTML | TODO(owner): purpose |
| Supporting | `web_tokopedia_design` | Tokopedia-style design study | CSS | Good for "UI craft" mini-card |
| Supporting | `ASE_Lythrum_Game-Development` | Game development project | C# | TODO(owner): engine/genre |
| Supporting | `doc-web-opencontext` | Web-based documentation for the *opencontext* CLI | TypeScript | Shows docs/DX skills |
| Supporting | `TranscriptApps_KPL`, `TugasBesarKPL_GGS`, `Modul*/TP_MODUL*_103022400008` | University **KPL** (software construction) coursework | C# | Group into one "Coursework" card — do **not** list individually |
| — | `LenstraMod` (profile repo) | Config for GitHub profile | — | Not a quest |

> Repo count/stars in the Ledger section are read from the GitHub API at build time, never hard-coded.

### 4.7 Brand name & tagline (proposal — owner to pick)
- **Wordmark:** `ABRAHAM NADEAK` set in the display face, with a small heraldic monogram **"AN"** or a lens/crest mark (nod to *Lenstra*).
- **Tagline candidates** (short, no buzzwords — banned: *unleash, elevate, revolutionize, seamless, next-gen*):
  1. "I build web, mobile and machine-sight."
  2. "Software forged in Bandung."
  3. "Quests in code. Crafted by hand."
- **Hero H1 (recommended):** *Abraham Nadeak.* with sub-line *Software engineer — web, mobile & computer vision.*

---

## 5. Creative direction

### 5.1 Concept spine
**Journey / pilgrimage + Archive (the illuminated codex).**
The visitor travels *through the gate → into the keep → through the armoury and quest hall → to the scribe's chronicle → and out via a raven (contact).* The page is simultaneously a **map** (journey) and a **manuscript** (archive) — headings feel like illuminated chapter titles, captions like marginalia.

> *Medieval, but modern-hype:* strict grids, huge type, cinematic photography/illustration, shader/ember effects and tight micro-interactions — **never** renaissance-fair kitsch (no clip-art scrolls everywhere, no faux-wood frames, no comic fonts).

### 5.2 Design dials (from the `imagegen-frontend-web` skill)
| Dial | Value | Meaning here |
|---|---|---|
| DESIGN_VARIANCE | 8 | Asymmetric, off-grid editorial moments |
| VISUAL_DENSITY | 4 | Breathable, gallery-like |
| ART_DIRECTION | 9 | Bold, cinematic statement |
| IMPLEMENTATION_CLARITY | 9 | Must be codeable from the comps |
| IMAGE_USAGE_PRIORITY | 9 | Image-led; full-bleed backgrounds welcomed |
| SPACING_GENEROSITY | 8 | Big, even gaps between sections |
| LAYOUT_VARIATION | 8 | No two adjacent sections share an anchor |
| CONVERSION_DISCIPLINE | 8 | Hero → proof → action, always clear |

### 5.3 Committed combinatorial choices
| Axis | Choice |
|---|---|
| Theme paradigm | **Deep Dark Mode** (Torchlit) with a Parchment light variant |
| Background character | **Full-bleed cinematic imagery** + micro-noise gradient over solid |
| Typography character | **Elegant editorial serif + sans pairing** with one blackletter accent |
| Hero architecture | **Massive Image-First Hero with restrained text** |
| Hero scale | **Giant Statement** |
| Section system | **Asymmetric premium marketing flow** with gallery-led cadence |
| Narrative spine | **Journey / pilgrimage** (+ Archive details) |
| Signature components (exactly 4) | ① **Hover-Accordion Slice Layout** (Quests) ② **Pristine Gapless Bento Grid** (Armory) ③ **Off-Grid Editorial Layout** (Herald/About) ④ **Vertical Rhythm Lines** (Chronicle timeline + page rail) |
| Motion-implied language (exactly 2) | **Pinned narrative section energy** + **parallax image drift energy** |
| Second-read moment (exactly 1) | **One oversized illuminated drop-cap** (gilded initial **"A"**) opening the About section — it marks where reading starts and is the brand's recall hook. Used **once** only. |

### 5.4 Anti-slop guardrails (must hold in every section)
- No purple/blue "AI" gradients, no glow-halo spam, no floating orbs.
- No 3-identical-stat KPI rows, no unreadable logo marquees. (No fake metrics at all.)
- No more than 2 consecutive sections with the same composition anchor; no more than 3 with the same background mode.
- Hero headline ≤ 2 lines, short and powerful. No gradient text.
- Real imagery in **at least 5 of 8** sections; ≥ 1 full-bleed, ≥ 1 duotone/graded, ≥ 1 mini-minimalist section.

---

## 6. Visual system

### 6.1 Colour tokens
One palette, reused everywhere (no per-section theme swaps).

| Token | Dark (Torchlit) | Light (Parchment) | Role |
|---|---|---|---|
| `--ink` | `#0D0A08` | `#F1E8D4` | Page background |
| `--ink-2` | `#17110D` | `#E7DBC0` | Surface / cards |
| `--stone` | `#2A211B` | `#CDBF9F` | Hairlines, borders |
| `--bone` | `#EADFC8` | `#1A130E` | Primary text |
| `--bone-dim` | `#A89B82` | `#5B4C3A` | Secondary text |
| `--oxblood` | `#6E1F1F` | `#7A2323` | **Secondary brand** (banners, seals, duotone shadow) |
| `--gold` | `#C9A24B` | `#8F6B1E` | **Primary accent** (CTAs, drop-cap, rail, focus ring) |
| `--ember` | `#E2792D` | `#C45A12` | **Sparingly**: particles, hover heat, active state |

Contrast: body text ≥ 7:1, gold on ink ≥ 4.5:1 (verified before locking hex values).

### 6.2 Typography
| Role | Face (Google Fonts / self-host) | Use |
|---|---|---|
| Display | **Cormorant Garamond** (or *Fraunces*) — light/medium, tight tracking, large scale | H1/H2, chapter titles |
| Small caps / labels | **Cinzel** — wide tracking, ≤ 12 px caps, used in moderation | Section numbers ("Chapter I"), nav, captions |
| Blackletter accent | **UnifrakturCook** / *Pirata One* — **max 1 word per screen**, display size only | The drop-cap and one hero accent word |
| Body / UI | **Inter** (or *Geist*) | Paragraphs, buttons, forms |
| Mono | **JetBrains Mono** | Tech tags, repo meta, "runes" |

Scale (fluid, `clamp()`): `display-xl 9–14vw` · `display-l 5–8vw` · `h2 3–4.5rem` · `h3 1.5–2rem` · `body 1–1.125rem` · `label 0.7–0.8rem`.
Rules: no more than 2 weights per face; no all-caps paragraphs; no 6-line headings.

### 6.3 Shape, spacing, material
- **Radius language:** *sharp-to-slight* — 0 px on image frames and cards, 2 px on inputs, full-pill only for the primary CTA. Arches (`border-radius: 999px 999px 0 0`) reserved for **portal-shaped image frames** (gate/window motif).
- **Spacing:** 8-pt base; section vertical padding `clamp(7rem, 14vw, 14rem)`; max content width 1280 px, editorial sections may bleed to the viewport.
- **Material vocabulary:** parchment grain (CSS noise), gilded metal (thin 1 px gold keylines + subtle linear-gradient sheen), wax seal (oxblood, used for transitions & the contact CTA), torch light (radial ember vignette).
- **Image treatment (consistent):** warm-graded, low-chroma, crushed blacks, film grain, oxblood/gold duotone for secondary images. Subjects: castle gate, torch-lit hall, armoury, scribe's desk, ravens, map table, fields at dusk — **not** stock cosplay.
- **Iconography:** custom thin-line heraldic icons (1.5 px stroke, square caps) — sword, shield, quill, key, raven, scroll — single consistent set (SVG sprite).

### 6.4 CTA family
| Use | Style |
|---|---|
| Primary (Hero, Contact) | **Gilded pill** — gold fill, ink text, magnetic hover with ember sweep |
| Secondary | **Outline / ghost** — 1 px bone border |
| Inline | **Underlined link + arrow** (↗) |
| Closing | **Oversized headline + tiny CTA hint** (Contact section) |

Only **one** primary action per viewport.

---

## 7. Motion design

### 7.1 Principles
1. Motion explains hierarchy (what to read next), never decorates.
2. Two signature languages only: **pinned narrative** and **parallax drift**.
3. Everything seek-able and killable: one GSAP context per section, cleaned on unmount; `matchMedia` for reduced motion and breakpoints.
4. Durations: micro 150–250 ms · UI 300–500 ms · scene 800–1400 ms. Easings: `power3.out` (reveals), `expo.inOut` (transitions), `none` (scrubbed).

### 7.2 Choreography
| Moment | Behaviour |
|---|---|
| **Gate loader** | Portcullis rises while a gold progress line fills; skip button; session-once |
| **Hero** | 4-layer parallax (sky / castle / foreground / embers); headline split-text reveal by line mask; embers drift upward; subtle camera push on scroll |
| **Herald (About)** | Off-grid text & portrait; drop-cap draws in (gold stroke → fill); paragraphs stagger-float up |
| **Armory** | Bento tiles rise in a wave; hover = tile "forges" (ember underglow + detail text swaps in) |
| **Quests** | Section pins; horizontal accordion slices expand on hover/focus (and auto-advance on scroll while pinned); non-active slices desaturate |
| **Chronicle** | Pinned; vertical rhythm line draws with scroll; each entry unfurls at its node |
| **Ledger** | Numbers count up once when visible (real data only) |
| **Contact** | Wax-seal CTA stamps on click; raven silhouette flies across on submit/copy |
| **Route change** | Wax-seal wipe transition (ember burn shader optional on high tier) |
| **Cursor** | Torch glow follows; scales on interactive targets; hidden on touch / reduced motion |

### 7.3 Quality tiers
| Tier | Condition | Features |
|---|---|---|
| High | Desktop GPU, no `saveData` | Parallax + WebGL embers/shader transition + post FX light |
| Medium | Mobile / mid GPU | Parallax + 2D canvas embers |
| Low | Low FPS (measured), `saveData`, reduced motion | Static images, CSS fades only |

A runtime FPS sampler downgrades the tier automatically (pattern already proven in Warung Senja).

---

## 8. Section-by-section specification

> **8 sections → 8 horizontal reference images later** (one per section, per the `imagegen-frontend-web` rule). Anchors/backgrounds below are chosen so no anchor repeats more than twice in a row.

### Global layout order
`Gate (Hero) → Herald → Armory → Quests → Chronicle → Ledger → Raven (Contact) → Colophon (Footer)`

| # | Section (Chapter) | Job | Composition anchor | Background mode | CTA style | Size |
|---|---|---|---|---|---|---|
| 1 | **The Gate** — Hero | Hook | **Bottom-left text over full-bleed image** | Full-bleed cinematic image w/ tonal overlay | Gilded pill + ghost "View quests" | Giant |
| 2 | **The Herald** — About | Educate / trust | **Off-grid editorial offset** | Quiet parchment texture + framed arch portrait | Inline underlined link "Read the full codex ↗" | Medium |
| 3 | **The Armory** — Skills | Prove capability | **Top-left lead, support bottom-right** | Solid ink + micro-noise; bento grid | None (hover details) | Medium |
| 4 | **The Quests** — Projects | Proof of work | **Centered low** (title in lower 40%) over accordion slices | Image slices as the entire visual | Per-slice "Open quest ↗"; section-end outline CTA | Large |
| 5 | **The Chronicle** — Experience & Education | Credibility | **Right-third caption + left-two-thirds visual** | Duotone (oxblood/gold) scribe's-desk photo + vertical rhythm line | Underlined "Download CV ↗" | Medium |
| 6 | **The Ledger** — GitHub activity | Live proof / second hook | **Stacked center** | Solid + oversized numerals (real data) | Ghost "See all 46 repos ↗" | Mini |
| 7 | **The Raven** — Contact | Convert | **Image-as-canvas, text in safe area** | Atmospheric photo (dusk fields + raven) graded single-tone | **Oversized headline + tiny CTA hint** + gilded wax-seal button | Large |
| 8 | **The Colophon** — Footer | Wayfinding / sign-off | **Stacked center, mini minimalist** | Flat colour-block (oxblood / ink diptych) | Link list | Mini |

### 8.1 Section 1 — The Gate (Hero)
- **Goal:** state *who / what* in one look; one obvious next action.
- **Content:** eyebrow `Bandung · Indonesia · Open to internships` *(TODO(owner): confirm availability wording)* → H1 **"Abraham Nadeak"** (blackletter accent on one word allowed) → sub **"Software engineer — web, mobile & computer vision."** → CTAs: **[View the quests]** (primary) · **[Download CV]** (ghost).
- **Visual:** full-bleed torch-lit castle gate at dusk, warm graded; ember particles; subtle vignette; hero fits a 13" laptop viewport without scroll.
- **Behaviour:** gate loader hand-off, split-text headline, parallax drift on scroll, scroll cue ("Descend ↓").
- **Don'ts:** no stat strip, no logo row, no pills cluster.

### 8.2 Section 2 — The Herald (About)
- **Goal:** humanise; establish the story in ~90 words.
- **Content:** illuminated drop-cap **A** (the *second-read moment*), short bio built from §4.2, three marginalia notes (e.g., *"Based in Bandung"*, *"Telkom University, S1 RPL"*, *"Likes: 3D on the web, small AI models"* — **TODO(owner): approve personal facts**), arch-framed portrait (**TODO(owner): provide a photo**; fallback = illustrated herald crest).
- **Layout:** off-grid — headline overlaps the portrait frame; narrow vertical side-rail note ("Chapter I — Of the Maker").
- **Component:** Off-Grid Editorial Layout.

### 8.3 Section 3 — The Armory (Skills)
- **Goal:** scannable stack proof, grouped not listed.
- **Layout:** **Pristine Gapless Bento** — 1 large tile "Front-end & motion" (React, TS, Tailwind, GSAP, Three.js) with image crop; medium tiles for Back-end (Laravel, REST, Firebase, MySQL), Mobile (Kotlin, Jetpack Compose), AI/CV (TensorFlow, Keras, scikit-learn, NumPy); small tiles for Languages and Workflow (Git, Scrum, SEO).
- **Rules:** no percentage "skill bars" (meaningless); instead each tile shows *"Forged in →"* link to the quest that used the skill.
- **Hover:** tile heat + detail swap.

### 8.4 Section 4 — The Quests (Projects)
- **Goal:** the main proof. 4 featured quests as full-height image slices.
- **Layout:** **Hover-Accordion Slice** row (desktop) → vertical stacked cards with horizontal swipe (mobile). Active slice shows: title, one-line description, tech chips, [Open quest ↗].
- **Slices:** (1) Warung Senja 3D · (2) Kuzushiji-49 Hiragana Recognizer · (3) AskAiApp (Android) · (4) TIM-LIMA (Motion Hack 5.0). Below the row: a compact list "More from the archive" (web_tokopedia_design, ASE Lythrum, doc-web-opencontext, Coursework).
- **Detail page template (`/quests/:slug`):** hero image → "The brief" → "My role" → "Stack" → "What was hard / what I learned" → gallery / video → links (live, repo) → prev/next quest.
- **TODO(owner):** screenshots/recordings for each featured project (esp. Warung Senja video, hiragana model demo, Android screenshots).

### 8.5 Section 5 — The Chronicle (Experience & Education)
- **Goal:** CV at a glance without a wall of text.
- **Layout:** pinned; vertical gold rhythm line with 4 nodes (2021 SMKS · Jan 2023 Indigo Space · Jul 2023 Upper Digital · 2024 Telkom University). Right-third caption column; left visual = duotone scribe's desk image that shifts crop per node.
- **Entry content:** period, role, org, 1–2 bullet outcomes (from §4.4).
- **CTA:** "Download CV (PDF) ↗" + link to `/codex`.

### 8.6 Section 6 — The Ledger (GitHub)
- **Goal:** show activity honestly; mini calm section between two heavy ones.
- **Content:** oversized numerals from API — public repos (46 at time of writing), languages used (C#, TypeScript, Kotlin, Python, …), last push; "Latest commits" 3-row list. Build-time data with static fallback if API fails.
- **Anti-slop:** only real numbers; no invented KPIs.

### 8.7 Section 7 — The Raven (Contact)
- **Goal:** convert.
- **Content:** oversized line **"Send a raven."** + one sentence ("Internships, freelance builds, collabs — I reply within …" **TODO(owner): response-time claim**). Primary **gilded wax-seal button** → opens mail; **Copy email** button; social row (GitHub · Instagram · Email). Optional form (P1): name, email, message → serverless handler (spam-protected).
- **Visual:** dusk field + raven, single-tone grade; safe area for text.

### 8.8 Section 8 — The Colophon (Footer)
- Wordmark, nav links, "Built with Vite, React, GSAP, Three.js" credit, © year, theme toggle, language toggle, back-to-top (a small crest). Oxblood/ink diptych.

### 8.9 Auxiliary pages
| Route | Purpose |
|---|---|
| `/quests/:slug` | Case study (4 featured, extensible) |
| `/codex` | Clean CV page, print stylesheet, link to PDF |
| `*` | 404 "Here be dragons" with link home |
| `/sitemap.xml`, `/robots.txt`, `/humans.txt` | SEO / meta |

---

## 9. System architecture

```
                    ┌──────────────────────────────┐
  Visitor ─HTTPS──▶ │ Vercel Edge CDN (static)     │
                    │  • prerendered HTML per route │
                    │  • hashed JS/CSS/AVIF/WOFF2   │
                    └───────┬───────────┬──────────┘
                            │           │
                  (hydrate) ▼           ▼ (optional, P1)
        ┌───────────────────────┐   ┌────────────────────────┐
        │ React SPA shell        │   │ Serverless fn          │
        │  Router · i18n · theme │   │  /api/contact          │
        │  Motion engine (GSAP + │   │  → Resend/email + rate │
        │   Lenis) · FX layer    │   │    limit + honeypot    │
        └─────────┬─────────────┘   └────────────────────────┘
                  │ lazy
        ┌─────────▼─────────┐
        │ WebGL FX chunk     │  (Three.js: embers, seal-burn shader)
        └───────────────────┘

 Build time:  GitHub REST API ──▶ data/ledger.json   (repos, languages, pushes)
              content/*.ts|mdx ──▶ typed content graph ──▶ prerender
 Scheduled:   Vercel cron/GitHub Action nightly rebuild to refresh the Ledger
```

**Key idea:** it is a **static-first** site. All SEO-critical text is prerendered; interactivity and effects hydrate on top. No database, no runtime servers except one optional contact function.

### 9.1 Runtime layers
1. **Content layer** — typed TS/MDX files (bilingual) validated by Zod at build.
2. **Presentation layer** — React components, Tailwind tokens, section modules.
3. **Motion layer** — a thin `motion/` package: Lenis instance, GSAP plugin registry, `useReveal`, `usePinnedSection`, `useParallax`, reduced-motion guard, quality tier store.
4. **FX layer** — lazy WebGL (embers, transition shader) mounted in a single fixed canvas outside React's tree churn.
5. **Platform layer** — metadata, analytics, i18n, theme, error boundary.

### 9.2 Data flow
- Content file → loader → typed model → section component (props only; sections never fetch).
- GitHub data: build script `scripts/fetch-ledger.ts` → `src/data/ledger.generated.json` (committed fallback in `ledger.fallback.json`).
- Theme: `data-theme` on `<html>` set by an inline pre-paint script (no flash), persisted in `localStorage` (wrapped in try/catch).
- Language: path prefix `/id/...` (SEO-friendly) with `hreflang` alternates; default `/`.

### 9.3 Error & failure handling
| Failure | Behaviour |
|---|---|
| WebGL unsupported / context lost | Drop to Low tier, static images |
| GitHub API down at build | Use `ledger.fallback.json` |
| Image fails | Palette-coloured blurhash/LQIP placeholder remains |
| JS disabled | Prerendered content readable; animations absent; nav anchors work |
| Font fails | `font-display: swap` with metric-matched fallbacks (no CLS) |

---

## 10. Technology decisions (ADR summary)

| # | Decision | Choice | Rationale | Alternative considered |
|---|---|---|---|---|
| 1 | Framework | **Vite + React 18/19 + TypeScript** with static prerender (`vite-react-ssg`) | Matches the owner's proven stack (Warung Senja: Vite + TS + GSAP + Three), React is on the CV, fast DX, static output for SEO | **Next.js** (heavier; App Router RSC offers little here). Pick Next if the contact API/blog grows. |
| 2 | Styling | **Tailwind CSS v4** + CSS variables for tokens | On CV; token-driven theming; tiny runtime | CSS Modules |
| 3 | Animation | **GSAP** (ScrollTrigger, SplitText, Flip) + **Lenis** | Already used; best-in-class scroll narrative; seek-safe | Framer Motion (nice for UI state, weaker for pinned scenes) — may still be used for small component transitions |
| 4 | 3D / FX | **Three.js** (vanilla, lazy) — *not* React Three Fiber | Owner already ships vanilla Three; keeps FX isolated and lazy; fewer re-render pitfalls | R3F |
| 5 | Routing | `react-router` (data router) | Needed for `/quests/:slug`, `/codex`, wax-seal transitions | TanStack Router |
| 6 | i18n | `react-i18next` or lightweight custom JSON dictionaries | EN/ID with typed keys | Paraglide |
| 7 | Content | Typed TS + MDX for case studies, Zod-validated | No CMS needed; versioned in Git | Sanity/Contentful (overkill) |
| 8 | Images | Pre-generated art → **AVIF + WebP + JPG fallback**, responsive `srcset`, LQIP | Image-led site → image pipeline matters most | Cloudinary |
| 9 | Hosting | **Vercel** (already used by owner) + custom domain | Zero-config, previews per PR, edge CDN | Netlify / Cloudflare Pages |
| 10 | Contact | `mailto:` for v1; **Resend** (or Formspree) via Vercel function for v1.1 | Zero cost, spam-safe with honeypot + rate-limit | EmailJS |
| 11 | Analytics | **Plausible / Umami** (cookie-less) | No consent banner needed | GA4 |
| 12 | Quality | ESLint, Prettier, `tsc --noEmit`, Playwright (smoke + a11y via axe), Lighthouse CI | Keeps perf budget honest | — |
| 13 | Package mgr | `pnpm` | Fast, strict | npm (already used by owner) |

---

## 11. Content & data model

```ts
// src/content/schema.ts (Zod-backed)
type Locale = 'en' | 'id';

interface Profile {
  name: string; handle: string; role: LocalizedString; location: string;
  email: string;                     // public email only
  socials: { github: string; instagram: string; linkedin?: string };
  heroLine: LocalizedString; bio: LocalizedMarkdown; marginalia: LocalizedString[];
  availability?: LocalizedString;    // optional banner text
  cv: { pdfUrl: string; updated: string };
}

interface SkillGroup {
  id: 'frontend' | 'backend' | 'mobile' | 'aiml' | 'languages' | 'workflow';
  title: LocalizedString; items: string[]; forgedIn: string[]; // quest slugs
  tileSize: 'lg' | 'md' | 'sm'; image?: ImageRef;
}

interface Quest {
  slug: string; title: LocalizedString; tagline: LocalizedString;
  featured: boolean; order: number;
  year: number; role: LocalizedString; context?: LocalizedString; // e.g. "Motion Hack 5.0"
  stack: string[]; links: { live?: string; repo?: string; video?: string };
  cover: ImageRef; gallery: ImageRef[]; accent?: string;
  sections: { brief: MDX; role: MDX; challenges: MDX; outcome: MDX };
}

interface ChronicleEntry {
  id: string; kind: 'work' | 'edu'; org: string; role: LocalizedString;
  start: string; end?: string; bullets: LocalizedString[]; image?: ImageRef;
}

interface LedgerData { generatedAt: string; publicRepos: number;
  topLanguages: { name: string; repos: number }[];
  recent: { repo: string; pushedAt: string; url: string }[]; }
```

Rules: no field may be marked `required` unless sourced in §4; unknowns stay `TODO(owner)` and **block the build in CI on production branch** (a `check-todos` script) so placeholders can't ship.

---

## 12. Proposed repository structure

```
personal-brand/
├─ REQUIREMENTS.md            ← this file
├─ public/
│  ├─ cv/Abraham-Shalom-Nadeak-CV.pdf
│  ├─ fonts/                  (self-hosted WOFF2 subsets)
│  └─ og/                     (OG images per route)
├─ src/
│  ├─ app/                    (router, providers, layout, error boundary)
│  ├─ sections/               (Gate, Herald, Armory, Quests, Chronicle, Ledger, Raven, Colophon)
│  ├─ pages/                  (Home, QuestDetail, Codex, NotFound)
│  ├─ components/             (Button, Seal, Rail, Arch, Tile, Slice, Cursor, Nav, …)
│  ├─ motion/                 (lenis.ts, gsap.ts, hooks/, tiers.ts, transitions/)
│  ├─ fx/                     (embers.ts, sealBurn.glsl, canvas host — lazy chunk)
│  ├─ content/                (en/, id/, schema.ts, quests/*.mdx)
│  ├─ data/                   (ledger.generated.json, ledger.fallback.json)
│  ├─ styles/                 (tokens.css, base.css, utilities.css)
│  ├─ i18n/
│  └─ lib/                    (seo, analytics, storage-safe, a11y utils)
├─ scripts/                   (fetch-ledger.ts, check-todos.ts, optimize-images.ts)
├─ design-refs/               (generated section comps 01–08, prompts.md)
├─ tests/                     (playwright e2e + axe)
└─ vercel.json · vite.config.ts · tailwind.config · tsconfig.json
```

Component rule of thumb: **sections own layout & choreography; components are dumb and reusable; motion hooks never import content.**

---

## 13. Performance requirements & budgets

| Budget | Limit |
|---|---|
| Initial JS (route, gzip) | ≤ 170 KB (React + router + core motion) |
| Lazy FX chunk (Three.js etc.) | ≤ 220 KB gzip, loaded after LCP / idle |
| Hero image | ≤ 180 KB AVIF @1x (≤ 320 KB @2x), `fetchpriority="high"`, preloaded |
| Total page weight on first load | ≤ 1.2 MB (excl. lazy FX & below-fold images) |
| Fonts | ≤ 4 WOFF2 files, subset Latin, `size-adjust` fallback |
| 60 fps | Scroll + pinned scenes on mid-range laptop; Medium tier on phones ≥ 45 fps |

Tactics: below-fold images `loading="lazy"` + `decoding="async"`; `will-change` only during animation; transform/opacity only; single ScrollTrigger refresh batch; IntersectionObserver for count-ups; dispose WebGL resources on tier drop; code-split per route.

---

## 14. Accessibility (WCAG 2.2 AA)

- Semantic landmarks (`header/nav/main/section/footer`), one `h1` per page, ordered headings; "Chapter" labels are decorative (`aria-hidden`) and never replace headings.
- Skip-to-content link; visible 2 px gold focus ring on every interactive element.
- Accordion slices are real `button`s with `aria-expanded`; pinned sections must not trap scroll or keyboard.
- Reduced motion path fully designed (not "off"): static layouts, same content.
- Contrast verified for both themes; text over images always sits on an overlay meeting ≥ 4.5:1.
- Cursor effects never hide the native cursor for keyboard/AT users; touch devices get no custom cursor.
- Decorative art `alt=""`; meaningful art has concise alt; fantasy chapter names get an accessible plain-English label (e.g., "About").
- Language attributes (`lang`) switch with locale.

---

## 15. SEO & discoverability

- Prerendered HTML for every route; unique `<title>` / meta description / canonical.
- **JSON-LD** `Person` (name, jobTitle, alumniOf: Telkom University, sameAs: GitHub/Instagram, address: Bandung) + `CreativeWork` per quest.
- OG / Twitter images: generated from the hero art + name (1200×630) per route.
- `hreflang` for `en` / `id`; `sitemap.xml`; `robots.txt`.
- ATS-friendliness: `/codex` is plain semantic HTML (no canvas/JS needed) and the PDF is the existing ATS CV.
- Target query: *"Abraham Shalom Nadeak"*, *"Abraham Nadeak software engineer Bandung"*, *"LenstraMod"*.

---

## 16. Security & privacy

- **Do not publish the phone number or home district** (CV shows both). Show city-level location only. *(TODO(owner): confirm.)*
- Email is already public on GitHub; add a copy-button, optionally obfuscate in HTML to cut scraper spam.
- Contact function: input validation, honeypot, per-IP rate limit, no secrets in client bundle, API keys only in Vercel env.
- Security headers via `vercel.json`: CSP (self + font/analytics origins), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- Cookie-less analytics → no consent banner; privacy note in footer.
- All `localStorage` / `sessionStorage` access wrapped in try/catch; site must render with storage blocked.
- Third-party images/art: record origin & licence in `design-refs/LICENSES.md` (AI-generated art: note tool & date).

---

## 17. Design-reference image plan (next step after this doc)

Per the `imagegen-frontend-web` skill: **one horizontal image per section = 8 images**, generated sequentially, labelled "Section X of 8", sharing one palette/type/CTA family.

| # | Frame | Aspect | Prompt seed (condensed) |
|---|---|---|---|
| 1 | Gate — Hero | 21:9 | Giant statement hero, torch-lit medieval castle gate at dusk, warm low-chroma grade, ember sparks, H1 "Abraham Nadeak" bottom-left in light Cormorant-style serif with one blackletter word, gilded pill CTA + ghost CTA, thin nav top |
| 2 | Herald — About | 16:10 | Off-grid editorial on parchment texture, arch-framed portrait, giant gilded blackletter drop-cap "A", marginalia captions, vertical side-rail text |
| 3 | Armory — Skills | 16:10 | Gapless bento on ink with micro-noise; tiles with macro crops (armour, chainmail, forge) + stack names; top-left headline |
| 4 | Quests — Projects | 16:9 | Four tall image slices (one expanded) in hover-accordion layout; headline centred low; tech chips; "Open quest ↗" |
| 5 | Chronicle — Timeline | 16:10 | Oxblood/gold duotone scribe's desk, right-third caption column, vertical gold rhythm line with 4 nodes, underlined CV link |
| 6 | Ledger — GitHub | 21:9 | Mini section, stacked centre, oversized serif numerals on ink, ghost CTA |
| 7 | Raven — Contact | 16:9 | Graded dusk field + raven, oversized "Send a raven." with wax-seal gilded button, tiny hint text |
| 8 | Colophon — Footer | 21:9 | Oxblood/ink diptych, centred wordmark, link columns, crest back-to-top |

Global style lock for all prompts: *deep dark torchlit palette (#0D0A08 / #EADFC8 / #6E1F1F / #C9A24B, ember #E2792D sparingly), Cormorant-style display + Inter UI + Cinzel labels, sharp corners, 1 px gold keylines, film grain, no purple/blue glow, no stock cosplay, no fake metrics, horizontal framing, single section only.*

Output stored in `design-refs/01-gate.png … 08-colophon.png` plus `prompts.md`.

---

## 18. Milestones

| Phase | Deliverable | Est. |
|---|---|---|
| **M0 — Brief** | This document approved; open questions (§21) answered | 0.5 d |
| **M1 — Design refs** | 8 section images + style lock + final colour/type tokens | 1–2 d |
| **M2 — Foundation** | Vite/React/TS scaffold, tokens, fonts, layout shell, router, theme, i18n skeleton, CI | 1 d |
| **M3 — Static build** | All 8 sections + 4 quest pages, responsive, no motion | 3–4 d |
| **M4 — Motion** | Lenis/GSAP system, hero parallax, pinned Quests & Chronicle, reveals | 3 d |
| **M5 — FX** | Ember layer, gate loader, wax-seal transition, cursor, quality tiers | 2–3 d |
| **M6 — Polish** | A11y audit, reduced-motion pass, perf tuning, SEO/OG, bilingual copy | 2 d |
| **M7 — Launch** | Domain, analytics, Lighthouse CI green, redirect CV link → site | 0.5 d |

*Total ≈ 2–3 focused weeks part-time.* Estimates are planning guesses, not commitments.

---

## 19. Acceptance criteria (definition of done)

1. All **P0** requirements implemented; P1 either done or explicitly deferred in writing.
2. Lighthouse mobile ≥ 90 / 95 / 95 / 95 (Perf / A11y / BP / SEO) on Home and one Quest page.
3. Passes `axe` with 0 serious/critical issues; fully keyboard-operable; reduced-motion verified.
4. Works on latest Chrome, Safari (iOS 16+), Firefox, Edge; layouts verified at 360, 768, 1024, 1440, 1920 px.
5. No `TODO(owner)` strings in production build; no invented facts, metrics or testimonials.
6. Every section matches its reference image in layout, hierarchy and palette (reviewed side-by-side).
7. Works with JS disabled (content readable) and with WebGL disabled (static fallback).
8. Contact path tested end-to-end; phone number absent from HTML, JSON-LD and OG images.

---

## 20. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Over-themed "renaissance fair" look | Cheesy, unprofessional | §5.1 guardrails: modern grid + type; limit blackletter to 1 word/screen; photographic realism over clip-art |
| Heavy effects tank mobile perf | Bad LCP, bounce | Quality tiers, lazy FX, strict budgets, test on real mid-range Android |
| Scroll-jacking annoys recruiters | Lost conversions | Pinned sections limited to 2; always scannable; nav jump links; skip-intro |
| Sparse project detail (many repos lack descriptions) | Weak proof | Owner supplies screenshots/notes for the 4 featured quests before M3 |
| AI-generated art inconsistency / licence | Brand incoherence | Style lock + one seed set; log tool & licence; consider light retouch pass |
| Scope creep (blog, sound, easter eggs) | Never ships | P2 list is fenced; launch gate = P0 + chosen P1 |
| Bilingual content doubles copy work | Delay | Ship EN first; ID in M6 with the same typed schema |

---

## 21. Open questions for the owner

Please answer these before M1 (defaults in **bold** will be used if unanswered).

1. **Brand name:** "Abraham Nadeak", "Abraham Shalom Nadeak", or "Lenstra"? → **"Abraham Nadeak" + handle Lenstra in footer**
2. **Tagline:** pick one from §4.7 or write your own. → **"I build web, mobile and machine-sight."**
3. **Photo:** will you provide a portrait for the Herald arch frame? → **Illustrated crest fallback**
4. **Featured quests:** are the 4 in §4.6 right? Which should be swapped? Provide 1–3 screenshots/recordings + 3–4 sentences each for the 3 without descriptions.
5. **Availability line** ("Open to internships") — accurate and desired? → **Yes, "Open to internships & freelance"**
6. **Languages:** EN only at launch, or EN + ID? → **EN at launch, ID in M6**
7. **Contact:** `mailto:` only, or also an on-site form? → **mailto + copy button**
8. **LinkedIn / other profiles** to include? → **None**
9. **Domain:** do you own one (e.g., `abrahamnadeak.dev`)? → **Use Vercel subdomain until chosen**
10. **Phone / district:** confirm both stay off the site. → **Off**
11. **Sound:** include opt-in ambient audio (P2)? → **Defer**
12. **Framework:** OK with Vite + React + prerender over Next.js? → **Yes**
13. **Image source:** generate art with the image-gen workflow (this doc's §17) or do you have your own photography/illustrations? → **Generate**
14. **Light theme:** keep the Parchment variant at launch (P1) or dark-only? → **Keep**

---

## 22. Appendix

### A. Copy tone guide
Confident, concrete, a little wry; medieval vocabulary only in *labels and chapter names*, plain English in body copy. Short sentences. Verbs over adjectives. Never: unleash, elevate, revolutionize, next-gen, seamless, transformative, "passionate about".

### B. Chapter naming map (for nav & accessibility)
| Nav label (visible) | Real meaning (aria-label) | Anchor |
|---|---|---|
| The Gate | Home | `#gate` |
| Herald | About | `#herald` |
| Armory | Skills | `#armory` |
| Quests | Projects | `#quests` |
| Chronicle | Experience & education | `#chronicle` |
| Ledger | GitHub activity | `#ledger` |
| Raven | Contact | `#raven` |

Nav shows **both** on hover/focus (e.g., "Quests — Projects") so first-time visitors never have to decode the theme.

### C. Reference material
- GitHub: https://github.com/LenstraMod
- Flagship demo: https://warung-senja-3-d-landing-page.vercel.app
- CV (Drive): `Abraham Shalom Nadeak_CV ATS.pdf`
- Design skill: `.claude/skills/imagegen-frontend-web`
