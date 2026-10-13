/**
 * Single source of truth for names, contact details and navigation.
 * D-W1: the score is the Behavioural Momentum Score (BMS); athletes see it as
 * Athlete Momentum. Change it here, nowhere else.
 * D-W5: enquiries are email only, to the address below.
 */
export const SITE = {
  name: 'Active AI',
  url: 'https://weareactiveai.com',
  tagline: 'Turning athlete momentum into revenue.',
  description:
    "The behavioural intelligence platform that keeps your customers active, and knows when they're ready to buy. Now choosing a small group of beta partners.",
  ogImage: '/og.png',
} as const;

export const SCORE = {
  name: 'Behavioural Momentum Score',
  abbr: 'BMS',
  /** What the athlete sees in the app. */
  consumer: 'Athlete Momentum',
} as const;

export const COMPANY = {
  legalName: 'Active AI Ltd',
  number: '16499926',
  location: 'Shap, Cumbria',
  /** Registered address used in the legal pages and About page. */
  address: 'The Rockery, Shap, Cumbria, CA10 3LY',
} as const;

export const CONTACT = {
  email: 'holly@weareactiveai.com',
  subject: 'Active AI beta partnership',
  body: [
    'Hi Holly,',
    '',
    "I'd like to talk about becoming an Active AI beta partner.",
    '',
    'Organisation:',
    'My role:',
    'What we have in mind:',
    '',
    'Thanks,',
  ].join('\n'),
} as const;

export const betaMailto = (): string =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.subject)}&body=${encodeURIComponent(CONTACT.body)}`;

export const CTA_LABEL = 'Become a beta partner';

export const NAV = [
  { label: 'Platform', href: '/platform' },
  { label: 'How athletes engage', href: '/#engage' },
  { label: 'Beta programme', href: '/beta-partners' },
  { label: 'About', href: '/about' },
] as const;

/** Old anchors from the single-file site, remapped client-side. */
export const HASH_REDIRECTS: Record<string, string> = {
  triggers: 'moments',
  unlocks: 'moments',
  why: 'solution',
  contact: 'beta',
};

/** Swap the {score} token in content files for the score abbreviation (D-W1). */
export const withScore = (text: string): string => text.replaceAll('{score}', SCORE.abbr);
