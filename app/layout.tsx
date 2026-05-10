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
  metadataBase: new URL('https://tempire.xyz'),
  title: {
    default: 'Tempire — Build your empire, one template at a time.',
    template: '%s | Tempire'
  },
  description: 'The ultimate destination for professional-grade digital assets. High-conversion SaaS boilerplates, premium UI kits, and AI tools for modern creators.',
  keywords: ['saas boilerplate', 'nextjs templates', 'ui kits', 'figma templates', 'digital assets', 'creator marketplace', 'prompt engineering'],
  authors: [{ name: 'Tempire Team' }],
  creator: 'Tempire',
  publisher: 'Tempire',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tempire.xyz',
    siteName: 'Tempire',
    title: 'Tempire — Build your empire, one template at a time.',
    description: 'The ultimate destination for professional-grade digital assets. High-conversion SaaS boilerplates, premium UI kits, and AI tools for modern creators.',
    images: [
      {
        url: '/og-image.png', // We will need to generate this
        width: 1200,
        height: 630,
        alt: 'Tempire — Creator Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tempire — Build your empire, one template at a time.',
    description: 'The ultimate destination for professional-grade digital assets. High-conversion SaaS boilerplates, premium UI kits, and AI tools for modern creators.',
    images: ['/og-image.png'],
    creator: '@tempire_xyz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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