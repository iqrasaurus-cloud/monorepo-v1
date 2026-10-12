// Scaffolds apps/<slug> from the Quran Investigators app (BUILD_SPEC.md §12).
// Run with: pnpm new:spoke <slug>   (the slug must already be in packages/config/src/spokes.ts)
//
// Copies the app skeleton (routes, configs, brand masters, journal sample), swaps the slug,
// writes a placeholder content.ts, generates the brand images and runs gen:vercel.
// Afterwards: pnpm install, then fill in apps/<slug>/content.ts.
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = 'quraninvestigators'
const slug = process.argv[2]

const fail = (message) => {
  console.error(`new:spoke: ${message}`)
  process.exit(1)
}

if (!slug) fail('give a slug, e.g. pnpm new:spoke storybuzz')
const registry = readFileSync(join(root, 'packages/config/src/spokes.ts'), 'utf8')
if (!registry.includes(`slug: '${slug}'`)) fail(`"${slug}" is not in packages/config/src/spokes.ts`)
const target = join(root, 'apps', slug)
if (existsSync(target)) fail(`apps/${slug} already exists`)
const from = join(root, 'apps', TEMPLATE)

// Skeleton only: no build output, no generated types, no programme-specific photos.
const COPY = [
  'app',
  'package.json',
  'postcss.config.cjs',
  'react-router.config.ts',
  'tailwind.config.cjs',
  'tsconfig.json',
  'vite.config.ts',
  'assets-src/brand',
  'public/brand',
  'public/embeds',
]
// The journal file is build output for the template's own site, so it is left behind.
const skipGenerated = (src) => !src.endsWith('journal.generated.json')
for (const path of COPY) {
  cpSync(join(from, path), join(target, path), { recursive: true, filter: skipGenerated })
}
cpSync(join(from, 'assets-src/photos/.gitkeep'), join(target, 'assets-src/photos/.gitkeep'))

// Swap the slug in every route file.
const swapSlug = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) swapSlug(path)
    else if (/\.tsx?$/.test(entry.name)) {
      const text = readFileSync(path, 'utf8')
      writeFileSync(path, text.replaceAll(`getSite('${TEMPLATE}')`, `getSite('${slug}')`))
    }
  }
}
swapSlug(join(target, 'app'))

// Package name, and the next free dev port (hub 3001, Quran Investigators 3000).
const ports = readdirSync(join(root, 'apps'))
  .map((app) => join(root, 'apps', app, 'package.json'))
  .filter(existsSync)
  .map((file) => Number(/--port (\d+)/.exec(readFileSync(file, 'utf8'))?.[1] ?? 0))
const port = Math.max(3001, ...ports) + 1
const pkg = JSON.parse(readFileSync(join(target, 'package.json'), 'utf8'))
pkg.name = slug
pkg.scripts.dev = `react-router dev --port ${port}`
writeFileSync(join(target, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')

writeFileSync(
  join(target, 'content.ts'),
  `/**
 * apps/${slug}/content.ts — the five-section programme page.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 * Plan the text with docs/spoke-content-template.txt.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: '[[CONTENT NEEDED: one plain line under the programme name]]',
    useAtHome: [],
  },

  whatItIs: {
    body: ['[[CONTENT NEEDED: what the material is, what children do with it, where you have used it]]'],
    photos: [],
  },

  session: {
    steps: {
      inspire: '[[CONTENT NEEDED]]',
      investigate: '[[CONTENT NEEDED]]',
      integrate: '[[CONTENT NEEDED]]',
      impart: '[[CONTENT NEEDED]]',
    },
    tips: { younger: '[[CONTENT NEEDED]]', older: '[[CONTENT NEEDED]]' },
  },

  seen: { quotes: [], lessons: [], photos: [] },

  bringIt: {
    body: '[[CONTENT NEEDED: the invitation to bring this programme to a class]]',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: '[[CONTENT NEEDED]] | IqraSaurus',
    description: '[[CONTENT NEEDED]]',
  },
}
`,
)

// Malay starts empty: every Malay page shows the English until this file is filled in.
writeFileSync(
  join(target, 'content.ms.ts'),
  `/**
 * apps/${slug}/content.ms.ts — the Malay (BM) version of content.ts.
 * Only what is here is shown in Malay; anything missing falls back to the English.
 * No Quranic Arabic, hadith text or translation is written here (CLAUDE.md rule 1).
 */

import type { Overlay, SpokeContent } from '@iqra/config'

export const contentMs: Overlay<SpokeContent> = {}
`,
)

const run = (args) => {
  const result = spawnSync('pnpm', args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })
  if (result.status !== 0) fail(`pnpm ${args.join(' ')} failed`)
}
run(['assets', slug]) // og.png carries the programme's name
run(['gen:vercel'])

console.log(
  `\napps/${slug} created (dev port ${port}). Next: pnpm install, then fill in apps/${slug}/content.ts.`,
)
