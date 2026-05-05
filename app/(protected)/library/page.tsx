import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import LibraryClient from './LibraryClient';

export const dynamic = 'force-dynamic';

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    }>
      <LibraryClient />
    </Suspense>
  );
}
