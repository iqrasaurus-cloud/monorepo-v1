/**
 * apps/umrahforkids/content.ts — the five-section programme page.
 *
 * SOURCES: the founder interview of 2026-10-11 (seerah woven into drama, rhymes, worksheets,
 * pre- and post-trip workshops near Arab Street, storytelling and books during the trip,
 * the drama facing Mount Uhud and storytelling at the foot of the mountain).
 * DRAFT: the session steps and tips are drafted from how the founder describes the work.
 * OWNER: please check them, and the name of the hill where the drama took place.
 *
 * The at-home paragraph, the Umrah tool under "Use this at home" and the three pictures in "What it is"
 * come from the Umrah for Kids tool (tools repo, docs/specs/umrah.md section 4; owner OK 2026-10-28).
 * The pictures are copied by scripts/sync-umrah-samples.mjs. Add the shop link once the pack is on sale.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site;
 * "What we've seen" stays hidden until it holds at least one real quote, lesson or photo.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    line: 'Stories, drama and rhymes that prepare children for Umrah, before, during and after the trip.',
    useAtHome: ['umrah', 'duas'],
  },

  whatItIs: {
    body: [
      'Umrah for Kids helps children understand what they will see and do on Umrah. We weave the seerah into drama and make up rhymes so the children remember the steps and the stories behind them. Each child gets worksheets and a book we made for the trip.',
      'At home, families can get ready with Umrah for Kids, our free tool: one short step a day for 29 days, from making the intention and packing the bag to tawaf, sa’ee and coming home. The packing-list page from its paper pack is free to print from the tool’s Print tab.',
      'Before the trip we run a workshop for the children near Arab Street, and another one after the families come home.',
      'During the Umrah itself we hold storytelling sessions. In Madinah, the children acted out a drama on the hill facing Mount Uhud and listened to a story at the foot of the mountain.',
      '[[CONTENT NEEDED: which year(s) you ran it, and which travel agency or group it was with]]',
    ],
    // From the Umrah for Kids tool: scripts/sync-umrah-samples.mjs (pictures made with ChatGPT's image tools, chosen by the owner)
    photos: [
      { src: '/photos/ufk-model-tawaf.webp', alt: 'The IqraSaurus dino walking round a model of the Ka’bah on a mat at home', width: 1600, height: 1600 },
      { src: '/photos/ufk-sample-packing.webp', alt: 'A black-and-white page to colour: the dino packs a bag, with a packing list to tick and a corner to draw in', width: 1600, height: 2264 },
      { src: '/photos/ufk-passport.webp', alt: 'My Umrah passport: 29 circles to draw a stamp in, one for each step of the journey', width: 1600, height: 2264 },
    ],
  },

  session: {
    duration: '[[CONTENT NEEDED: how long the workshops run]]',
    steps: {
      inspire: 'In the pre-trip workshop, children hear the stories of the places they are about to visit.',
      investigate: 'Through drama, rhymes and worksheets, they work out what happens at each step of Umrah and why.',
      integrate: 'On the trip, storytelling at the places themselves connects what they learned to what they see.',
      impart: 'In the post-trip workshop, children share what they saw and what stayed with them.',
    },
    tips: {
      younger: 'Lean on the rhymes and the acting. They carry the steps better than explanations.',
      older: 'Give them the worksheets and the book to fill in during the trip.',
    },
  },

  seen: {
    // OWNER: real quotes, lessons and photos only.
    quotes: [{ text: '[[CONTENT NEEDED: something a child said during or after the trip]]' }],
    lessons: ['The children enjoyed the drama on the hill facing Mount Uhud very much.'],
    // Real photos from the owner's library (approved in the review, 2026-10-25). Faces blurred unless cleared.
    photos: [
      { src: '/photos/seen-ufk-pop-up-kabah.webp', alt: 'A pop-up Ka’bah on a black card storyboard with a torn-paper sky', caption: 'A child’s pop-up Hajj storyboard', width: 1600, height: 1441 }, // library IQ-0027
      { src: '/photos/seen-ufk-hajj-route.webp', alt: 'A storyboard showing the Hajj route from the miqat to Muzdalifah in seven steps', caption: 'Mapping the journey, step by step', width: 1600, height: 1130 }, // library IQ-0027
    ],
  },

  bringIt: {
    body: 'Taking children on Umrah, or organising a family Umrah trip? Talk to us about workshops and storytelling for the children.',
    donateLine: '[[CONTENT NEEDED: what donations pay for]]',
  },

  seo: {
    title: 'Umrah for Kids | IqraSaurus',
    description:
      'IqraSaurus prepares children for Umrah with seerah drama, rhymes and worksheets, storytelling during the trip, and workshops before and after.',
  },
}
