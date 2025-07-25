// layout.tsx
import "src/styles/globals.css";
import { type Metadata } from "next";
import { DM_Sans } from 'next/font/google'
import '../styles/globals.css';
import { TRPCReactProvider } from "src/trpc/react";
import {Footer, Header} from "../_components/ui";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Shivansh Infosys - Trusted Tally Solutions Partner | 3000+ Customers Served",
  description: "Empowering businesses with trusted Tally solutions. Tally Certified 3-Star Partner serving 3000+ customers across India. Quick response, expert support for all your Tally needs.",
  keywords: ["Tally solutions", "Tally certified partner", "Tally support", "business accounting software", "Tally implementation", "Tally training"],
  authors: [{ name: "Shivansh Infosys" }],
  creator: "Shivansh Infosys",
  publisher: "Shivansh Infosys",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shivanshinfosys.in'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shivanshinfosys.in',
    title: 'Shivansh Infosys - Trusted Tally Solutions Partner',
    description: 'Empowering businesses with trusted Tally solutions. Tally Certified 3-Star Partner serving 3000+ customers across India.',
    siteName: 'Shivansh Infosys',
    images: [
      {
        url: '/og-image.jpg', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Shivansh Infosys - Tally Solutions Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Infosys - Trusted Tally Solutions Partner',
    description: 'Empowering businesses with trusted Tally solutions. Tally Certified 3-Star Partner serving 3000+ customers across India.',
    images: ['/twitter-image.jpg'], // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#your-brand-color" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </head>
      <body cz-shortcut-listen="true">
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}