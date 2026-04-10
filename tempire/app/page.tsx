'use client';

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="flex justify-end p-6 gap-4">
        <SignInButton mode="modal">
          Sign In
        </SignInButton>

        <SignUpButton mode="modal">
          Sign Up
        </SignUpButton>

        <UserButton />
      </div>

      <main className="flex min-h-[70vh] flex-col items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-7xl font-semibold tracking-tighter text-white mb-6">
            Tempire
          </h1>
          <p className="text-2xl text-zinc-400 max-w-md mx-auto">
            Premium digital products from independent creators
          </p>
          <div className="mt-12 text-xs text-zinc-500">
            Step 1.3 — Clerk basic (no custom props)
          </div>
        </div>
      </main>
    </div>
  );
}