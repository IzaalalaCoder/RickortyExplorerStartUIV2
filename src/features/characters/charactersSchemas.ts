import { z } from 'zod';

export type Character = z.infer<ReturnType<typeof zCharacter>>;

export const zCharacter = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    species: z.string(),
    type: z.string(),
    gender: z.string(),
    origin: z.object({
      name: z.string(),
      url: z.string(),
    }),
    location: z.object({
      name: z.string(),
      url: z.string(),
    }),
    image: z.string(),
    episode: z.array(z.string()),
    url: z.string(),
    created: z.string(),
  });
