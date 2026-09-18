// Writes apps/<slug>/vercel.json for every site in the registry that has an app folder.
// Run with: pnpm gen:vercel   (Node's built-in TypeScript stripping, no extra tooling)
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { securityHeaders, sites, type SiteConfig } from '../packages/config/src/index.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const assertValidEmbeds = (site: SiteConfig): void => {
  for (const [kind, embed] of [
    ['journal', site.journal],
    ['chat', site.chat],
  ] as const) {
    const { src } = embed
    if (src === '' || src.startsWith('https://') || src.startsWith('/embeds/')) continue
    throw new Error(
      `${site.slug}: ${kind}.src must be empty, start with https:// or start with /embeds/ (got "${src}")`,
    )
  }
}

let written = 0
for (const site of sites) {
  assertValidEmbeds(site)
  const dir = resolve(root, 'apps', site.slug)
  if (!existsSync(dir)) {
    console.log(`skip   ${site.slug} (apps/${site.slug} does not exist yet)`)
    continue
  }
  const config = {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: null,
    buildCommand: 'pnpm run build',
    outputDirectory: 'build/client',
    cleanUrls: true,
    trailingSlash: false,
    headers: securityHeaders(site),
  }
  writeFileSync(resolve(dir, 'vercel.json'), JSON.stringify(config, null, 2) + '\n')
  console.log(`wrote  apps/${site.slug}/vercel.json`)
  written += 1
}
console.log(`${written} vercel.json file(s) generated from packages/config/src/spokes.ts`)
