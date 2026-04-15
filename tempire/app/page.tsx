import { AuthButtons } from '@/components/auth/AuthButtons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Clickable Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
              T
            </div>
            <span className="text-2xl font-bold tracking-tighter hidden md:block">
              Tempire
            </span>
          </Link>

          <AuthButtons />
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-24 text-center flex-1">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Premium digital products from independent creators
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
          AI prompts, Notion templates, Figma UI kits, and more — all from creators who ship.
        </p>
      </main>

      {/* Footer - Phase 1 Complete */}
      <footer className="text-xs text-zinc-600 text-center py-8 border-t border-white/10 mt-auto">
        Phase 1 Complete — Clerk + Supabase server-only (RBAC via publicMetadata + webhook sync)
      </footer>
    </div>
  );
}