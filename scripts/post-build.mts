// Runs after `react-router build` inside apps/<slug> (see each app's package.json):
//   build/client/404/index.html -> build/client/404.html   (Vercel serves it for unknown paths)
//   build/client/robots.txt
//   build/client/sitemap.xml   (live sites only; every pre-rendered page that isn't noindex or an embed)
import {
  copyFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { basename, join, relative, sep } from 'node:path'
import { getSite, siteUrl } from '../packages/config/src/index.ts'

const site = getSite(basename(process.cwd()))
const out = join(process.cwd(), 'build', 'client')
if (!existsSync(out))
  throw new Error(`post-build: ${out} does not exist; run react-router build first`)

const notFound = join(out, '404', 'index.html')
if (!existsSync(notFound))
  throw new Error('post-build: build/client/404/index.html is missing; pre-render /404')
copyFileSync(notFound, join(out, '404.html'))
console.log('post-build: wrote 404.html')

/** Every pre-rendered page as a route path, e.g. index.html -> '/', journal/index.html -> '/journal'. */
const pages = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return pages(path)
    if (name !== 'index.html') return []
    const route = relative(out, dir).split(sep).join('/')
    return [route === '' ? '/' : `/${route}`]
  })

const indexable = pages(out)
  .filter((route) => route !== '/404' && !route.startsWith('/embeds/'))
  .filter((route) => {
    const html = readFileSync(join(out, route, 'index.html'), 'utf8')
    return !/<meta name="robots" content="[^"]*noindex/.test(html)
  })
  .sort()

const live = site.status === 'live'
// /embeds/ holds widgets framed by the site's own pages, not pages of their own.
const robots = ['User-agent: *', 'Allow: /', 'Disallow: /embeds/']
if (live) robots.push('', `Sitemap: ${siteUrl(site, '/sitemap.xml')}`)
writeFileSync(join(out, 'robots.txt'), robots.join('\n') + '\n')
console.log('post-build: wrote robots.txt')

if (live) {
  const urls = indexable.map((route) => `  <url><loc>${siteUrl(site, route)}</loc></url>`)
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ]
  writeFileSync(join(out, 'sitemap.xml'), xml.join('\n') + '\n')
  console.log(`post-build: wrote sitemap.xml (${urls.length} page(s))`)
} else {
  console.log(`post-build: no sitemap.xml (${site.slug} is ${site.status}; its pages are noindex)`)
}
