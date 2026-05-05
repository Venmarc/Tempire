'use client';

import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

import { useState } from 'react';

export function useCart() {
  const {
    items: cartItems,
    wishlist: wishlistItems,
    addItem: storeAddItem,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
    toggleWishlist,
    isInWishlist,
  } = useCartStore();

  const [isAdding, setIsAdding] = useState(false);

  // Helper to map CartItem back to Product
  const mapToProduct = (item: CartItem): Product => ({
    id: item.id,
    title: item.title,
    price: item.price,
    image_url: item.image_url || null,
    description: null,
    file_url: null,
    creator_name: null,
    creator_id: '',
    category: null,
    tags: null,
    is_published: true,
    created_at: new Date().toISOString(),
    file_size: null,
    file_extension: null,
    average_rating: 0,
    review_count: 0,
    sales_count: 0,
  });

  const items: Product[] = cartItems.map(mapToProduct);
  const wishlist: Product[] = wishlistItems.map(mapToProduct);

  const addItem = (product: Product) => {
    setIsAdding(true);
    storeAddItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    setTimeout(() => setIsAdding(false), 400);
  };

  return {
    items,
    wishlist,
    addItem,
    removeItem,
    clearCart,
    toggleWishlist,
    isInWishlist,
    totalCount: () => totalCount(),
    totalPrice: () => totalPrice(),
    isAdding,
  };
}
