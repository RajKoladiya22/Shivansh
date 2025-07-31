// import { TheProductPage } from "src/_components/sections/Product";
// import { HeroProduct } from "src/_components/sections/Product/productHero";

// export default function ProductPage() {
//   return (
//     <>
//       <HeroProduct />
//       <TheProductPage />
//     </>
//   );
// }


// app/products/page.tsx
import type { Metadata } from "next";
import { TheProductPage } from "src/_components/sections/Product";
import { HeroProduct } from "src/_components/sections/Product/productHero";
import { BASE_URL, SITE_NAME } from "src/config/constants";

// SEO-optimized metadata for Products page
export const metadata: Metadata = {
  title: "Tally Software Products & Solutions | Complete Business Management Suite",
  description: "Explore our comprehensive range of Tally software products including TallyPrime, Tally Server, TallyShoper, and custom business solutions. Get the right Tally product for your business needs with expert support and implementation.",
  keywords: [
    "Tally products",
    "TallyPrime software",
    "Tally Server",
    "TallyShoper",
    "Tally ERP solutions",
    "business accounting software",
    "inventory management software",
    "GST compliant software",
    "Tally add-ons",
    "business management tools",
    "accounting software India",
    "Tally customization",
    "Tally implementation services",
    "enterprise accounting solutions",
    "small business software"
  ],
  openGraph: {
    title: "Tally Software Products & Solutions | Complete Business Management Suite",
    description: "Discover powerful Tally software products designed to streamline your business operations. From TallyPrime to custom solutions - find the perfect fit for your business.",
    url: `${BASE_URL}/products`,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    images: [
      {
        url: `${BASE_URL}/images/products/tally-products-overview.jpg`,
        width: 1200,
        height: 630,
        alt: "Tally Software Products and Solutions Overview",
      },
      {
        url: `${BASE_URL}/images/products/tallyprime-interface.jpg`,
        width: 1200,
        height: 630,
        alt: "TallyPrime Software Interface",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tally Software Products & Solutions | Complete Business Management Suite",
    description: "Discover powerful Tally software products designed to streamline your business operations. Expert implementation and support included.",
    images: [`${BASE_URL}/images/products/tally-products-overview.jpg`],
    site: "@shivanshinfosys",
    creator: "@shivanshinfosys",
  },
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
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
  other: {
    "og:image:secure_url": `${BASE_URL}/images/products/tally-products-overview.jpg`,
    "article:author": SITE_NAME,
    "article:publisher": `${BASE_URL}`,
  },
};

// JSON-LD Structured Data for Products
const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tally Software Products & Solutions",
  description: "Complete range of Tally software products including TallyPrime, Tally Server, and custom business solutions with expert implementation support.",
  url: `${BASE_URL}/products`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "TallyPrime",
        description: "Complete business management software with accounting, inventory, and GST compliance features.",
        url: `${BASE_URL}/products/tallyprime`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows, Linux",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "18000",
          priceCurrency: "INR",
          priceValidUntil: "2025-12-31",
          seller: {
            "@type": "Organization",
            name: SITE_NAME
          }
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1"
        }
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "Tally Server",
        description: "Multi-user server solution for collaborative business management across multiple locations.",
        url: `${BASE_URL}/products/tally-server`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows Server, Linux",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "45000",
          priceCurrency: "INR",
          priceValidUntil: "2025-12-31",
          seller: {
            "@type": "Organization",
            name: SITE_NAME
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        position: 3,
        name: "TallyShoper",
        description: "E-commerce integration solution for seamless online and offline business management.",
        url: `${BASE_URL}/products/tallyshoper`,
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "12000",
          priceCurrency: "INR",
          priceValidUntil: "2025-12-31",
          seller: {
            "@type": "Organization",
            name: SITE_NAME
          }
        }
      },
      {
        "@type": "Service",
        position: 4,
        name: "Custom Tally Solutions",
        description: "Tailored Tally customization and add-on development services for specific business requirements.",
        url: `${BASE_URL}/products/custom-solutions`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "25000",
          priceCurrency: "INR",
          priceValidUntil: "2025-12-31"
        }
      }
    ]
  },
  breadcrumb: {
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
        name: "Products",
        item: `${BASE_URL}/products`
      }
    ]
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/products`
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo/logo.png`
    }
  }
};

// FAQ Structured Data for Products
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What Tally products do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer the complete range of Tally products including TallyPrime for comprehensive business management, Tally Server for multi-user environments, TallyShoper for e-commerce integration, and custom Tally solutions tailored to specific business needs."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between TallyPrime and Tally Server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TallyPrime is designed for single-user or small team usage with complete accounting and inventory features. Tally Server is designed for larger organizations requiring multi-user access, remote connectivity, and centralized data management across multiple locations."
      }
    },
    {
      "@type": "Question",
      name: "Do you provide Tally implementation and training services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide complete Tally implementation services including data migration, customization, user training, and ongoing support. Our certified Tally experts ensure smooth deployment and user adoption."
      }
    },
    {
      "@type": "Question",
      name: "Can you customize Tally software for specific business requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We specialize in Tally customization and add-on development. We can create custom reports, integrate with third-party systems, develop industry-specific features, and modify workflows to match your business processes."
      }
    },
    {
      "@type": "Question",
      name: "What support do you provide after Tally software purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide comprehensive post-purchase support including technical assistance, software updates, troubleshooting, data backup solutions, user training sessions, and regular system health checks to ensure optimal performance."
      }
    }
  ]
};

export default function ProductPage() {
  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      
      {/* Page Content */}
      <HeroProduct />
      <TheProductPage />
    </>
  );
}