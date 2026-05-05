'use client';

import { useUser } from '@clerk/nextjs';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ShieldCheck, Package, ArrowLeft, Loader2, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createOrderAction } from '@/server/actions/order-actions';
import { CreateOrderRequest } from '@/types/order';

export default function CheckoutPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { items, totalPrice, totalCount, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty (once mounted)
  useEffect(() => {
    if (mounted && items.length === 0 && !isProcessing) {
      router.push('/');
    }
  }, [items, mounted, router, isProcessing]);

  if (!isLoaded || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) return null; // Handled by middleware/clerk

  const totalCents = totalPrice();
  const formattedTotal = (totalCents / 100).toFixed(2);

  const handleCompletePurchase = async () => {
    try {
      setIsProcessing(true);
      
      const orderRequest: CreateOrderRequest = {
        items: items.map(item => ({
          product_id: item.id,
          price: item.price
        })),
        total_amount: totalCents
      };

      const result = await createOrderAction(orderRequest);

      if (result.error) {
        toast.error(result.error);
        setIsProcessing(false);
        return;
      }

      // Success!
      toast.success('Purchase completed successfully!');
      clearCart();
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-zinc-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Checkout</h1>
            <p className="text-zinc-500 mt-1">Review your order and complete purchase</p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-500" />
                  Order Summary
                </h2>
                <span className="text-sm text-zinc-500">{totalCount()} items</span>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-zinc-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg leading-snug line-clamp-1">{item.title}</h3>
                      <p className="text-zinc-500 text-sm mt-0.5">Digital Product</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price / 100).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${formattedTotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Processing Fee</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-bold tracking-tighter text-white">${formattedTotal}</span>
                </div>
              </div>
            </section>
            
            <div className="flex items-center gap-3 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <p className="text-sm text-zinc-400">
                This is a <span className="text-emerald-400 font-medium">mock transaction</span>. No real funds will be charged. Your access to these digital products will be granted immediately after completion.
              </p>
            </div>
          </div>

          {/* Right Column: Payment Sidebar */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
              {/* Subtle glass effect accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-emerald-500/10 p-2.5 rounded-2xl">
                    <CreditCard className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Pay Securely</h2>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Buyer Name</label>
                    <div className="bg-zinc-950 border border-white/5 p-4 rounded-2xl text-zinc-300 font-medium">
                      {user.fullName || 'Valued Customer'}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                    <div className="bg-zinc-950 border border-white/5 p-4 rounded-2xl text-zinc-300 font-medium">
                      {user.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full py-8 text-xl font-bold rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_10px_40px_rgba(16,185,129,0.2)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                  onClick={handleCompletePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Complete Purchase — ${formattedTotal}</span>
                  )}
                </Button>

                <p className="text-center text-zinc-500 text-xs mt-6">
                  By completing this purchase, you agree to Tempire's terms of service and digital distribution license.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
