"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import { Partnerlogos } from "public/data/partnersLogo";
import { ImageSlider } from "src/_components/molecules";
import { AboutUsLeftContent, AboutUsRightContent } from "./content";


// Main About Us Section Component
export const AboutUsSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-red-50 py-12 sm:py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            heading="ABOUT US"
            headingText="We Are Standing With 10+ Years Of Experience"
          />

          <div className="overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <AboutUsLeftContent />
              <AboutUsRightContent />
            </div>
          </div>

          {/* Trusted Partners */}
          <div className="mt-16 text-center">
            <h3 className="mb-6 text-xl font-bold text-(--primery-color)">
              We Also Work With
            </h3>

            {/* <div className="flex flex-wrap justify-center gap-6">
              {Partnerlogos.map((p, i) => (
                <>
                
                <div key={i} className="border-2 border-dashed rounded-xl w-20 h-20  hover:opacity-100 transition-opacity" >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                </>
              ))}
            </div> */}
          </div>
        </div>
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
        backgroundColor="bg-red-50"
        grayscale={false}
        grayscaleOnHover={true}
        spacing="lg"
        priority={4}
        respectReducedMotion={true}
      />
    </section>
  );
};
