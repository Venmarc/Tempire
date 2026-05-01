export type CartItem = {
  id: string;
  title: string;
  price: number;        // cents
  image_url?: string | null;
  quantity: number;
};
