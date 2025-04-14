import { z } from 'zod';

import { zCharacter } from '@/features/characters/charactersSchemas';
import { createTRPCRouter, protectedProcedure } from '@/server/config/trpc';

export const charactersRouter = createTRPCRouter({
  get: protectedProcedure({ authorizations: ['ADMIN'] })
    .meta({
      method: 'GET',
      path: '/characters',
      protect: true,
      tags: ['rickandmorty'],
    })
    .input(
      z
        .object({
          page: z.number(),
        })
        .default({ page: 1 })
    )
    .output(
      z.object({
        items: z.array(zCharacter()),
      })
    )
    .query(async ({ input }) => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${input.page}`
      );
      const data = await res.json();

      if (!data.results) {
        throw new Error('Aucun personnage trouvé');
      }
      return {
        items: data.results,
      };
    }),
});
