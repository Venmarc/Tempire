'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/server/actions/product-actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ProductUploadForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // Basic frontend validation for price
        const price = parseFloat(formData.get('price') as string);
        if (price < 0.50) {
            toast.error("Price must be at least $0.50");
            return;
        }

        startTransition(async () => {
            const result = await createProductAction(formData);

            if (result.error) {
                toast.error(result.error);
                return;
            }

            if (result.success && result.product) {
                toast.success("Product created successfully!");
                // The user decided to redirect to newly created product page:
                // "/products/[id]"
                // However, do we have a product detail page built yet?
                // Phase 2 plan says: "Product detail page + dynamic OG images (later)".
                // Wait, if it doesn't exist, they'll hit a 404. Let's redirect to dashboard for now, or if they really want it, it will just 404 until we build it next. They explicitly said: "Decision: Redirect the seller to the new product detail page (like '/products/[id]') after successful publish".
                
                const isPublished = formData.get('is_published') === 'true';
                if (isPublished) {
                    router.push(`/products/${result.product.id}`);
                } else {
                    router.push('/seller/dashboard');
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/50 p-8 rounded-3xl border border-white/10">
            <div className="space-y-6">
                
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Product Title <span className="text-red-500">*</span></Label>
                    <Input id="title" name="title" required placeholder="e.g. Modern UI Kit" minLength={3} maxLength={100} className="bg-zinc-950" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="Describe your product clearly..." className="bg-zinc-950" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (USD) <span className="text-red-500">*</span></Label>
                        <Input id="price" name="price" type="number" step="0.01" min="0.50" required placeholder="9.99" className="bg-zinc-950" />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                        <select 
                            id="category" 
                            name="category" 
                            required 
                            className="flex h-10 w-full rounded-md border border-input bg-zinc-950 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="">Select a category</option>
                            <option value="Notion Templates">Notion Templates</option>
                            <option value="AI Prompts">AI Prompts</option>
                            <option value="Figma UI Kits">Figma UI Kits</option>
                            <option value="Ebooks">Ebooks</option>
                            <option value="Icons">Icons</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" name="tags" placeholder="e.g. design, figma, dark mode" className="bg-zinc-950" />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image <span className="text-red-500">*</span></Label>
                    <div className="border hover:border-emerald-500/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950">
                        <Input id="coverImage" name="coverImage" type="file" accept="image/*" required className="border-0 p-0 text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer" />
                        <p className="text-xs text-zinc-500 mt-2">Max size: 5MB. Recommended: 1200x630</p>
                    </div>
                </div>

                {/* Product File */}
                <div className="space-y-2">
                    <Label htmlFor="productFile">Product File <span className="text-red-500">*</span></Label>
                    <div className="border hover:border-emerald-500/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950">
                        <Input 
                            id="productFile" 
                            name="productFile" 
                            type="file" 
                            accept=".zip,.pdf,.json,.md,.txt,.png,.jpg,.jpeg,.gif,.webp,.notion,.csv,.xlsx" 
                            required 
                            className="border-0 p-0 text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer" 
                        />
                        <p className="text-xs text-zinc-500 mt-2">
                            Max size: 100MB. Allowed: ZIP, PDF, JSON, MD, TXT, images, CSV, XLSX
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2 border-t border-white/10 pt-6">
                    <Label htmlFor="is_published">Status</Label>
                    <select 
                        id="is_published" 
                        name="is_published" 
                        className="flex h-10 w-full md:w-1/3 rounded-md border border-input bg-zinc-950 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="true">Publish Immediately</option>
                        <option value="false">Save as Draft</option>
                    </select>
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white"
            >
                {isPending ? 'Uploading...' : 'Save Product'}
            </Button>
        </form>
    );
}
