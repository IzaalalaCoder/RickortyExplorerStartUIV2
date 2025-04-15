import { z } from 'zod';

import { zEpisode } from '@/features/episodes/episodesSchemas';

import { createTRPCRouter, protectedProcedure } from '../config/trpc';

export const episodesRouter = createTRPCRouter({
  get: protectedProcedure({ authorizations: ['ADMIN'] })
    .meta({
      path: '/episodes',
      protect: true,
      method: 'GET',
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
        items: z.array(zEpisode()),
        nextCursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const currentPage = input.cursor ?? 1;
      const res = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${currentPage}`
      );

      const data = await res.json();
      if (!data.results) {
        throw new Error('Aucun épisode trouvé');
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
