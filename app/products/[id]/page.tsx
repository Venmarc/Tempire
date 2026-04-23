import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductService } from '@/server/services/product';
import { ProductGallery } from '@/components/marketplace/ProductGallery';
import { PurchaseSidebar } from '@/components/marketplace/PurchaseSidebar';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Star, Clock, FileDown, CheckCircle2 } from 'lucide-react';
import { AuthButtons } from '@/components/auth/AuthButtons';

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await ProductService.getProductById(id);
    
    if (!product) {
        return { title: 'Product Not Found | Tempire' };
    }

    return {
        title: `${product.title} | Tempire`,
        description: product.description || `Buy ${product.title} on Tempire.`,
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await ProductService.getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
            {/* Header / Nav */}
            <header className="border-b border-white/10 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
                            T
                        </div>
                        <span className="text-2xl font-bold tracking-tighter hidden md:block">
                            Tempire
                        </span>
                    </Link>
                    <AuthButtons />
                </div>
            </header>

            <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                {/* Breadcrumbs & Back */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center text-sm text-zinc-400 gap-2">
                        <Link href="/" className="hover:text-white flex items-center gap-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Browse
                        </Link>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                        <span className="text-white">{product.category || 'Digital Goods'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Gallery & Details */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Title Section (Mobile/Tablet generally prefers it above image, but 80% shift keeps it clean) */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight mb-4">
                                {product.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-semibold text-[10px]">
                                        {product.creator_name?.charAt(0) || 'C'}
                                    </div>
                                    <span className="text-white font-medium">{product.creator_name || 'Creator'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {/* Mock Rating */}
                                    <Star className="w-4 h-4 text-yellow-500 fill-zinc-950" />
                                    <span className="text-white font-medium">4.9</span> 
                                    <span>(128 ratings)</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <ProductGallery product={product} />

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tighter mb-4">About this product</h2>
                            <div className="prose prose-invert prose-zinc max-w-none">
                                {product.description ? (
                                    <p className="whitespace-pre-line text-zinc-300 leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                ) : (
                                    <p className="text-zinc-500 italic">No description provided.</p>
                                )}
                            </div>
                            
                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-8">
                                    {product.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-zinc-900 border border-white/5 text-zinc-300 text-sm rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mock Technical Specs */}
                        <div className="pt-8 border-t border-white/10">
                            <h2 className="text-2xl font-semibold tracking-tighter mb-6">Technical Details</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><FileDown className="w-4 h-4" /> File Size</div>
                                    <div className="font-medium text-white">12.5 MB <span className="text-xs text-emerald-500 ml-1">Mock</span></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Format</div>
                                    <div className="font-medium text-white">ZIP (Includes PDF, Figma)</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Last Updated</div>
                                    <div className="font-medium text-white">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Purchase Sidebar */}
                    <div className="lg:col-span-4">
                        <PurchaseSidebar product={product} />
                    </div>

                </div>
            </main>
        </div>
    );
}
