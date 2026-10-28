// Copies the Umrah for Kids sample pictures from the tools repo into the programme page.
//
//   node scripts/sync-umrah-samples.mjs [path/to/tadabbur-for-kids-v1]
//
// Three pictures only, with the owner's OK (tools repo docs/specs/umrah.md, answer 11): one colour
// scene (the dino at a Ka'bah model) and two pages of the paper pack, the free packing-list sample
// and the passport. The tools repo makes them (`npm run previews --workspace=umrah`); this copies them
// to apps/umrahforkids/assets-src/photos, runs `pnpm assets` for that site, and leaves only the
// optimised files in public/photos. Nothing else from the tools repo is copied. Run again whenever
// the pictures there change.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..')
const tools = path.resolve(process.argv[2] ?? path.join(root, '../tadabbur-for-kids-v1'))
const from = path.join(tools, 'apps/umrah/previews')
const to = path.join(root, 'apps/umrahforkids/assets-src/photos')
const PICTURES = ['model-tawaf', 'sample-packing', 'passport']

const missing = PICTURES.filter((name) => !fs.existsSync(path.join(from, `${name}.jpg`)))
if (missing.length > 0) {
  console.error(`Not found in ${from}: ${missing.join(', ')}. Pass the tools repo path as the first argument.`)
  process.exit(1)
}

fs.mkdirSync(to, { recursive: true })
const copied = PICTURES.map((name) => {
  const file = path.join(to, `ufk-${name}.jpg`)
  fs.copyFileSync(path.join(from, `${name}.jpg`), file)
  return file
})
try {
  execFileSync(
    process.execPath,
    ['--experimental-strip-types', '--disable-warning=ExperimentalWarning', 'scripts/optimise-assets.mts', 'umrahforkids'],
    { cwd: root, stdio: 'inherit' },
  )
} finally {
  // The sources stay in the tools repo; only the optimised copies live here
  for (const file of copied) fs.rmSync(file, { force: true })
}
console.log(`Copied ${PICTURES.length} Umrah pictures from ${from}`)
