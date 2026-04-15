'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthButtons() {
  const { isLoaded, isSignedIn } = useUser();

  // While Clerk is loading → show skeleton to prevent layout shift
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3 md:gap-4">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {isSignedIn ? (
        // Signed in → show UserButton
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-full",
            },
          }}
        />
      ) : (
        // Signed out → show buttons
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