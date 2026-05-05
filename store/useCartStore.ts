'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  wishlist: CartItem[];
  
  addItem: (product: { 
    id: string; 
    title: string; 
    price: number; 
    image_url?: string | null;
  }) => void;
  
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (product: {
    id: string;
    title: string;
    price: number;
    image_url?: string | null;
  }) => void;
  isInWishlist: (productId: string) => boolean;
  
  totalCount: () => number;
  totalPrice: () => number;     // in cents
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addItem: (product) => {
        const current = get().items;
        const existing = current.findIndex(item => item.id === product.id);

        if (existing !== -1) {
          // Digital products: don't increase quantity, just ignore
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
      
      toggleWishlist: (product) => {
        const current = get().wishlist;
        const exists = current.find(item => item.id === product.id);
        
        if (exists) {
          set({ wishlist: current.filter(item => item.id !== product.id) });
        } else {
          set({ wishlist: [...current, { ...product, quantity: 1 }] });
        }
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      totalCount: () => {
        return get().items.length;
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
