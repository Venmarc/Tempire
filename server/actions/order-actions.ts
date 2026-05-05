'use server';

import { currentUser } from '@clerk/nextjs/server';
import { OrderService } from '../services/order';
import { CreateOrderRequest } from '@/types/order';
import { revalidatePath } from 'next/cache';

export async function createOrderAction(request: CreateOrderRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: 'Not authenticated' };
    }

    // In a real app, we would validate prices against the DB here.
    // For this mock, we trust the client-provided totals (standard for Phase 3).
    
    const result = await OrderService.createOrder(user.id, request);

    // Revalidate relevant paths
    revalidatePath('/seller/dashboard'); // For sales stats
    
    return { success: true, orderId: result.orderId };
  } catch (error: any) {
    console.error('createOrderAction error:', error);
    return { error: error.message || 'Failed to complete purchase' };
  }
}
