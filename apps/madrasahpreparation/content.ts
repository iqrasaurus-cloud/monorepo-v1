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
    // Real photos from the owner's library (approved in the review, 2026-10-25). Faces blurred unless cleared.
    photos: [
      { src: '/photos/seen-mp-counting-six.webp', alt: 'A child lines up six red counters beside a number peg', caption: 'Counting practice, June 2022', width: 1200, height: 1600 }, // library IQ-0009
      { src: '/photos/seen-mp-counting-four.webp', alt: 'A boy counts four counters beside a number peg', caption: 'One counter for each number', width: 1200, height: 1600 }, // library IQ-0009
      { src: '/photos/seen-mp-counting-table.webp', alt: 'Three children around a small table counting with counters and number pegs', caption: 'A small group at work', width: 1200, height: 1600 }, // library IQ-0009
      { src: '/photos/seen-mp-colour-mixing.webp', alt: 'A child mixing paint colours on a worksheet', caption: 'Colour mixing', width: 1200, height: 1600 }, // library IQ-0033
      { src: '/photos/seen-mp-plasticine-green.webp', alt: 'A child shaping green plasticine on a table', caption: 'Shaping with plasticine', width: 1200, height: 1600 }, // library IQ-0034
      { src: '/photos/seen-mp-plasticine-orange.webp', alt: 'A boy rolling orange plasticine into shapes', caption: 'Fine motor practice', width: 1200, height: 1600 }, // library IQ-0034
    ],
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
