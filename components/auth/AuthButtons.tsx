'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthButtons() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse border border-white/5" aria-hidden="true" />
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {isSignedIn ? (
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-full",
            },
          }}
        />
      ) : (
        <>
          <SignInButton mode="modal">
            <button className="px-5 py-2 text-sm font-medium hover:bg-white/10 rounded-2xl transition-colors border border-white/20 whitespace-nowrap">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-2xl hover:bg-zinc-100 transition-colors whitespace-nowrap">
              Sign Up
            </button>
          </SignUpButton>
        </>
      )}
    </div>
  );
}