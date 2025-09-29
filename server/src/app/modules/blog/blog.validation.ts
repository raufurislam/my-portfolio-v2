import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content is too short"),
    thumbnail: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    thumbnail: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  }),
});
