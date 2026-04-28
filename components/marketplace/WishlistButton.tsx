'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function WishlistButton() {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);

    const toggleWishlist = () => {
        if (!isSignedIn) {
            toast.info("Sign in to save favorites", {
                description: "You need an account to build your library.",
                action: {
                    label: "Sign In",
                    onClick: () => router.push('/sign-in'),
                },
            });
            return;
        }

        setIsLiked(!isLiked);
        if (!isLiked) {
            toast.success("Added to Wishlist", {
                description: "Wishlist syncing is coming in Phase 4!",
            });
        }
    };

    return (
        <button 
            onClick={toggleWishlist}
            className={cn(
                "w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 active:scale-95 group",
                isLiked 
                    ? "bg-emerald-500 border-emerald-400 text-white" 
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
            )}
        >
            <Heart className={cn("w-6 h-6 transition-transform group-hover:scale-110", isLiked && "fill-current")} />
        </button>
    );
}
