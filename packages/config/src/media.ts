/**
 * packages/config/src/media.ts
 *
 * The owner's YouTube videos, shown on the sites as click-to-play cards. Nothing loads from
 * YouTube until a visitor presses play; then the video plays from youtube-nocookie.com (the
 * privacy-enhanced player) through <SafeEmbed>. That origin is added to a site's CSP
 * frame-src only when the site shows at least one video.
 *
 * Titles are copied from YouTube as the owner wrote them, with emoji and hashtags left out. `pose` picks the dino on the card
 * from the pose library; the card never shows the YouTube thumbnail.
 *
 * Owner-editable: add, remove or re-order entries; `sites` lists where each one appears
 * ('hub' and/or programme slugs). The first video listed for a site is its featured one.
 */

export type VideoKind = 'video' | 'short'

export interface Video {
  /** The id in the YouTube link, e.g. youtube.com/watch?v=<id> or youtube.com/shorts/<id>. */
  id: string
  title: string
  kind: VideoKind
  /** Where it appears: 'hub' and/or programme slugs. */
  sites: string[]
  /** A pose name from the dino library (packages/ui/src/mascot). */
  pose: string
}

export const youtube = {
  channel: 'https://www.youtube.com/@Iqrasaurus-official',
  embedOrigin: 'https://www.youtube-nocookie.com',
  /** Browser features the player needs inside its frame. */
  allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
} as const

const ALL = ['hub']

export const videos: Video[] = [
  // The trailer is on the older @iqrasaurus channel. It opens every site that has no video of its own.
  {
    id: 'MGFcVdQvt9s',
    title: 'Iqrasaurus Trailer',
    kind: 'video',
    sites: [...ALL, 'quraninvestigators', 'madrasahpreparation', 'quranhadeethdoodling'],
    pose: 'waving-wink',
  },

  // Umrah for Kids
  {
    id: '8ovMRC5enUc',
    title: 'Kids Friendly Umrah - Raudhah for Kids',
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'moon-mosque',
  },
  {
    id: 'aEiTg27O_kI',
    title: 'Iqrasaurus Kids Friendly Umrah - Miqat',
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'backpack-ready',
  },
  {
    id: 'CXRnpYWxaoY',
    title: 'Iqrasaurus Kids Friendly Umrah - Tawaf',
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'making-dua',
  },
  {
    id: 'DYSLUhfYqCQ',
    title: "Iqrasaurus Kids Friendly Umrah - Sa'ee",
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'backpack-walk',
  },
  {
    id: 'psKx3Kor5DA',
    title: 'Iqrasaurus Kids Friendly Umrah - Tahlul',
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'celebrating',
  },
  {
    id: 'of0mgqo8ua4',
    title: 'Iqrasaurus Kids Friendly Umrah - Mount Uhud adventure',
    kind: 'video',
    sites: [...ALL, 'umrahforkids'],
    pose: 'flag-summit',
  },

  // Qurban, Eid al-Adha
  {
    id: 'o06cwd1q1ZU',
    title: 'Qurban Yemen Iqrasaurus',
    kind: 'video',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'heart-gift',
  },

  // Mus'ab ibn Umair series (StoryBuzz). OWNER: please check the thumbnails and videos against
  // CLAUDE.md rule 4 before this goes live; the site itself shows only a dino on the card.
  {
    id: 'CKFPe_onAWY',
    title: 'Daily Companions Musab ibn Umair - Part 1',
    kind: 'video',
    sites: [...ALL, 'storybuzz'],
    pose: 'books-stack',
  },
  {
    id: 'JarXynztYk4',
    title:
      "Mus'ab ibn Umair (Part 1) - The Charming Flower of the Quraysh turned 1st envoy of Islam.",
    kind: 'video',
    sites: [...ALL, 'storybuzz'],
    pose: 'reading-quran',
  },
  {
    id: 'RQDhZBNgoG4',
    title:
      "Mus'ab ibn Umair (Part 2) - The House - Mus'ab's curiosity and wisdom lead him to seek the Prophet..",
    kind: 'video',
    sites: [...ALL, 'storybuzz'],
    pose: 'thinking-questions',
  },

  // Shorts
  {
    id: 'dqpQRgY4DbI',
    title: 'I used to think Qurban was just about meat. I was wrong.',
    kind: 'short',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'surprised',
  },
  {
    id: 'UxpCa4d9es8',
    title: "Daddy said not all Qurbans are accepted. Here's why.",
    kind: 'short',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'thinking-lightbulb',
  },
  {
    id: 'MsnSa--p2JA',
    title: 'Why do we have to use specific animals for Qurban?',
    kind: 'short',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'wondering',
  },
  {
    id: '7GTUYmtPGv0',
    title:
      'Can animals feel scared like we do? I asked Daddy this question… and his answer broke me a little',
    kind: 'short',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'heart-hug',
  },
  {
    id: 'pk1CpkAC7fc',
    title: 'It’s not random. It’s sacred.',
    kind: 'short',
    sites: [...ALL, 'baitimadrasati'],
    pose: 'star-hug',
  },
  {
    id: 'dcgOGc35a9I',
    title: 'I sketched the Qurban story... because my heart needed to see it outside my head.',
    kind: 'short',
    sites: [...ALL, 'quranhadeethdoodling'],
    pose: 'writing',
  },
  {
    id: 'wjsgv3-pkDM',
    title:
      'What happens when a child becomes the story? This is the moment I acted as .... and nearly cried.',
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'superhero-cape',
  },
  {
    id: 'zOobCR8-N7Q',
    title:
      "Mus'ab ibn Umair (Part 3) - The Prophet comforted Mus'ab and filled his heart with peace and wisdom",
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'peaceful-heart',
  },
  {
    id: 'ak3O6MiDyWY',
    title: "Mus'ab ibn Umair (Part 4) - The Mother - He kept his Islam secret to avoid her anger.",
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'thinking-questions',
  },
  {
    id: 'ARbL29TFUYk',
    title:
      "Mus'ab ibn Umair (Part 5) - The Conviction - Mus'ab faced his astonished mother & the Makkan nobles.",
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'amazed-stars',
  },
  {
    id: 'FxpMv5-oF8s',
    title:
      "Mus'ab ibn Umair (Part 6) - He escaped to Abyssinia, where he stayed with fellow believers",
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'globe-hug',
  },
  {
    id: 'n7z891D3rN4',
    title:
      "Mus'ab ibn Umair (Part 7) - Muslims were moved to tears by his transformation from luxury.",
    kind: 'short',
    sites: [...ALL, 'storybuzz'],
    pose: 'grateful',
  },
]

/** The videos one site shows, in list order. */
export const videosFor = (slug: string): Video[] => videos.filter((v) => v.sites.includes(slug))

/** The privacy-enhanced player URL. Starts playing at once, since the visitor just pressed play. */
export const embedUrl = (v: Video): string =>
  `${youtube.embedOrigin}/embed/${v.id}?autoplay=1&rel=0&playsinline=1`

/** The video on YouTube itself, for "Watch on YouTube" links. */
export const watchUrl = (v: Video): string =>
  v.kind === 'short'
    ? `https://www.youtube.com/shorts/${v.id}`
    : `https://www.youtube.com/watch?v=${v.id}`
