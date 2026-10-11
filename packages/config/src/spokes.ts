/**
 * packages/config/src/spokes.ts
 *
 * SINGLE SOURCE OF TRUTH for every IqraSaurus site and tool.
 * - Adding a programme = add one entry here, run `pnpm new:spoke <slug>`, fill in its content.ts.
 * - The header menus (Tools, Programmes), cross-site links, CSP frame-src allowlists and
 *   every apps/<slug>/vercel.json are generated from this file.
 *
 * Owner-editable values are marked  // OWNER
 */

import { videosFor, youtube } from './media.ts'

export type SiteStatus = 'live' | 'coming-soon'
export type MascotTone = 'playful' | 'calm' | 'none'
/** A site's or tool's colour in menus, cards and its hero: one of the four 4-I colours. */
export type Colour = 'inspire' | 'investigate' | 'integrate' | 'impart'

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
  /** Display name shown in the Programmes menu, footer and the programme's hero. */
  name: string
  /** One line shown under the name in the Programmes menu (max ~90 chars). */
  description: string
  /** Production hostname, lowercase. DNS is case-insensitive; the owner may advertise mixed case. */
  host: string
  status: SiteStatus
  /** Order in the Programmes menu and the hub grid. */
  order: number
  /** File in apps/<slug>/public/brand/. Placeholder poses repeat until new art arrives. */
  mascot: string
  /** 'calm' = smaller mascot, no bounce. 'none' = hide mascot entirely. */
  mascotTone: MascotTone
  /** Pose from the dino library (packages/ui/src/mascot) on its cards, tiles and hero. */
  pose: string
  /** Its colour across the IqraSaurus family: cards, tiles and hero. */
  colour: Colour
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
    status: 'live', // live at iqrasaurus.com since 2026-10-11
    order: 0,
    mascot: 'mascot-quran.png',
    mascotTone: 'playful',
    pose: 'waving-wink',
    colour: 'investigate',
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
    status: 'live', // first spoke to be built; quraninvestigators.iqrasaurus.com since 2026-10-11
    order: 1,
    mascot: 'mascot-magnifier.png',
    mascotTone: 'playful',
    pose: 'magnifying-glass',
    colour: 'investigate',
    journal: { src: 'https://mtfa-microsite-ikc-v1.sheetany.site', title: 'Quran Investigators Journal' }, // OWNER
    chat: {
      src: 'https://www.chatbase.co/chatbot-iframe/zlzFNm9ySuiomi-Mi-gNR',
      title: 'Ask the Quran Investigators guide',
      allow: 'microphone',
    }, // OWNER
    support: { href: '', label: 'Support Quran Investigators' }, // OWNER
  },
  {
    // StoryBus and EduDrama were merged into one programme (owner decision 2026-10-04).
    slug: 'storybuzz',
    kind: 'spoke',
    name: 'StoryBuzz',
    description: 'True stories of the prophets, told aloud and acted out by children.', // OWNER (draft from founder interview)
    host: `storybuzz.${HUB_HOST}`,
    status: 'live', // on its iqrasaurus.com subdomain since 2026-10-11
    order: 2,
    mascot: 'mascot-walking.png',
    mascotTone: 'playful',
    pose: 'superhero-cape',
    colour: 'impart',
    journal: { src: '', title: 'StoryBuzz Journal' },
    chat: { src: '', title: 'Ask the StoryBuzz guide' },
    support: { href: '', label: 'Support StoryBuzz' },
  },
  {
    slug: 'quranhadeethdoodling',
    kind: 'spoke',
    name: 'Quran & Hadeeth Doodling',
    description: 'Children draw what a surah or hadeeth means to them, before they can write it down.', // OWNER (draft from founder interview)
    host: `quranhadeethdoodling.${HUB_HOST}`,
    status: 'live', // on its iqrasaurus.com subdomain since 2026-10-11
    order: 3,
    mascot: 'mascot-quran.png', // placeholder pose
    mascotTone: 'playful',
    pose: 'writing',
    colour: 'inspire',
    journal: { src: '', title: 'Quran & Hadeeth Doodling Journal' },
    chat: { src: '', title: 'Ask the Doodling guide' },
    support: { href: '', label: 'Support Quran & Hadeeth Doodling' },
  },
  {
    slug: 'madrasahpreparation',
    kind: 'spoke',
    name: 'Madrasah Preparation',
    description: 'Madrasah Entrance Test preparation, with Islamic values in every lesson.', // OWNER (draft from founder interview)
    host: `madrasahpreparation.${HUB_HOST}`,
    status: 'live', // on its iqrasaurus.com subdomain since 2026-10-11
    order: 4,
    mascot: 'mascot-reader.png',
    mascotTone: 'playful',
    pose: 'backpack-ready',
    colour: 'integrate',
    journal: { src: '', title: 'Madrasah Preparation Journal' },
    chat: { src: '', title: 'Ask the Madrasah Preparation guide' },
    support: { href: '', label: 'Support Madrasah Preparation' },
  },
  {
    slug: 'baitimadrasati',
    kind: 'spoke',
    name: 'Baiti Madrasati',
    description: 'How our homeschooling family learns Islam at home, shared for other families.', // OWNER (draft from founder interview)
    host: `baitimadrasati.${HUB_HOST}`,
    status: 'live', // on its iqrasaurus.com subdomain since 2026-10-11
    order: 5,
    mascot: 'mascot-quran.png', // placeholder pose
    mascotTone: 'playful',
    pose: 'heart-hug',
    colour: 'impart',
    journal: { src: '', title: 'Baiti Madrasati Journal' },
    chat: { src: '', title: 'Ask the Baiti Madrasati guide' },
    support: { href: '', label: 'Support Baiti Madrasati' },
  },
  {
    slug: 'umrahforkids',
    kind: 'spoke',
    name: 'Umrah for Kids',
    description: 'Stories, drama and rhymes that prepare children for Umrah.', // OWNER (draft from founder interview)
    host: `umrahforkids.${HUB_HOST}`,
    status: 'live', // on its iqrasaurus.com subdomain since 2026-10-11
    order: 6,
    mascot: 'mascot-binoculars.png',
    mascotTone: 'playful',
    pose: 'binoculars-pointing',
    colour: 'inspire',
    journal: { src: '', title: 'Umrah for Kids Journal' },
    chat: { src: '', title: 'Ask the Umrah for Kids guide' },
    support: { href: '', label: 'Support Umrah for Kids' },
  },
]

/* ------------------------------------------------------------------ */
/* Tools — apps that live at iqrasaurus.com/<path>                     */
/* ------------------------------------------------------------------ */

export interface ToolConfig {
  slug: string
  name: string
  /** One line under the name. A [[CONTENT NEEDED]] line is hidden on the built site. */
  line: string
  /** Path on the hub domain, e.g. '/tadabbur'. */
  path: string
  /**
   * Where the tool runs today. The hub forwards <path> (and everything under it) there, so
   * iqrasaurus.com/tadabbur works while the tools keep their own deployments.
   */
  deployUrl?: string
  /** 'live' tools link out; 'coming-soon' tools show the name with a "Coming soon" pill. */
  status: SiteStatus
  /** File in apps/<slug>/public/brand/. Placeholder poses repeat until new art arrives. */
  mascot: string
  /** Pose from the dino library on its tiles and cards. */
  pose: string
  colour: Colour
}

export const tools: ToolConfig[] = [
  // OWNER: Tadabbur is linked now so it works the day iqrasaurus.com/tadabbur is routed.
  { slug: 'tadabbur', name: 'Tadabbur', line: 'One ayah a day', path: '/tadabbur', deployUrl: 'https://tadabbur.vercel.app/tadabbur', status: 'live', mascot: 'mascot-quran.png', pose: 'reading-quran', colour: 'inspire' },
  { slug: 'hafiz', name: 'Mini Hafiz', line: '[[CONTENT NEEDED: one line]]', path: '/hafiz', status: 'coming-soon', mascot: 'mascot-reader.png', pose: 'hugging-quran', colour: 'integrate' },
  // Worksheets became Numbers & Counting (owner, 2026-10-11): the Numbersaurus app in the tools repo.
  { slug: 'numbers', name: 'Numbers & Counting', line: '[[CONTENT NEEDED: one line]]', path: '/numbers', status: 'coming-soon', mascot: 'mascot-magnifier.png', pose: 'pointing', colour: 'investigate' },
  { slug: 'calendar', name: 'Calendar', line: '[[CONTENT NEEDED: one line]]', path: '/calendar', status: 'coming-soon', mascot: 'mascot-binoculars.png', pose: 'crescent-moon', colour: 'impart' },
  { slug: 'museum', name: 'Museum', line: '[[CONTENT NEEDED: one line]]', path: '/museum', status: 'coming-soon', mascot: 'mascot-magnifier.png', pose: 'treasure-chest', colour: 'investigate' },
  // Dino became Duas (owner, 2026-10-11): the duas we make on a regular basis.
  { slug: 'duas', name: 'Duas', line: '[[CONTENT NEEDED: one line]]', path: '/duas', status: 'coming-soon', mascot: 'mascot-walking.png', pose: 'making-dua', colour: 'integrate' },
]

/* ------------------------------------------------------------------ */
/* Header menu — identical on every site (CLAUDE.md rule 8)            */
/* ------------------------------------------------------------------ */

/**
 * `tools` and `programmes` open a panel of tiles. `hub` items are pages on
 * iqrasaurus.com; until the hub is live they jump to the matching footer block
 * (`fallback`), which is present on every page of every site.
 */
export const mainMenu = [
  { label: 'Tools', type: 'tools' },
  { label: 'Programmes', type: 'programmes' },
  { label: 'About', type: 'hub', path: '/about', fallback: '#about-iqrasaurus' },
  { label: 'Work with us', type: 'hub', path: '/work-with-us', fallback: '#work-with-us' },
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
  /** Where the owner posts. Shown as links only; nothing is loaded from these sites. */
  social: {
    youtube: 'https://www.youtube.com/@Iqrasaurus-official',
    instagram: 'https://www.instagram.com/iqrasaurus/',
  },
  /** Confirmed current by the owner on 2026-10-04. */
  contact: {
    whatsapp: '+65 8365 8221',
    whatsappHref: 'https://wa.me/6583658221',
    email: 'admin@iqrasaurus.com',
  },
  /** Header button on every site. Empty href = the button jumps to the footer's Work with us block. */
  donate: {
    label: 'Donate',
    href: '', // OWNER: donation page URL (placeholder for now)
  },
  disclaimer:
    'Our programmes document our practice, not a prescription for every learning environment. These are approaches we have tried with children and families over the years. Educators are encouraged to adapt them according to their learners, context and professional judgement while maintaining sound Islamic foundations.',
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
/** The six programmes (spokes) in menu order. */
export const programmes = (): SiteConfig[] =>
  sites.filter((s) => s.kind === 'spoke').sort((a, b) => a.order - b.order)
export const toolUrl = (t: ToolConfig): string => siteUrl(hub(), t.path)
/** Owner placeholders are kept in content files but never shown on the built site. */
export const isPlaceholder = (text: string | undefined): boolean =>
  !text || text.trim() === '' || text.trim().startsWith('[[')

/** Origins allowed in CSP frame-src for one site (external embeds only). */
export const frameOrigins = (s: SiteConfig): string[] =>
  [s.journal.src, s.chat.src, videosFor(s.slug).length > 0 ? youtube.embedOrigin : '']
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

export type FourIKey = (typeof fourI)[number]['key']

export interface Quote {
  text: string
  attribution?: string
  image?: Photo
}

/**
 * The five-section programme page (BUILD_SPEC.md section 6B). The programme's name
 * comes from the registry; contact details and the credential line come from `brand`.
 * Any [[CONTENT NEEDED]] string is dropped on the built site.
 */
export interface SpokeContent {
  hero: {
    /** One plain line under the programme name. */
    line: string
    /** A real photo of the material or a session. Without one, the mascot stands alone. */
    image?: Photo
    /** Slugs from `tools`, shown under "Use this at home". */
    useAtHome: string[]
  }
  whatItIs: {
    /** Two or three short paragraphs. */
    body: string[]
    /** Small note on the sources the material is built on. */
    sources?: string
    /** Photos of the real material. Six or more turns on the scrolling gallery. */
    photos: Photo[]
    /** Optional video embed, shown as a click-to-load poster (goes through SafeEmbed). */
    videoUrl?: string
  }
  session: {
    /** e.g. "About 40 minutes". */
    duration?: string
    /** What happens at each 4-I step in this programme. */
    steps: Record<FourIKey, string>
    tips: { younger: string; older: string }
  }
  /** Hidden until at least one real quote, lesson or photo exists. */
  seen: { quotes: Quote[]; lessons: string[]; photos: Photo[] }
  bringIt: {
    /** The invitation to use the programme. */
    body: string
    /** One line on what donations pay for. */
    donateLine?: string
  }
  seo: { title: string; description: string; ogImage?: string }
}

export interface Person {
  name: string
  /** What they bring, in a few words. */
  role: string
  photo?: Photo
}

interface PageSeo {
  title: string
  description: string
}

/**
 * The hub, iqrasaurus.com (BUILD_SPEC.md section 6C): tools-first home, About, Work with us.
 * The positioning line, credential, contact details and belief quote come from `brand` and
 * `brandCopy`. Any [[CONTENT NEEDED]] string is dropped on the built site.
 */
export interface HubContent {
  home: {
    /** Two lines, split on \n. First line ink, second accent. */
    headline: string
    /** Link-only card that opens Tadabbur. No ayah text is written into the site (rule 1). */
    ayah: { line: string }
  }
  about: {
    story: string[]
    people: Person[]
    foundation: string[]
    press?: { image: Photo; caption: string }
  }
  /**
   * Photos for the "From our Instagram" strip on the home page, saved from
   * instagram.com/iqrasaurus into apps/hub/assets-src/photos/ and run through `pnpm assets`.
   * While it is empty the strip shows dinos from the pose library and a link to Instagram.
   */
  instagram: Photo[]
  workWithUs: { body: string }
  seo: { home: PageSeo; about: PageSeo; workWithUs: PageSeo }
}
