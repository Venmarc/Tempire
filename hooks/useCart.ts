'use client';

import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

import { useState } from 'react';

export function useCart() {
  const {
    items: cartItems,
    addItem: storeAddItem,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
  } = useCartStore();

  const [isAdding, setIsAdding] = useState(false);

  // Map CartItem back to Product shape for backward compatibility
  const items: Product[] = cartItems.map((item: CartItem): Product => ({
    id: item.id,
    title: item.title,
    price: item.price,
    image_url: item.image_url || null,
    // Provide sensible defaults for all other required Product fields
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
  }));

  const addItem = (product: Product) => {
    setIsAdding(true);
    storeAddItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    });
    // Simulate brief loading state for UI feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  return {
    items,                    // Now properly typed as Product[]
    addItem,
    removeItem,
    clearCart,
    totalCount: () => totalCount(),
    totalPrice: () => totalPrice(),
    isAdding,
  };
}
