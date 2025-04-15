'use client';

import { Suspense } from 'react';

import PageAdminEpisodes from '@/features/episodes/PageAdminEpisodes';

export default function Page() {
  return (
    <Suspense>
      <PageAdminEpisodes />
    </Suspense>
  );
}
