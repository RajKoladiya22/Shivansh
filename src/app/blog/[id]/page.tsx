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




// app/blog/[id]/page.tsx
import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";
import { blogPosts } from "public/data/Blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for better SEO and performance
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = blogPosts.find((post) => post.id.toString() === id);

  if (!blog) {
    return {
      title: "Blog Post Not Found | Shivansh Infosys",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = "https://shivansh-three.vercel.app";
  const blogUrl = `${siteUrl}/blog/${blog.id}`;
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  
  // Enhanced meta description with better formatting
  const metaDescription = blog.excerpt.length > 155 
    ? blog.excerpt.substring(0, 152).trim() + "..."
    : blog.excerpt;

  // Enhanced keywords with semantic variations
  const keywords = [
    blog.category.toLowerCase(),
    ...blog.tags.map(tag => tag.toLowerCase()),
    "accounting",
    "finance", 
    "tax planning",
    "GST compliance",
    "business advisory",
    "financial consulting",
    "shivansh infosys",
    "chartered accountant",
    "tax solutions"
  ];

  // Calculate reading time
  const wordCount = blog.content ? blog.content.split(" ").length : 500;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    title: `${blog.title} | Shivansh Infosys - Expert Tax & Accounting Solutions`,
    description: metaDescription,
    keywords: keywords,
    
    // Enhanced Open Graph
    openGraph: {
      title: blog.title,
      description: metaDescription,
      url: blogUrl,
      siteName: "Shivansh Infosys",
      locale: "en_US",
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      modifiedTime: new Date(blog.date).toISOString(),
      authors: [blog.author.name],
      section: blog.category,
      tags: blog.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${blog.title} - ${blog.category} article by ${blog.author.name}`,
          type: "image/png",
        },
      ],
    },

    // Enhanced Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          alt: `${blog.title} - ${blog.category} article`,
        }
      ],
      site: "@shivanshinfosys",
      creator: "@shivanshinfosys",
    },

    // Canonical URL
    alternates: {
      canonical: blogUrl,
      languages: {
        "en-US": blogUrl,
      },
    },

    // Author information
    authors: [
      { 
        name: blog.author.name,
        url: `${siteUrl}/author/${blog.author.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ],

    // Enhanced robots directive
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Category and classification
    category: blog.category,
    
    // Additional metadata
    applicationName: "Shivansh Infosys",
    referrer: "origin-when-cross-origin",
    creator: "Shivansh Infosys",
    publisher: "Shivansh Infosys",
    
    // Verification and ownership
    verification: {
      google: "your-google-site-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },

    // Additional Open Graph properties
    other: {
      // Article specific meta
      "article:reading_time": readingTime.toString(),
      "article:word_count": wordCount.toString(),
      "article:author": blog.author.name,
      "article:section": blog.category,
      "article:published_time": new Date(blog.date).toISOString(),
      "article:modified_time": new Date(blog.date).toISOString(),
      
      // Blog tags as article tags
      ...blog.tags.reduce((acc, tag, index) => {
        acc[`article:tag:${index + 1}`] = tag;
        return acc;
      }, {} as Record<string, string>),

      // Theme and branding
      "theme-color": "#C50202",
      "msapplication-TileColor": "#C50202",
      "apple-mobile-web-app-title": "Shivansh Infosys",
      "application-name": "Shivansh Infosys",
      
      // Content classification
      "content-type": "article",
      "content-language": "en-US",
      "content-category": blog.category,
      
      // SEO enhancements
      "rating": "General",
      "distribution": "Global",
      "coverage": "Worldwide",
      "target": "all",
      "HandheldFriendly": "True",
      "MobileOptimized": "320",
      
      // Social media optimization
      "fb:app_id": "your-facebook-app-id",
      "fb:pages": "your-facebook-page-id",
      
      // Schema.org microdata hints
      "article.author": blog.author.name,
      "article.section": blog.category,
      "article.tag": blog.tags.join(", "),
      
      // Additional structured data hints
      "book:author": blog.author.name,
      "book:tag": blog.tags.join(", "),
      "news_keywords": blog.tags.join(", "),
      
      // Geo-targeting (if applicable)
      "geo.region": "IN-GJ",
      "geo.placename": "Ahmedabad",
      "geo.position": "23.0225;72.5714",
      "ICBM": "23.0225, 72.5714",
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = blogPosts.find((post) => post.id.toString() === id);

  // Handle 404 properly for SEO
  if (!blog) {
    notFound();
  }

  return (
    <>
      {/* Inject structured data directly in the page */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.excerpt.length > 155 ? blog.excerpt.substring(0, 155).trim() + "..." : blog.excerpt,
            image: {
              "@type": "ImageObject",
              url: `https://shivansh-three.vercel.app/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`,
              width: 1200,
              height: 630,
              alt: `${blog.title} - ${blog.category} article`
            },
            author: {
              "@type": "Person",
              name: blog.author.name,
              url: `https://shivansh-three.vercel.app/author/${blog.author.name.toLowerCase().replace(/\s+/g, '-')}`,
              jobTitle: "Chartered Accountant",
              worksFor: {
                "@type": "Organization",
                name: "Shivansh Infosys"
              }
            },
            publisher: {
              "@type": "Organization",
              name: "Shivansh Infosys",
              logo: {
                "@type": "ImageObject",
                url: "https://shivansh-three.vercel.app/logo.png",
                width: 180,
                height: 60
              },
              url: "https://shivansh-three.vercel.app",
              sameAs: [
                "https://twitter.com/shivanshinfosys",
                "https://linkedin.com/company/shivanshinfosys",
                "https://facebook.com/shivanshinfosys"
              ]
            },
            datePublished: new Date(blog.date).toISOString(),
            dateModified: new Date(blog.date).toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://shivansh-three.vercel.app/blog/${blog.id}`,
              url: `https://shivansh-three.vercel.app/blog/${blog.id}`,
              name: blog.title,
              description: blog.excerpt.length > 155 ? blog.excerpt.substring(0, 155).trim() + "..." : blog.excerpt
            },
            articleSection: blog.category,
            keywords: blog.tags.join(", "),
            wordCount: blog.content ? blog.content.split(" ").length : 500,
            timeRequired: `PT${Math.ceil((blog.content ? blog.content.split(" ").length : 500) / 200)}M`,
            inLanguage: "en-US",
            isAccessibleForFree: true,
            about: {
              "@type": "Thing",
              name: blog.category,
              description: `Professional insights about ${blog.category.toLowerCase()}`
            },
            mentions: blog.tags.map(tag => ({
              "@type": "Thing",
              name: tag
            })),
            audience: {
              "@type": "Audience",
              audienceType: "Business professionals, entrepreneurs, tax consultants"
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://shivansh-three.vercel.app"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://shivansh-three.vercel.app/blog"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blog.category,
                item: `https://shivansh-three.vercel.app/blog/category/${blog.category.toLowerCase().replace(/\s+/g, '-')}`
              },
              {
                "@type": "ListItem",
                position: 4,
                name: blog.title,
                item: `https://shivansh-three.vercel.app/blog/${blog.id}`
              }
            ]
          })
        }}
      />

      {/* Organization Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Shivansh Infosys",
            description: "Expert tax and accounting solutions for businesses and individuals",
            url: "https://shivansh-three.vercel.app",
            logo: "https://shivansh-three.vercel.app/logo.png",
            image: "https://shivansh-three.vercel.app/logo.png",
            telephone: "+91-XXXXXXXXXX",
            email: "info@shivanshinfosys.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Your Street Address",
              addressLocality: "Ahmedabad",
              addressRegion: "Gujarat",
              postalCode: "380001",
              addressCountry: "IN"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 23.0225,
              longitude: 72.5714
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00"
              }
            ],
            serviceType: "Tax and Accounting Services",
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            sameAs: [
              "https://twitter.com/shivanshinfosys",
              "https://linkedin.com/company/shivanshinfosys",
              "https://facebook.com/shivanshinfosys"
            ]
          })
        }}
      />

      {/* Website Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Shivansh Infosys",
            description: "Expert tax and accounting solutions, GST compliance, and business advisory services",
            url: "https://shivansh-three.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://shivansh-three.vercel.app/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            sameAs: [
              "https://twitter.com/shivanshinfosys",
              "https://linkedin.com/company/shivanshinfosys",
              "https://www.facebook.com/profile.php?id=61573592214242"
            ],
            publisher: {
              "@type": "Organization",
              name: "Shivansh Infosys"
            }
          })
        }}
      />

      <TheBlogDetailPage params={{ id }} />
    </>
  );
}