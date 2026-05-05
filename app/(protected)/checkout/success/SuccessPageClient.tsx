'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20">
      <div className="max-w-xl w-full text-center px-6">
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h1 className="text-5xl font-bold tracking-tighter mb-4 text-white">Purchase Successful!</h1>
        <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
          Your order has been confirmed. You can now download your digital assets directly from your library or view order details.
        </p>

        {orderId && (
          <div className="mb-12 inline-block px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-sm text-zinc-500 font-mono">
            Order ID: {orderId}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button asChild className="h-14 rounded-2xl bg-white text-black hover:bg-zinc-200">
            <Link href="/library">
              <Download className="mr-2 w-5 h-5" />
              Go to My Library
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-14 rounded-2xl border-white/10 hover:bg-white/5">
            <Link href="/">
              <Package className="mr-2 w-5 h-5" />
              Continue Browsing
              <ArrowRight className="ml-2 w-4 h-4 opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
