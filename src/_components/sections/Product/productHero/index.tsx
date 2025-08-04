"use client";
import React from "react";
import { hero_content_font, hero_heading_font, hero_headline_font } from "src/config/constants";

export const HeroProduct = () => {
  return (
    <section className="bg-white pt-20 pb-5 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className={` text-center font-medium ${hero_heading_font} `}>
              Your Future, Made Better
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

          <h1 className={` ${hero_headline_font}`}>
            Transform Your Workday with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                [ProductName]
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className={`mx-auto max-w-3xl py-3 ${hero_content_font}`}>
            Get more done in less time—our feature-packed tool helps teams stay organized, automate tasks, and hit targets faster.
          </p>
        </div>
      </div>
    </section>
  );
};
