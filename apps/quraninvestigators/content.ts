/**
 * apps/quraninvestigators/content.ts — the five-section programme page.
 *
 * SOURCES (owner's own material only):
 *  - QI-097 Al-Qadr "Mini-Juniors" booklet v11 and its sample pages
 *  - Draft copy in tadabbur-for-kids-v1/docs/BRAND-SITE-REVIEW.md §3, approved in direction
 *    by the owner on 2026-10-04
 *  - The founder interview of 2026-10-11 (how the booklets grew from doodling and journaling)
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 *
 * No Quranic Arabic, hadith text or translation appears in this file on purpose.
 * Verse text is shown only inside the owner's own booklet page images.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'Activity booklets that help children explore one surah at a time.',
    // Cover banner of the Al-Qadr booklet this page is built from.
    image: {
      src: '/photos/qi-alqadr-banner.webp',
      alt: 'Surah Al-Qadr Quran Investigator booklet cover banner',
      width: 600,
      height: 203,
    },
    useAtHome: ['tadabbur', 'museum'],
  },

  whatItIs: {
    body: [
      'Each booklet covers one surah in about 40 pages. Children find the surah in a mushaf, match each ayah to its meaning, then colour, count, solve puzzles and doodle. Every page has two levels, so a 5-year-old and a 10-year-old can work at the same table.',
      'We have used the booklets in our own classes, at home, and to prepare children for madrasah entrance tests.',
      'Quran Investigators grew out of our family halaqah. When our children were small, they doodled their reflections on a surah. As they grew older, we moved to reflection journaling and asked how they could apply each surah in their own lives. The booklets came from that.',
      '[[CONTENT NEEDED: when Quran Investigators started and how many surahs are covered so far]]',
    ],
    sources:
      'The series is based on the Tafseer of Ibn Kathir and the Sahih International translation of the Qur’an. Ahadith quoted in the series come from the Sahih collections of Al-Bukhari and Muslim.',
    // Real sample pages from the Al-Qadr booklet, repeated once to reach the six photos
    // the scrolling gallery needs. OWNER: replace the repeats as more pages are exported.
    photos: [
      { src: '/photos/qi-alqadr-p10-matching.webp', alt: 'Booklet page 10: a Quranic literacy matching activity, pairing each verse of Surah Al-Qadr with its meaning', width: 950, height: 1344 },
      { src: '/photos/qi-alqadr-p11-quickfacts.webp', alt: 'Booklet page 11: an Islamic knowledge word-puzzle activity, unscrambling letters to find quick facts about Surah Al-Qadr', width: 950, height: 1344 },
      { src: '/photos/qi-alqadr-p12-hiddenfacts.webp', alt: 'Booklet page 12: a numeracy activity, finding the crescent moon and Ka’bah hidden in a night scene', width: 950, height: 1344 },
      { src: '/photos/qi-alqadr-p10-matching.webp', alt: 'Booklet page 10: a Quranic literacy matching activity, pairing each verse of Surah Al-Qadr with its meaning', width: 950, height: 1344 },
      { src: '/photos/qi-alqadr-p11-quickfacts.webp', alt: 'Booklet page 11: an Islamic knowledge word-puzzle activity, unscrambling letters to find quick facts about Surah Al-Qadr', width: 950, height: 1344 },
      { src: '/photos/qi-alqadr-p12-hiddenfacts.webp', alt: 'Booklet page 12: a numeracy activity, finding the crescent moon and Ka’bah hidden in a night scene', width: 950, height: 1344 },
    ],
  },

  session: {
    duration: 'About 40 minutes',
    steps: {
      inspire:
        'Read the etiquettes of learning together. Tell the story behind the surah while the children colour the picture page.',
      investigate:
        'Children find the surah in a real mushaf and note its number and page. Then pick 3–4 activities, such as one tracing, one puzzle and one science page.',
      integrate:
        'On the journaling page, each child writes or draws one thing they will do this week because of the surah.',
      impart: 'Each child explains their doodle to someone at home.',
    },
    tips: {
      younger: 'Do fewer pages and read everything aloud.',
      older: 'Hand them the mushaf and the translation and let them lead.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only. This section appears on the site as soon
    // as one real item is here.
    quotes: [
      { text: '[[CONTENT NEEDED: something a child said or did during a session]]' },
      { text: '[[CONTENT NEEDED: something a parent or teacher told you afterwards]]' },
    ],
    lessons: [
      'Doodling suited our children while they were too young to write much. Journaling, and then the booklets, came as they grew older.',
      '[[CONTENT NEEDED: what worked, what did not, and what you changed between versions]]',
    ],
    // Real photos from the owner's library (approved in the review, 2026-10-25). Faces blurred unless cleared.
    photos: [
      { src: '/photos/seen-qi-module-1-2018.webp', alt: 'A Quran Investigators group with their teacher on a field trip', caption: 'Module 1 group, Aug–Oct 2018', width: 580, height: 238 }, // library IQ-0075
      { src: '/photos/seen-qi-science-centre-2018.webp', alt: 'Children drawing on clipboards at the Science Centre', caption: 'Surah Al-Kautsar trip to the Science Centre, Sept 2018', width: 400, height: 445 }, // library IQ-0075
      { src: '/photos/seen-qi-ar-raudhah-minbar.webp', alt: 'Children gathered at the minbar of Ar-Raudhah Mosque with a teacher', caption: 'Surah Al-Kafirun field trip, Ar-Raudhah Mosque', width: 680, height: 540 }, // library IQ-0075
      { src: '/photos/seen-qi-papaya-tree.webp', alt: 'Children pointing up at a papaya tree full of fruit', caption: 'Spotting signs in a mosque garden', width: 380, height: 475 }, // library IQ-0075
      { src: '/photos/seen-qi-sand-tray.webp', alt: 'Children sifting sand and glitter in a tray during an experiment', caption: 'A hands-on experiment at a home session', width: 440, height: 440 }, // library IQ-0075
      { src: '/photos/seen-qi-al-fil-cover.webp', alt: 'The cover of the Quran Investigators booklet for Surah Al-Fil', caption: 'One of our early booklet covers, 2018–2019', width: 1055, height: 1600 }, // library IQ-0100
    ],
  },

  bringIt: {
    body: 'Want to use Quran Investigators in your madrasah, centre or home group, or help test a new booklet?',
    donateLine: 'Donations pay for checking and printing the next surah.',
  },

  seo: {
    title: 'Quran Investigators | IqraSaurus',
    description:
      'Activity booklets from IqraSaurus that help children explore one surah at a time: find it in the mushaf, match each ayah to its meaning, then colour, count and doodle.',
  },
}
