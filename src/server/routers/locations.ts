import { z } from 'zod';

import { zLocation } from '@/features/locations/locationsSchemas';
import { createTRPCRouter, protectedProcedure } from '@/server/config/trpc';

export const locationsRouter = createTRPCRouter({
  get: protectedProcedure({ authorizations: ['ADMIN'] })
    .meta({
      method: 'GET',
      path: '/locations',
      protect: true,
      tags: ['rickandmorty'],
    })
    .input(
      z
        .object({
          cursor: z.number().optional(),
        })
        .default({})
    )
    .output(
      z.object({
        items: z.array(zLocation()),
        nextCursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const currentPage = input.cursor ?? 1;
      const res = await fetch(
        `https://rickandmortyapi.com/api/location?page=${currentPage}`
      );
      const data = await res.json();
      if (!data.results) {
        throw new Error('Aucun lieu trouvé');
      }

      const nextPage: typeof input.cursor | undefined = data.info.next
        ? currentPage + 1
        : undefined;
      return {
        items: data.results,
        nextCursor: nextPage,
      };
    }),
});
