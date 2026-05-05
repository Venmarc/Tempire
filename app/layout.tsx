import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { AdaptiveNav } from '@/components/marketplace/AdaptiveNav';
import { Footer } from '@/components/marketplace/Footer';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
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
      <body className={`${inter.variable} ${outfit.variable} bg-zinc-950 text-zinc-200 antialiased font-sans min-h-screen flex flex-col`}>
        <Providers>
          <Suspense>
            <AdaptiveNav />
          </Suspense>
          <main className="grow flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-center" theme="dark" />
        </Providers>
      </body>
    </html>
  );
}