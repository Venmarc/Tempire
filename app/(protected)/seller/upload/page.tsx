import { ProductForm } from "@/components/forms/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Upload New Product | Tempire",
    description: "Upload your digital product to the Tempire marketplace.",
};

export default function SellerUploadPage() {
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
                    <h1 className="text-4xl font-bold tracking-tighter">Upload New Product</h1>
                    <p className="text-zinc-400 mt-2 text-lg">
                        Fill out the details below to add a new digital product to your store.
                    </p>
                </div>

                <ProductForm />
            </main>
        </div>
    );
}
