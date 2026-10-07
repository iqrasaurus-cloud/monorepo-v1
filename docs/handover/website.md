# Website handover (iqrasaurus-mr-1)

Written 2026-10-07 so work can continue on the Mac mini. Chat history does not move, so this is the record. Read `CLAUDE.md` (the rules) and `BUILD_SPEC.md` (the plan) first.

## Where things stand
All code is committed and pushed to `iqrasaurus-cloud/monorepo-v1` (`master`, last code commit `4d8bf6c`). Nothing is waiting to be committed except the `owner-files/` folders below.

| Phase | What | Status |
|---|---|---|
| 0–3 | Scaffold, shell, first programme (Quran Investigators), several rounds of owner feedback | Done |
| 4 (was "A") | One header bar replaces the three bands | Done, live |
| 5 (was "B") | Five-section programme page | Done, live at https://quraninvestigators.vercel.app |
| 6 (was "C") | Hub: home, About, Work with us (`apps/hub`) | Code pushed, **not deployed yet** |
| 7 | Hardening (was Phase 4): SEO tags, `404.html`/robots/sitemap script, AA contrast, Lighthouse, header check | Done 2026-10-07 (`ab36e77`), committed, not pushed. Lighthouse mobile on the live Quran Investigators site: 91 / 96 / 100 / 100 |
| 8 | Deployment checklist for each new site (was Phase 5) | Done for Quran Investigators only |
| 9 | Remaining programmes via `pnpm new:spoke` (was Phase 7) | Not started; the script is a stub |

Also done: the shared design tokens (4-I colours, Night values kept inactive) and the light logo in the footer.

Reference docs that live in the **Tadabbur repo**, not this one: `tadabbur-for-kids-v1/docs/BRAND-SITE-REVIEW.md` (the approved direction and the draft copy) and `docs/DESIGN-SYSTEM.md` / `packages/design/tokens.css` (the shared look).

## Owner's decisions so far
- Direction (2026-10-04): tools-first hub; one header bar (logo, Tools, Programmes, About, Work with us, Donate); five-section programme pages; tools at `iqrasaurus.com/tadabbur`, `/hafiz`, `/worksheets`, `/calendar`, `/museum`, `/dino`. Only Tadabbur is marked live.
- Programmes (six): Quran Investigators, StoryBuzz (StoryBus and EduDrama merged), Quran & Hadeeth Doodling, Madrasah Preparation, Baiti Madrasati, Umrah for Kids. Tiny Tafseer was removed; the owner did not object, but it has not been explicitly confirmed.
- Spelling is **IqraSaurus**. Programmes are "programmes", never "Toolkit".
- WhatsApp +65 8365 8221 and admin@iqrasaurus.com are confirmed current. The donation link is a placeholder for now.
- Placeholders stay in the content files but are hidden on the built site. Sections with nothing real do not render (this changed CLAUDE.md rule 2).
- Until the hub is live, About and Work with us jump to footer blocks on the same page. Setting the hub to `live` switches them to hub pages.
- Today's ayah on the hub is a link-only card that opens Tadabbur. No Quranic text is written into the sites.
- The press clipping (Berita Harian, 23 Dec 2016) lives on the hub's About page.
- The journal embed (`https://mtfa-microsite-ikc-v1.sheetany.site`) stays in place as a preview; the owner will change the URL. It currently shows unrelated Ihsan Kidney Care articles.
- Design system: the shared colours match the tools. `accent` stays the brand sites' own headline accent (not shared). Night exists only under `:root[data-theme='night']` and is off. The footer uses the owner-approved light horizontal logo.
- Declined on rule 4: the image in `owner-files/stories/` (looks like Prophet Nuh's ark with figures). Do not use it.
- The Mobbin connector needs a paid plan, so no Mobbin research was done.

## [[CONTENT NEEDED]] (hidden on the site until filled)
- `apps/quraninvestigators/content.ts`: when Quran Investigators started and how many surahs so far; at least one real quote, lesson or photo for "What we've seen" (the whole section appears as soon as one exists); more real booklet pages (the gallery repeats three pages to reach six).
- `packages/config/src/spokes.ts`: one-line descriptions for StoryBuzz, Quran & Hadeeth Doodling, Madrasah Preparation, Baiti Madrasati, Umrah for Kids; one line for each tool except Tadabbur; `brand.donate.href`; `brand.verifyLinks.ars` and `.iecp` (MUIS links).
- `apps/hub/content.ts`: our story, our people (names and what each brings), our foundation.

## Go-live checklist (hub)
1. Vercel: new project from `monorepo-v1`, Root Directory `apps/hub`. The repo's `apps/hub/vercel.json` supplies the build settings.
2. Add domains `iqrasaurus.com` and `www.iqrasaurus.com` (redirect www to the apex) and set the DNS records Vercel shows.
3. In the Quran Investigators project, add `quraninvestigators.iqrasaurus.com`. The hub links to that address.
4. Tell Claude. It sets the hub to `live` in `packages/config/src/spokes.ts`, runs `pnpm gen:vercel`, and pushes. That points every site's About, Work with us and logo at the hub.
5. Route `iqrasaurus.com/tadabbur` (and the other tool paths when they exist) to the tool deployments. That is a Vercel setup with the Tadabbur chat; nothing is built for it here.
6. Vercel Hobby is for non-commercial use. Check whether donations mean the Pro plan is needed.

## Waiting on the owner
- The Vercel and DNS steps above.
- The content items above, the donation link and the MUIS links.
- The new journal URL.
- Confirm Tiny Tafseer stays dropped.

## Possible next steps
- Responsive images: `<Picture>` sends phones the full-size booklet pages and the 640px hero mascot; the smaller files already exist. Offering them (`srcset`/`sizes`) would save about 490 KB on the Quran Investigators page.
- Regenerating `og.png` with `pnpm assets` needs the Fredoka font installed on the machine (sharp can't read the web-font files); without it the heading comes out in a plain sans.

## Running it on the Mac
- Node 22 or newer, pnpm 12.4.2 (set in `package.json`). Then `pnpm install`. On the Mac mini they live in `~/.local` (added to PATH in `~/.zshrc`); a non-interactive shell may need `export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"`.
- `pnpm dev --filter quraninvestigators` or `--filter hub`. Before a commit: `pnpm typecheck && pnpm lint && pnpm build`.
- Images: put originals in `apps/<slug>/assets-src/`, run `pnpm assets`; the optimised files in `public/` are committed.
- `.claude/launch.json` (dev-server settings for the Claude desktop preview) is not in git; recreate it if you use the preview pane.
- The untracked `owner-files/` folders (`HERO`, `Hijaiyya`, `blog ref`, `quran-investigator-banner`, `quran-investigator-booklet-sample`, `stories`, about 30 MB of raw images) are being carried over on the USB kit. They have deliberately not been committed because the repo is public; ask the owner before adding or ignoring them. The tracked `owner-files/brand-assets`, `quraninvestigators.content.ts` and `spokes.ts` are old snapshots; the real content and registry are in `apps/` and `packages/config`.
