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
import { cn } from '@/lib/utils';

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

    // Track form state for the submit button
    const [title, setTitle] = useState(initialData?.title || '');
    const [price, setPrice] = useState(initialData?.price ? (initialData.price / 100).toString() : '');
    const [category, setCategory] = useState(initialData?.category || '');

    const [actionValue, setActionValue] = useState<"draft" | "publish">("draft");

    // Track user-picked files so we can show their names
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile]   = useState<string | null>(null);

    const hasImage = !!selectedImage || (isEditing && !!initialData?.image_url);
    const hasFile = !!selectedFile || (isEditing && !!initialData?.file_url);
    
    const isValidForPublish = title.trim().length >= 3 && price && parseFloat(price) >= 0.50 && category && hasImage && hasFile;
    const isValidForDraft = title.trim().length >= 3;

    const imageInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef  = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("action", actionValue);
        
        if (actionValue === "publish") {
            const priceVal = parseFloat(formData.get('price') as string);
            if (isNaN(priceVal) || priceVal < 0.50) {
                toast.error("Price must be at least $0.50 to publish");
                return;
            }
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
                
                const isPublished = actionValue === 'publish';
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Modern UI Kit" 
                        minLength={3} 
                        maxLength={100} 
                        className="bg-zinc-950/50 border-white/5 focus-visible:border-primary" 
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
                        className="bg-zinc-950/50 border-white/5 focus-visible:border-primary min-h-[120px]" 
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="9.99" 
                            className="bg-zinc-950/50 border-white/5 focus-visible:border-primary" 
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                        <select 
                            id="category" 
                            name="category" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex h-10 w-full rounded-md border-white/5 bg-zinc-950/50 px-3 py-2 text-sm border focus-visible:outline-none focus-visible:border-primary"
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
                        className="bg-zinc-950/50 border-white/5 focus-visible:border-primary" 
                    />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                    <Label htmlFor="coverImage">
                        Cover Image {isEditing ? '(Leave empty to keep current)' : <span className="text-red-500">*</span>}
                    </Label>
                    <div className="border hover:border-primary/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950/50">
                        {/* Custom file picker — hides native "No file chosen" text */}
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => imageInputRef.current?.click()}
                                className="shrink-0 rounded-full h-auto"
                            >
                                Choose File
                            </Button>
                            <span className={`text-sm truncate max-w-[320px] ${
                                selectedImage
                                    ? 'text-primary'
                                    : isEditing && initialData?.image_url
                                        ? 'text-primary/70'
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
                    <div className="border hover:border-primary/50 transition-colors border-white/10 rounded-md p-4 bg-zinc-950/50">
                        {/* Custom file picker — hides native "No file chosen" text */}
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 rounded-full h-auto"
                            >
                                Choose File
                            </Button>
                            <span className={`text-sm truncate max-w-[320px] ${
                                selectedFile
                                    ? 'text-primary'
                                    : isEditing && initialData?.file_url
                                        ? 'text-primary/70'
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

                {/* Status dropdown removed */}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <Button 
                    type="submit" 
                    onClick={() => setActionValue('draft')}
                    disabled={isPending || !isValidForDraft} 
                    variant="secondary"
                    className="w-full sm:w-auto min-w-[150px] font-medium bg-transparent border border-white/10 hover:bg-white/5"
                >
                    {isPending && actionValue === 'draft' ? 'Saving...' : 'Save as Draft'}
                </Button>
                <Button 
                    type="submit" 
                    onClick={() => setActionValue('publish')}
                    disabled={isPending || !isValidForPublish} 
                    className="w-full sm:w-auto min-w-[150px] font-bold bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                >
                    {isPending && actionValue === 'publish' ? 'Publishing...' : 'Publish Now'}
                </Button>
            </div>
        </form>
    );
}
