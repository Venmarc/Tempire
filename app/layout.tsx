import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Tempire — Creator Marketplace',
  description: 'Premium digital products from independent creators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-200 antialiased font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}