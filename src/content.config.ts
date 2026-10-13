import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// D-W2 (October deck): the nine moments are public, with their windows. No
// conversion rates, trigger conditions or thresholds belong here.
const moments = defineCollection({
  loader: file('src/content/moments.json'),
  schema: z.object({
    name: z.string(),
    window: z.string(),
    summary: z.string().optional(),
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
    headline: z.string(),
    intro: z.string(),
    callout: z.object({ value: z.string(), text: z.string() }).optional(),
    points: z.array(z.string()).length(3),
    privacy: z.string(),
    /** `file` is the PNG name in src/assets/screens. */
    screens: z.array(z.object({ file: z.string(), name: z.string(), alt: z.string() })),
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

export const collections = { moments, team, engage, science, faq };
