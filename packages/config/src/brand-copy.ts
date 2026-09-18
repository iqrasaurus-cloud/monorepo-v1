/**
 * Short shared lines derived from the owner's "IqraSaurus Brand DNA" guide.
 * Section numbers refer to that document. Used as framing on every site;
 * spoke-specific text lives in each app's content.ts.
 */
export const brandCopy = {
  /** §46 — the deepest brand idea. */
  belief: {
    quote: 'Don’t just give them answers. Give them reasons to wonder.',
    follow: 'Don’t just teach them knowledge. Help them find meaning.',
  },
  /** §14 — the "we tried this" principle. */
  weTriedThis: 'We don’t just tell you what we believe works. We show you what we tried.',
  /** §11 — the learning journey. */
  learningJourney: [
    'See',
    'Wonder',
    'Ask',
    'Explore',
    'Discover',
    'Connect',
    'Reflect',
    'Practise',
    'Share',
  ],
  /** §7 and §9 — the questions each 4-I step invites. */
  journeyPrompts: {
    inspire: ['Look at this.', 'Have you ever wondered…?', 'What do you notice?'],
    investigate: ['What do you think?', 'Why might this happen?', 'What can we find out?'],
    integrate: ['What does Allah teach us through this?'],
    impart: ['Teach someone else.', 'Carry the learning forward.'],
  },
  /** §13 — the Toolkit philosophy. */
  toolkitPrinciple: 'Not “here is our perfect programme”, but “here is something we tried.”',
  /** §20 — how we speak to parents. */
  parents: 'Here’s something small you can try together.',
  /** §21 — how educators can use the Toolkit. */
  educators: ['Take', 'Adapt', 'Improve', 'Share'],
  /** §41 — how the work is sustained. */
  sustain: 'Mission first. Sustainability second.',
} as const
