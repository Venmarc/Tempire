import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ProductService } from '@/server/services/product';
import Link from 'next/link';
import { Plus, Package, Eye, Edit3, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteProductButton } from '@/components/marketplace/DeleteProductButton';

export default async function SellerDashboard() {
    const user = await currentUser();

    // Middleware should prevent this, but guard defensively
    if (!user) redirect('/');
    // redirect() throws internally — user is guaranteed non-null below
    const safeUser = user!;

    const products = await ProductService.getProductsBySeller(safeUser.id);

    // Build best available display name
    const displayName =
        safeUser.firstName ||
        safeUser.fullName ||
        safeUser.username ||
        safeUser.emailAddresses?.[0]?.emailAddress?.split('@')[0] ||
        'Seller';

    return (
        <div className="pt-24 md:pt-32 min-h-screen">

            <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter">Seller Dashboard</h1>
                        <p className="text-zinc-400 mt-2 text-lg">
                            Welcome back, {displayName}. Manage your digital empire.
                        </p>
                    </div>

                    <Link href="/seller/upload">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-6 py-6 h-auto text-base font-semibold transition-transform hover:scale-105 active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Upload New Product
                        </Button>
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="mt-12 p-20 border-2 border-dashed border-white/10 rounded-3xl bg-zinc-900/30 text-center">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Package className="w-8 h-8 text-zinc-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto mb-8">
                            Start selling by uploading your first digital product to the marketplace.
                        </p>
                        <Link href="/seller/upload">
                            <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
                                Create your first listing
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
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
                )}
            </main>
        </div>
    );
}