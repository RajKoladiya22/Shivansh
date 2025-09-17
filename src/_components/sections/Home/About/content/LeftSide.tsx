"use client";
import Link from "next/link";
import React from "react";

export const AboutUsLeftContent = () => (
  <div className="bg-gradient-to-br from-[#C50202] via-red-500 to-[#C50202] p-6 text-white sm:p-8 md:p-10 lg:p-12 xl:p-16">
    <div className="mx-auto max-w-2xl">
      <div className="to-[#C50202]-50 mb-4 inline-block rounded-full bg-gradient-to-r from-red-100 px-3 py-1 text-xs font-bold text-gray-900 sm:mb-6">
        TALLY 3 STAR CERTIFIED PARTNER
      </div>

      <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
        SHIVANSH INFOSYS
      </h3>

      <div className="space-y-4 text-sm leading-relaxed sm:space-y-5 sm:text-base">
        <p className="rounded-xl bg-red-800/30 p-4 backdrop-blur-sm">
          Founded in April 2007, Shivansh Infosys began with a vision to deliver
          exceptional service to our clients. Our commitment to excellence has
          driven our growth and success in the industry.
        </p>

        <p className="rounded-xl bg-red-800/30 p-4 backdrop-blur-sm">
          {`Today, we're proud to serve over 1000+ CA's & Tax Consultant across India. 
          Our clients' trust and support have been instrumental in our journey, and we're grateful for the opportunity to contribute to their success.`}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href={"/contact"}
          className="flex-1 rounded-full bg-white px-6 py-3 text-center font-bold text-red-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          aria-label="Get a quote from Shivansh Infosys"
        >
          GET A QUOTE
        </Link>

        <Link
          href={"/about"}
          passHref
          className="flex-1 rounded-full border-2 border-white bg-transparent px-6 py-3 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          aria-label="Learn more about Shivansh Infosys"
        >
          OUR STORY
        </Link>
      </div>

      {/* Stats Section */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">14+</div>
          <div className="text-xs opacity-80">Years Experience</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">1000+</div>
          <div className="text-xs opacity-80">CA's</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">999+</div>
          <div className="text-xs opacity-80">Tax Consultant</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">10 AM to 6 PM</div>
          <div className="text-xs opacity-80">Support</div>
        </div>
      </div>
    </div>
  </div>
);
