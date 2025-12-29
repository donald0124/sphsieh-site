// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        // 為了相容 publishedDate 和 pubDate，我們做個轉換
        pubDate: z.union([z.string(), z.date()])
            .transform((str) => new Date(str))
            .or(z.string().transform((str) => new Date(str))), 
        category: z.string().default('Tech'),
        tags: z.array(z.string()).default([]),
        description: z.string().optional(),
    }),
});

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        sortOrder: z.number().default(99),
        category: z.string().optional(),
        description: z.string().optional(),
        // 重點：允許 null 也允許 undefined (不填)
        image: z.string().nullable().optional(),
        demoLink: z.string().nullable().optional(), 
        repoLink: z.string().nullable().optional(),
        techStack: z.array(z.string()).default([]),
    })
});

export const collections = { posts, projects };