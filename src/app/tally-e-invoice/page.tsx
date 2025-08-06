import type { Metadata } from "next";
import { TheEInvoicePage } from "src/_components/sections/E-invoice";
import { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "src/config/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Tally Solutions Partner | Accounting Software Experts | Shivansh Infosys";
  const description =
    "Tally Certified 3-Star Partner serving 3000+ businesses. Expert TDL customization, GST compliance & accounting solutions. Free consultation!";

  return {
    title,
    description,
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      title,
      description,
      url:  `${BASE_URL}/service`,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          // Using your actual logo with correct dimensions
          url: "/images/logo/logo.png",
        //   width: 199,
        //   height: 35,
          alt: `${SITE_NAME} - Professional Tally Solutions Partner`,
          type: "image/png",
        },
        {
          // Fallback: Use same image but with optimized alt text for different contexts
          url: "/images/logo/logo.png",
        //   width: 199,
        //   height: 35,
          alt: `${SITE_NAME} Logo - Tally Certified Partner in Gujarat`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/logo/logo.png`],
    },
    other: {
      HandheldFriendly: "True",
      MobileOptimized: "320",
      distribution: "Global",
      coverage: "India",
      target: "business owners, accountants",
      "og:latitude": "23.0225",
      "og:longitude": "72.5714",
      "og:region": "Gujarat",
      "og:placename": "Surat",
    },
  };
}

export default async function EInvoicePage() {
  // Structured Data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shivansh Infosys",
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8141703007",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: ["IN"],
      availableLanguage: ["English", "Hindi", "Gujarati"],
      email: "info@shivanshinfosys.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      postalCode: "395007",
      streetAddress: "214,215 Soham Arcasde, Bagban circle, Adajan, Surat",
    },
    sameAs: [
      "https://www.youtube.com/@HetanshAcademy",
      "https://bitly.cx/rNEH4",
      "https://www.linkedin.com/company/shivansh-infosys",
    ],
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Shivansh Infosys",
    image: `${BASE_URL}/images/logo/logo.png`,
    "@id": `${BASE_URL}#accounting-service`,
    url: BASE_URL,
    telephone: "+91-8141703007",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "214,215 Soham Arcasde, Bagban circle, Adajan",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      postalCode: "395007",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0225,
      longitude: 72.5714,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.youtube.com/@HetanshAcademy",
      "https://bitly.cx/rNEH4",
      "https://www.linkedin.com/company/shivansh-infosys",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

        <TheEInvoicePage />
      {/* Hidden SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <h1>Shivansh Infosys - Tally Solutions & Accounting Experts</h1>
        <p>
          Trusted Tally Certified Partner serving 3000+ clients across India
        </p>
        <p>
          Expert TDL customization, GST compliance solutions, and business
          accounting services
        </p>
        <p>
          Professional tax solutions, financial consulting, and business
          advisory for SMEs
        </p>
        <ul>
          <li>Tally ERP9 customization</li>
          <li>GST filing services</li>
          <li>Tax planning strategies</li>
          <li>Business compliance solutions</li>
          <li>Accounting software implementation</li>
        </ul>
      </div>
    </>
  );
}
