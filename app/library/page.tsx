import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { LibraryService } from '@/server/services/library';
import { LibraryGrid } from '@/components/marketplace/LibraryGrid';
import { Library, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Library | Tempire',
  description: 'Access and download your purchased digital assets.',
};

export default async function LibraryPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?returnBackUrl=/library');
  }

  const products = await LibraryService.getPurchasedProducts(userId);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div>
            <Link 
              href="/browse" 
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Marketplace
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white flex items-center gap-4">
              <Library className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />
              My Library
            </h1>
            <p className="text-zinc-500 mt-2 text-lg">
              {products.length} assets purchased and ready for download.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-zinc-500 border border-white/5 bg-white/5 px-4 py-2 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Secure Lifetime Access
          </div>
        </div>

        {/* Library Grid */}
        <LibraryGrid products={products} />
      </div>
    </main>
  );
}
