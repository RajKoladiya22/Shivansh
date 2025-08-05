// layout.tsx
import "src/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { TRPCReactProvider } from "src/trpc/react";
import { Footer, Header, FloatingContactButton } from "../_components/ui";
import { BASE_URL, DEFAULT_DESCRIPTION, SITE_NAME } from "src/config/constants";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "tally prime",
      "tally",
      "tally solutions",
      "tally prime download",
      "tallysolutions",
      "tally 7.2 download",
      "tally prime 4.1 download",
      "tally 7.2",
      "tally prime 2.1 download",
      "tdl for tally",
      "tdl experts",
      "in tally how to delete a line from voucher",
      "excel to tally",
      "excel to tally",
      "tally master download",
      "tally tdl download",
      "tally invoice format",
      "balance sheet in tally",
      "print eway bill",
      "tally bill format",
      "balance confirmation letter format",
      " ",
      "Tally Partner India",
      "Tally Customization Services",
      "Tally Software Solutions",
      "Tally ERP9 Experts",
      "Tally Implementation Services",
      "Tally Consultancy",
      "TDL Development",
      "3-Star Tally Partner",
      "Tally Prime Solutions",
      "Tally solutions",
      "Tally certified partner",
      "Tally support",
      "business accounting software",
      "Tally implementation",
      "Tally training",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: BASE_URL,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      siteName: SITE_NAME,
      // images: [
      //   {
      //     url: "/images/logo/logo.png",
      //     width: 1200,
      //     height: 630,
      //     alt: `${SITE_NAME} - Tally Solutions Partner`,
      //   },
      // ],
      images: [
        {
          // Using your actual logo with correct dimensions
          url: "/images/logo/logo.png",
          width: 1373,
          height: 234,
          alt: `${SITE_NAME} - Professional Tally Solutions Partner`,
          type: "image/png",
        },
        {
          // Fallback: Use same image but with optimized alt text for different contexts
          url: "/images/logo/logo.png",
          width: 1373,
          height: 234,
          alt: `${SITE_NAME} Logo - Tally Certified Partner in Gujarat`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: "/images/logo/logo.png",
          width: 1373,
          height: 234,
          alt: `${SITE_NAME} - Tally Solutions Partner`,
        },
      ],
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
    // icons: {
    //   icon: "/favicon.ico",
    //   apple: "/images/logo/logo.png",
    // },
    icons: {
      // Your main favicon.ico (512x512) - works for most cases
      icon: [
        { url: "favicon_io/favicon.ico", sizes: "any" }, // This covers all sizes
        { url: "favicon_io/favicon.ico", sizes: "16x16", type: "image/x-icon" },
        { url: "favicon_io/favicon.ico", sizes: "32x32", type: "image/x-icon" },
        { url: "favicon_io/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        {
          url: "favicon_io/favicon.ico",
          sizes: "512x512",
          type: "image/x-icon",
        },
      ],
      // Apple devices will use your favicon.ico
      apple: [
        { url: "favicon_io/apple-touch-icon.png", sizes: "any" }, // iOS will resize automatically
      ],
      // For modern browsers that prefer PNG
      shortcut: "/favicon.ico",
    },
    verification: {
      google: "your-google-verification-code",
    },
    other: {
      "theme-color": "#C50202",
      "msapplication-TileColor": "#C50202",
      "msapplication-TileImage": "/favicon.ico",
      "application-name": SITE_NAME,
      "apple-mobile-web-app-title": SITE_NAME,
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "mobile-web-app-capable": "yes",
      HandheldFriendly: "True",
      MobileOptimized: "320",
      distribution: "Global",
      rating: "General",
      target: "all",
      "format-detection": "telephone=yes",
      "geo.region": "IN-GJ",
      "geo.placename": "Ahmedabad",
    },
  };
}

// Viewport configuration
export const viewport: Viewport = {
  themeColor: "#C50202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} Blog RSS Feed`}
          href={`${BASE_URL}/rss.xml`}
        />
        <link rel="preload" href="/images/logo/logo.png" as="image" />
      </head>
      <body cz-shortcut-listen="true">
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
        <FloatingContactButton />

        {/* Global Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: SITE_NAME,
              description: DEFAULT_DESCRIPTION,
              url: BASE_URL,
              logo: `${BASE_URL}/images/logo/logo.png`,
              telephone: "+91 8141703007",
              email: "info@shivanshinfosys.com",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "4.9",
                bestRating: "5",
              },
              author: {"@type": "Person", "name": "Tally Solutions Ltd"},
              address: {
                "@type": "PostalAddress",
                streetAddress: "214,215 Soham Arcad",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                postalCode: "395009",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 23.0225,
                longitude: 72.5714,
              },
              openingHoursSpecification: [
                {
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
              ],

              sameAs: [
                "https://twitter.com/shivanshinfosys",
                "https://linkedin.com/company/shivanshinfosys",
                "https://www.facebook.com/profile.php?id=61573592214242",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
