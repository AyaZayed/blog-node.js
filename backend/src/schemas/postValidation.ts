import { z } from "zod";

export const createPostSchema = z.object({
   body: z.object({
      title: z.string().max(120),
      content: z.string().min(150),
      thumbnail: z.string(),
      isPublished: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      isFeatured: z.boolean().optional(),
      images: z
         .array(z.object({ url: z.string(), caption: z.string() }))
         .optional(),
      publishedAt: z.date().optional(),
   }),
});

export const queryPostsSchema = z.object({
   query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      tag: z.string().optional(),
   }),
});
