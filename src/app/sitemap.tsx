// import Sitemap from "src/_components/sections/Sitemap";

// export default function SitemapPage() {
//   return (
//     <>
//     <main className="py-15 sm:py-19">
//       <Sitemap />
//         </main>
//     </>
//   );
// }

// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getBaseUrl, STATIC_ROUTES } from 'src/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

  // Generate static routes
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Future: Add dynamic routes here
  // Example for when you add dynamic content:
  /*
  const getDynamicRoutes = async () => {
    try {
      // Replace with your actual data fetching
      const dynamicContent = await fetchDynamicContent()
      
      return dynamicContent.map((item: any) => ({
        url: `${baseUrl}/dynamic/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    } catch (error) {
      console.error('Error fetching dynamic routes:', error)
      return []
    }
  }
  
  const dynamicRoutes = await getDynamicRoutes()
  return [...staticRoutes, ...dynamicRoutes]
  */

  return staticRoutes
}