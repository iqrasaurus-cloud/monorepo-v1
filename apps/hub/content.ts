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
    story: ['[[CONTENT NEEDED: how IqraSaurus began and what it does today, in your own words]]'],
    people: [
      { name: '[[CONTENT NEEDED: name]]', role: '[[CONTENT NEEDED: what they bring]]' },
    ],
    foundation: ['[[CONTENT NEEDED: what "our foundation" means for IqraSaurus]]'],
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
    body: 'Want to run one of our programmes in your madrasah, centre or home group, or help us test new material? Get in touch.',
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
