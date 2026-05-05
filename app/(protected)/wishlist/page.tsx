import { redirect } from 'next/navigation';

export default function WishlistPage() {
  redirect('/library?tab=wishlist');
}
