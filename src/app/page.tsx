// import Link from "next/link";

// import { LatestPost } from "src/app/_components/post";
// import { auth } from "src/server/auth";
// import { api, HydrateClient } from "src/trpc/server";
// import Hero from "./_components/sections/Hero";

// export default async function Home() {
//   const hello = await api.post.hello({ text: "from tRPC" });
//   const session = await auth();

//   if (session?.user) {
//     void api.post.getLatest.prefetch();
//   }

//   return (
//     <>
//       <Hero />

//  <HydrateClient>
//       <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//         <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
//           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//             Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//           </h1>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/usage/first-steps"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">First Steps →</h3>
//               <div className="text-lg">
//                 Just the basics - Everything you need to know to set up your
//                 database and authentication.
//               </div>
//             </Link>
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/introduction"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">Documentation →</h3>
//               <div className="text-lg">
//                 Learn more about Create T3 App, the libraries it uses, and how
//                 to deploy it.
//               </div>
//             </Link>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <p className="text-2xl text-white">
//               {hello ? hello.greeting : "Loading tRPC query..."}
//             </p>

//             <div className="flex flex-col items-center justify-center gap-4">
//               <p className="text-center text-2xl text-white">
//                 {session && <span>Logged in as {session.user?.name}</span>}
//               </p>
//               <Link
//                 href={session ? "/api/auth/signout" : "/api/auth/signin"}
//                 className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//               >
//                 {session ? "Sign out" : "Sign in"}
//               </Link>
//             </div>
//           </div>

//           {session?.user && <LatestPost />}
//         </div>
//       </main>
//     </HydrateClient>
//     </>
//   );
// }

// page.tsx - Updated with structured data and SEO optimizations

import { auth } from "src/server/auth";
import { api } from "src/trpc/server";
import {
  AboutTheFounder,
  AboutUsSection,
  ClinteSlider,
  WiseSolutionsIndustry,
  Hero,
  IndustryPartnerSlider,
  StatisticsSection,
  ContactForm,
  CustomerTestimonials,
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
      {/* <IndustryPartnerSlider /> */}
      <AboutUsSection />
      {/* <ClinteSlider /> */}
      <StatisticsSection />
      <AboutTheFounder />
      <CustomerTestimonials />
      <WiseSolutionsIndustry />
      <ContactForm />
      {/* <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          Rest of your content
        </main>
      </HydrateClient> */}
    </>
  );
}
