/**
 * apps/madrasahpreparation/content.ts — the five-section programme page.
 *
 * SOURCES: the founder interview of 2026-10-11 (Madrasah Entrance Test Preparation, METP,
 * with Islamic values; started for the founder's own children; few providers in the west of
 * Singapore) and the Quran Investigators page (booklets used for entrance-test preparation).
 * DRAFT: the session steps and tips are drafted from how the founder describes the work.
 * OWNER: please check them against how a real lesson runs.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'Getting children ready for the Madrasah Entrance Test, with Islamic values in every lesson.',
    useAtHome: ['numbers', 'hafiz'],
  },

  whatItIs: {
    body: [
      'Madrasah Preparation, our Madrasah Entrance Test Preparation (METP) programme, gets children ready for the Madrasah Entrance Test. Each lesson also carries an Islamic value the child can practise.',
      'We started it for our own children. It was hard to find a provider in the west of Singapore, so we built our own programme and then opened it to other families.',
      'Our Quran Investigators booklets are part of the preparation.',
      '[[CONTENT NEEDED: which subjects the lessons cover, class size, the age group, and where classes run]]',
    ],
    photos: [],
  },

  session: {
    duration: '[[CONTENT NEEDED: how long a lesson runs]]',
    steps: {
      inspire: 'Each lesson opens with a short story or question that carries the value of the day.',
      investigate:
        'Children work through practice questions like the ones in the entrance test, and talk through how they reached each answer.',
      integrate: 'We link the value back to their own day, such as being honest when checking their own work.',
      impart: 'Children take one practice page home and explain it to a parent.',
    },
    tips: {
      younger: 'For children not yet reading on their own, read each question aloud.',
      older: 'For confident readers, time a few questions so the test day feels familiar.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only.
    quotes: [{ text: '[[CONTENT NEEDED: something a parent told you after the entrance test]]' }],
    lessons: ['[[CONTENT NEEDED: what worked in preparing children, and what you changed]]'],
    photos: [],
  },

  bringIt: {
    body: 'Preparing your child for the Madrasah Entrance Test, or want to run this programme at your centre? Talk to us.',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: 'Madrasah Preparation | IqraSaurus',
    description:
      'Madrasah Entrance Test preparation from IqraSaurus in Singapore, with an Islamic value the child can practise in every lesson.',
  },
}
