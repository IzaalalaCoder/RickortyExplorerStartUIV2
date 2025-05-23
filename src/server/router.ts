import { createTRPCRouter } from '@/server/config/trpc';
import { accountRouter } from '@/server/routers/account';
import { authRouter } from '@/server/routers/auth';
import { oauthRouter } from '@/server/routers/oauth';
import { repositoriesRouter } from '@/server/routers/repositories';
import { usersRouter } from '@/server/routers/users';

import { charactersRouter } from './routers/characters';
import { episodesRouter } from './routers/episodes';
import { locationsRouter } from './routers/locations';

/**
 * This is the primary router for your server.
 *
 * All routers added in /src/server/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  auth: authRouter,
  oauth: oauthRouter,
  locations: locationsRouter,
  episodes: episodesRouter,
  characters: charactersRouter,
  repositories: repositoriesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
