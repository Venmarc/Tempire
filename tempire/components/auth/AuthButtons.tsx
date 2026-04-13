'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function AuthButtons() {
  const { isLoaded, isSignedIn } = useUser();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowButtons(!isSignedIn);
    }
  }, [isLoaded, isSignedIn]);

  // Show nothing until Clerk loads (prevents flash)
  if (!isLoaded) {
    return <div className="w-8 h-8" />; // minimal placeholder
  }

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {showButtons ? (
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
      ) : (
        <div className="ml-1">
          <UserButton />
        </div>
      )}
    </div>
  );
}