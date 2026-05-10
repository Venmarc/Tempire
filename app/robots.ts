import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/seller/dashboard/', '/library/', '/checkout/'],
    },
    sitemap: 'https://tempire.xyz/sitemap.xml',
  };
}
