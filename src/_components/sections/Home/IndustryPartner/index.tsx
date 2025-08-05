"use client";

import React from "react";
import { SectionHeader } from "src/_components/ui";
import { Partnerlogos } from "public/data/partnersLogo";
import { ImageSlider } from "src/_components/molecules";

export const IndustryPartnerSlider: React.FC = () => {
  return (
    <section className="">
      {/* Section Header */}
      <div className="py-8 text-center">
        <SectionHeader
          heading="Trusted by Industry Leaders"
          showDescription={false}
        />
      </div>

      <ImageSlider
        type="image"
        items={Partnerlogos}
        orientation="horizontal"
        direction="left" // left or right
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
