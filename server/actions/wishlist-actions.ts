'use server';

import { auth } from '@clerk/nextjs/server';
import { WishlistService } from '@/server/services/wishlist';
import { revalidatePath } from 'next/cache';

export async function toggleWishlistAction(productId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: 'You must be signed in to add items to your wishlist.' };
    }

    const isInWishlist = await WishlistService.toggleWishlist(userId, productId);
    
    // Revalidate paths that might show the wishlist state
    revalidatePath(`/products/${productId}`);
    revalidatePath('/browse');
    revalidatePath('/library'); // In case wishlist is shown there
    
    return { success: true, isInWishlist };
  } catch (error: any) {
    console.error('toggleWishlistAction error:', error);
    return { error: 'Failed to update wishlist' };
  }
}

export async function getWishlistStatusAction(productId: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { isInWishlist: false };

    const isInWishlist = await WishlistService.isInWishlist(userId, productId);
    return { isInWishlist };
  } catch (error) {
    return { isInWishlist: false };
  }
}
