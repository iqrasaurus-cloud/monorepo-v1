# IqraSaurus — Hub & Spoke Monorepo

Bismillah. This file holds the permanent rules for this repo. The phased build plan lives in `BUILD_SPEC.md`. Read that file before starting any phase, and work one phase at a time.

## What this is

A pnpm-workspace monorepo that produces **8 small static websites** from one shared codebase:

- **1 hub** — `iqrasaurus.com`
- **7 spokes** ("Toolkit" verticals) — one subdomain each, e.g. `quraninvestigators.iqrasaurus.com`

Every site is a pre-rendered React single-page app deployed as its own Vercel project (Root Directory = `apps/<slug>`). The single source of truth for which sites exist is `packages/config/src/spokes.ts`.

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
1. **Never write, generate, complete, translate or "fix" Quranic Arabic, hadith text, or their translations.** Render only what the owner supplies in content files, character for character. If a verse or reference is missing, leave a visible `[[CONTENT NEEDED: …]]` placeholder.
2. Never invent testimonials, statistics, credentials, partner names, people or quotes. Placeholders only.
3. Credential wording is fixed: "Led by ARS-recognised asatizah and operated as an IECP in Singapore." Do not paraphrase it into "certified", "accredited" or similar.
4. No imagery depicting prophets or companions. No AI-generated photos of people.
5. Voice: warm, curious, clear, humble. Banned words in any copy you draft: revolutionary, game-changing, world-class, ultimate, proven, guaranteed, "the only", "the best".
6. The pedagogical framework is **4-I: Inspire → Investigate → Integrate → Impart**. Do not mention 5D or SPARK anywhere on the sites.

### Design
7. **No hex colours, font names or raw easing arrays in components.** Use the tokens in `packages/config` (Tailwind classes such as `bg-paper`, `text-ink`, `bg-plum`) and the motion presets in `packages/ui/src/motion`.
8. The three-band header is identical on all 8 sites: utility strip → identity header (site identity LEFT, IqraSaurus brand RIGHT) → centred site menu. Never rearrange it per site.
9. Logos and mascots are swappable image files. Never redraw them, recolour them, or bake logo text (including the tagline) into code.
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
