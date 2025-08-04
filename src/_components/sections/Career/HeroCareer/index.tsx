"use client";
import React from "react";
import { hero_content_font, hero_heading_font, hero_headline_font } from "src/config/constants";

export const HeroCareer = () => {
  return (
    <section className="bg-white pt-20 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className={`text-center ${hero_heading_font}`}>
              Join Our Team
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
        <div className="mb-16 text-center">
          {/* <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div> */}

          <h1 className={`${hero_headline_font} leading-tight `}>
            You have great{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Opportunities
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className={`mx-auto max-w-3xl py-3 ${hero_content_font}`}>
            If you are a talented and ambitious individual looking to make a
            mark in your career, we invite you to explore our career
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};
