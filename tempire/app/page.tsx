import { AuthButtons } from '@/components/auth/AuthButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">Tempire</h1>
        <p className="text-2xl text-zinc-400 mb-16">
          Premium digital products from independent creators
        </p>

        <AuthButtons />

        <p className="text-xs text-zinc-600 mt-24">
          Phase 1 — Clerk + Supabase server client (profile sync via after-sign-up)
        </p>
      </div>
    </div>
  );
}