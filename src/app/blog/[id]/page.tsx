// // app/blog/[id]/page.tsx
// import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";

// interface BlogDetailPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// import { blogPosts } from "public/data/Blog";
// import type { Metadata } from "next";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const blog = blogPosts.find((post) => post.id.toString() === id);

//   if (!blog) return {};

//   const siteUrl = "https://shivansh-three.vercel.app";
//   const blogUrl = `${siteUrl}/blog/${blog.id}`;
//   const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
//   const metaDescription = blog.excerpt.slice(0, 155).trim();

//   return {
//     title: `${blog.title} | Shivansh Infosys`,
//     description: metaDescription,
//     keywords: [blog.category, ...blog.tags, "tax", "gst", "accounting"],
//     openGraph: {
//       title: blog.title,
//       description: metaDescription,
//       url: blogUrl,
//       images: [
//         {
//           url: ogImageUrl,
//           width: 1200,
//           height: 630,
//         },
//       ],
//       type: "article",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: metaDescription,
//       images: [ogImageUrl],
//     },
//     alternates: {
//       canonical: blogUrl,
//     },
//     authors: [{ name: blog.author.name }],
//   };
// }

// export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
//   const { id } = await params;
//   return <TheBlogDetailPage params={{ id }} />;
// }









// // app/blog/[id]/page.tsx
// import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";
// import { blogPosts } from "public/data/Blog";
// import type { Metadata } from "next";
// import { notFound } from "next/navigation";

// interface BlogDetailPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// // Generate static params for better SEO and performance
// export async function generateStaticParams() {
//   return blogPosts.map((post) => ({
//     id: post.id.toString(),
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const blog = blogPosts.find((post) => post.id.toString() === id);

//   if (!blog) {
//     return {
//       title: "Blog Post Not Found | Shivansh Infosys",
//       description: "The requested blog post could not be found.",
//       robots: {
//         index: false,
//         follow: false,
//       },
//     };
//   }

//   const siteUrl = "https://shivansh-three.vercel.app";
//   const blogUrl = `${siteUrl}/blog/${blog.id}`;
//   const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;

//   // Enhanced meta description with better formatting
//   const metaDescription =
//     blog.excerpt.length > 155
//       ? blog.excerpt.substring(0, 152).trim() + "..."
//       : blog.excerpt;

//   // Enhanced keywords with semantic variations
//   const keywords = [
//     blog.category.toLowerCase(),
//     ...blog.tags.map((tag) => tag.toLowerCase()),
//     "accounting",
//     "finance",
//     "tax planning",
//     "GST compliance",
//     "business advisory",
//     "financial consulting",
//     "shivansh infosys",
//     "chartered accountant",
//     "tax solutions",
//   ];

//   // Calculate reading time
//   const wordCount = blog.content ? blog.content.split(" ").length : 500;
//   const readingTime = Math.ceil(wordCount / 200);

//   return {
//     // title: `${blog.title} | Shivansh Infosys`,
//     title: {
//       default: `${blog.title} | Shivansh Infosys`,
//       template: "",
//     },
//     description: metaDescription,
//     keywords: keywords,

//     // Enhanced Open Graph
//     openGraph: {
//       title: blog.title,
//       description: metaDescription,
//       url: blogUrl,
//       siteName: "Shivansh Infosys",
//       locale: "en_US",
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

//     // Enhanced Twitter metadata
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: metaDescription,
//       images: [
//         {
//           url: ogImageUrl,
//           alt: `${blog.title} - ${blog.category} article`,
//         },
//       ],
//       site: "@shivanshinfosys",
//       creator: "@shivanshinfosys",
//     },

//     // Canonical URL
//     alternates: {
//       canonical: blogUrl,
//       languages: {
//         "en-US": blogUrl,
//       },
//     },

//     // Author information
//     authors: [
//       {
//         name: blog.author.name,
//         url: `${siteUrl}/author/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`,
//       },
//     ],

//     // Enhanced robots directive
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

//     // Category and classification
//     category: blog.category,

//     // Additional metadata
//     applicationName: "Shivansh Infosys",
//     referrer: "origin-when-cross-origin",
//     creator: "Shivansh Infosys",
//     publisher: "Shivansh Infosys",

//     // Verification and ownership
//     verification: {
//       google: "your-google-site-verification-code",
//       yandex: "your-yandex-verification-code",
//       yahoo: "your-yahoo-verification-code",
//     },

//     // Additional Open Graph properties
//     other: {
//       // Article specific meta
//       "article:reading_time": readingTime.toString(),
//       "article:word_count": wordCount.toString(),
//       "article:author": blog.author.name,
//       "article:section": blog.category,
//       "article:published_time": new Date(blog.date).toISOString(),
//       "article:modified_time": new Date(blog.date).toISOString(),

//       // Blog tags as article tags
//       ...blog.tags.reduce(
//         (acc, tag, index) => {
//           acc[`article:tag:${index + 1}`] = tag;
//           return acc;
//         },
//         {} as Record<string, string>,
//       ),

//       // Theme and branding
//       "theme-color": "#C50202",
//       "msapplication-TileColor": "#C50202",
//       "apple-mobile-web-app-title": "Shivansh Infosys",
//       "application-name": "Shivansh Infosys",

//       // Content classification
//       "content-type": "article",
//       "content-language": "en-US",
//       "content-category": blog.category,

//       // SEO enhancements
//       rating: "General",
//       distribution: "Global",
//       coverage: "Worldwide",
//       target: "all",
//       HandheldFriendly: "True",
//       MobileOptimized: "320",

//       // Social media optimization
//       "fb:app_id": "your-facebook-app-id",
//       "fb:pages": "your-facebook-page-id",

//       // Schema.org microdata hints
//       "article.author": blog.author.name,
//       "article.section": blog.category,
//       "article.tag": blog.tags.join(", "),

//       // Additional structured data hints
//       "book:author": blog.author.name,
//       "book:tag": blog.tags.join(", "),
//       news_keywords: blog.tags.join(", "),

//       // Geo-targeting (if applicable)
//       "geo.region": "IN-GJ",
//       "geo.placename": "Ahmedabad",
//       "geo.position": "23.0225;72.5714",
//       ICBM: "23.0225, 72.5714",
//     },
//   };
// }

// export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
//   const { id } = await params;
//   const blog = blogPosts.find((post) => post.id.toString() === id);

//   // Handle 404 properly for SEO
//   if (!blog) {
//     notFound();
//   }

//   return (
//     <>
//       {/* Inject structured data directly in the page */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             headline: blog.title,
//             description:
//               blog.excerpt.length > 155
//                 ? blog.excerpt.substring(0, 155).trim() + "..."
//                 : blog.excerpt,
//             image: {
//               "@type": "ImageObject",
//               url: `https://shivansh-three.vercel.app/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`,
//               width: 1200,
//               height: 630,
//               alt: `${blog.title} - ${blog.category} article`,
//             },
//             author: {
//               "@type": "Person",
//               name: blog.author.name,
//               url: `https://shivansh-three.vercel.app/author/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`,
//               jobTitle: "Chartered Accountant",
//               worksFor: {
//                 "@type": "Organization",
//                 name: "Shivansh Infosys",
//               },
//             },
//             publisher: {
//               "@type": "Organization",
//               name: "Shivansh Infosys",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://shivansh-three.vercel.app/images/logo/logo.png",
//                 width: 180,
//                 height: 60,
//               },
//               url: "https://shivansh-three.vercel.app",
//               sameAs: [
//                 "https://twitter.com/shivanshinfosys",
//                 "https://linkedin.com/company/shivanshinfosys",
//                 "https://www.facebook.com/profile.php?id=61573592214242",
//               ],
//             },
//             datePublished: new Date(blog.date).toISOString(),
//             dateModified: new Date(blog.date).toISOString(),
//             mainEntityOfPage: {
//               "@type": "WebPage",
//               "@id": `https://shivansh-three.vercel.app/blog/${blog.id}`,
//               url: `https://shivansh-three.vercel.app/blog/${blog.id}`,
//               name: blog.title,
//               description:
//                 blog.excerpt.length > 155
//                   ? blog.excerpt.substring(0, 155).trim() + "..."
//                   : blog.excerpt,
//             },
//             articleSection: blog.category,
//             keywords: blog.tags.join(", "),
//             wordCount: blog.content ? blog.content.split(" ").length : 500,
//             timeRequired: `PT${Math.ceil((blog.content ? blog.content.split(" ").length : 500) / 200)}M`,
//             inLanguage: "en-US",
//             isAccessibleForFree: true,
//             about: {
//               "@type": "Thing",
//               name: blog.category,
//               description: `Professional insights about ${blog.category.toLowerCase()}`,
//             },
//             mentions: blog.tags.map((tag) => ({
//               "@type": "Thing",
//               name: tag,
//             })),
//             audience: {
//               "@type": "Audience",
//               audienceType:
//                 "Business professionals, entrepreneurs, tax consultants",
//             },
//           }),
//         }}
//       />

//       {/* Breadcrumb Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             itemListElement: [
//               {
//                 "@type": "ListItem",
//                 position: 1,
//                 name: "Home",
//                 item: "https://shivansh-three.vercel.app",
//               },
//               {
//                 "@type": "ListItem",
//                 position: 2,
//                 name: "Blog",
//                 item: "https://shivansh-three.vercel.app/blog",
//               },
//               {
//                 "@type": "ListItem",
//                 position: 3,
//                 name: blog.title,
//                 item: `https://shivansh-three.vercel.app/blog/${blog.id}`,
//               },
//             ],
//           }),
//         }}
//       />

//       {/* Organization Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ProfessionalService",
//             name: "Shivansh Infosys",
//             description:
//               "Expert tax and accounting solutions for businesses and individuals",
//             url: "https://shivansh-three.vercel.app",
//             logo: "https://shivansh-three.vercel.app/images/logo/logo.png",
//             image: "https://shivansh-three.vercel.app/images/logo/logo.png",
//             telephone: "+91 8141703007",
//             email: "info@shivanshinfosys.com",
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: "214,215 Soham Arcad",
//               addressLocality: "Surat",
//               addressRegion: "Gujarat",
//               postalCode: "395009",
//               addressCountry: "IN",
//             },
//             geo: {
//               "@type": "GeoCoordinates",
//               latitude: 23.0225,
//               longitude: 72.5714,
//             },
//             openingHoursSpecification: [
//               {
//                 "@type": "OpeningHoursSpecification",
//                 dayOfWeek: [
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ],
//                 opens: "10:00",
//                 closes: "18:00",
//               },
//             ],
//             serviceType: "Tax and Accounting Services",
//             areaServed: {
//               "@type": "Country",
//               name: "India",
//             },
//             sameAs: [
//               "https://twitter.com/shivanshinfosys",
//               "https://linkedin.com/company/shivanshinfosys",
//               "https://www.facebook.com/profile.php?id=61573592214242",
//             ],
//           }),
//         }}
//       />

//       {/* Website Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebSite",
//             name: "Shivansh Infosys",
//             description:
//               "Expert tax and accounting solutions, GST compliance, and business advisory services",
//             url: "https://shivansh-three.vercel.app",
//             potentialAction: {
//               "@type": "SearchAction",
//               target: {
//                 "@type": "EntryPoint",
//                 urlTemplate:
//                   "https://shivansh-three.vercel.app/search?q={search_term_string}",
//               },
//               "query-input": "required name=search_term_string",
//             },
//             sameAs: [
//               "https://twitter.com/shivanshinfosys",
//               "https://linkedin.com/company/shivanshinfosys",
//               "https://www.facebook.com/profile.php?id=61573592214242",
//             ],
//             publisher: {
//               "@type": "Organization",
//               name: "Shivansh Infosys",
//             },
//           }),
//         }}
//       />

//       <TheBlogDetailPage params={{ id }} />
//     </>
//   );
// }





// app/blog/[id]/page.tsx
import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";
import { blogPosts } from "public/data/Blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "src/config/constants";
interface BlogDetailPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blog = blogPosts.find((post) => post.id.toString() === params.id);

  if (!blog) {
    return {
      title: "Blog Post Not Found | Shivansh Infosys",
      description: "The requested blog post could not be found.",
      robots: "noindex, nofollow",
    };
  }

  // Enhanced metadata
  const blogUrl = `${BASE_URL}/blog/${blog.id}`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const excerpt = blog.excerpt.length > 155 ? blog.excerpt.substring(0, 152).trim() + "..." : blog.excerpt;

  return {
    title: `${blog.title} | Shivansh Infosys`,
    description: excerpt,
    keywords: [
      ...blog.tags,
      blog.category,
      "accounting services",
      "tax solutions",
      "GST compliance",
      "financial consulting",
      "business advisory",
    ],
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: excerpt,
      url: blogUrl,
      type: "article",
      publishedTime: blog.date,
      modifiedTime: blog.date, // Add modifiedDate to your blog data
      authors: [blog.author.name],
      section: blog.category,
      tags: blog.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${blog.title} - ${blog.category} article by ${blog.author.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: excerpt,
      images: [ogImageUrl],
    },
    other: {
      "article:published_time": blog.date,
      "article:modified_time":  blog.date,
      "article:author": blog.author.name,
      "article:section": blog.category,
      ...blog.tags.reduce((acc, tag, i) => ({ 
        ...acc, 
        [`article:tag:${i + 1}`]: tag 
      }), {}),
      "article:reading_time": readingTime.toString(),
    },
  };
}

// Helper function to get related posts
function getRelatedPosts(
  currentPostId: string,
  category: string,
  limit = 3
) {
  // Pre-fetch tags of the current post
  const currentPost = blogPosts.find((p) => p.id.toString() === currentPostId);
  const currentTags = currentPost?.tags ?? [];

  return blogPosts
    .filter((post) => {
      const idStr = post.id.toString();

      // 1. Exclude current post
      if (idStr === currentPostId) return false;

      // 2. Must share category or at least one tag
      const shareCategory = post.category === category;
      const shareTag = post.tags.some((tag) => currentTags.includes(tag));

      return shareCategory || shareTag;
    })
    .slice(0, limit);
}


export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = blogPosts.find((post) => post.id.toString() === params.id);

  if (!blog) notFound();

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${blog.id}`
    },
    headline: blog.title,
    description: blog.excerpt,
    image: `${BASE_URL}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}`,
    author: {
      "@type": "Person",
      name: blog.author.name,
      url: `${BASE_URL}/author/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Shivansh Infosys",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo/logo.png`,
        width: 180,
        height: 60
      }
    },
    datePublished: blog.date,
    dateModified: blog.date,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: blog.category,
    articleBody: blog.content,
    keywords: blog.tags.join(", ")
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${BASE_URL}/blog/${blog.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <TheBlogDetailPage params={{ id: params.id }} />
      
      {/* Related Posts Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getRelatedPosts(blog.id.toString(), blog.category).map(post => (
            <article key={post.id.toString()} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <a href={`/blog/${post.id.toString()}`} className="block">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt.slice(0, 100)}...</p>
              </a>
            </article>
          ))}
        </div>
      </section>
      
      {/* Engagement Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-3">Found this helpful?</h3>
        <p className="mb-4">Share your thoughts or ask questions</p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Leave a Comment
          </button>
          <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition">
            Share Article
          </button>
        </div>
      </div>
    </>
  );
}