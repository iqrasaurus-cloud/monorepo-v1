/**
 * apps/quraninvestigators/content.ts
 *
 * SOURCES USED (owner's own material only):
 *  - QI-097 Al-Qadr "Mini-Juniors" booklet v11 (the printed booklet used in programmes)
 *  - IqraSaurus Catalog 2019 (4-I wording, programme descriptions)
 * NOT USED: the two AI-generated worksheet drafts (Al-Buruj, Az-Zalzalah). Their Arabic
 *  and science facts are unverified, and they follow the 5D structure, not 4-I.
 *
 * Status tags in comments:
 *  DRAFT  = written from the sources above; owner to read and correct
 *  NEEDED = only the owner knows this; placeholder renders until supplied
 *
 * No Quranic Arabic, hadith text or translation appears in this file on purpose.
 * Verse text is shown only inside the owner's own booklet page images.
 */

import type { SpokeContent } from '@iqra/config'

export const content: SpokeContent = {
  hero: {
    eyebrow: 'Toolkit · Quran Investigators',
    // Two lines, split on \n. First line ink, second line accent.
    headline: 'ONE SURAH.\nMANY WAYS IN.', // DRAFT
    intro:
      'Activity booklets that take one surah at a time and let children read it, trace it, count with it, doodle it, question it and explain it to someone else.', // DRAFT
  },

  whatIsIt: {
    // DRAFT — revealed word by word, so keep it to one paragraph.
    body:
      'Quran Investigators is a series of surah-by-surah activity booklets. Each booklet stays with a single surah and approaches it from every side a child already enjoys: stories, colouring, tracing, puzzles, numbers, science, doodling and du\u2019a. Children do not just memorise the surah. They open a mushaf and find it, match each verse to its meaning, and finish by explaining what they discovered to someone else.',
  },

  whyWeCreatedIt: {
    body: [
      // DRAFT — built from the 2019 catalogue line: "genuine learning only happens when our
      // learners are able to grasp the meaning of the verses they are reading".
      'We have long believed that genuine learning happens when children grasp the meaning of the verses they are reading. Many of the children we met could recite a short surah beautifully and still not know what it was about, or where to find it in the mushaf.',
      'We wanted something a parent or teacher could pick up and use straight away: one booklet, one surah, enough variety that a preschooler and a primary-school child could sit at the same table and both have something real to do.',
      '[[CONTENT NEEDED: In your own words — what moment, child or class made you start Quran Investigators? When did it begin?]]', // NEEDED
    ],
  },

  journey: {
    // DRAFT — every example below is a real page from the Al-Qadr booklet.
    inspire: {
      body:
        'Every booklet opens with the adab of seeking knowledge, then the story behind the surah and a picture page to read and colour. Children meet the surah with wonder before any worksheet begins.',
    },
    investigate: {
      body:
        'Children open a real mushaf, hunt for the surah, and write down its number and page. They match each verse to its meaning using a translation, solve puzzles that hide the key facts, and look at the signs around them, such as the phases of the moon or the rings inside a tree trunk.',
    },
    integrate: {
      body:
        'The surah moves into the child\u2019s week. A Quran journaling page asks what they believe and how they will prepare, and they write their own action plan. The booklet suggests small, doable ideas, such as a light switched on as a reminder for the family, or a du\u2019a wish-list.',
    },
    impart: {
      body:
        'Most activities have a second level, and very often it is simply this: explain your doodle to someone else. Children leave as the person who tells the story at home.',
    },
  },

  whatWeDid: {
    body: [
      // DRAFT — facts taken from the Al-Qadr booklet contents page and cover note.
      'Each booklet is around forty pages. The Al-Qadr booklet holds thirty-six activities, and every one is labelled with its place in the 4-I journey and the skill it builds: Quran literacy, Arabic literacy, language, numeracy, science and signs, hadeeth, supplications or creative expression.',
      'Every activity comes in two levels on the same page, so mixed ages can work side by side. The contents page doubles as a checklist children tick off, the first page sets the intention for studying, and the last page is an answer sheet for the adult.',
      'We have used the booklets in our own programmes as a read-along with an adult for preschool to lower primary, as independent work for mid-primary children, and as preparation material for madrasah entrance tests.',
      'The series is based on the Tafseer of Ibn Kathir and the Sahih International translation of the Qur\u2019an. Ahadith quoted in the series come from the Sahih collections of Al-Bukhari and Muslim.',
      '[[CONTENT NEEDED: Where and when have you run Quran Investigators sessions, and roughly how many surahs are covered so far?]]', // NEEDED
    ],
    // OWNER: export these pages from PowerPoint yourself (File > Export > PNG) so the fonts
    // and Arabic stay exactly as printed, then save with these names in assets-src/photos/.
    photos: [
      { src: '/photos/qi-alqadr-p03-story.webp', alt: 'Booklet page: the story behind Surah Al-Qadr with three questions to answer', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p05-visualisation.webp', alt: 'Booklet page: a night scene to read and colour', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p07-surah-hunt.webp', alt: 'Booklet page: finding Surah Al-Qadr in the mushaf and writing its number', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p08-doodling.webp', alt: 'Booklet page: guided Quran doodling with clues about night and time', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p21-moon.webp', alt: 'Booklet page: observing and ordering the phases of the moon', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p31-tree-rings.webp', alt: 'Booklet page: counting tree rings as a sign of Allah', width: 1414, height: 2000 },
      { src: '/photos/qi-alqadr-p38-journaling.webp', alt: 'Booklet page: Quran journaling and a personal action plan', width: 1414, height: 2000 },
    ],
  },

  whatWeObserved: {
    items: [
      // NEEDED — real observations only. Two or three is enough to start.
      { text: '[[CONTENT NEEDED: Something a child said or did during a Quran Investigators session]]' },
      { text: '[[CONTENT NEEDED: Something a parent or teacher told you afterwards]]' },
      { text: '[[CONTENT NEEDED: Which activities children went back to on their own]]' },
      // CANDIDATE from the 2019 catalogue — use only if it was about this kind of session:
      // { text: 'I was amazed on how this simple activity gave children a deeper understanding of the surah.', attribution: 'Sis Sy, programme parent' },
    ],
  },

  whatWeLearned: {
    // NEEDED — this is the heart of a "living record of practice". Be honest about what did not work.
    worked: ['[[CONTENT NEEDED: What worked]]'],
    didnt: ['[[CONTENT NEEDED: What did not work, or worked only for some ages]]'],
    changed: ['[[CONTENT NEEDED: What you changed between versions — this booklet is already v11]]'],
  },

  tryIt: {
    intro: 'You can run a first session at home or in class with one short surah and about forty minutes.', // DRAFT
    steps: [
      // DRAFT — mirrors the booklet's own sequence.
      'Begin with intention. Read the etiquettes of seeking knowledge together and let each child say why they are learning today.',
      'Tell the story behind the surah, then give children a picture page to colour while you talk about it.',
      'Open a real mushaf. Let the children find the surah, its number and its page themselves.',
      'Choose three or four activities from different areas, such as one tracing, one puzzle and one science page. Start everyone on Level 1.',
      'Offer Level 2 to children who are ready. Often it is simply: explain it to someone else.',
      'Close with the journaling page. Each child writes or draws one thing they will do this week because of the surah.',
    ],
    // download: { label: 'Sample pages (PDF)', href: '' }, // OWNER: add when you have a sample to share
  },

  adaptIt: {
    body: [
      // DRAFT
      'The two levels on every page are there so you can adapt without preparing twice. With younger children, do fewer pages and read everything aloud. With older children, hand over the mushaf and the translation and let them lead.',
      'Swap the everyday contexts for ones your learners know. Counting, rhyming and spot-the-difference pages work with any local example.',
      'If you make your own pages, copy Quranic text from a printed mushaf rather than retyping it, keep to sources your asatizah recognise, and ask them to check anything you are unsure of.',
    ],
  },

  workWithUs: {
    body: [
      'If you would like to run Quran Investigators in your madrasah, centre or home-learning group, or help us test a new surah booklet, we would love to hear from you.', // DRAFT
    ],
    contactHref: '', // NEEDED — e.g. 'mailto:…'. The 2019 catalogue addresses may be out of date.
    contactLabel: 'Get in touch',
  },

  supportUs: {
    body: [
      'Quran Investigators is shared so that others can use it, adapt it and carry it forward. Your support helps us prepare, check and print the next surah.', // DRAFT
    ],
  },

  seo: {
    title: 'Quran Investigators — IqraSaurus Toolkit',
    description:
      'Surah-by-surah activity booklets from IqraSaurus. Children find the surah in the mushaf, match verses to meanings, investigate, doodle, journal and explain it to others.',
  },
}
