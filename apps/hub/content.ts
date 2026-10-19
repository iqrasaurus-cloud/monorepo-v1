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

  // OWNER: photos saved from instagram.com/iqrasaurus (put the files in assets-src/photos/,
  // run `pnpm assets`, then list them here with alt text). Until then the strip shows dinos.
  instagram: [],

  workWithUs: {
    body: 'Want to run one of our programmes in your madrasah, centre or home group, or help us test new material? Get in touch. Our founder’s advice to anyone starting something similar: be creative, always seek Allah’s help, and pray istikharah.',
  },

  // "How we use AI" (owner approved 2026-10-19, including the MUIS sentence). Structure after
  // Yaqeen Institute's essay on its AI use; wording our own. Credential and contact come from `brand`.
  ai: {
    lede: 'IqraSaurus is a family-led Dakwah initiative from Singapore. We teach children in person, and we build free tools that parents and teachers use with children at home and in class. AI tools help us build them. This page explains what we use AI for, what we never use it for, and who checks the work.',
    sections: [
      {
        title: 'Where we stand',
        paragraphs: [
          'We treat AI as a tool that may be used with care and within Islamic limits. What matters is what it is used for and who stands behind the result. The responsibility for everything we share stays with us, the people who share it.',
          'We agree with what MUIS has said publicly: AI should not be anyone’s main source of religious guidance, and questions of religion need recognised asatizah. Our tools offer reflection and practice, never rulings.',
        ],
      },
      {
        title: 'We are exploring, and moving quickly',
        paragraphs: [
          'We are in an early, exploratory stage, and we are moving fast on purpose. We try ideas with real children and families, keep what helps and drop what doesn’t. So some of what you see is a first version. A few things may reach you before every detail has had a full review, and before we have heard from the wider community. When something is still a draft, we label it. When you tell us something is wrong, we fix it.',
        ],
      },
      {
        title: 'What we use AI for',
        items: [
          { lead: 'Building the tools:', text: 'writing and testing the code behind Tadabbur, Mini Hafiz, Numbersaurus, the Calendar and the others.' },
          { lead: 'First drafts of guides and activities:', text: 'the 4-I guides in Tadabbur, the number cards in Numbersaurus and the Calendar’s family activities. A person reads every one before it is shared.' },
          { lead: 'Pictures:', text: 'our dino and all our illustrations, in colour and in black-and-white line art, were made with ChatGPT’s image tools on a paid plan. We choose every picture and check it against our rules before it is used.' },
          { lead: 'Translation drafts:', text: 'the Malay version of our pages is drafted with AI and marked as a draft until a person checks it.' },
          { lead: 'Writing help:', text: 'first drafts of web pages, printable packs and campaign text, which we then edit.' },
          { lead: 'A helper chat', text: 'on some programme pages that answers only from material we have prepared. It is a helper, not a religious authority.' },
        ],
      },
      {
        title: 'What we never use AI for',
        items: [
          { lead: 'Quranic Arabic, hadith and their translations.', text: 'AI never writes, completes, translates or corrects them. The Quran text and its translations in our tools come from QuranExcel (quranexcel.com), copied by program and never retyped. Hadith references are checked by people.' },
          { lead: 'Rulings, fatwas or personal religious advice.', text: 'For these, please ask a recognised asatizah.' },
          { lead: 'Pictures of prophets or companions,', text: 'or realistic pictures of any real person.' },
          { lead: 'Made-up testimonials, numbers or quotes.', text: '' },
          { lead: 'Collecting children’s data.', text: 'The tools need no login, and a child’s progress stays on their own device.' },
        ],
      },
      {
        title: 'Who checks',
        items: [
          { lead: 'Our asatizah', text: 'review every Numbersaurus card and every Calendar activity before it is published. They review Tadabbur guides first for ayat that need extra care. A guide shows who checked it.' },
          { lead: 'Our team', text: 'reads everything else before it is shared.' },
          { lead: 'Where something has not yet had an asatizah review,', text: 'we say so. Part of what supporters fund is asatizah time to review every guide.' },
        ],
      },
      {
        title: 'Tell us when we get it wrong',
        paragraphs: [
          'AI can be wrong while sounding sure, including about Islam. If something in our tools or pages is wrong, or doesn’t sit right with you, please tell us. We will correct it, and we are grateful to everyone who helps us get it right.',
          'We will update this page as our practice changes and as guidance from scholars develops.',
        ],
        contact: true,
      },
    ],
    updated: 'Last updated: 19 October 2026',
  },

  seo: {
    ai: {
      title: 'How we use AI | IqraSaurus',
      description: 'What IqraSaurus uses AI for, what we never use it for, and who checks the work.',
    },
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
