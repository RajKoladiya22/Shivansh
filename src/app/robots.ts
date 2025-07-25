// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://shivansh-three.vercel.app'
    : 'http://localhost:3000'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about', '/team', '/product', '/contact', 'blog'],
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}