/**
 * packages/config/src/spokes.ts
 *
 * SINGLE SOURCE OF TRUTH for every IqraSaurus site.
 * - Adding a spoke = add one entry here, run `pnpm new:spoke <slug>`, fill in its content.ts.
 * - Menus, the Toolkit megamenu, cross-site links, CSP frame-src allowlists and
 *   every apps/<slug>/vercel.json are generated from this file.
 *
 * Owner-editable values are marked  // OWNER
 */

export type SiteStatus = 'live' | 'coming-soon'
export type MascotTone = 'playful' | 'calm' | 'none'

export interface EmbedConfig {
  /**
   * Either an absolute https:// URL (external app, rendered sandboxed) or a
   * same-origin path starting with /embeds/ (owner's own HTML + CSV dropped
   * into apps/<slug>/public/embeds/). Empty string = show the "Coming soon" state.
   */
  src: string
  /** Accessible title for the iframe. */
  title: string
  /**
   * Browser features the embed may use, e.g. 'microphone'. Leave out for none.
   * Also opens that feature for the embed's origin in the site's Permissions-Policy.
   */
  allow?: string
}

export interface SiteConfig {
  /** Folder name under apps/ and the key used everywhere. Lowercase, no dashes. */
  slug: string
  kind: 'hub' | 'spoke'
  /** Display name shown in the identity header and megamenu. */
  name: string
  /** One line shown under the name in the identity header (max ~90 chars). */
  description: string
  /** Production hostname, lowercase. DNS is case-insensitive; the owner may advertise mixed case. */
  host: string
  status: SiteStatus
  /** Order in the Toolkit megamenu and the hub grid. */
  order: number
  /** File in apps/<slug>/public/brand/. Placeholder poses repeat until new art arrives. */
  mascot: string
  /** 'calm' = smaller mascot, no bounce. 'none' = hide mascot entirely. */
  mascotTone: MascotTone
  /** Optional per-site accent. Leave undefined to use the shared brand accent. */
  accent?: string
  journal: EmbedConfig
  chat: EmbedConfig
  support: {
    /** Button target. Empty string hides the button and shows descriptive text only. */
    href: string
    label: string
  }
}

const HUB_HOST = 'iqrasaurus.com'

export const sites: SiteConfig[] = [
  {
    slug: 'hub',
    kind: 'hub',
    name: 'IqraSaurus',
    description: 'A family-led Dakwah initiative helping children discover, understand and live Islam.',
    host: HUB_HOST,
    status: 'coming-soon', // flip to 'live' in Phase 6
    order: 0,
    mascot: 'mascot-quran.png',
    mascotTone: 'playful',
    journal: { src: '', title: 'IqraSaurus Journal' }, // OWNER
    chat: { src: '', title: 'Ask IqraSaurus' }, // OWNER
    support: { href: '', label: 'Support our work' }, // OWNER
  },
  {
    slug: 'quraninvestigators',
    kind: 'spoke',
    name: 'Quran Investigators',
    description: 'One surah at a time: activity booklets that turn young readers into investigators.', // OWNER (draft)
    host: `quraninvestigators.${HUB_HOST}`,
    status: 'live', // first spoke to be built
    order: 1,
    mascot: 'mascot-magnifier.png',
    mascotTone: 'playful',
    journal: { src: 'https://mtfa-microsite-ikc-v1.sheetany.site', title: 'Quran Investigators Journal' }, // OWNER
    chat: {
      src: 'https://www.chatbase.co/chatbot-iframe/zlzFNm9ySuiomi-Mi-gNR',
      title: 'Ask the Quran Investigators guide',
      allow: 'microphone',
    }, // OWNER
    support: { href: '', label: 'Support Quran Investigators' }, // OWNER
  },
  {
    slug: 'quranhadeethdoodling',
    kind: 'spoke',
    name: 'Quran & Hadeeth Doodling',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `quranhadeethdoodling.${HUB_HOST}`,
    status: 'coming-soon',
    order: 2,
    mascot: 'mascot-quran.png', // placeholder pose
    mascotTone: 'playful',
    journal: { src: '', title: 'Quran & Hadeeth Doodling Journal' },
    chat: { src: '', title: 'Ask the Doodling guide' },
    support: { href: '', label: 'Support Quran & Hadeeth Doodling' },
  },
  {
    slug: 'edudrama',
    kind: 'spoke',
    name: 'EduDrama',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `edudrama.${HUB_HOST}`,
    status: 'coming-soon',
    order: 3,
    mascot: 'mascot-walking.png',
    mascotTone: 'playful',
    journal: { src: '', title: 'EduDrama Journal' },
    chat: { src: '', title: 'Ask the EduDrama guide' },
    support: { href: '', label: 'Support EduDrama' },
  },
  {
    slug: 'umrahforkids',
    kind: 'spoke',
    name: 'Umrah for Kids',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `umrahforkids.${HUB_HOST}`,
    status: 'coming-soon',
    order: 4,
    mascot: 'mascot-binoculars.png',
    mascotTone: 'playful',
    journal: { src: '', title: 'Umrah for Kids Journal' },
    chat: { src: '', title: 'Ask the Umrah for Kids guide' },
    support: { href: '', label: 'Support Umrah for Kids' },
  },
  {
    slug: 'madrasahpreparation',
    kind: 'spoke',
    name: 'Madrasah Preparation',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `madrasahpreparation.${HUB_HOST}`,
    status: 'coming-soon',
    order: 5,
    mascot: 'mascot-reader.png',
    mascotTone: 'playful',
    journal: { src: '', title: 'Madrasah Preparation Journal' },
    chat: { src: '', title: 'Ask the Madrasah Preparation guide' },
    support: { href: '', label: 'Support Madrasah Preparation' },
  },
  {
    slug: 'baitimadrasati',
    kind: 'spoke',
    name: 'Baiti Madrasati',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `baitimadrasati.${HUB_HOST}`,
    status: 'coming-soon',
    order: 6,
    mascot: 'mascot-quran.png', // placeholder pose
    mascotTone: 'playful',
    journal: { src: '', title: 'Baiti Madrasati Journal' },
    chat: { src: '', title: 'Ask the Baiti Madrasati guide' },
    support: { href: '', label: 'Support Baiti Madrasati' },
  },
  {
    slug: 'tinytafseer',
    kind: 'spoke',
    name: 'Tiny Tafseer',
    description: '[[CONTENT NEEDED: one-line description]]',
    host: `tinytafseer.${HUB_HOST}`,
    status: 'coming-soon',
    order: 7,
    mascot: 'mascot-quran.png', // placeholder pose
    mascotTone: 'playful',
    journal: { src: '', title: 'Tiny Tafseer Journal' },
    chat: { src: '', title: 'Ask the Tiny Tafseer guide' },
    support: { href: '', label: 'Support Tiny Tafseer' },
  },
]

/* ------------------------------------------------------------------ */
/* Menus — identical structure on all 8 sites                          */
/* ------------------------------------------------------------------ */

/** Band 1: utility strip. Always absolute links to the hub, on every site. */
export const hubMenu = [
  { label: 'Our Story', path: '/our-story' },
  { label: 'Our People', path: '/our-people' },
  { label: 'Our Foundation', path: '/our-foundation' },
  { label: 'This Week', path: '/this-week' },
  { label: 'Collaborate', path: '/collaborate' },
] as const

/**
 * Band 3: centred site menu. `anchor` items scroll within the home page
 * (and navigate home first when on /journal or /chat). `route` items are pages.
 * `toolkit` opens the megamenu listing every site in `sites`.
 */
export const siteMenu = [
  { label: 'Home', type: 'anchor', target: '#top' },
  { label: 'About', type: 'anchor', target: '#about' },
  { label: 'Impact', type: 'anchor', target: '#impact' },
  { label: '4-I Method', type: 'anchor', target: '#methodology' },
  { label: 'Journal', type: 'route', target: '/journal' },
  { label: 'Chat', type: 'route', target: '/chat' },
  { label: 'Support Us', type: 'anchor', target: '#support' },
  { label: 'Toolkit', type: 'toolkit', target: '' },
] as const

/* ------------------------------------------------------------------ */
/* Fixed brand + trust strings (do not paraphrase — see CLAUDE.md)     */
/* ------------------------------------------------------------------ */

export const brand = {
  name: 'IqraSaurus',
  tagline: 'Blending Faith with Fun in Learning',
  motto: 'People first. Learning always.',
  positioning:
    'A family-led Dakwah initiative helping children discover, understand and live Islam through engaging learning experiences.',
  supporting:
    'Rooted in Singapore. Guided by recognised asatizah. Built through years of learning with children. Shared so others can adapt and carry it forward.',
  credential: 'Led by ARS-recognised asatizah and operated as an IECP in Singapore.',
  /** OWNER: paste the exact MUIS directory URLs so visitors can verify independently. */
  verifyLinks: {
    ars: '', // OWNER
    iecp: '', // OWNER
  },
  disclaimer:
    'Our Toolkit documents our practice, not a prescription for every learning environment. These are approaches we have tried with children and families over the years. Educators are encouraged to adapt them according to their learners, context and professional judgement while maintaining sound Islamic foundations.',
  chatNotice:
    'This guide draws only from material IqraSaurus has prepared. It is a helper, not a religious authority. For rulings and personal guidance, please ask a recognised asatizah.',
} as const

export const fourI = [
  { key: 'inspire', label: 'Inspire', line: 'Create wonder and a reason to care.' },
  { key: 'investigate', label: 'Investigate', line: 'Ask, observe, compare and explore.' },
  { key: 'integrate', label: 'Integrate', line: 'Connect the discovery to Islam, meaning and life.' },
  { key: 'impart', label: 'Impart', line: 'Practise it, share it, pass it on.' },
] as const

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

export const getSite = (slug: string): SiteConfig => {
  const s = sites.find((x) => x.slug === slug)
  if (!s) throw new Error(`Unknown site slug: ${slug}`)
  return s
}

export const hub = (): SiteConfig => getSite('hub')
export const siteUrl = (s: SiteConfig, path = '/'): string => `https://${s.host}${path}`
export const toolkit = (): SiteConfig[] => [...sites].sort((a, b) => a.order - b.order)

/** Origins allowed in CSP frame-src for one site (external embeds only). */
export const frameOrigins = (s: SiteConfig): string[] =>
  [s.journal.src, s.chat.src]
    .filter((u) => u.startsWith('https://'))
    .map((u) => new URL(u).origin)
    .filter((o, i, a) => a.indexOf(o) === i)

/* ------------------------------------------------------------------ */
/* Content shape every spoke's apps/<slug>/content.ts must satisfy      */
/* ------------------------------------------------------------------ */

export interface Photo {
  src: string // path under /photos/, optimised by `pnpm assets`
  alt: string
  width: number
  height: number
}

export interface SpokeContent {
  hero: { eyebrow: string; headline: string; intro: string; image?: Photo }
  whatIsIt: { body: string } // one paragraph; revealed word by word
  whyWeCreatedIt: { body: string[] }
  journey: Record<'inspire' | 'investigate' | 'integrate' | 'impart', { body: string }>
  whatWeDid: {
    body: string[]
    photos: Photo[]
    videoUrl?: string
    /** Key numbers pulled out of body as a quick-glance strip, e.g. { value: '40', label: 'Pages' }. */
    stats?: { value: string; label: string }[]
  }
  whatWeObserved: { items: { text: string; attribution?: string; image?: Photo }[] }
  whatWeLearned: {
    worked: string[]
    didnt: string[]
    changed: string[]
    /** One optional photo per column, shown above its heading. */
    images?: { worked?: Photo; didnt?: Photo; changed?: Photo }
  }
  tryIt: { intro: string; steps: string[]; download?: { label: string; href: string } }
  adaptIt: { body: string[] }
  workWithUs: { body: string[]; contactHref: string; contactLabel: string }
  supportUs: { body: string[] } // button comes from SiteConfig.support
  /** Optional press clipping shown as a small trust strip before Support Us. */
  press?: { image: Photo; caption: string }
  seo: { title: string; description: string; ogImage?: string }
}
