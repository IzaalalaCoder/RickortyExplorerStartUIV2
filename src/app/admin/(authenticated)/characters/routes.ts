import { ROUTES_ADMIN } from '@/features/admin/routes';

export const ROUTES_ADMIN_RICK_AND_MORTY_CHARACTERS = {
  admin: {
    root: () => `${ROUTES_ADMIN.baseUrl()}/characters`,
  },
} as const;
