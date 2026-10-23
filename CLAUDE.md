# IqraSaurus — Hub & Spoke Monorepo

Bismillah. This file holds the permanent rules for this repo. The phased build plan lives in `BUILD_SPEC.md`. Read that file before starting any phase, and work one phase at a time.

## What this is

A pnpm-workspace monorepo that produces **7 small static websites** from one shared codebase:

- **1 hub** — `iqrasaurus.com`, tools-first
- **6 programmes** (spokes) — one subdomain each, e.g. `quraninvestigators.iqrasaurus.com`

**Tools** are separate apps on their own subdomains (`tadabbur.iqrasaurus.com`, owner decision 2026-10-11); the hub keeps short links that forward to them (`iqrasaurus.com/tadabbur`, `/hafiz`, `/numbers`, `/calendar`, `/museum`, `/duas` (Worksheets became Numbers & Counting and Dino became Duas on 2026-10-11)). They are not built in this repo; this repo only links to them.

Every site is a pre-rendered React single-page app deployed as its own Vercel project (Root Directory = `apps/<slug>`). The single source of truth for which sites and tools exist is `packages/config/src/spokes.ts`.

The direction of the brand site (tools-first hub, four-item menu, five-section programme page) was agreed by the owner on 2026-10-04 and is written up in `tadabbur-for-kids-v1/docs/BRAND-SITE-REVIEW.md`.

IqraSaurus is a family-led Dakwah initiative from Singapore that helps children discover, understand and live Islam. The site is a *living record of practice*, not an EdTech sales site. The owner is not a developer: explain what you did in plain language, and never leave the repo in a half-working state.

## Stack (do not change without asking)

- Vite + React 19 + TypeScript (strict), Tailwind CSS **3.4**
- React Router **7 in framework mode**, `ssr: false` + `prerender` (static HTML output in `build/client`)
- framer-motion for animation, Lenis for smooth scroll
- pnpm workspaces only. No Turborepo, no Next.js, no CMS, no database, no server code
- Fonts self-hosted through `@fontsource` packages. Never load fonts, scripts or styles from a CDN

## Repo layout

```
apps/hub/                     iqrasaurus.com
apps/<spoke-slug>/            one thin app per spoke (routes + content + public assets)
packages/config/              spokes registry, types, design tokens, Tailwind preset, header builder
packages/ui/                  ALL shared layout, sections, motion primitives, SafeEmbed
scripts/                      new-spoke, gen-vercel, optimise-assets, post-build (404.html, robots.txt, sitemap.xml)
_reference/kern/              the original KERN template. READ-ONLY. Never import from it
```

Spoke apps must stay thin. If you are about to write layout, styling or animation code inside `apps/<spoke>/`, stop: it belongs in `packages/ui`. A spoke app contains only its route files (a few lines each), `content.ts`, `public/` assets and config files.

## Commands

```
pnpm install
pnpm dev --filter <slug>        # run one site locally
pnpm build --filter <slug>      # build one site
pnpm build                      # build everything
pnpm typecheck && pnpm lint     # must pass before every commit
pnpm new:spoke <slug>           # scaffold a spoke app from the registry
pnpm gen:vercel                 # regenerate every apps/*/vercel.json from the registry
pnpm assets                     # optimise images in apps/*/assets-src into public/
node scripts/sync-mascots.mjs   # re-copy the dino pose library from ../tadabbur-for-kids-v1
```

## Hard rules

### Content integrity (most important)
1. **Never write, generate, complete, translate or "fix" Quranic Arabic, hadith text, or their translations.** Render only what the owner supplies in content files, character for character. If a verse or reference is missing, leave a `[[CONTENT NEEDED: …]]` placeholder in the content file.
2. Never invent testimonials, statistics, credentials, partner names, people or quotes. Placeholders only.
   Placeholders stay in the content and registry files where the owner can see them, but anything that is only a placeholder is **hidden on the built site** (a missing line is dropped; a section with nothing real in it does not render). Owner decision 2026-10-04: ship a clean MVP and fill in later.
3. Credential wording is fixed: "Led by ARS-recognised asatizah and operated as an IECP in Singapore." Do not paraphrase it into "certified", "accredited" or similar.
4. No imagery depicting prophets, anywhere. Companions of the Prophet may appear only in the owner's own YouTube videos and Shorts listed in `packages/config/src/media.ts` (owner decision 2026-10-12); everywhere else on the sites (pictures, cards, journal images, the dino) there is no imagery of companions either. The dino never plays a prophet or a companion. No AI-generated photos of people.
4a. **Names of the prophets, in our own words** (owner, 2026-10-23). The same rule as the tools: `../tadabbur-for-kids-v1/CLAUDE.md` rule 9, list in its `packages/design/src/prophets.ts`.
    - **Prophet Muhammad:** "Prophet Muhammad ﷺ" at the first mention on a page, then "the Prophet ﷺ".
    - **Every other prophet:** "Prophet Ibrahim (peace be upon him)" at the first mention on a page, then "Prophet Ibrahim".
    - **No abbreviations:** never PBUH, SAW or (AS).
    - **Malay:** "Nabi Ibrahim a.s." and "Nabi Muhammad ﷺ".
    - **No "Prophet" for:** Maryam (peace be upon her), Luqman, Dhul-Qarnayn and al-Khidr.
    - **Never changed:** Quran text and translations, quoted hadith, and the words of families quoted on the site (rule 2).
    - **Checking:** `node ../tadabbur-for-kids-v1/scripts/check-prophet-names.mjs $PWD/apps $PWD/packages`.
5. Voice: warm, curious, clear, humble. Banned words in any copy you draft: revolutionary, game-changing, world-class, ultimate, proven, guaranteed, "the only", "the best".
   Write concretely: what a child does, what a parent needs, who to contact. Avoid "not just X, but Y", lists of three for rhythm, poetic closing lines and slogan headlines.
   Spell the brand **IqraSaurus**. "Tools" means the apps; the spokes are "programmes". Do not call them a "Toolkit".
6. The pedagogical framework is **4-I: Inspire → Investigate → Integrate → Impart**. Do not mention 5D or SPARK anywhere on the sites.

### Design
7. **No hex colours, font names or raw easing arrays in components.** Use the tokens in `packages/config` (Tailwind classes such as `bg-paper`, `text-ink`, `bg-plum`) and the motion presets in `packages/ui/src/motion`.
   The colour tokens are shared with the tools (`tadabbur-for-kids-v1/packages/design/tokens.css`, design system approved 2026-10-04): a new colour is added to both files with the same value. That includes the 4-I colours (`inspire`, `investigate`, `integrate`, `impart`, each with an `on-` colour, plus `inspire-ink`) and the Night values. `accent` is not shared: here it keeps its meaning of "this site's headline accent", and the tools' accent isn't used on the brand sites. **Light first (owner decision 2026-10-19): Day is the default on every site and tool, and the device's dark-mode setting is ignored; Night applies only when someone chooses it** (`data-theme="night"`). The sites have no switch of their own: `<NightScript>` in each root.tsx reads the Night choice a family made in the tools (the `iq_family` cookie on .iqrasaurus.com; read only, never written). `paper-2` and the white-on-plum text use brand-site-only values. Use `bg-surface` for cards and `text-on-plum` on plum, never `bg-white`/`text-white`, so Night works.
8. **One header bar, identical on every site:** IqraSaurus logo (left) → Tools ▾ · Programmes ▾ · Journal · About · Work with us → Donate button (right). Journal is each site's own `/journal` (added 2026-10-12, owner decision); on the hub it shows every programme. An EN | BM language switch sits beside Donate (2026-10-12; inside the drawer on phones). Tools and Programmes open panels of mascot tiles; items that aren't ready show "Coming soon". A programme's own name lives in its hero, not in the header. On mobile the same four items and Donate sit behind one menu button. Never rearrange it per site. (Replaced the three-band header on 2026-10-04, owner decision.)
9. Logos and mascots are swappable image files. Never redraw them, recolour them, or bake logo text (including the tagline) into code.
   The 43-pose dino library is copied from the tools (`node scripts/sync-mascots.mjs`) into `packages/ui/assets/mascots/` and shown with `<Mascot pose=…>`. Only one dino moves on screen at a time; the rest stay still or pop in once.
   Owner-approved exception (2026-10-04): `logo-horizontal-light.png`, the owner's logo with only the lettering lightened (dino untouched), used wherever the logo sits on plum or a dark background, such as the footer. It is shared with the tools; replace the file if a designer supplies an official light logo.
10. **Languages (2026-10-12): English and Malay.** Malay pages live under `/ms` and fall back to English wherever no Malay exists. Interface text lives in `packages/ui/src/i18n/strings.ts` (both languages, always add both); page text in `apps/<slug>/content.ms.ts`; registry text in each entry's `ms` field; journal posts in the sheet's `*_ms` columns. Links inside `packages/ui` use the `Link`/`NavLink` from `packages/ui/src/i18n`, never react-router's, so visitors stay in their language. Malay is a draft until the owner sets `malayReviewed` in `packages/config/src/i18n.ts`; until then Malay pages are noindex. Never translate Quranic Arabic, hadith or their translations (rule 1) or the credential sentence (rule 3).
11. Every animation must respect `prefers-reduced-motion` (no Lenis, no parallax, no letter-rise; simple fades only).

### Security & speed
12. The journal comes from one Google Sheet (`packages/config/src/journal.ts`), read at build time by `scripts/journal.mts`; its pictures are downloaded and shrunk into the build, so nothing loads from Google in a visitor's browser. A GitHub Action (`.github/workflows/journal-refresh.yml`) rebuilds every site daily; its Vercel deploy-hook URLs are a GitHub secret, never in the repo.
    Iframes are rendered only through `<SafeEmbed>`. External sources must be listed in the registry, which also generates the CSP `frame-src` allowlist. Never add a raw `<iframe>`.
    YouTube videos are listed in `packages/config/src/media.ts` and play from `youtube-nocookie.com` only after a visitor presses play (owner asked for them by name, 2026-10-11). Cards show a dino, never the YouTube thumbnail.
13. No third-party scripts, analytics, trackers, cookies or forms that post data, unless the owner asks for one by name.
14. Nothing may touch `window`, `document` or `navigator` at module scope or during render. Pre-rendering runs the app in Node. Use `useEffect`.
15. Every image has explicit `width`/`height`, `loading="lazy"` (except the hero), and a WebP source.
16. Performance budget per site: Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility, ≥ 95 best practices, ≥ 95 SEO. Initial JS ≤ 200 KB gzipped.

### Process
17. One phase at a time. At the end of each phase: run typecheck, lint and build, commit with message `phase N: <summary>`, then report what was done, what was skipped and what the owner must check. **Stop at every STOP gate in the spec.**
18. If a decision in `BUILD_SPEC.md` turns out not to work, do not silently improvise. Explain the problem, propose the smallest fix, and wait.
19. Do not add dependencies beyond those listed in the spec without saying why.
20. Never commit secrets. There are none in this project; keep it that way.
