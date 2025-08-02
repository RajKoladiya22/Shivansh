

// src/lib/routes.ts
export interface RouteConfig {
  path: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastModified?: Date
}

export const STATIC_ROUTES: RouteConfig[] = [
  {
    path: '/',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  },
  {
    path: '/about',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: '/blog',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  },
  {
    path: '/team',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/product',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/service',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/career',
    changeFrequency: 'weekly',
    priority: 0.4,
  },
  {
    path: '/gallery',
    changeFrequency: 'weekly',
    priority: 0.4,
  },
  {
    path: '/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }
]



export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return process.env.NODE_ENV === 'production'
    ? 'https://shivansh-three.vercel.app'
    : 'http://localhost:3000'
}