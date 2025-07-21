"use client";

import React from "react";
// import {ImageSlider} from "../../molecules";
import { ImageSlider } from "../../../molecules";
import { SectionHeader } from "src/_components/ui";
import { Clintelogos } from "public/data/clinteLogo";

export const ClinteSlider: React.FC = () => {
  return (
    <section className="py-8 md:py-12 lg:py-1 ">
      {/* Section Header */}
      <div className="text-center">
        <SectionHeader
          heading="We Work with Industry Leaders"
          showDescription={false}
        />
      </div>

      <ImageSlider
        type="image"
        items={Clintelogos}
        orientation="horizontal"
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
