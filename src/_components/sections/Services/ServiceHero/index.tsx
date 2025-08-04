"use client";
import React from "react";
import { stats } from "..";
import { hero_content_font, hero_heading_font, hero_headline_font } from "src/config/constants";

export const HeroService = () => {
  return (
    <section className="bg-white pt-20 pb-5 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className={`text-center ${hero_heading_font}`}>
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
          <h1 className={`${hero_headline_font}`}>
            Professional Business{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Services & Solutions
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className={`mx-auto max-w-3xl py-3 text-lg ${hero_content_font}`}>
            Comprehensive technology solutions to streamline your business
            operations, ensure compliance, and boost productivity with expert
            support.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4 pt-5">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 flex justify-center text-red-400">
                {stat.icon}
              </div>
              <div className="mb-1 text-2xl font-bold md:text-3xl">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
