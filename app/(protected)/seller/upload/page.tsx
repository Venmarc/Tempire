import { ProductForm } from "@/components/forms/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Upload New Product | Tempire",
    description: "Upload your digital product to the Tempire marketplace.",
};

export default function SellerUploadPage() {
    return (
        <div className="pt-24 md:pt-32 min-h-screen">

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-32">
                <div className="mb-8">
                    <Link href="/seller/dashboard" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mb-4 group w-fit">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Dashboard</span>
                    </Link>
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
