import { ROUTES_ADMIN } from '@/features/admin/routes';

export const ROUTES_ADMIN_RICK_AND_MORTY_EPISODES = {
  admin: {
    root: () => `${ROUTES_ADMIN.baseUrl()}/episodes`,
  },
} as const;
