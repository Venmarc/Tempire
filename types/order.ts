export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  buyer_id: string;
  total_amount: number; // in cents
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price_at_purchase: number; // in cents
  created_at: string;
}

export interface CreateOrderRequest {
  items: {
    product_id: string;
    price: number; // in cents
  }[];
  total_amount: number; // in cents
}
