import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { CreateOrderRequest, Order, OrderItem } from '@/types/order';

export class OrderService {
  static async createOrder(buyerId: string, request: CreateOrderRequest): Promise<{ orderId: string }> {
    const supabase = createSupabaseServiceClient();

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        buyer_id: buyerId,
        total_amount: request.total_amount,
        status: 'completed'
      }])
      .select()
      .single();

    if (orderError) {
      console.error('OrderService.createOrder error:', orderError);
      throw new Error('Failed to create order');
    }

    // 2. Create the order items
    const orderItems = request.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('OrderService.createOrderItems error:', itemsError);
      // Note: In a production app, you might want to roll back the order creation here
      throw new Error('Failed to create order items');
    }

    return { orderId: order.id };
  }
}
