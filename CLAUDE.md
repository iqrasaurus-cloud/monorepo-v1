# IqraSaurus — Hub & Spoke Monorepo

Bismillah. This file holds the permanent rules for this repo. The phased build plan lives in `BUILD_SPEC.md`. Read that file before starting any phase, and work one phase at a time.

## What this is

A pnpm-workspace monorepo that produces **7 small static websites** from one shared codebase:

- **1 hub** — `iqrasaurus.com`, tools-first
- **6 programmes** (spokes) — one subdomain each, e.g. `quraninvestigators.iqrasaurus.com`

**Tools** are separate apps that live at short hub paths (`iqrasaurus.com/tadabbur`, `/hafiz`, `/worksheets`, `/calendar`, `/museum`, `/dino`). They are not built in this repo; this repo only links to them.

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
scripts/                      new-spoke, gen-vercel, optimise-assets, post-build
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
```

## Hard rules

### Content integrity (most important)
1. **Never write, generate, complete, translate or "fix" Quranic Arabic, hadith text, or their translations.** Render only what the owner supplies in content files, character for character. If a verse or reference is missing, leave a `[[CONTENT NEEDED: …]]` placeholder in the content file.
2. Never invent testimonials, statistics, credentials, partner names, people or quotes. Placeholders only.
   Placeholders stay in the content and registry files where the owner can see them, but anything that is only a placeholder is **hidden on the built site** (a missing line is dropped; a section with nothing real in it does not render). Owner decision 2026-10-04: ship a clean MVP and fill in later.
3. Credential wording is fixed: "Led by ARS-recognised asatizah and operated as an IECP in Singapore." Do not paraphrase it into "certified", "accredited" or similar.
4. No imagery depicting prophets or companions. No AI-generated photos of people.
5. Voice: warm, curious, clear, humble. Banned words in any copy you draft: revolutionary, game-changing, world-class, ultimate, proven, guaranteed, "the only", "the best".
   Write concretely: what a child does, what a parent needs, who to contact. Avoid "not just X, but Y", lists of three for rhythm, poetic closing lines and slogan headlines.
   Spell the brand **IqraSaurus**. "Tools" means the apps; the spokes are "programmes". Do not call them a "Toolkit".
6. The pedagogical framework is **4-I: Inspire → Investigate → Integrate → Impart**. Do not mention 5D or SPARK anywhere on the sites.

### Design
7. **No hex colours, font names or raw easing arrays in components.** Use the tokens in `packages/config` (Tailwind classes such as `bg-paper`, `text-ink`, `bg-plum`) and the motion presets in `packages/ui/src/motion`.
   The colour tokens are shared with the tools (`tadabbur-for-kids-v1/packages/design/tokens.css`, design system approved 2026-10-04): a new colour is added to both files with the same value. That includes the 4-I colours (`inspire`, `investigate`, `integrate`, `impart`, each with an `on-` colour, plus `inspire-ink`) and the Night values. Here `accent` keeps its meaning of "this site's headline accent"; the tools' accent is `accent-tools`. The brand sites are Day-only until Night is switched on.
8. **One header bar, identical on every site:** IqraSaurus logo (left) → Tools ▾ · Programmes ▾ · About · Work with us → Donate button (right). Tools and Programmes open panels of mascot tiles; items that aren't ready show "Coming soon". A programme's own name lives in its hero, not in the header. On mobile the same four items and Donate sit behind one menu button. Never rearrange it per site. (Replaced the three-band header on 2026-10-04, owner decision.)
9. Logos and mascots are swappable image files. Never redraw them, recolour them, or bake logo text (including the tagline) into code.
   Owner-approved exception (2026-10-04): `logo-horizontal-light.png`, the owner's logo with only the lettering lightened (dino untouched), used wherever the logo sits on plum or a dark background, such as the footer. It is shared with the tools; replace the file if a designer supplies an official light logo.
10. Every animation must respect `prefers-reduced-motion` (no Lenis, no parallax, no letter-rise; simple fades only).

### Security & speed
11. Iframes are rendered only through `<SafeEmbed>`. External sources must be listed in the registry, which also generates the CSP `frame-src` allowlist. Never add a raw `<iframe>`.
12. No third-party scripts, analytics, trackers, cookies or forms that post data, unless the owner asks for one by name.
13. Nothing may touch `window`, `document` or `navigator` at module scope or during render. Pre-rendering runs the app in Node. Use `useEffect`.
14. Every image has explicit `width`/`height`, `loading="lazy"` (except the hero), and a WebP source.
15. Performance budget per site: Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility, ≥ 95 best practices, ≥ 95 SEO. Initial JS ≤ 200 KB gzipped.

### Process
16. One phase at a time. At the end of each phase: run typecheck, lint and build, commit with message `phase N: <summary>`, then report what was done, what was skipped and what the owner must check. **Stop at every STOP gate in the spec.**
17. If a decision in `BUILD_SPEC.md` turns out not to work, do not silently improvise. Explain the problem, propose the smallest fix, and wait.
18. Do not add dependencies beyond those listed in the spec without saying why.
19. Never commit secrets. There are none in this project; keep it that way.
