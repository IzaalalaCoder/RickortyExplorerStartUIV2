'use client';

import { Suspense } from 'react';

import PageAdminCharacters from '@/features/characters/PageAdminCharacters';

export default function Page() {
  return (
    <Suspense>
      <PageAdminCharacters />
    </Suspense>
  );
}
