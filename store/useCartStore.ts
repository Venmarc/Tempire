'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  
  addItem: (product: { 
    id: string; 
    title: string; 
    price: number; 
    image_url?: string | null;
  }) => void;
  
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  totalCount: () => number;
  totalPrice: () => number;     // in cents
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const current = get().items;
        const existing = current.findIndex(item => item.id === product.id);

        if (existing !== -1) {
          // Increase quantity if already in cart
          set((state) => ({
            items: state.items.map((item, index) =>
              index === existing 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          }));
          return;
        }

        // Add new item
        set((state) => ({
          items: [
            ...state.items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image_url: product.image_url,
              quantity: 1,
            },
          ],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0
        );
      },

      getItem: (productId) => {
        return get().items.find((item) => item.id === productId);
      },
    }),
    {
      name: 'tempire-cart-storage',   // Better key than before
    }
  )
);
