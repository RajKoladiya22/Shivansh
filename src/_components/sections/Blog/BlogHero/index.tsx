"use client";
import React from "react";
import { hero_content_font, hero_heading_font, hero_headline_font } from "src/config/constants";

export const BlogHero = () => {
  return (
    <section className="bg-white pt-20 pb-12 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className={` text-center ${hero_heading_font}`}>
              Finance | Tally | Tax | Accounting
            </p>
            <div
              className="absolute top-0 h-[50%] rounded-lg bg-[var(--pink)] sm:h-full"
              style={{
                width: "calc(40% + 20px)",
                right: "0",
                transform: "translate(10%, -40%)",
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center">

          <h1 className={`${hero_headline_font}`}>
            Stay Ahead With{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Expert Insights
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className={`mx-auto max-w-3xl py-3 ${hero_content_font}`}>
            Explore the latest articles and tips on finance, accounting, Tally updates,
            GST, and tax compliance — curated to help businesses and professionals
            make informed decisions.
          </p>
        </div>
      </div>
    </section>
  );
};
