import { z } from 'zod';

export type Episode = z.infer<ReturnType<typeof zEpisode>>;

export const zEpisode = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
    characters: z.array(z.string()),
    url: z.string(),
    created: z.string(),
  });
