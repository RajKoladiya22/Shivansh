// import TheBlogPage from "src/_components/sections/Blog";

// export default function BlogPage() {
//   return (
//     <>
//       <TheBlogPage />
//     </>
//   );
// }



import TheBlogPage from "src/_components/sections/Blog";
import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "src/config/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Expert Insights & Latest Updates | Shivansh Infosys Blog";
  const description = "Stay updated with the latest accounting trends, tax solutions, and TDL tips. Our blog offers expert advice on GST compliance, financial consulting, and business advisory.";
  const keywords = [
    "accounting services", "tax solutions", "GST compliance", 
    "financial consulting", "business advisory", "Tally", 
    "TDL", "Accounting software", "tax updates", "accounting tips",
    "GST filing", "business strategy", "financial planning"
  ];
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/blog`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/blog`,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: `${BASE_URL}/images/blog/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: "Shivansh Infosys Blog - Expert Accounting Insights",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/blog/blog-twitter.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    other: {
      "content-type": "blog",
      "content-category": "Accounting & Finance",
      HandheldFriendly: "True",
      distribution: "Global",
      coverage: "India",
      target: "business owners, accountants",
    },
  };
}

export default function BlogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/blog/#blog`,
    mainEntityOfPage: `${BASE_URL}/blog`,
    headline: "Shivansh Infosys Blog",
    description: "Expert articles on accounting, taxation, GST compliance, and business advisory",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo/logo.png`,
        width: 180,
        height: 60,
      }
    },
    image: `${BASE_URL}/images/logo/logo.png`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TheBlogPage />
      
      {/* Hidden SEO content */}
      <div className="sr-only" aria-hidden="true">
        <h1>accounting Blog</h1>
        <p>Expert insights on accounting services, tax solutions, and GST compliance</p>
        <p>Professional guidance for TDL customization and Tally implementation</p>
        <p>Latest updates on financial consulting and business advisory services</p>
      </div>
    </>
  );
}