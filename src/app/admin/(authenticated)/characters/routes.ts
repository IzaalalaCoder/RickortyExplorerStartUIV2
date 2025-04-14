import { ROUTES_ADMIN } from '@/features/admin/routes';

export const ROUTES_ADMIN_RICK_AND_MORTY = {
  admin: {
    root: () => `${ROUTES_ADMIN.baseUrl()}/rickandmorty`,
  },
} as const;
