import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date().optional(), // 兼容Obsidian date 字段
      published: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional().default(""),
      image: z.string().optional().default(""),
      tags: z.array(z.string()).optional().default([]),
      category: z.string().optional().default(""),
      lang: z.string().optional().default(""),

      /* For internal use */
      prevTitle: z.string().default(""),
      prevSlug: z.string().default(""),
      nextTitle: z.string().default(""),
      nextSlug: z.string().default(""),
    })
    .transform((data) => {
      // 自动将 date 赋值给 published（如果 published 不存在）
      return {
        ...data,
        published: data.published ?? data.date, // 使用 ?? 避免 falsy 值问题
      };
    }),
});

export const collections = {
  posts: postsCollection,
};