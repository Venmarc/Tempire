import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">Tempire</h1>
        <p className="text-2xl text-zinc-400 mb-16">Premium digital products from independent creators</p>

        <div className="flex justify-center gap-4 mb-12">
          <SignInButton mode="modal">
            <button className="px-8 py-3.5 bg-white text-black rounded-2xl font-medium hover:bg-zinc-100 transition-colors">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-8 py-3.5 border border-white/30 hover:bg-white/10 rounded-2xl font-medium transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </div>

        <div className="mt-8">
          <UserButton afterSignOutUrl="/" />
        </div>

        <p className="text-xs text-zinc-600 mt-24">
          Phase 1 — Clerk + Supabase server client (profile sync via after-sign-up)
        </p>
      </div>
    </div>
  );
}