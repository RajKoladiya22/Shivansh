"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import { AboutUsLeftContent, AboutUsRightContent } from "./content";

export const AboutUsSection = () => {
  return (
    <>
      <section className="py-1 sm:py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="row">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="py-8">
                <SectionHeader
                  heading="ABout us"
                  headingClassName="text-sm font-bold text-red-600 tracking-wider"
                  headingText="We Are Standing With 10+ Years Of Experience "
                  headingTextClassName="text-(43px) font-[600] text-gray-900"
                  showDescription={false}
                />
              </div>
              {/* Main Content */}
              <div className="overflow-hidden rounded-2xl bg-(--primery-color) shadow-2xl sm:rounded-3xl">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                  {/* Left Content */}
                  <AboutUsLeftContent />

                  {/* Right Image */}
                  <AboutUsRightContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
