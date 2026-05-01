import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductService } from '@/server/services/product';
import { ProductGallery } from '@/components/marketplace/ProductGallery';
import { PurchaseSidebar } from '@/components/marketplace/PurchaseSidebar';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Star, Clock, FileDown, CheckCircle2 } from 'lucide-react';
import { WishlistButton } from '@/components/marketplace/WishlistButton';

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

    const priceLabel = product.price === 0
        ? 'Free'
        : `$${(product.price / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    const ogUrl = new URL('/api/og', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    ogUrl.searchParams.set('title', product.title);
    ogUrl.searchParams.set('price', priceLabel);
    ogUrl.searchParams.set('creator', product.creator_name || 'Creator');
    ogUrl.searchParams.set('category', product.category || 'Digital Goods');

    return {
        title: `${product.title} | Tempire`,
        description: product.description || `Buy ${product.title} on Tempire.`,
        openGraph: {
            title: product.title,
            description: product.description || `Buy ${product.title} on Tempire.`,
            images: [{ url: ogUrl.toString(), width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description || `Buy ${product.title} on Tempire.`,
            images: [ogUrl.toString()],
        },
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await ProductService.getProductById(id);

    if (!product) {
        notFound();
    }

    // Derive file extension from file_url path if DB column is null (handles pre-Phase-2F products)
    const fileExtDisplay: string = (
        product.file_extension ||
        product.file_url?.split('?')[0].split('.').pop()?.toUpperCase() ||
        'N/A'
    ).toUpperCase();

    // Human-readable file size
    const fileSizeDisplay = product.file_size
        ? product.file_size >= 1_048_576
            ? `${(product.file_size / 1_048_576).toFixed(1)} MB`
            : `${(product.file_size / 1024).toFixed(0)} KB`
        : 'Unknown';

    // Last updated uses created_at for now (updated_at column coming in Phase 2H)
    const lastUpdated = new Date(product.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="pt-24 md:pt-32 min-h-screen">


            <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 w-full">

                {/* Breadcrumbs & Back */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center text-sm text-zinc-400 gap-2">
                        <Link href="/" className="hover:text-white flex items-center gap-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Homepage
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
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-4">
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight">
                                    {product.title}
                                </h1>
                                <WishlistButton />
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-linear-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-semibold text-[10px]">
                                        {product.creator_name?.charAt(0) || 'C'}
                                    </div>
                                    <span className="text-white font-medium">{product.creator_name || 'Creator'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-white font-medium">
                                        {product.average_rating > 0 ? product.average_rating.toFixed(1) : 'No ratings yet'}
                                    </span>
                                    {product.review_count > 0 && (
                                        <span>({product.review_count} {product.review_count === 1 ? 'rating' : 'ratings'})</span>
                                    )}
                                </div>
                                {product.sales_count > 0 && (
                                    <span className="text-emerald-400 font-medium">{product.sales_count} sold</span>
                                )}
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

                        {/* Real Technical Specs */}
                        <div className="pt-8 border-t border-white/10">
                            <h2 className="text-2xl font-semibold tracking-tighter mb-6">Technical Details</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><FileDown className="w-4 h-4" /> File Size</div>
                                    <div className="font-medium text-white">{fileSizeDisplay}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Format</div>
                                    <div className="font-medium text-white">{fileExtDisplay}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-zinc-500 text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Last Updated</div>
                                    <div className="font-medium text-white">{lastUpdated}</div>
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
