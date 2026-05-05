import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ProductService } from '@/server/services/product';
import Link from 'next/link';
import { Plus, Package, Eye, Edit3, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteProductButton } from '@/components/marketplace/DeleteProductButton';
import { SellerProductCard } from '@/components/seller/SellerProductCard';

export const dynamic = 'force-dynamic';

export default async function SellerDashboard() {
    const user = await currentUser();

    if (!user) {
        redirect('/');
    }

    const products = await ProductService.getProductsBySeller(user.id);

    const displayName =
        user.firstName ||
        user.fullName ||
        user.username ||
        user.emailAddresses?.[0]?.emailAddress?.split('@')[0] ||
        'Seller';

    return (
        <div className="pt-24 md:pt-32 min-h-screen">
            <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <Link href="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mb-4 group w-fit">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-medium">Back to Homepage</span>
                            </Link>
                            <h1 className="text-4xl font-bold tracking-tighter">Seller Dashboard</h1>
                            <p className="text-zinc-400 mt-2 text-lg">
                                Welcome back, {displayName}. Manage your digital empire.
                            </p>
                        </div>

                        {products.length > 0 && (
                            <div className="flex items-center">
                                <Button
                                    className="w-[48%] sm:w-auto px-5 py-2.5 text-sm md:text-base font-medium bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-2xl h-auto"
                                    asChild
                                >
                                    <Link href="/seller/upload">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Upload New Product
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="mt-12 p-12 md:p-20 border-2 border-dashed border-white/10 rounded-3xl bg-zinc-900/30 text-center">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Package className="w-8 h-8 text-zinc-500" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">No products yet</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto mb-8 text-sm md:text-base">
                            Create your first digital product to start selling.
                        </p>
                        <Button
                            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 h-11"
                            asChild
                        >
                            <Link href="/seller/upload">
                                Create your product
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-3">
                        <div className="grid gap-4 md:hidden">
                            {products.map((product) => (
                                <SellerProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="hidden md:grid gap-3">
                            <div className="grid grid-cols-12 px-6 py-3 text-sm font-medium text-zinc-500 uppercase tracking-wider">
                                <div className="col-span-6 md:col-span-7">Product</div>
                                <div className="col-span-3 md:col-span-2">Status</div>
                                <div className="col-span-3">Price</div>
                            </div>

                            {products.map((product) => (
                                <div key={product.id} className="grid grid-cols-12 items-center bg-zinc-900/50 border border-white/5 rounded-2xl p-4 md:p-6 hover:border-white/20 transition-colors group">
                                    <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-zinc-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-lg md:text-xl truncate group-hover:text-emerald-400 transition-colors">
                                                {product.title}
                                            </h4>
                                            <p className="text-sm text-zinc-500 truncate">
                                                {product.category || 'No Category'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-span-3 md:col-span-2">
                                        {product.is_published ? (
                                            <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
                                                <Circle className="w-2 h-2 fill-current" />
                                                <span>Published</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                                                <Circle className="w-2 h-2 fill-current" />
                                                <span>Draft</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-span-3 flex items-center justify-between gap-4">
                                        <span className="font-bold text-lg md:text-xl shrink-0">
                                            ${(product.price / 100).toFixed(2)}
                                        </span>

                                        <div className="hidden md:flex items-center gap-2">
                                            <Link href={`/products/${product.id}`}>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white" title="View Product">
                                                    <Eye className="w-5 h-5" />
                                                </Button>
                                            </Link>
                                            <Link href={`/seller/edit/${product.id}`}>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white" title="Edit Product">
                                                    <Edit3 className="w-5 h-5" />
                                                </Button>
                                            </Link>
                                            <DeleteProductButton productId={product.id} productTitle={product.title} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}