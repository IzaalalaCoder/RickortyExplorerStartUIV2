import { z } from 'zod';

import { zCharacter } from '@/features/characters/charactersSchemas';
import { createTRPCRouter, protectedProcedure } from '@/server/config/trpc';

export const charactersRouter = createTRPCRouter({
  get: protectedProcedure({ authorizations: ['ADMIN'] })
    .meta({
      method: 'GET',
      path: '/characters',
      protect: true,
      tags: ['characters'],
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
        items: z.array(zCharacter()),
        nextCursor: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const currentPage = input.cursor ?? 1;
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`
      );
      const data = await res.json();
      if (!data.results) {
        throw new Error('Aucun personnage trouvé');
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
