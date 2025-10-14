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
import type { MetadataRoute } from "next";
import { blogPosts } from "public/data/Blog";
import { getBaseUrl, STATIC_ROUTES } from "src/lib/routes";

export const dynamic = 'force-static'; 
// export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  // Generate static routes
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));



  return [...staticRoutes, ...blogRoutes];
}
