import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One folder per post, one file per locale:
 *   src/content/blog/<slug>/en.md
 *   src/content/blog/<slug>/sr.md
 * Both are required — src/lib/blog.ts fails the build if either is missing.
 */
const blog = defineCollection({
  loader: glob({ pattern: '*/{en,sr}.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** Drafts render in `astro dev` only. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
