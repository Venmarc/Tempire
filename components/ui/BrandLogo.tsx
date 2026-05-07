'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
    variant?: 'colored' | 'white';
    className?: string;
    size?: number;
}

/**
 * BrandLogo Component
 * Handles the Tempo.svg logo with support for both original purple 
 * and a high-contrast white version using CSS filters.
 */
export function BrandLogo({ variant = 'colored', className, size = 32 }: BrandLogoProps) {
    return (
        <div 
            className={cn(
                "relative transition-all duration-500",
                // Use a CSS filter to turn the purple SVG into white
                variant === 'white' && "brightness-0 invert", 
                className
            )}
            style={{ width: size, height: size }}
        >
            <Image
                src="/logo.svg"
                alt="Tempire Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}
