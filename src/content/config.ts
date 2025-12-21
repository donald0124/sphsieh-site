import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        publishedDate: z.string().transform((str) => new Date(str)).or(z.date()),
        category: z.enum(['medical', 'tech', 'life']).default('tech'),
        description: z.string().optional(),
        // content is implicit
    }),
});

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        sortOrder: z.number().default(99),
        category: z.string(),
        image: z.string().nullable().optional(),
        demoLink: z.string().url().nullable().optional(),
        repoLink: z.string().url().nullable().optional(),
        description: z.string(),
    })
});

export const collections = { posts, projects };
