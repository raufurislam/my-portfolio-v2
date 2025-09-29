import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 chars"),
    technologies: z.array(z.string().min(1)),
    github: z
      .object({
        frontend: z.string().url().optional(),
        backend: z.string().url().optional(),
        monorepo: z.string().url().optional(),
      })
      .optional(),
    liveUrl: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    screenshots: z.array(z.string().url()).optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateProjectSchema = createProjectSchema.partial();
