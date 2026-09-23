import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Every figure on the site carries a label (D-W4). */
const stat = z.object({
  value: z.string(),
  text: z.string(),
  label: z.enum(['modelled', 'illustrative']),
});

// D-W2: three public unlocks only. Do not add more entries here.
const unlocks = defineCollection({
  loader: file('src/content/unlocks.json'),
  schema: z.object({
    name: z.string(),
    window: z.string(),
    moment: z.string(),
    rate: stat.optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const team = defineCollection({
  loader: file('src/content/team.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    short: z.string(),
    bio: z.string(),
    headshot: z.string().optional(),
    order: z.number(),
  }),
});

const engage = defineCollection({
  loader: file('src/content/engage.json'),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    intro: z.string(),
    stats: z.array(stat),
    points: z.array(z.string()).length(3),
    privacy: z.string(),
    screens: z.array(z.object({ name: z.string(), alt: z.string() })),
    order: z.number(),
  }),
});

const science = defineCollection({
  loader: file('src/content/science.json'),
  schema: z.object({
    name: z.string(),
    researchers: z.string().optional(),
    athlete: z.string(),
    product: z.string(),
    order: z.number(),
  }),
});

// Empty for now; add one Markdown file per question.
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({ question: z.string(), order: z.number().default(0) }),
});

export const collections = { unlocks, team, engage, science, faq };
