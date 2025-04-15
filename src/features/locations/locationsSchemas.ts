import { z } from 'zod';

export type Location = z.infer<ReturnType<typeof zLocation>>;

export const zLocation = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    dimension: z.string(),
    residents: z.array(z.string()),
    url: z.string(),
    created: z.string(),
  });
