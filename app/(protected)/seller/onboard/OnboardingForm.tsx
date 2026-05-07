'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CheckCircle2, ArrowRight, Store, Sparkles, LayoutGrid } from 'lucide-react';
import { becomeSellerAction } from '@/server/actions/onboarding-actions';

const CATEGORIES = [
    'AI Prompts', 'Notion Templates', 'Figma Kits', 'Ebooks', 
    'Icons', 'Framer Templates', 'Tools', 'Graphics'
];

export function OnboardingForm() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [isPending, startTransition] = useTransition();
    
    const [bio, setBio] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(prev => prev.filter(c => c !== category));
        } else {
            setSelectedCategories(prev => [...prev, category]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (selectedCategories.length === 0) {
            toast.error("Please select at least one category.");
            return;
        }
        if (!termsAccepted) {
            toast.error("You must accept the terms to become a seller.");
            return;
        }

        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('categories', JSON.stringify(selectedCategories));
        formData.append('termsAccepted', termsAccepted ? 'true' : 'false');

        startTransition(async () => {
            const result = await becomeSellerAction({}, formData);
            if (result.error) {
                toast.error(result.error);
                if (result.fieldErrors) {
                    console.error("Field errors:", result.fieldErrors);
                }
            } else if (result.success) {
                toast.success("Welcome to Tempire! You are now a seller.");
                // Crucial: reload the user session to get the new role
                await user?.reload();
                router.push('/seller/dashboard');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Bio Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-500" />
                        What do you plan to sell?
                    </label>
                    <span className="text-xs font-bold text-zinc-600">
                        {bio.length}/500
                    </span>
                </div>
                <Textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 500))}
                    placeholder="Tell us a bit about the digital assets you create..."
                    className="h-32 bg-zinc-900/50 border-white/5 rounded-2xl focus-visible:ring-emerald-500/20 text-sm resize-none"
                    required
                />
            </div>

            {/* Categories Section */}
            <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-emerald-500" />
                    Select Categories
                </label>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(category => {
                        const isSelected = selectedCategories.includes(category);
                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => toggleCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                                    isSelected 
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                                        : "bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10 hover:bg-zinc-800"
                                )}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Terms Section */}
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex items-start gap-4">
                <button
                    type="button"
                    onClick={() => setTermsAccepted(!termsAccepted)}
                    className={cn(
                        "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        termsAccepted 
                            ? "bg-emerald-500 border-emerald-500 text-black" 
                            : "border-white/20 hover:border-emerald-500/50"
                    )}
                >
                    {termsAccepted && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-white">I agree to the Seller Terms & Conditions</p>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        By becoming a seller, I agree to only upload high-quality, original digital assets that I have the right to distribute. I understand that Tempire reserves the right to remove any content that violates these guidelines.
                    </p>
                </div>
            </div>

            {/* Submit Button */}
            <Button 
                type="submit" 
                disabled={isPending || !termsAccepted || selectedCategories.length === 0 || !bio.trim()}
                className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg transition-all active:scale-[0.98] group disabled:opacity-50"
            >
                {isPending ? (
                    "Activating Account..."
                ) : (
                    <>
                        Activate Seller Account
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </Button>
        </form>
    );
}
