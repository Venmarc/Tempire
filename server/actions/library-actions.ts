'use server';

import { auth } from '@clerk/nextjs/server';
import { LibraryService } from '@/server/services/library';
import { Product } from '@/types/product';

export async function getPurchasedProductsAction(): Promise<{ products: Product[], error?: string }> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { products: [], error: 'Not authenticated' };
    }

    const products = await LibraryService.getPurchasedProducts(userId);
    return { products };
  } catch (error) {
    console.error('getPurchasedProductsAction error:', error);
    return { products: [], error: 'Internal server error' };
  }
}
