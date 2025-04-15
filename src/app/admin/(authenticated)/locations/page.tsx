'use client';

import { Suspense } from 'react';

import PageAdminLocations from '@/features/locations/PageAdminLocations';

export default function Page() {
  return (
    <Suspense>
      <PageAdminLocations />
    </Suspense>
  );
}
