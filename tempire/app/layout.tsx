import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';  // We'll create this next

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['500', '600', '700'],
});

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
      <body
        className={`${inter.variable} ${outfit.variable} bg-zinc-950 text-zinc-200 antialiased`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}