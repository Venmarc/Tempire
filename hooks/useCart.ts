'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/product';

const CART_KEY = ['cart'];
const LOCAL_STORAGE_KEY = 'tempire-cart-query';

// Helper to get cart from localStorage
const getLocalCart = (): Product[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

// Helper to save cart to localStorage
const saveLocalCart = (items: Product[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

export function useCart() {
    const queryClient = useQueryClient();

    // 1. Source of truth (Query)
    const { data: items = [] } = useQuery({
        queryKey: CART_KEY,
        queryFn: getLocalCart,
        staleTime: Infinity, // Keep in memory
    });

    // 2. Mutations
    const addItemMutation = useMutation({
        mutationFn: async (product: Product) => {
            const current = getLocalCart();
            if (current.find((item) => item.id === product.id)) return current;
            const updated = [...current, product];
            saveLocalCart(updated);
            return updated;
        },
        onSuccess: (updated) => {
            queryClient.setQueryData(CART_KEY, updated);
        },
    });

    const removeItemMutation = useMutation({
        mutationFn: async (productId: string) => {
            const current = getLocalCart();
            const updated = current.filter((item) => item.id !== productId);
            saveLocalCart(updated);
            return updated;
        },
        onSuccess: (updated) => {
            queryClient.setQueryData(CART_KEY, updated);
        },
    });

    const clearCartMutation = useMutation({
        mutationFn: async () => {
            saveLocalCart([]);
            return [];
        },
        onSuccess: () => {
            queryClient.setQueryData(CART_KEY, []);
        },
    });

    // Helper functions for the UI
    const totalCount = () => items.length;
    const totalPrice = () => items.reduce((acc, item) => acc + (item.price || 0), 0);

    return {
        items,
        addItem: addItemMutation.mutate,
        removeItem: removeItemMutation.mutate,
        clearCart: clearCartMutation.mutate,
        totalCount,
        totalPrice,
        isAdding: addItemMutation.isPending,
        isRemoving: removeItemMutation.isPending,
    };
}
