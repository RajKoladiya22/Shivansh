// page.tsx - structured data and SEO optimizations

import { auth } from "src/server/auth";
import { api } from "src/trpc/server";
import {
  AboutTheFounder,
  AboutUsSection,
  ClinteSlider,
  WiseSolutionsIndustry,
  Hero,
  // IndustryPartnerSlider,
  StatisticsSection,
  ContactForm,
  CustomerTestimonials,
  ProductShowcaseSection,
} from "../_components/sections/Home";

// JSON-LD structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shivansh Infosys",
  description:
    "Empowering businesses with trusted Tally solutions. Tally Certified 3-Star Partner serving 3000+ customers across India.",
  url: "https://shivanshinfosys.in/",
  logo: "https://shivanshinfosys.in/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8141703007",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Gujarati"],
    areaServed: "IN",
    email: "shivanshinfosys@gmail.com",
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
    // Add other social media URLs
  ],
};

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Hero />
        <AboutUsSection />
        <StatisticsSection />
        <ProductShowcaseSection />
        <AboutTheFounder />
        <CustomerTestimonials />
        <WiseSolutionsIndustry />
        <ClinteSlider />
        <ContactForm />
        {/* <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          Rest of your content
        </main>
      </HydrateClient> */}
    </>
  );
}
