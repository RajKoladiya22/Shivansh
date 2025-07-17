"use client";
import React from "react";
// import { Button } from "src/_components/molecules";

export const AboutUsLeftContent = () => {
  return (
    <>
      {/* Left Content */}
      <div className="order-2 p-6 text-white sm:p-8 md:p-10 lg:order-1 lg:p-12 xl:p-16">
        <div className="max-w-2xl">
          <h3 className="mb-4 text-2xl font-[600] tracking-[2px] sm:mb-6 sm:text-3xl md:mb-8 md:text-3xl">
            SHIVANSH INFOSYS
          </h3>

          <div className="mb-6 inline-block rounded-md bg-white px-3 py-2 text-xs font-semibold text-red-600 sm:mb-8 sm:px-4 sm:text-sm">
            (TALLY 3 STAR CERTIFIED PARTNER)
          </div>

          <div className="t space-y-4 text-sm leading-relaxed sm:space-y-6 sm:text-base md:text-lg">
            <p>
              I would like to say something about our company SHIVANSH INFOSYS.
              We have started our company in April-2007 with a vision of serving
              the best to our client.
            </p>

            <p>
              And we are happy with our efforts. Now we are working with 1500
              end user and 450 companies. And we are thanks to all our client
              because his support is our growth.
            </p>
          </div>

          <button
            className="mt-6 transform rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-lg transition-colors duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl sm:mt-8 sm:px-8 sm:py-4 sm:text-base md:mt-10 md:px-10 md:text-lg"
            aria-label="Get a quote from Shivansh Infosys"
          >
            GET A QUOTE
          </button>

          {/* <Button
            href="/contact"
            padding="px-[20px] py-[10px] sm:px-[16px] sm:py-[8px]"
            className=" bg-white text-red-600 tracking-[2px] md:tracking-tight lg:tracking-[0px]"
          >
            GET A QUOTE
          </Button> */}
        </div>
      </div>
    </>
  );
};
