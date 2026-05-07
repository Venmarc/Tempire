import { Suspense } from 'react';
import { LibrarySkeleton } from './LibrarySkeleton';
import LibraryClient from './LibraryClient';

export const dynamic = 'force-dynamic';

export default function LibraryPage() {
  return (
    <Suspense fallback={<LibrarySkeleton />}>
      <LibraryClient />
    </Suspense>
  );
}
