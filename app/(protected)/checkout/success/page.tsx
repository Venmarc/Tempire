import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SuccessPageClient from './SuccessPageClient';

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    }>
      <SuccessPageClient />
    </Suspense>
  );
}
