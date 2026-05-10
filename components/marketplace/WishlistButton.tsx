'use client';

import { useState, useTransition, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { toggleWishlistAction, getWishlistStatusAction } from '@/server/actions/wishlist-actions';

interface WishlistButtonProps {
    productId: string;
    initialIsLiked?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function WishlistButton({ 
    productId, 
    initialIsLiked = false, 
    className,
    size = 'md'
}: WishlistButtonProps) {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isPending, startTransition] = useTransition();

    // Sync with server state if initialIsLiked is provided later (e.g. from a parent)
    useEffect(() => {
        setIsLiked(initialIsLiked);
    }, [initialIsLiked]);

    // If initialIsLiked wasn't provided, fetch it (useful for standalone buttons)
    useEffect(() => {
        if (isSignedIn && !initialIsLiked) {
            getWishlistStatusAction(productId).then(res => {
                if (res.isInWishlist) setIsLiked(true);
            });
        }
    }, [isSignedIn, productId, initialIsLiked]);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isSignedIn) {
            toast.info("Sign in to save favorites", {
                description: "You need an account to build your wishlist.",
                action: {
                    label: "Sign In",
                    onClick: () => router.push('/sign-in'),
                },
            });
            return;
        }

        // Optimistic UI update
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);

        startTransition(async () => {
            const result = await toggleWishlistAction(productId);
            if (result.error) {
                toast.error(result.error);
                setIsLiked(!newLikedState); // Rollback
            } else {
                if (newLikedState) {
                    toast.success("Added to Wishlist");
                }
            }
        });
    };

    const sizeClasses = {
        sm: "w-9 h-9",
        md: "w-11 h-11",
        lg: "w-12 h-12"
    };

    const iconClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    return (
        <button 
            onClick={handleToggle}
            disabled={isPending}
            className={cn(
                "rounded-2xl border flex items-center justify-center transition-all duration-300 active:scale-95 group",
                sizeClasses[size],
                isLiked 
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20",
                className
            )}
        >
            <Heart 
                className={cn(
                    "transition-transform group-hover:scale-110", 
                    iconClasses[size],
                    isLiked && "fill-current"
                )} 
            />
        </button>
    );
}
