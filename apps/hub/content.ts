/**
 * apps/hub/content.ts — iqrasaurus.com (BUILD_SPEC.md section 6C).
 *
 * The positioning line, credential, contact details and the belief quote come from the
 * shared `brand` and `brandCopy` settings, so they are not repeated here.
 *
 * [[CONTENT NEEDED]] lines are for the owner to fill in. They are hidden on the built site,
 * and an About section with nothing real in it does not render.
 */

import type { HubContent } from '@iqra/config'

export const content: HubContent = {
  home: {
    headline: 'Something meaningful to do\nwith your child today',
    // Link-only card: it opens Tadabbur. No ayah text is written into this site (CLAUDE.md rule 1).
    ayah: { line: 'One ayah a day, in our Tadabbur app.' },
  },

  about: {
    // From the founder interview of 2026-10-11. OWNER: please check the wording and the partner names.
    story: [
      'IqraSaurus began with our son. At about five, he did not like reading Iqra, so we made it a game. He loved Thomas the Train, so we built a card game around it.',
      'We raised our children on true stories of the prophets and the hardships they went through, in place of fairy tales. We wanted them to grow up rooted in faith, and to come back to Allah when life is hard, including on the day we are no longer with them.',
      'Our children enjoyed sharing what they learned with their friends, and their friends’ families asked to join. Over the years the sessions grew from a few families we knew into programmes open to the public: storytelling and drama, Quran and hadeeth doodling, reflection journaling and Quran Investigators, Madrasah Entrance Test preparation, and Umrah for Kids.',
      'Today we run programmes at satellite centres in Bukit Batok and Tampines, and schools and kindergartens such as Brainy Bunch invite us to run sessions with their children. We also train teachers.',
      'With Little Caliph we worked on a tafsir book for primary school children. The asatizah wrote the tafsir, and we wrote the tadabbur part, with activities built on the eight multiple intelligences.',
      '[[CONTENT NEEDED: the year IqraSaurus started, and the other schools and centres that have invited you]]',
    ],
    people: [
      { name: '[[CONTENT NEEDED: name]]', role: '[[CONTENT NEEDED: what they bring]]' },
    ],
    foundation: [
      'We want to raise resilient children who stay rooted in faith and turn to Allah when they meet hardship. That is why we start with true stories from the Quran.',
      'Every programme ends with the child doing something with what they learned and passing it on. We want children to see themselves as agents of change, with a mission on this earth.',
    ],
    // Real press clipping (owner-supplied).
    press: {
      image: {
        src: '/photos/press-beritaharian-2016.webp',
        alt: 'Berita Harian newspaper feature on IqraSaurus, 23 December 2016',
        width: 1280,
        height: 720,
      },
      caption: 'Berita Harian, 23 December 2016 — on how IqraSaurus began.',
    },
  },

  workWithUs: {
    body: 'Want to run one of our programmes in your madrasah, centre or home group, or help us test new material? Get in touch. Our founder’s advice to anyone starting something similar: be creative, always seek Allah’s help, and pray istikharah.',
  },

  seo: {
    home: {
      title: 'IqraSaurus | Something meaningful to do with your child today',
      description:
        'A family-led Dakwah initiative from Singapore helping children discover, understand and live Islam. Tools to use at home, and the programmes we run.',
    },
    about: {
      title: 'About | IqraSaurus',
      description: 'Who we are, how we teach with the 4-I method, and who guides us.',
    },
    workWithUs: {
      title: 'Work with us | IqraSaurus',
      description: 'Bring an IqraSaurus programme to your madrasah, centre or home group, or help us test new material.',
    },
  },
}
