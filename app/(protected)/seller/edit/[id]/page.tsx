import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { ProductService } from '@/server/services/product';
import { ProductForm } from '@/components/forms/ProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
    try {
        const { id } = await params;
        const product = await ProductService.getProductById(id);
        return { title: product ? `Edit: ${product.title} | Tempire` : 'Edit Product | Tempire' };
    } catch {
        return { title: 'Edit Product | Tempire' };
    }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const user = await currentUser();

    if (!user) {
        redirect('/');
    }

    const product = await ProductService.getProductById(id);

    if (!product) {
        notFound();
    }

    // Verify ownership
    if (product.creator_id !== user.id) {
        redirect('/seller/dashboard');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Minimal Header */}
            <header className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/seller/dashboard" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tighter">Edit Product</h1>
                    <p className="text-zinc-400 mt-2 text-lg">
                        Update your product details or change its visibility status.
                    </p>
                </div>

                <ProductForm initialData={product} />
            </main>
        </div>
    );
}
