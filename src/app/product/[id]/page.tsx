// app/products/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsList } from "public/data/Product";
import { TheProductDetailPage } from "src/_components/sections/Product/ProductDetail";
import type { Product } from "src/_components/sections/types/product.type";
import { BASE_URL, SITE_NAME } from "src/config/constants";
// import { ProductsList, type Product } from "src/data/Product"; // Adjust import path

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to get product by ID
async function getProduct(id: string): Promise<Product | null> {
  const product = ProductsList.find((p) => p.id.toString() === id);
  return product ?? null;
}

// Helper function to get related products
function getRelatedProducts(product: Product): Product[] {
  return ProductsList.filter(
    (p) => product.relatedProductIds?.includes(p.id) || false,
  ).slice(0, 3);
}

// Dynamic metadata generation based on product
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    };
  }

  const discountPercentage = Math.round(
    ((product.actualPrice - product.salePrice) / product.actualPrice) * 100,
  );
  const priceInfo =
    product.salePrice < product.actualPrice
      ? `₹${product.salePrice.toLocaleString()} (${discountPercentage}% off)`
      : `₹${product.actualPrice.toLocaleString()}`;

  return {
    title: `${product.title} | ${priceInfo} | ${SITE_NAME}`,
    description: `${product.description} ${product.features.slice(0, 3).join(", ")}. Rated ${product.review.averageRating}/5 by ${product.review.reviewCount} customers. ${product.salePrice < product.actualPrice ? `Save ₹${(product.actualPrice - product.salePrice).toLocaleString()}!` : "Best price guaranteed."}`,
    keywords: [
      product.title.toLowerCase(),
      ...product.tags,
      ...product.category.map(cat => cat.toLowerCase()),
      product.industry.toLowerCase(),
      "buy online",
      "best price",
      "professional grade",
      "quality assured",
      "tally certified partner",
      "tally solutions provider",
      `${product.category} equipment`,
      `${product.industry} solutions`,
      `${product.title} features`,
      `${product.title} benefits`,
      `${product.title} price`,
      `${product.category} software`,
      `tally ${product.category}`,
    ],
    openGraph: {
      title: `${product.title} - ${priceInfo}`,
      description: `${product.description} Professional grade ${product.category.join(", ").toLowerCase()} for ${product.industry.toLowerCase()}. Rated ${product.review.averageRating}⭐ by ${product.review.reviewCount} customers.`,
      url: `${BASE_URL}/product/${product.id}`,
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: `${product.title} - Tally Solution by ${SITE_NAME}`,
        },
        ...(product.detailedVideoId
          ? [
              {
                url: `https://img.youtube.com/vi/${product.detailedVideoId}/maxresdefault.jpg`,
                width: 1280,
                height: 720,
                alt: `${product.title} Demo Video`,
              },
            ]
          : []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - ${priceInfo}`,
      description: `${product.description.substring(0, 120)}... Rated ${product.review.averageRating}⭐`,
      // images: [product.image],
      images: `https://img.youtube.com/vi/${product.detailedVideoId}/maxresdefault.jpg`,
      site: "@shivanshinfosys",
      creator: "@shivanshinfosys",
    },
    alternates: {
      canonical: `${BASE_URL}/product/${product.id}`,
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
      "product:price:amount": product.salePrice.toString(),
      "product:price:currency": "INR",
      "product:availability": "in stock",
      "product:condition": "new",
      "product:retailer_item_id": product.id.toString(),
      "og:image:secure_url": product.image,
      "article:author": SITE_NAME,
      "article:publisher": BASE_URL,
    },
  };
}

// Generate static params for all products (optional - for static generation)
export async function generateStaticParams() {
  return ProductsList.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const discountPercentage = Math.round(
    ((product.actualPrice - product.salePrice) / product.actualPrice) * 100,
  );

  // Product Structured Data
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/product/${product.id}`,
    name: product.title,
    description: product.description,
    image: [
      product.image,
      `${product.image}?w=800&h=600`,
      `${product.image}?w=400&h=300`,
    ],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
      url: BASE_URL,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Tally Solutions",
      url: "https://tallysolutions.com",
    },
    category: product.category,
    productID: product.id.toString(),
    mpn: `${product.category.join("-").toUpperCase()}-${product.id}`,
    sku: `SKU-${product.id.toString().padStart(6, "0")}`,
    gtin: `${Date.now()}${product.id}`.substring(0, 13), // Mock GTIN
    url: `${BASE_URL}/product/${product.id}`,
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: "INR",
      price: product.salePrice,
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE_URL,
      },
      ...(product.salePrice < product.actualPrice && {
        highPrice: product.actualPrice,
        lowPrice: product.salePrice,
      }),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.review.averageRating,
      reviewCount: product.review.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    additionalProperty: product.features.map((feature, index) => ({
      "@type": "PropertyValue",
      name: `Feature ${index + 1}`,
      value: feature,
    })),
    isRelatedTo: relatedProducts.map((rp) => ({
      "@type": "Product",
      name: rp.title,
      url: `${BASE_URL}/product/${rp.id}`,
    })),
    dateCreated: product.createdAt,
    softwareHelp: {
      "@type": "CreativeWork",
      name: "Tally Support",
      url: `${BASE_URL}/service`,
    },
    ...(product.introVideoId && {
      video: {
        "@type": "VideoObject",
        name: `${product.title} - Product Demo`,
        description: `Watch ${product.title} in action`,
        thumbnailUrl: product.image,
        embedUrl: `https://www.youtube.com/embed/${product.introVideoId}`,
        uploadDate: product.createdAt,
      },
    }),
  };

  // Breadcrumb Structured Data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/product`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${BASE_URL}/product?category=${product.category.join(",").toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: `${BASE_URL}/product/${product.id}`,
      },
    ],
  };

  // FAQ Structured Data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What are the key features of ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${product.title} includes the following key features: ${product.features.join(", ")}. These features provide ${product.benefits.join(", ").toLowerCase()}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the price of ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${product.title} is priced at ₹${product.salePrice.toLocaleString()}${product.salePrice < product.actualPrice ? ` (discounted from ₹${product.actualPrice.toLocaleString()}, saving you ${discountPercentage}%)` : ""}. This includes professional support and warranty coverage.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${product.title} suitable for ${product.industry.toLowerCase()} applications?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${product.title} is specifically designed for ${product.industry.toLowerCase()} applications. It offers ${product.benefits.join(", ").toLowerCase()} making it ideal for professional ${product.industry.toLowerCase()} use.`,
        },
      },
      {
        "@type": "Question",
        name: `What do customers say about ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${product.title} has received excellent reviews with an average rating of ${product.review.averageRating} out of 5 stars from ${product.review.reviewCount} verified customers. Users particularly appreciate its reliability and professional-grade performance.`,
        },
      },
    ],
  };

  // Review Structured Data (Sample reviews)
  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.title,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.review.averageRating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: "Verified Customer",
    },
    reviewBody: `Excellent ${product.category.join(", ").toLowerCase()}! ${product.benefits[0]} and the overall quality exceeds expectations. Highly recommended for ${product.industry.toLowerCase()} professionals.`,
    datePublished: product.createdAt,
  };

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
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewStructuredData),
        }}
      />

      {/* Page Content */}
      <TheProductDetailPage params={resolvedParams} />
    </>
  );
}
