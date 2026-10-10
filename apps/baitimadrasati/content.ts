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
      'A mini Hajj practice at home, walking through the rituals of Prophet Ibrahim, was great fun for our children.',
      'New stationery and stamps made our children look forward to the weekly halaqah.',
    ],
    photos: [],
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
