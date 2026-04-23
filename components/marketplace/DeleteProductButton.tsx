'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteProductAction } from '@/server/actions/seller-mutations';
import { toast } from 'sonner';

interface DeleteProductButtonProps {
    productId: string;
    productTitle: string;
}

export function DeleteProductButton({ productId, productTitle }: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete "${productTitle}"? This cannot be undone.`)) {
            return;
        }

        startTransition(async () => {
            const result = await deleteProductAction(productId);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Product deleted successfully');
            }
        });
    };

    return (
        <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleDelete}
            disabled={isPending}
            className="h-10 w-10 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
        >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </Button>
    );
}
