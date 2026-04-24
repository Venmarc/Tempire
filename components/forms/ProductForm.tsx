'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/server/actions/product-actions';
import { updateProductAction } from '@/server/actions/seller-mutations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Product } from '@/types/product';

interface ProductFormProps {
    initialData?: Product;
}

/** Extract a clean display name from a storage URL or plain filename */
function getDisplayName(urlOrName: string): string {
    return decodeURIComponent(urlOrName.split('/').pop() ?? urlOrName);
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isEditing = !!initialData;

    // Track user-picked files so we can show their names
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile]   = useState<string | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef  = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const price = parseFloat(formData.get('price') as string);
        if (price < 0.50) {
            toast.error("Price must be at least $0.50");
            return;
        }

        startTransition(async () => {
            const result = isEditing 
                ? await updateProductAction(initialData.id, formData)
                : await createProductAction(formData);

            if (result.error) {
                toast.error(result.error);
                return;
            }

            if (result.success && result.product) {
                toast.success(isEditing ? "Product updated!" : "Product created!");
                
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
                    <Input 
                        id="title" 
                        name="title" 
                        required 
                        defaultValue={initialData?.title}
                        placeholder="e.g. Modern UI Kit" 
                        minLength={3} 
                        maxLength={100} 
                        className="bg-zinc-950" 
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                        id="description" 
                        name="description" 
                        defaultValue={initialData?.description || ''}
                        placeholder="Describe your product clearly..." 
                        className="bg-zinc-950 min-h-[120px]" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (USD) <span className="text-red-500">*</span></Label>
                        <Input 
                            id="price" 
                            name="price" 
                            type="number" 
                            step="0.01" 
                            min="0.50" 
                            required 
                            defaultValue={initialData ? (initialData.price / 100) : ''}
                            placeholder="9.99" 
                            className="bg-zinc-950" 
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                        <select 
                            id="category" 
                            name="category" 
                            required 
                            defaultValue={initialData?.category || ''}
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
                    <Input 
                        id="tags" 
                        name="tags" 
                        defaultValue={initialData?.tags?.join(', ')}
                        placeholder="e.g. design, figma, dark mode" 
                        className="bg-zinc-950" 
                    />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label htmlFor="coverImage">
                        Cover Image {isEditing ? '(Leave empty to keep current)' : <span className="text-red-500">*</span>}
                    </Label>
                    <div className="border hover:border-emerald-500/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950">
                        {/* Custom file picker — hides native "No file chosen" text */}
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => imageInputRef.current?.click()}
                                className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm px-4 py-2 h-auto"
                            >
                                Choose File
                            </Button>
                            <span className={`text-sm truncate max-w-[320px] ${
                                selectedImage
                                    ? 'text-emerald-400'
                                    : isEditing && initialData?.image_url
                                        ? 'text-emerald-400/70'
                                        : 'text-zinc-500'
                            }`}>
                                {selectedImage
                                    ? selectedImage
                                    : isEditing && initialData?.image_url
                                        ? `✓ ${getDisplayName(initialData.image_url)}`
                                        : 'No file chosen'}
                            </span>
                        </div>
                        {/* Hidden real input */}
                        <input
                            ref={imageInputRef}
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            accept="image/*"
                            required={!isEditing}
                            className="sr-only"
                            onChange={(e) => {
                                const name = e.target.files?.[0]?.name ?? null;
                                setSelectedImage(name);
                            }}
                        />
                        <p className="text-xs text-zinc-500 mt-3">Max size: 5MB. Recommended: 1200x630</p>
                    </div>
                </div>

                {/* Product File */}
                <div className="space-y-2">
                    <Label htmlFor="productFile">
                        Product File {isEditing ? '(Leave empty to keep current)' : <span className="text-red-500">*</span>}
                    </Label>
                    <div className="border hover:border-emerald-500/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950">
                        {/* Custom file picker — hides native "No file chosen" text */}
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full text-sm px-4 py-2 h-auto"
                            >
                                Choose File
                            </Button>
                            <span className={`text-sm truncate max-w-[320px] ${
                                selectedFile
                                    ? 'text-emerald-400'
                                    : isEditing && initialData?.file_url
                                        ? 'text-emerald-400/70'
                                        : 'text-zinc-500'
                            }`}>
                                {selectedFile
                                    ? selectedFile
                                    : isEditing && initialData?.file_url
                                        ? `✓ ${getDisplayName(initialData.file_url)}`
                                        : 'No file chosen'}
                            </span>
                        </div>
                        {/* Hidden real input */}
                        <input
                            ref={fileInputRef}
                            id="productFile"
                            name="productFile"
                            type="file"
                            accept=".zip,.pdf,.json,.md,.txt,.png,.jpg,.jpeg,.gif,.webp,.notion,.csv,.xlsx"
                            required={!isEditing}
                            className="sr-only"
                            onChange={(e) => {
                                const name = e.target.files?.[0]?.name ?? null;
                                setSelectedFile(name);
                            }}
                        />
                        <p className="text-xs text-zinc-500 mt-3">
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
                        defaultValue={initialData ? initialData.is_published.toString() : "true"}
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
                className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white min-w-[150px]"
            >
                {isPending ? 'Processing...' : (isEditing ? 'Update Product' : 'Save Product')}
            </Button>
        </form>
    );
}
