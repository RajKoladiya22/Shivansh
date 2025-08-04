// // lib/seo-config.ts
// export const SEO_CONFIG = {
//   site: {
//     name: "Shivansh Infosys",
//     description: "Expert tax and accounting solutions, GST compliance, and business advisory services for individuals and businesses across India.",
//     url: "https://shivansh-three.vercel.app",
//     locale: "en_US",
//     domain: "shivansh-three.vercel.app",
//   },
//   social: {
//     twitter: "@shivanshinfosys",
//     facebook: "shivanshinfosys",
//     linkedin: "company/shivanshinfosys",
//     instagram: "shivanshinfosys",
//   },
//   business: {
//     type: "ProfessionalService",
//     phone: "+91-8141703007",
//     email: "info@shivanshinfosys.com",
//     address: {
//       street: "Your Street Address",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       postalCode: "380001",
//       country: "IN",
//     },
//     coordinates: {
//       latitude: 23.0225,
//       longitude: 72.5714,
//     },
//     hours: {
//       monday: "09:00-18:00",
//       tuesday: "09:00-18:00", 
//       wednesday: "09:00-18:00",
//       thursday: "09:00-18:00",
//       friday: "09:00-18:00",
//       saturday: "10:00-16:00",
//       sunday: "closed",
//     },
//   },
//   keywords: {
//     primary: [
//       "tax consultant",
//       "chartered accountant",
//       "GST compliance",
//       "income tax filing",
//       "business advisory",
//       "accounting services",
//     ],
//     secondary: [
//       "tax planning",
//       "financial consulting",
//       "audit services",
//       "company registration",
//       "tax return filing",
//       "bookkeeping services",
//     ],
//     location: [
//       "Ahmedabad",
//       "Gujarat",
//       "India",
//     ],
//   },
// };

// // lib/seo-utils.ts
// // import { SEO_CONFIG } from './seo-config';
// import type { Metadata } from 'next';

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   tags: string[];
//   author: {
//     name: string;
//   };
//   date: string;
//   views?: number;
//   likes?: number;
// }

// export function generateBlogSEO(blog: BlogPost): Metadata {
//   const blogUrl = `${SEO_CONFIG.site.url}/blog/${blog.id}`;
//   const ogImageUrl = `${SEO_CONFIG.site.url}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  
//   const metaDescription = blog.excerpt.length > 155 
//     ? blog.excerpt.substring(0, 152).trim() + "..."
//     : blog.excerpt;

//   const keywords = [
//     blog.category.toLowerCase(),
//     ...blog.tags.map(tag => tag.toLowerCase()),
//     ...SEO_CONFIG.keywords.primary,
//     ...SEO_CONFIG.keywords.secondary,
//     ...SEO_CONFIG.keywords.location,
//   ];

//   const wordCount = blog.content ? blog.content.split(" ").length : 500;
//   const readingTime = Math.ceil(wordCount / 200);

//   return {
//     title: `${blog.title} | ${SEO_CONFIG.site.name} - Expert Tax & Accounting Solutions`,
//     description: metaDescription,
//     keywords: keywords,
    
//     openGraph: {
//       title: blog.title,
//       description: metaDescription,
//       url: blogUrl,
//       siteName: SEO_CONFIG.site.name,
//       locale: SEO_CONFIG.site.locale,
//       type: "article",
//       publishedTime: new Date(blog.date).toISOString(),
//       modifiedTime: new Date(blog.date).toISOString(),
//       authors: [blog.author.name],
//       section: blog.category,
//       tags: blog.tags,
//       images: [
//         {
//           url: ogImageUrl,
//           width: 1200,
//           height: 630,
//           alt: `${blog.title} - ${blog.category} article by ${blog.author.name}`,
//           type: "image/png",
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: metaDescription,
//       images: [ogImageUrl],
//       site: SEO_CONFIG.social.twitter,
//       creator: SEO_CONFIG.social.twitter,
//     },

//     alternates: {
//       canonical: blogUrl,
//       languages: {
//         "en-US": blogUrl,
//       },
//     },

//     authors: [
//       { 
//         name: blog.author.name,
//         url: `${SEO_CONFIG.site.url}/author/${blog.author.name.toLowerCase().replace(/\s+/g, '-')}`
//       }
//     ],

//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },

//     category: blog.category,
//     applicationName: SEO_CONFIG.site.name,
//     referrer: "origin-when-cross-origin",
//     creator: SEO_CONFIG.site.name,
//     publisher: SEO_CONFIG.site.name,

//     other: {
//       "article:reading_time": readingTime.toString(),
//       "article:word_count": wordCount.toString(),
//       "article:author": blog.author.name,
//       "article:section": blog.category,
//       "article:published_time": new Date(blog.date).toISOString(),
//       "article:modified_time": new Date(blog.date).toISOString(),
      
//       ...blog.tags.reduce((acc, tag, index) => {
//         acc[`article:tag:${index + 1}`] = tag;
//         return acc;
//       }, {} as Record<string, string>),

//       "theme-color": "#C50202",
//       "msapplication-TileColor": "#C50202",
//       "apple-mobile-web-app-title": SEO_CONFIG.site.name,
//       "application-name": SEO_CONFIG.site.name,
      
//       "content-type": "article",
//       "content-language": "en-US",
//       "content-category": blog.category,
      
//       "rating": "General",
//       "distribution": "Global",
//       "coverage": "Worldwide",
//       "target": "all",
//       "HandheldFriendly": "True",
//       "MobileOptimized": "320",
      
//       "geo.region": "IN-GJ",
//       "geo.placename": "Ahmedabad",
//       "geo.position": "23.0225;72.5714",
//       "ICBM": "23.0225, 72.5714",
//     },
//   };
// }

// // Generate structured data for blog posts
// export function generateBlogStructuredData(blog: BlogPost) {
//   const blogUrl = `${SEO_CONFIG.site.url}/blog/${blog.id}`;
//   const ogImageUrl = `${SEO_CONFIG.site.url}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
//   const wordCount = blog.content ? blog.content.split(" ").length : 500;
//   const readingTime = Math.ceil(wordCount / 200);

//   return {
//     blogPosting: {
//       "@context": "https://schema.org",
//       "@type": "BlogPosting",
//       headline: blog.title,
//       description: blog.excerpt.length > 155 ? blog.excerpt.substring(0, 155).trim() + "..." : blog.excerpt,
//       image: {
//         "@type": "ImageObject",
//         url: ogImageUrl,
//         width: 1200,
//         height: 630,
//         alt: `${blog.title} - ${blog.category} article`
//       },
//       author: {
//         "@type": "Person",
//         name: blog.author.name,
//         url: `${SEO_CONFIG.site.url}/author/${blog.author.name.toLowerCase().replace(/\s+/g, '-')}`,
//         jobTitle: "Chartered Accountant",
//         worksFor: {
//           "@type": "Organization",
//           name: SEO_CONFIG.site.name
//         }
//       },
//       publisher: {
//         "@type": "Organization",
//         name: SEO_CONFIG.site.name,
//         logo: {
//           "@type": "ImageObject",
//           url: `${SEO_CONFIG.site.url}/logo.png`,
//           width: 180,
//           height: 60
//         },
//         url: SEO_CONFIG.site.url,
//         sameAs: [
//           `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
//           `https://linkedin.com/${SEO_CONFIG.social.linkedin}`,
//           `https://facebook.com/${SEO_CONFIG.social.facebook}`
//         ]
//       },
//       datePublished: new Date(blog.date).toISOString(),
//       dateModified: new Date(blog.date).toISOString(),
//       mainEntityOfPage: {
//         "@type": "WebPage",
//         "@id": blogUrl,
//         url: blogUrl,
//         name: blog.title,
//         description: blog.excerpt.length > 155 ? blog.excerpt.substring(0, 155).trim() + "..." : blog.excerpt
//       },
//       articleSection: blog.category,
//       keywords: blog.tags.join(", "),
//       wordCount: wordCount,
//       timeRequired: `PT${readingTime}M`,
//       inLanguage: "en-US",
//       isAccessibleForFree: true,
//       interactionStatistic: [
//         {
//           "@type": "InteractionCounter",
//           interactionType: "https://schema.org/LikeAction",
//           userInteractionCount: blog.likes || 0
//         },
//         {
//           "@type": "InteractionCounter",
//           interactionType: "https://schema.org/ViewAction",
//           userInteractionCount: blog.views || 0
//         }
//       ],
//       about: {
//         "@type": "Thing",
//         name: blog.category,
//         description: `Professional insights about ${blog.category.toLowerCase()}`
//       },
//       mentions: blog.tags.map(tag => ({
//         "@type": "Thing",
//         name: tag
//       })),
//       audience: {
//         "@type": "Audience",
//         audienceType: "Business professionals, entrepreneurs, tax consultants"
//       }
//     },

//     breadcrumb: {
//       "@context": "https://schema.org",
//       "@type": "BreadcrumbList",
//       itemListElement: [
//         {
//           "@type": "ListItem",
//           position: 1,
//           name: "Home",
//           item: SEO_CONFIG.site.url
//         },
//         {
//           "@type": "ListItem",
//           position: 2,
//           name: "Blog",
//           item: `${SEO_CONFIG.site.url}/blog`
//         },
//         {
//           "@type": "ListItem",
//           position: 3,
//           name: blog.category,
//           item: `${SEO_CONFIG.site.url}/blog/category/${blog.category.toLowerCase().replace(/\s+/g, '-')}`
//         },
//         {
//           "@type": "ListItem",
//           position: 4,
//           name: blog.title,
//           item: blogUrl
//         }
//       ]
//     },

//     organization: {
//       "@context": "https://schema.org",
//       "@type": "ProfessionalService",
//       name: SEO_CONFIG.site.name,
//       description: SEO_CONFIG.site.description,
//       url: SEO_CONFIG.site.url,
//       logo: `${SEO_CONFIG.site.url}/logo.png`,
//       image: `${SEO_CONFIG.site.url}/logo.png`,
//       telephone: SEO_CONFIG.business.phone,
//       email: SEO_CONFIG.business.email,
//       address: {
//         "@type": "PostalAddress",
//         streetAddress: SEO_CONFIG.business.address.street,
//         addressLocality: SEO_CONFIG.business.address.city,
//         addressRegion: SEO_CONFIG.business.address.state,
//         postalCode: SEO_CONFIG.business.address.postalCode,
//         addressCountry: SEO_CONFIG.business.address.country
//       },
//       geo: {
//         "@type": "GeoCoordinates",
//         latitude: SEO_CONFIG.business.coordinates.latitude,
//         longitude: SEO_CONFIG.business.coordinates.longitude
//       },
//       openingHoursSpecification: [
//         {
//           "@type": "OpeningHoursSpecification",
//           dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//           opens: "09:00",
//           closes: "18:00"
//         },
//         {
//           "@type": "OpeningHoursSpecification",
//           dayOfWeek: "Saturday",
//           opens: "10:00",
//           closes: "16:00"
//         }
//       ],
//       serviceType: "Tax and Accounting Services",
//       areaServed: {
//         "@type": "Country",
//         name: "India"
//       },
//       sameAs: [
//         `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
//         `https://linkedin.com/${SEO_CONFIG.social.linkedin}`,
//         `https://facebook.com/${SEO_CONFIG.social.facebook}`
//       ]
//     },

//     website: {
//       "@context": "https://schema.org",
//       "@type": "WebSite",
//       name: SEO_CONFIG.site.name,
//       description: SEO_CONFIG.site.description,
//       url: SEO_CONFIG.site.url,
//       potentialAction: {
//         "@type": "SearchAction",
//         target: {
//           "@type": "EntryPoint",
//           urlTemplate: `${SEO_CONFIG.site.url}/search?q={search_term_string}`
//         },
//         "query-input": "required name=search_term_string"
//       },
//       sameAs: [
//         `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
//         `https://linkedin.com/${SEO_CONFIG.social.linkedin}`,
//         `https://facebook.com/${SEO_CONFIG.social.facebook}`
//       ],
//       publisher: {
//         "@type": "Organization",
//         name: SEO_CONFIG.site.name
//       }
//     }
//   };
// }

// // Additional SEO utilities
// export function generateRobotsTxt(): string {
//   return `User-agent: *
// Allow: /

// User-agent: Googlebot
// Allow: /

// User-agent: Bingbot
// Allow: /

// Disallow: /api/
// Disallow: /admin/
// Disallow: /_next/
// Disallow: /private/

// Sitemap: ${SEO_CONFIG.site.url}/sitemap.xml
// Sitemap: ${SEO_CONFIG.site.url}/blog-sitemap.xml`;
// }

// export function generateSitemapEntry(url: string, lastmod: string, changefreq: string, priority: string): string {
//   return `
//   <url>
//     <loc>${url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>${changefreq}</changefreq>
//     <priority>${priority}</priority>
//   </url>`;
// }

// // Performance and Core Web Vitals optimizations
// export const PERFORMANCE_CONFIG = {
//   images: {
//     domains: [SEO_CONFIG.site.domain],
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 768, 1024, 1280, 1600],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
//   headers: {
//     security: {
//       'X-Frame-Options': 'DENY',
//       'X-Content-Type-Options': 'nosniff',
//       'Referrer-Policy': 'origin-when-cross-origin',
//       'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
//     },
//     cache: {
//       'Cache-Control': 'public, max-age=31536000, immutable',
//     },
//   },
// };

// // // app/robots.txt/route.ts
// // export async function GET() {
// //   return new Response(generateRobotsTxt(), {
// //     headers: {
// //       'Content-Type': 'text/plain',
// //     },
// //   });
// // }

// // // app/sitemap.xml/route.ts
// // import { blogPosts } from 'public/data/Blog';

// // export async function GET() {
// //   const baseUrl = SEO_CONFIG.site.url;
  
// //   const staticPages = [
// //     { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
// //     { url: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
// //     { url: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
// //     { url: `${baseUrl}/services`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
// //     { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
// //   ];

// //   const blogPages = blogPosts.map(post => ({
// //     url: `${baseUrl}/blog/${post.id}`,
// //     lastmod: new Date(post.date).toISOString(),
// //     changefreq: 'weekly',
// //     priority: '0.8'
// //   }));

// //   const categories = [...new Set(blogPosts.map(post => post.category))];
// //   const categoryPages = categories.map(category => ({
// //     url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
// //     lastmod: new Date().toISOString(),
// //     changefreq: 'weekly',
// //     priority: '0.7'
// //   }));

// //   const allPages = [...staticPages, ...blogPages, ...categoryPages];

// //   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// // ${allPages.map(page => generateSitemapEntry(page.url, page.lastmod, page.changefreq, page.priority)).join('')}
// // </urlset>`;

// //   return new Response(sitemap, {
// //     headers: {
// //       'Content-Type': 'application/xml',
// //     },
// //   });
// // }