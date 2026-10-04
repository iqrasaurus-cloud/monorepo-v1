# BUILD_SPEC — IqraSaurus Hub & Spoke Monorepo

Bismillah. Read `CLAUDE.md` first; its rules override anything here. Work through the phases in order. Each phase ends with acceptance checks. **Where you see STOP, stop and report to the owner.**

---

## 1. Locked decisions

| Topic | Decision |
|---|---|
| Sites | 1 hub + 6 programmes (spokes) = 7 Vercel projects from this one repo. Registry: `packages/config/src/spokes.ts` (originally supplied by the owner; now edited per owner decisions). StoryBus and EduDrama are one programme, **StoryBuzz**; Tiny Tafseer was dropped (2026-10-04) |
| Tools | Separate apps at `iqrasaurus.com/tadabbur`, `/hafiz`, `/worksheets`, `/calendar`, `/museum`, `/dino`. Not built here; listed in the registry's `tools` array and linked from the header. Only Tadabbur is marked live |
| Brand direction | Tools-first hub, one header bar, five-section programme pages. Agreed by the owner 2026-10-04; full write-up in `tadabbur-for-kids-v1/docs/BRAND-SITE-REVIEW.md`. Delivered as Phases 4–6 below |
| First build | Shared packages + **Quran Investigators** spoke only. Hub and the other 6 spokes come later |
| App type | Each site is a single-page app like the KERN reference, but **pre-rendered to static HTML** at build time so it is fast and indexable |
| Spoke routes | `/` (one long page with anchored sections), `/journal` (iframe), `/chat` (iframe), plus a 404 |
| Hub routes | `/`, `/about`, `/work-with-us`, 404 (Phase 6; the earlier `/our-story`, `/our-people`, `/our-foundation`, `/this-week`, `/collaborate` pages were folded into About and Work with us, and This Week becomes the Calendar tool) |
| Framework | 4-I only: Inspire → Investigate → Integrate → Impart |
| Layout model | One header bar: logo · Tools ▾ · Programmes ▾ · About · Work with us · Donate (Phase 4, replacing the original three-band header) |
| Look | Patterns modelled on reggioalliance.org, recoloured to the IqraSaurus logo palette. **Copy patterns, never their artwork, photos or text** |
| Motion | Carried over from the KERN reference (section 5) |
| Hosting | Vercel, Root Directory per app, static output, security headers from generated `vercel.json` |
| WordPress | The old iqrasaurus.com is empty. No redirect map needed |

Why thin per-spoke apps instead of one app with a switch: each spoke shows up as its own folder (easy for the owner to see), Vercel's "skip unaffected projects" works per spoke, and a spoke can later gain an extra page without touching the others.

---

## 2. Phase 0 — Orient and preserve the reference

The repo you are in is probably a clone of the KERN design-studio template (Vite + React 19 + Tailwind 3 + framer-motion + Lenis, code in `src/sections` and `src/pages`).

1. Inspect the repo. If KERN code is present, move **everything except `.git`** into `_reference/kern/`. It is read-only reference from now on: excluded from workspaces, builds, lint and typecheck.
2. If the repo is empty, skip the move. Section 5 of this spec contains every motion value you need.
3. Delete nothing else. Do not carry over: the ~50 unused shadcn `components/ui` files, the Radix/recharts/zod/etc. dependencies, `App.css`, `.bolt/`, or `base: './'` from the Vite config.

Acceptance: `_reference/kern/` exists (or repo confirmed empty); root is otherwise clean. Commit `phase 0`.

---

## 3. Phase 1 — Monorepo scaffold and design foundation

### 3.1 Workspace

```
package.json                  private, "packageManager": "pnpm@<current>", engines node >= 22
pnpm-workspace.yaml           apps/*, packages/*
tsconfig.base.json            strict, moduleResolution bundler, jsx react-jsx
.gitignore  .nvmrc  eslint.config.js  prettier config
apps/
packages/config/
packages/ui/
scripts/
```

Packages are **source-only** (`"main": "./src/index.ts"`, no build step). Apps consume them through Vite. In every app's Vite config set `ssr.noExternal: ['@iqra/ui', '@iqra/config']` so pre-rendering compiles them.

Root scripts: `dev`, `build`, `typecheck`, `lint`, `new:spoke`, `gen:vercel`, `assets` (see CLAUDE.md). `dev`/`build` accept `--filter <slug>` via pnpm.

Allowed dependencies: `react`, `react-dom`, `react-router`, `@react-router/dev`, `@react-router/node` (build-time only, needed for prerender), `vite`, `typescript`, `tailwindcss@3.4`, `postcss`, `autoprefixer`, `framer-motion`, `lenis`, `clsx`, `tailwind-merge`, `@fontsource-variable/fredoka`, `@fontsource-variable/nunito-sans`, `@fontsource/noto-naskh-arabic`, `sharp` (scripts only), `papaparse` (hub build script only), eslint + typescript-eslint. Nothing else without asking.

### 3.2 `packages/config`

- `src/spokes.ts` — copy the owner's file verbatim.
- `src/tokens.css` — CSS variables (below).
- `tailwind-preset.cjs` — maps tokens to Tailwind names; every app's Tailwind config uses this preset and includes `../../packages/ui/src/**/*.{ts,tsx}` in `content`.
- `src/headers.ts` — builds the security headers for a site (section 8).

**Colour tokens** (exact values sampled from the logo):

| Token | Value | Use |
|---|---|---|
| `--ink` | `#354F52` | body text, dark surfaces |
| `--primary` | `#5C3D8F` | headings, links, focus rings |
| `--plum` | `#441C4B` | utility strip, footer, deep accents |
| `--magenta` | `#CE4EDA` | highlights and decorative fills only |
| `--sun` | `#FFE45D` | buttons, ribbons, badges (always with `--plum` text) |
| `--taupe` | `#B0A38E` | rules, captions on dark, quiet borders |
| `--paper` | `#F6F4EE` | page background |
| `--paper-2` | `#ECE8DD` | alternate section background |
| `--white` | `#FFFFFF` | cards, identity header |
| `--accent` | defaults to `--primary`; a site may override via `SiteConfig.accent` |

Contrast rule: `--sun` and `--magenta` are **never** used as text on light backgrounds. Text is `--ink`, `--primary` or `--plum` on light; `--white` or `--sun` on `--plum`/`--ink`.

**Type**: headings `Fredoka Variable` (600–700), body `Nunito Sans Variable` (400/600), Arabic `Noto Naskh Arabic` applied to any element with `lang="ar"` (always also `dir="rtl"`, generous line-height, never letter-spaced, never uppercase-transformed). Small labels: Nunito Sans 600, 12px, uppercase, tracking 0.18em (this replaces KERN's mono bracket labels; keep the `( Label )` bracket styling as the section eyebrow).

**Shape**: radius 16px cards / 999px pills; no hard corners. Shadows soft and low. Max content width 1200px; section padding `py-20 md:py-32`.

### 3.3 `packages/ui` foundation

```
src/motion/         presets.ts (easings, durations), Reveal, LetterRise, WordReveal, Parallax,
                    SplitScroll, SmoothScroll (Lenis provider), useReducedMotionSafe
src/layout/         SiteShell, SiteHeader, MenuTile, HeaderParts (logo, Donate), MobileDrawer,
                    Footer, SkipLink   (Phase 4; the Phase 2 three-band components were removed)
src/sections/       spoke sections (Phase 3) and hub sections (Phase 6)
src/embed/          SafeEmbed, EmbedPage
src/primitives/     Button, Ribbon, CircleCard, SectionHeading, Eyebrow, Picture, Scallop, Container
src/styles/         base.css (imports tokens, fonts, tailwind layers)
```

Acceptance: `pnpm install`, `pnpm typecheck`, `pnpm lint` pass. A throwaway story/dev page is NOT needed. Commit `phase 1`.

---

## 4. Phase 2 — The shell (header, menus, footer)

> **Superseded for the header and footer by Phase 4 (section 6A), 2026-10-04.** The three-band design below was built and shipped, then replaced by one header bar on the owner's instruction. Kept as a record; build against 6A.

This is the signature of the whole system. Build it in `packages/ui/src/layout`, driven entirely by `spokes.ts`.

### 4.1 Desktop (≥ 1024px), top to bottom

**Band 1 — Utility strip** (`bg-plum`, white text, ~36px tall, small caps label style)
- Left: `hubMenu` links — Our Story · Our People · Our Foundation · This Week · Collaborate. Always absolute URLs to the hub (`siteUrl(hub(), path)`), on every site including the hub itself (there they are normal router links).
- Right: nothing for now (reserved for search/language later).

**Band 2 — Identity header** (`bg-white`, ~110px tall, generous padding)
- **LEFT = this site's identity.** Spoke: mascot image (72px) + spoke name (Fredoka 700, `text-ink`, with the last word in `text-accent`) + one-line description beneath (`text-ink/70`). Whole block links to the site's `/`.
  Hub: the horizontal IqraSaurus logo instead of mascot + name.
- **RIGHT = the parent brand.** Spoke: horizontal IqraSaurus logo (height ~64px), links to the hub, `aria-label="IqraSaurus home"`. Hub: the motto "People first. Learning always." set in two lines, right-aligned, second line in `text-accent`, with the small square dino mark above it.
- The two sides must be unmistakably separate: left block hard left, right block hard right, nothing between.

**Band 3 — Site menu** (`bg-white`, centred, border-top `taupe/30`, becomes sticky with a soft shadow after scrolling past Band 2)
- Items from `siteMenu`: Home · About · Impact · 4-I Method · Journal · Chat · Support Us · Toolkit ▾
- Anchor items smooth-scroll (through Lenis) on `/`; from `/journal` or `/chat` they navigate to `/` first, then scroll. Active section is highlighted via IntersectionObserver. Route items use the router. Underline sweep on hover (section 5).
- **Toolkit megamenu**: full-width panel under Band 3. Left column: eyebrow "( Toolkit )" + one sentence "Things we've tried, learned and shared." Right: list of all sites from `toolkit()` — 7 spokes then "IqraSaurus Home". Each row: index number, name, description. `live` sites link to `siteUrl(site)`; `coming-soon` sites are muted, not links, with a "Coming soon" pill. The current site is marked "You are here". On hover (fine pointers only) a mascot preview follows the cursor using the HoverPreview motion. Opens on click and on focus; closes on Escape, outside click and route change; full keyboard support; `aria-expanded`.

### 4.2 Mobile (< 1024px)

- Band 2 stays: site identity left (mascot 44px + name; description hidden below 480px), IqraSaurus **square dino mark** right (44px).
- Bands 1 and 3 collapse into one bar (`bg-paper-2`): hamburger button on the left, nothing else.
- Hamburger opens a **drawer from the left** (85% width, max 380px, `bg-paper`), wiping in with the clip/translate motion from section 5. Order inside: site menu items first (Toolkit expands in place as an accordion listing all sites), a divider, then the hub menu items. Close button top-right of the drawer. Focus is trapped; body scroll is locked; Escape closes.

### 4.3 Footer (`bg-plum`, white/sun text)

Four blocks: (1) square logo + tagline + motto; (2) hub menu links; (3) Toolkit list (same live/coming-soon logic); (4) Trust: the fixed credential sentence plus "Verify on MUIS" links, rendered only when `brand.verifyLinks` values are non-empty. Beneath: the fixed disclaimer paragraph (spokes only), copyright line with the current year. A scalloped divider (`Scallop` primitive, SVG) sits on top of the footer.

Acceptance: shell renders for both a spoke config and the hub config; keyboard-only navigation works through every menu; no layout shift when Band 3 becomes sticky; at 360px wide nothing overflows. Commit `phase 2`.

---

## 5. Motion reference (from KERN — reuse these exact values)

Put the numbers in `packages/ui/src/motion/presets.ts`; components import presets, never raw arrays.

| Preset | Value |
|---|---|
| `easeReveal` | `[0.22, 1, 0.36, 1]` |
| `easeWipe` | `[0.76, 0, 0.24, 1]` |
| Lenis | `lerp: 0.09`, RAF loop, anchor clicks routed through `lenis.scrollTo`, reset to top on route change |
| Header entrance | `y: -60 → 0`, opacity 0 → 1, delay 0.2s, 0.8s, `easeReveal` |
| **LetterRise** (hero headline) | each letter in an `overflow-hidden` line: `y: 110% → 0`, `rotate: 4 → 0`, 1s, `easeReveal`, stagger `0.2 + i × 0.06`s. Cap total stagger at 1.2s for long headlines (animate per word instead of per letter beyond 18 characters) |
| Hero scroll-out | scroll-linked: `y: 0 → 30%`, opacity `1 → 0` over first 80% |
| Hero supporting text | fade/rise 20px, delay 0.9–1.3s |
| **WordReveal** ("What is it?") | scroll-linked per word, opacity `0.12 → 1`, offset `['start 0.85', 'end 0.45']` |
| **Reveal** (default in-view) | `opacity 0, y 40 → 1, 0`, 0.6–0.9s, `easeReveal`, `viewport: { once: true, margin: '-60px' }`, list stagger 0.06s |
| **Parallax** image break | image `y: -18% → 18%`, scale `1.15 → 1.05 → 1.15`, image 136% tall |
| **SplitScroll** ("What we did") | section `h-[280vh]`, sticky `h-screen`; left column `y: 2% → -34%`, right `-34% → 2%`, centre title scale `0.92 → 1 → 0.92`. Needs ≥ 6 photos; with fewer, fall back to a simple Reveal grid. On mobile always use the grid |
| Header menu panel (Phase 4) | opacity 0 → 1, `y: -8 → 0`, 0.35s, `easeReveal`. Tiles lift 4px and the mascot tilts slightly on hover (CSS, `motion-safe:` only) |
| Link sweep | 1px underline, `scaleX 0 → 1`, origin right → left, 0.5s, `cubic-bezier(0.76, 0, 0.24, 1)` |
| Drawer / wipes | clip-path or translate, 0.6s, `easeWipe`; inner items rise `y: 110% → 0` stagger `0.15 + i × 0.06`s |
| Marquee | 28s linear infinite (optional, hub only) |

**Dropped from KERN on purpose:** custom cursor and `cursor: none`, film-grain overlay, `mix-blend-difference` header, the live clock, the dark theme.

**Reduced motion:** when `prefers-reduced-motion: reduce`, disable Lenis, Parallax, SplitScroll (use grid), LetterRise, WordReveal and hover lifts; everything becomes a 0.2s opacity fade.

**Pre-render safety:** animated elements start hidden in the static HTML. Add a `<noscript>` style that forces `opacity: 1; transform: none` on `[data-reveal]` so content is visible without JavaScript.

---

## 6. Phase 3 — Spoke template + Quran Investigators

### 6.1 App skeleton: `apps/quraninvestigators/`

```
app/root.tsx                 html shell, <SiteShell site={getSite('quraninvestigators')}>, meta, fonts
app/routes.ts                index → routes/home.tsx, 'journal', 'chat', '*' → routes/not-found.tsx
app/routes/home.tsx          <SpokeHome site={…} content={content} />          (≈10 lines)
app/routes/journal.tsx       <EmbedPage site={…} kind="journal" />
app/routes/chat.tsx          <EmbedPage site={…} kind="chat" />
app/routes/not-found.tsx     <NotFound />
content.ts                   export const content: SpokeContent = { … }
assets-src/                  owner's original images (mascots, photos)
public/brand/                optimised logos + mascot, favicon, og image
public/photos/               optimised photos
public/embeds/               owner's own HTML + CSV drop-ins (optional)
react-router.config.ts       { ssr: false, prerender: ['/', '/journal', '/chat', '/404'] }
vite.config.ts  tailwind.config.cjs  postcss.config.cjs  tsconfig.json  package.json
vercel.json                  GENERATED by `pnpm gen:vercel` — do not hand-edit
```

Fill `content.ts` with clearly marked `[[CONTENT NEEDED: …]]` placeholders for every field. The owner will supply real text; when they paste it, put it in verbatim.

### 6.2 The one-page spoke: sections in this exact order

> **Replaced by the five-section page in Phase 5 (section 6B).** The table below is the original 13-section design, kept as a record.

| # | Section | Anchor | Pattern |
|---|---|---|---|
| 0 | Hero | `#top` | `paper` background with a faint repeating geometric pattern (SVG, 4% opacity). Eyebrow in brackets. Headline in LetterRise, two colours (first line `text-ink`, second `text-accent`), uppercase Fredoka, in the manner of the NAREA hero. Intro paragraph. Mascot large on the right (playful tone: gentle 6s float). Four small 4-I chips. Round "scroll" button in `sun` |
| 1 | What is it? | `#about` | WordReveal paragraph, large Fredoka 600 |
| 2 | Why we created it | — | Two-column: text + optional photo in a circle frame with `sun` ring |
| 3 | The 4-I journey | `#methodology` | Four CircleCards in a row (stack on mobile), each a `sun` ring circle with step number, a Ribbon label (Inspire / Investigate / Integrate / Impart) and the spoke-specific text from `content.journey`. A thin connecting line draws in on scroll |
| 4 | What we did | — | SplitScroll gallery with "What we did" as the centred title; body text follows underneath. Optional video as a click-to-load poster (no third-party embed until clicked; goes through SafeEmbed) |
| 5 | What we observed | `#impact` | List of observation cards (quote-style, optional attribution), Reveal stagger, `paper-2` background |
| 6 | What we learned | — | Three columns: What worked · What didn't · What we changed |
| 7 | Try it yourself | `#try` | Numbered steps + optional download button |
| 8 | Adapt it | — | Short text block, Parallax image break above it if a hero image exists |
| 9 | Work with us | — | Text + contact button |
| 10 | Support Us | `#support` | `plum` panel, description from `content.supportUs`, button from `SiteConfig.support` (hidden when `href` is empty) |
| — | Footer | — | includes the fixed disclaimer |

Between sections alternate `paper` / `white` / `paper-2` backgrounds with Scallop dividers where the colour changes. A section whose content is entirely empty does not render (and its menu anchor falls back to the next section).

### 6.3 Journal and Chat pages

`EmbedPage`: compact page heading (eyebrow + title), then `SafeEmbed` filling the rest of the viewport (`min-height: calc(100svh - header)`), with the site footer below. The Chat page shows `brand.chatNotice` above the frame in a quiet info strip.

`SafeEmbed` behaviour:
- `src` empty → friendly "Coming soon" state with the mascot. Never an empty frame.
- `src` starts with `https://` → must match an origin from `frameOrigins(site)`, otherwise render an error state (and fail the build in `gen:vercel`). Attributes: `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"`, `loading="lazy"`, `referrerpolicy="strict-origin-when-cross-origin"`, `title` from config, `allow=""`. Show a skeleton until `onLoad`; after 10s without load show an "Open in a new tab" link.
- `src` starts with `/embeds/` → same-origin file the owner dropped into `public/embeds/` (their own HTML that reads their own CSV). Same attributes. Anything else is rejected.
- Include a working sample at `public/embeds/journal-sample/` — `index.html` + `posts.csv` (columns: `date,title,category,excerpt,url,image`) + a tiny vanilla script that renders the CSV as cards using the brand tokens. No libraries, no external requests. This is the owner's template for their own drop-ins.

### 6.4 Assets

`pnpm assets` (sharp): for each file in `apps/*/assets-src/`, write WebP + PNG/JPG fallback at sensible widths (mascots 160/320/640; logos 320/640; photos 640/1280/1920) into `public/`, and print width/height so `Picture` can set them. The owner's master files (see manifest, section 10) go in `assets-src/brand/`. Generate favicon set + `og.png` (1200×630, mascot + site name on `paper`) per site.

Acceptance: `pnpm dev --filter quraninvestigators` shows the full page with placeholders; all three routes work; `pnpm build --filter quraninvestigators` prints `Prerender: Generated …` lines for all four paths. Commit `phase 3`.

**STOP 1 — show the owner the running spoke locally (or a Vercel preview) before hardening.**

---

## 6A. Phase 4 — The single header bar (replaces the three bands)

Owner decision 2026-10-04. Applies to every site through `packages/ui/src/layout`.

**Desktop (≥ 1024px)**, one sticky white bar with a soft shadow once the page scrolls:
```
[IqraSaurus logo]    Tools ▾   Programmes ▾   About   Work with us    [♥ Donate]
```
- **Tools ▾ / Programmes ▾** open a full-width panel of tiles (3 per row) under the bar. A tile shows the mascot in a white circle with a `sun` ring, the name, one line, and either nothing (live, links out), "You are here" (current programme) or a muted, non-clickable "Coming soon" pill. One panel at a time; click opens, and Escape (focus returns to the trigger), an outside click, focus leaving the header or any navigation closes it.
- Data comes from the registry: `tools`, `programmes()` and `mainMenu` in `spokes.ts`. A `[[CONTENT NEEDED]]` line is hidden, not shown.
- **Donate** is the single bright call to action (`sun` pill with plum text). `brand.donate.href` is a placeholder for now.
- The programme's name is **not** in the header; it belongs in the programme's hero (Phase 5).

**Until the hub is live** (`hub.status !== 'live'`): About jumps to the footer block `#about-iqrasaurus`, Work with us to `#work-with-us`, Donate (while its href is empty) to `#work-with-us`, and the logo to this site's home. Setting the hub to `live` switches all of them to iqrasaurus.com pages at once. The Tadabbur tile already links to iqrasaurus.com/tadabbur, which will work once that path is routed.

**Mobile (< 1024px):** the same bar with logo, a small Donate pill and a menu button. The drawer slides in from the right (88% wide, max 400px, `bg-paper`): Tools and Programmes as accordions of compact tiles, then About and Work with us, then a full-width Donate. Focus is trapped, Escape closes, body scroll is locked, the drawer carries `data-lenis-prevent` so it scrolls on its own, and in-page jumps wait one frame after the drawer closes.

**Footer** (`bg-plum`): logo, tagline and motto · Programmes · Tools · **About IqraSaurus** (`#about-iqrasaurus`: credential line, MUIS verify links when present, link to the About page) · **Work with us** (`#work-with-us`: WhatsApp and email from `brand.contact`). Beneath: the disclaimer (spokes), copyright, and on spokes the Journal and "Ask our guide" links, since those left the header.

Acceptance: typecheck, lint, build; keyboard-only through the bar, both panels and the drawer; no layout shift; nothing overflows at 360px. Commit `phase 4: single header bar`.

**STOP A — owner checks the header on a laptop and a phone.**

---

## 6B. Phase 5 — The five-section programme page (replaces 6.2)

At most five sections, replacing the thirteen in 6.2. Copy is the draft in BRAND-SITE-REVIEW.md §3, with owner-only facts left as `[[CONTENT NEEDED]]` (hidden on the built site).

| # | Section | What goes in |
|---|---|---|
| 1 | Hero | Programme name, one plain line, real photo. "Use this at home" with the matching tool tiles (Tadabbur and Museum for Quran Investigators). A button to the session guide below and a small "Ask our guide" button (the Chat page) |
| 2 | What it is | 2–3 sentences, the booklet sources line, and the booklet photos |
| 3 | How a session runs | Four steps labelled Inspire, Investigate, Integrate, Impart (a different dino each), one tip for younger and one for older children |
| 4 | What we've seen | Real quotes, photos and lessons, plus the Journal link. **Hidden until real content exists** |
| 5 | Bring it to your class | WhatsApp and email, one line on donations, the credential line |

- Journal and Chat stay as routes (`/journal`, `/chat`); they are no longer menu items. The journal embed URL stays editable so the owner can preview a new one.
- The press clipping moves to the hub's About page (Phase 6).
- Remove the section components that no longer have a place. Update `SpokeContent`, the Quran Investigators `content.ts`, `scripts/new-spoke.mjs` and `docs/spoke-content-template.txt` to the new shape.
- The brand belief quote ("Don't just give them answers…") leaves the programme page; it appears once, on the hub.

Commit `phase 5: five-section programme page`. **STOP B.**

---

## 6C. Phase 6 — The hub, tools-first (replaces section 11)

Home: hero ("Something meaningful to do with your child today") with the six tool tiles → today's ayah card from Tadabbur and, once it exists, this week from the Calendar → six programme cards → "Who we are": two sentences, the credential line, a link to About, and the brand belief quote (its only appearance) → footer.

Pages: **About** (our story, our people, our foundation, the credential line, MUIS verify links, the press clipping), **Work with us**, and a Donate target.

**Today's ayah is a link-only card** (decided 2026-10-04): a sun-coloured card with the reading dino, "Today's ayah", one line, and an "Open Tadabbur" button. No ayah text is written into the site (rule 1) and nothing is fetched at runtime (`connect-src 'self'`, rule 12). "This week" is left out until the Calendar tool is live.

Built as: `apps/hub` (routes `/`, `/about`, `/work-with-us`, 404, with its own `entry.server.tsx` like the programme apps), content in `apps/hub/content.ts` typed by `HubContent`, sections in `packages/ui/src/sections/hub`. The About page renders story, people and foundation only once they hold real text; "How we teach: the 4-I method", "Who guides us" (credential line, MUIS links when present) and "In the news" (the press clipping) always show. The hub stays `coming-soon` in the registry until the owner deploys it, so programme sites keep pointing About and Work with us at their footer blocks until then.

Going live is owner-run: flip the hub to `live`, `pnpm gen:vercel`, Vercel project with Root Directory `apps/hub`, domains `iqrasaurus.com` + `www`, and route `/tadabbur` and the other tool paths to their own deployments.

Commit `phase 6: hub home`. **STOP C.**

---

## 7. Phase 7 — Hardening

1. **Pre-render check:** view-source of `build/client/index.html` contains the real section text.
2. **404:** post-build script copies `build/client/404/index.html` to `build/client/404.html` (Vercel serves it automatically).
3. **`pnpm gen:vercel`** writes `apps/<slug>/vercel.json` for every app: `"framework": null`, `"buildCommand": "pnpm run build"`, `"outputDirectory": "build/client"`, `"cleanUrls": true`, `"trailingSlash": false`, headers from section 8, and long-cache headers for `/assets/*`.
4. **SEO:** per-route `meta` (title, description, canonical using the production host, Open Graph, Twitter card), `robots.txt`, `sitemap.xml` generated at build, JSON-LD `Organization` on the hub and `WebSite` on spokes. `coming-soon` sites get `noindex`.
5. **Accessibility:** skip link, landmarks, one `h1` per page, visible focus rings in `primary`, colour contrast AA, menus operable by keyboard, `lang="en"` on html and `lang="ar" dir="rtl"` on Arabic.
6. **Performance:** hero mascot/photo preloaded and not lazy; fonts `font-display: swap` with only the needed weights/subsets; no layout shift; check the budget in CLAUDE.md with Lighthouse against `pnpm preview`.

Acceptance: budgets met; `curl -I` on the preview shows every header from section 8. Commit `phase 7: hardening`.

---

## 8. Security headers (generated into every `vercel.json`)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';      ← React Router injects an inline hydration script into pre-rendered HTML
  style-src 'self' 'unsafe-inline';       ← framer-motion sets inline styles
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  frame-src 'self' <origins from frameOrigins(site)>;
  frame-ancestors 'none';
  object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

Exception: files under `/embeds/*` are framed by the site itself, so for that path only send `frame-ancestors 'self'`. Write the two header rules with mutually exclusive `source` patterns (e.g. a negative lookahead for `embeds`) so two CSP headers never apply to one response, and verify with `curl -I`.
Stretch goal (do not block on it): replace `'unsafe-inline'` in `script-src` with build-time SHA-256 hashes of the inline scripts.
If the owner's chatbot needs the microphone later, that is a deliberate per-site change to `Permissions-Policy` and the iframe `allow` attribute; ask first.

---

## 9. Phase 8 — First deployment (owner does the clicks)

> Quran Investigators was deployed early (quraninvestigators.vercel.app) while Phase 3 was being reviewed. Steps 1–2 are done for it; this checklist still applies to every later site.

**STOP 2.** Give the owner this checklist and wait for their confirmation that the live site looks right:

1. Push the repo to GitHub.
2. Vercel → Add New Project → import the repo → **Root Directory: `apps/quraninvestigators`** → leave everything else as detected (settings come from `vercel.json`) → Deploy.
3. Project → Settings → Domains → add `quraninvestigators.iqrasaurus.com`; at the DNS provider add the CNAME record Vercel displays.
4. Project → Settings → Git (or Build & Deployment) → enable skipping deployments when there are no changes to the Root Directory or its dependencies.
5. Open the site on a phone and a laptop: check the header bar, the Tools and Programmes panels, the mobile drawer, Journal and Chat pages, and a hard refresh on `/journal`.

Note for the owner: Vercel's free Hobby plan allows up to 25 projects per repository (8 are needed) but is for non-commercial use; check whether donations/"Support Us" means the Pro plan is required.

---

## 10. Asset manifest (owner supplies master files with these exact names)

Place in `apps/<slug>/assets-src/brand/` (the scaffold script copies the shared ones from `packages/config/brand-src/`):

| File | What it is | Used |
|---|---|---|
| `logo-horizontal.png` | dino + wordmark + tagline, wide, transparent | Band 2 right (spokes), Band 2 left (hub) |
| `logo-square.png` | stacked version, transparent | footer |
| `icon-512.png` | dino only, square | favicon set, mobile header mark |
| `mascot-quran.png` | dino reading (placeholder for 3 spokes + hub) | identity header, hero, megamenu |
| `mascot-magnifier.png` | Quran Investigators | 〃 |
| `mascot-binoculars.png` | Umrah for Kids | 〃 |
| `mascot-reader.png` | Madrasah Preparation | 〃 |
| `mascot-walking.png` | StoryBuzz | 〃 |

The owner will replace the two logo files when the tagline is updated; because logos are only ever referenced by filename, nothing in code changes. Photos go in `assets-src/photos/` with descriptive lowercase-dash names; every photo needs alt text in `content.ts`.

---

## 11. Original hub plan (superseded by Phase 6, section 6C)

> Kept for reference until Phase 6 is built. Parts may still be reused (for example the `/this-week` CSV, which may feed the Calendar tool). The hub menu here (Our Story · Our People · Our Foundation · This Week · Collaborate) is replaced by the four-item header.

Same shell. Home page sections: Hero (LetterRise "BLENDING FAITH / WITH FUN IN LEARNING", positioning sentence, supporting sentence) → Trust strip (credential sentence + verify links) → `#about` short story teaser linking to Our Story → **Toolkit grid**: seven CircleCards with mascot, Ribbon label and description, in the manner of the NAREA circle-and-ribbon row (live ones link out; coming-soon ones muted) → `#methodology` 4-I overview from `fourI` → `#impact` placeholder block → `#support`.

Pages `/our-story`, `/our-people`, `/our-foundation`, `/collaborate`: simple long-form templates with placeholders. Our People = card grid (photo circle, name, "what they bring", "what they care about"). Collaborate = three tiers: Use · Attribute · Collaborate.

`/this-week`: a build script parses `apps/hub/content/this-week.csv` with papaparse into JSON at build time. Columns: `week_start` (ISO date, Monday), `hijri`, `theme`, `whats_happening`, `try_this`, `ask_this`, `explore_this`, `practise_this`, `learn_this`, `make_this`, `weekend_activity`, `published` (TRUE/FALSE). On the client, show the latest published row whose `week_start` ≤ today (Singapore time), with previous/next links. Empty cells hide their block. Ship a sample CSV with two placeholder rows. All text comes from the CSV verbatim.

Flip the hub to `live` in the registry, run `pnpm gen:vercel`, then the owner deploys with Root Directory `apps/hub` and domains `iqrasaurus.com` + `www` (redirect www → apex).

**STOP 3** after the hub is deployed.

---

## 12. Phase 9 — Remaining programmes

1. Write `scripts/new-spoke.mjs`: given a slug that exists in the registry, copy the Quran Investigators app skeleton, swap the slug, reset `content.ts` to placeholders, copy shared brand masters, run `gen:vercel`.
2. Do **not** scaffold all five at once. Scaffold a programme when the owner supplies its content, set it to `live`, and hand over the deployment checklist from Phase 8 with the new Root Directory and domain.
3. After each new spoke goes live, all sites need a rebuild so their megamenus show it as live (a change in `packages/config` triggers this automatically on Vercel).

Finally, once all sites are live and the owner agrees, delete `_reference/kern/`.

---

## 13. If something does not work

- **React Router framework-mode pre-rendering fails with a library** (usually something touching `window` at import): fix the offending component with a client-only guard first. Only if that fails, fall back for that app to a plain Vite SPA plus a `vercel.json` rewrite of all paths to `/index.html`, tell the owner, and note the SEO trade-off.
- **A workspace package fails to compile during pre-render:** confirm `ssr.noExternal` includes it.
- **Tailwind classes from `packages/ui` missing in an app:** the app's Tailwind `content` globs must include the ui package path.
- **Anything about religious content is unclear:** leave a `[[CONTENT NEEDED]]` placeholder and ask. Never guess.
