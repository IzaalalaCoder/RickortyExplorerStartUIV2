import { ROUTES_ADMIN } from '@/features/admin/routes';

export const ROUTES_ADMIN_RICK_AND_MORTY_LOCATIONS = {
  admin: {
    root: () => `${ROUTES_ADMIN.baseUrl()}/locations`,
  },
} as const;
