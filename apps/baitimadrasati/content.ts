/**
 * apps/baitimadrasati/content.ts — the five-section programme page.
 *
 * SOURCES: the founder interview of 2026-10-11 (homeschooling, the weekly family halaqah,
 * the mini Hajj practice, parents asking how the family teaches at home).
 * DRAFT: the interview does not describe Baiti Madrasati by name. This page reads it as
 * "learning Islam at home", from what the founder says about homeschooling.
 * OWNER: please confirm that is what the programme is, and check the session steps and tips.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'How our homeschooling family learns Islam at home, shared so other families can try it.',
    useAtHome: ['tadabbur', 'calendar'],
  },

  whatItIs: {
    body: [
      'Baiti Madrasati means “my home is my school”. We homeschool our children, and this programme shares what we do at home so other families can try it.',
      'The heart of our week is a halaqah for the children. We take a surah, a hadeeth or a story of a prophet, and the children doodle it, journal about it or act it out. Once we turned the Hajj rituals of Prophet Ibrahim into a mini Hajj practice at home.',
      'Parents often ask how we tell the stories and teach belief at home. Baiti Madrasati is where we share it.',
      '[[CONTENT NEEDED: what families receive or attend, for example a guide, a workshop or a weekly plan]]',
    ],
    photos: [],
  },

  session: {
    duration: '[[CONTENT NEEDED: how long a home halaqah runs]]',
    steps: {
      inspire: 'Start the halaqah with a story, a question or something new on the table, such as a stamp or a fresh notebook.',
      investigate: 'Read the meaning of the surah or the story together and let the children ask their questions first.',
      integrate: 'Agree on one thing the family will do this week because of it.',
      impart: 'Children share what they learned with a grandparent, a cousin or a friend.',
    },
    tips: {
      younger: 'Keep it short and hands-on: doodles, stamps and acting.',
      older: 'Move to reflection journaling and ask what the surah asks of them this week.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only.
    quotes: [{ text: '[[CONTENT NEEDED: something a parent told you after trying this at home]]' }],
    lessons: [
      'A mini Hajj practice at home, walking through the rituals of Prophet Ibrahim (peace be upon him), was great fun for our children.',
      'New stationery and stamps made our children look forward to the weekly halaqah.',
    ],
    // Real photos from the owner's library (approved in the review, 2026-10-25). Faces blurred unless cleared.
    photos: [
      { src: '/photos/seen-bm-corridor-tent.webp', alt: 'A family tent pitched in the corridor outside a flat', caption: 'A night of camping, right outside our door', width: 803, height: 600 }, // library IQ-0066
      { src: '/photos/seen-bm-cleaning-chicken.webp', alt: 'Two children in plastic gloves cleaning chicken at the kitchen sink', caption: 'Everyone has a role: preparing dinner', width: 803, height: 600 }, // library IQ-0017
      { src: '/photos/seen-bm-picking-limes.webp', alt: 'A child picking limes from a potted tree into a yellow bowl', caption: 'Picking limes we grew', width: 1600, height: 1200 }, // library IQ-0059
      { src: '/photos/seen-bm-ironing.webp', alt: 'A boy ironing a shirt', caption: 'Ironing his own shirt', width: 1200, height: 1600 }, // library IQ-0034
      { src: '/photos/seen-bm-quran-at-the-beach.webp', alt: 'Quran study books on a folding stool at the beach', caption: 'Taking our Quran books to the beach', width: 1200, height: 1600 }, // library IQ-0034
      { src: '/photos/seen-bm-deer-farm.webp', alt: 'Children walking a garden path and collecting saga seeds at a deer farm', caption: 'Collecting saga seeds at a deer farm', width: 600, height: 600 }, // library IQ-0066
    ],
  },

  bringIt: {
    body: 'Homeschooling, or want to start a weekly halaqah at home? Ask us how we run ours.',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: 'Baiti Madrasati | IqraSaurus',
    description:
      'How an IqraSaurus homeschooling family learns Islam at home: a weekly halaqah with stories, doodling and journaling, shared for other families to try.',
  },
}
