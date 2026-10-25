/**
 * apps/quranhadeethdoodling/content.ts — the five-section programme page.
 *
 * SOURCES: the founder interview of 2026-10-11 (doodling for children too young to write,
 * hadeeth doodling, the weekly family halaqah, stationery and stamps, satellite centres).
 * DRAFT: the session steps and tips are drafted from how the founder describes the work.
 * OWNER: please check them against how a real session runs.
 *
 * No Quranic Arabic, hadith text or translation appears in this file on purpose.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'Children draw what a surah or hadeeth means to them, before they can write it down.',
    useAtHome: ['tadabbur'],
  },

  whatItIs: {
    body: [
      'We started Quran doodling in our weekly family halaqah. Our children were too young to write much about a surah, so we asked them to draw their reflection instead. We soon saw that hadeeth work the same way, and added hadeeth doodling.',
      'Children use stamps and new stationery to draw one idea from the surah or hadeeth and what it means for their day.',
      'As children grow older and write more, doodling leads into reflection journaling and our Quran Investigators booklets. We run doodling sessions at our satellite centres in Bukit Batok and Tampines.',
      '[[CONTENT NEEDED: which surahs and ahadeeth you have doodled so far, and the ages that join]]',
    ],
    sources: '[[CONTENT NEEDED: which translation and hadeeth collections the sessions use]]',
    photos: [],
  },

  session: {
    duration: '[[CONTENT NEEDED: how long a session runs]]',
    steps: {
      inspire: 'We read a short surah or hadeeth together and explain its meaning in simple words.',
      investigate: 'Children pick one picture, word or idea from it and ask their questions about it.',
      integrate: 'They doodle what that idea looks like in their own day, at home, at school or with friends.',
      impart: 'Each child shows their doodle and explains it to the group or to someone at home.',
    },
    tips: {
      younger: 'Let them stamp and colour. A few words, or none, is fine.',
      older: 'Ask for a short sentence under the doodle, then move on to reflection journaling.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only.
    quotes: [{ text: '[[CONTENT NEEDED: something a child said about their doodle]]' }],
    lessons: [
      'Our children looked forward to the weekly halaqah because there were always new stationery and stamps to try.',
      'Doodling worked while our children were too young to write much. As they grew older, we moved them on to reflection journaling, which became Quran Investigators.',
    ],
    // Real photos from the owner's library (approved in the review, 2026-10-25). Faces blurred unless cleared.
    photos: [
      { src: '/photos/seen-qhd-al-maun-cover.webp', alt: 'The cover of the Doodle with Surah Al-Maun workbook', caption: 'Doodle with Surah Al-Maun workbook', width: 1165, height: 1600 }, // library IQ-0016
      { src: '/photos/seen-qhd-al-maun-panels.webp', alt: 'A comic-panel doodle page for one verse', caption: 'One verse, one comic panel', width: 1147, height: 1600 }, // library IQ-0016
      { src: '/photos/seen-qhd-ghashiyah-cover.webp', alt: 'A hand-folded yellow booklet titled Surah Al-Ghashiyah', caption: 'A child’s folded Al-Ghashiyah booklet', width: 1166, height: 1600 }, // library IQ-0092
      { src: '/photos/seen-qhd-ghashiyah-spread.webp', alt: 'Inside the folded booklet: drawings and short reflections on the surah', caption: 'Her doodles and reflections inside', width: 1600, height: 1124 }, // library IQ-0092
      { src: '/photos/seen-qhd-fatihah-alamin.webp', alt: 'A scrapbook card about the Lord of the worlds, with foam sea and land animals', caption: 'Al-Fatihah scrapbook cards', width: 1600, height: 1121 }, // library IQ-0005
      { src: '/photos/seen-qhd-fatihah-path.webp', alt: 'A scrapbook card about the straight path, drawn as a ruler and a dashed road', caption: '“Guide us to the straight path”, as a child pictured it', width: 1600, height: 1144 }, // library IQ-0005
    ],
  },

  bringIt: {
    body: 'Want to run Quran & Hadeeth Doodling in your class, madrasah, centre or home halaqah?',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: 'Quran & Hadeeth Doodling | IqraSaurus',
    description:
      'Doodling sessions from IqraSaurus where children draw what a surah or hadeeth means to them, before they are old enough to write it down.',
  },
}
