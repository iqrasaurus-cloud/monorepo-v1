/**
 * apps/storybuzz/content.ts — the five-section programme page.
 *
 * SOURCES: the founder interview of 2026-10-11 (StoryBus, EduDrama, stories of the prophets,
 * the mini Hajj practice, satellite centres). StoryBus and EduDrama were merged into
 * StoryBuzz on 2026-10-04.
 * DRAFT: the session steps and tips are drafted from how the founder describes the work.
 * OWNER: please check them against how a real session runs.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'True stories of the prophets, told aloud and acted out by children.',
    useAtHome: ['tadabbur'],
  },

  whatItIs: {
    body: [
      'StoryBuzz brings together our storytelling sessions (StoryBus) and our drama sessions (EduDrama). The stories are true ones from the Quran: the prophets, the hardships they faced and how they turned to Allah.',
      'We began with our own children. They grew up on stories of the prophets in place of fairy tales, because we wanted them ready for hard days and rooted in faith. When other parents asked how we told the stories at home, we opened the sessions to their children, and later to the public.',
      'Drama came from reflecting on the Hajj rituals of Prophet Ibrahim (peace be upon him). With our homeschooled children we walked through a mini Hajj practice, step by step. We have run StoryBuzz sessions at our satellite centres in Bukit Batok and Tampines, and at schools and kindergartens that invited us.',
      '[[CONTENT NEEDED: when StoryBus and EduDrama started, and roughly how many children have joined]]',
    ],
    photos: [],
  },

  session: {
    duration: '[[CONTENT NEEDED: how long a session runs]]',
    steps: {
      inspire: 'Children hear the story of one prophet, told aloud with props and questions along the way.',
      investigate:
        'We pause at the hardest moment in the story and ask what the children notice and what they would have done.',
      integrate: 'Children talk about a hard moment of their own and how they can turn to Allah in it.',
      impart: 'They act the story out in a short drama, then retell it to their family at home.',
    },
    tips: {
      younger: 'Keep the story short and give each child a simple role or prop.',
      older: 'Let them write or direct part of the drama themselves.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only.
    quotes: [{ text: '[[CONTENT NEEDED: something a child said or did during a session]]' }],
    lessons: [
      'Our own children enjoyed sharing the stories with their friends. That is how the first sessions for other families began.',
      'The mini Hajj practice, acting out the rituals of Prophet Ibrahim, was great fun for our children.',
    ],
    photos: [],
  },

  bringIt: {
    body: 'Want a StoryBuzz storytelling or drama session at your kindergarten, madrasah, centre or home group?',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: 'StoryBuzz | IqraSaurus',
    description:
      'Storytelling and drama sessions from IqraSaurus: true stories of the prophets from the Quran, told aloud and acted out by children.',
  },
}
