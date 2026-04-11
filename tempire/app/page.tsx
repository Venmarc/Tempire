'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Auth Controls */}
      <div className="flex justify-end p-6 gap-4">
        <SignInButton mode="modal">
          <button className="px-6 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-sm font-medium transition-colors">
            Sign In
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="px-6 py-2.5 rounded-2xl bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors">
            Sign Up
          </button>
        </SignUpButton>

        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main Content */}
      <main className="flex min-h-[70vh] flex-col items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-7xl font-semibold tracking-tighter text-white mb-6">
            Tempire
          </h1>
          <p className="text-2xl text-zinc-400 max-w-md mx-auto">
            Premium digital products from independent creators
          </p>
          <div className="mt-12 text-xs text-zinc-500">
            Phase 1 Foundation — Clerk stable (no SignedIn/SignedOut)
          </div>
        </div>
      </main>
    </div>
  );
}