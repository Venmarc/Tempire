'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { Library, Heart, LayoutDashboard, User } from 'lucide-react';

interface AuthButtonsProps {
  isMobile?: boolean;
}

export function AuthButtons({ isMobile }: AuthButtonsProps = {}) {
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
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="My Library"
              href="/library"
              labelIcon={<Library className="w-4 h-4" />}
            />
            <UserButton.Link
              label="Wishlist"
              href="/library?tab=wishlist"
              labelIcon={<Heart className="w-4 h-4" />}
            />
            <UserButton.Link
              label="Seller Dashboard"
              href="/seller/dashboard"
              labelIcon={<LayoutDashboard className="w-4 h-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
      ) : isMobile ? (
        <SignInButton mode="modal">
          <button className="flex items-center justify-center w-12 h-12 text-zinc-500 hover:text-white transition-colors">
            <User className="w-6 h-6" />
          </button>
        </SignInButton>
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