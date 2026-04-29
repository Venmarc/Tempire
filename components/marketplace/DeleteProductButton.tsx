'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { deleteProductAction } from '@/server/actions/seller-mutations';
import { toast } from 'sonner';

interface DeleteProductButtonProps {
    productId: string;
    productTitle: string;
}

export function DeleteProductButton({ productId, productTitle }: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteProductAction(productId);
            if (result.error) {
                toast.error(result.error);
                setShowConfirm(false);
            } else {
                toast.success('Product deleted successfully');
                setShowConfirm(false);
            }
        });
    };

    return (
        <>
            <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowConfirm(true)}
                disabled={isPending}
                className="h-10 w-10 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
            </Button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col gap-2 text-center items-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Delete this product?</h3>
                            <p className="text-sm text-zinc-400">
                                Are you sure you want to delete <span className="text-white font-medium">"{productTitle}"</span>? This cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3 w-full">
                            <Button 
                                variant="secondary" 
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-white/5 text-white"
                                onClick={() => setShowConfirm(false)}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold border-transparent"
                                onClick={handleDelete}
                                disabled={isPending}
                            >
                                {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {isPending ? 'Deleting...' : 'OK'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
