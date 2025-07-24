"use client";
import React from "react";

export const HeroCareer = () => {
  return (
    <section className="bg-white pt-20 md:pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className="text-center text-base font-medium tracking-wide text-[var(--primery-color)] sm:text-lg lg:text-xl">
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

          <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
            You have great {" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Opportunities
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className="mx-auto max-w-3xl py-3 text-lg leading-relaxed text-gray-700 md:text-xl">
            If you are a talented and ambitious individual looking to make a mark in your career, we invite you to explore our career opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};


