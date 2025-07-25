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
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    path: '/about',
    changeFrequency: 'monthly',
    priority: 0.6,
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
    path: '/contact',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
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