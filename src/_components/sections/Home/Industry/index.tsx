// "use client";

// import Image from "next/image";
// import React from "react";

// const logos = [
//   {
//     id: 1,
//     src: "/images/industry_logo/TALLY PRIME.png",
//     alt: "Tally Logo",
//   },
//   {
//     id: 2,
//     src: "/images/industry_logo/logo (2) 1.png",
//     alt: "Zoho Logo",
//   },
//   {
//     id: 3,
//     src: "/images/industry_logo/logo (1) 1.png",
//     alt: "Salesforce Logo",
//   },
//   {
//     id: 4,
//     src: "/images/industry_logo/CREDFLOW.png",
//     alt: "Oracle Logo",
//   },
//   {
//     id: 5,
//     src: "/images/industry_logo/Bizmitra.png",
//     alt: "SAP Logo",
//   },
//   {
//     id: 6,
//     src: "/images/industry_logo/BIZ ANALYST.png",
//     alt: "SAP Logo",
//   },
// ];

// const IndustrySlider: React.FC = () => {
//   return (
//     <section
//       aria-label="Company Logos"
//       className="relative overflow-hidden py-8"
//     >
//       {/* Fade Effects */}
//       <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-64 bg-gradient-to-l from-transparent to-white" />
//       <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-64 bg-gradient-to-r from-transparent to-white" />

//       {/* Scrolling Logos */}
//       <div className="animate-slide flex whitespace-nowrap">
//         {[...Array(2)].map((_, idx) => (
//           <div key={idx} className="flex shrink-0">
//             {logos.map((logo) => (
//               <Image
//                 key={`${logo.id}-${idx}`}
//                 src={logo.src}
//                 alt={logo.alt}
//                 width={120}
//                 height={100}
//                 className="mx-4 h-[100px] w-auto"
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//       <style jsx>{`
//         @keyframes slide {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-slide {
//           animation: slide 35s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default IndustrySlider;

"use client";

import Image from "next/image";
import React from "react";
// import {ImageSlider} from "../../molecules";
import { ImageSlider } from "../../../molecules";
import { Partnerlogos } from "../../../../../public/data/partnersLogo";
import { SectionHeader } from "src/_components/ui";

export const IndustrySlider: React.FC = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      {/* <div className="mb-8 text-center">
        <h2 className="text-2xl font-[400] text-(--primery-color) md:text-3xl lg:text-4xl tracking-[4px]">
          Trusted by Industry Leaders
        </h2>
      </div> */}
      {/* Section Header */}
                    <SectionHeader
                      heading="Trusted by Industry Leaders"
                      showDescription={false}
                    />
      <ImageSlider
        items={Partnerlogos}
        direction="left"
        speed="normal"
        pauseOnHover={true}
        showFadeEffect={true}
        fadeWidth="lg"
        backgroundColor="white"
        grayscale={false}
        grayscaleOnHover={true}
        spacing="lg"
        priority={4}
        respectReducedMotion={true}
      />
    </section>
  );
};

{
  /* Section Title */
}
//   <div className="mb-8 text-center">
//     <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
//       Our Technology Partners
//     </h2>
//     <p className="mt-2 text-gray-600 md:text-lg">
//       Trusted by leading industry partners
//     </p>
//   </div>
