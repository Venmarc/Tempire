'use client';

import { UserButton, useClerk } from '@clerk/nextjs';
import { useState } from 'react';

export function AuthButtons() {
  const { openSignIn, openSignUp } = useClerk();
  const [status, setStatus] = useState('');

  const handleSignIn = () => {
    openSignIn({ mode: 'modal' });
  };

  const handleSignUp = () => {
    openSignUp({ mode: 'modal' });
  };

  return (
    <>
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={handleSignIn}
          className="px-8 py-3.5 bg-white text-black rounded-2xl font-medium hover:bg-zinc-100 transition-colors"
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          className="px-8 py-3.5 border border-white/30 hover:bg-white/10 rounded-2xl font-medium transition-colors"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-8">
        <UserButton />
      </div>

      {status && <p className="mt-8 text-sm text-zinc-400">{status}</p>}
    </>
  );
}