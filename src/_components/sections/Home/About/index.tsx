"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import { Partnerlogos } from "public/data/partnersLogo";
import { ImageSlider } from "src/_components/molecules";
import { AboutUsLeftContent, AboutUsRightContent } from "./content";

// Main About Us Section Component
export const AboutUsSection = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <SectionHeader
            heading="ABOUT US"
            headingText="We Are Standing With 14+ Years Of Experience"
            headingTextClassName="pb-10"
          />

          <div className="overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <AboutUsLeftContent />
              <AboutUsRightContent />
            </div>
          </div>

          {/* Trusted Partners */}
          <div className="pt-30 text-center md:pt-50 lg:pt-30">
            {/* <h3 className="mb-6 text-xl font- text-(--primery-color)">
              We Also Work With
            </h3> */}
            <SectionHeader
              heading="Authorized Partner of"
              headingClassName="pb-5"
              // headingText="We Are Standing With 10+ Years Of Experience"
            />
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
    </>
  );
};
