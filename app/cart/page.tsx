'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { items, removeItem, totalPrice, totalCount, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const count = totalCount();
    const total = totalPrice() / 100;

    return (
        <div className="pt-24 md:pt-32 min-h-screen">


            <main className="grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-5xl font-bold tracking-tighter">Your Cart</h1>
                    {count > 0 && (
                        <button 
                            onClick={() => clearCart()}
                            className="text-zinc-500 hover:text-red-400 text-sm transition-colors"
                        >
                            Clear all items
                        </button>
                    )}
                </div>

                {count === 0 ? (
                    <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
                        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-zinc-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-zinc-400 mb-8">Looks like you haven't added anything yet.</p>
                        <Link href="/">
                            <Button className="bg-white text-black hover:bg-zinc-200 px-8 py-6 rounded-2xl text-lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            {items.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="flex gap-6 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group"
                                >
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-zinc-800">
                                        {item.image_url ? (
                                            <Image 
                                                src={item.image_url} 
                                                alt={item.title} 
                                                fill 
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                                <ShoppingBag className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between grow py-1">
                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
                                                    <Link href={`/products/${item.id}`}>{item.title}</Link>
                                                </h3>
                                                <p className="text-zinc-500 text-sm mt-1">{item.category}</p>
                                            </div>
                                            <div className="text-xl font-bold self-start">
                                                ${(item.price / 100).toFixed(2)}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                <span className="px-2 py-0.5 bg-zinc-800 rounded">Digital License</span>
                                            </div>
                                            <button 
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-xl transition-colors"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mt-8 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 bg-zinc-900 border border-white/10 rounded-3xl p-8">
                                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Subtotal ({count} items)</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Taxes</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-emerald-400">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full py-8 rounded-2xl bg-white text-black hover:bg-zinc-200 text-lg group">
                                        Checkout
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>

                                <p className="text-center text-xs text-zinc-500 mt-6 leading-relaxed">
                                    Final price includes all applicable taxes and secure digital delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
