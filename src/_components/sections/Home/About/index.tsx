"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import {SectionHeader} from "src/_components/ui";

export const AboutUsSection = () => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageClick = () => {
    setShowImagePreview(true);
  };

  const closePreview = () => {
    setShowImagePreview(false);
  };

  return (
    <>
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="row">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <SectionHeader
                heading="ABout us"
                headingClassName="text-sm font-bold text-red-600 tracking-wider"
                headingText="We Are Standing With 10+ Years Of Experience "
                headingTextClassName="text-3xl font-bold text-gray-900"
                showDescription={false}
              />

              {/* Main Content */}
              <div className="overflow-hidden rounded-2xl bg-(--primery-color) shadow-2xl sm:rounded-3xl">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                  {/* Left Content */}
                  <div className="order-2 p-6 text-white sm:p-8 md:p-10 lg:order-1 lg:p-12 xl:p-16">
                    <div className="max-w-2xl">
                      <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
                        SHIVANSH INFOSYS
                      </h3>

                      <div className="mb-6 inline-block rounded-md bg-white px-3 py-2 text-xs font-semibold text-red-600 sm:mb-8 sm:px-4 sm:text-sm">
                        (TALLY 3 STAR CERTIFIED PARTNER)
                      </div>

                      <div className="space-y-4 text-sm leading-relaxed sm:space-y-6 sm:text-base md:text-lg">
                        <p>
                          I would like to say something about our company
                          SHIVANSH INFOSYS. We have started our company in
                          April-2007 with a vision of serving the best to our
                          client.
                        </p>

                        <p>
                          And we are happy with our efforts. Now we are working
                          with 1500 end user and 450 companies. And we are
                          thanks to all our client because his support is our
                          growth.
                        </p>
                      </div>

                      <button
                        className="mt-6 transform rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-lg transition-colors duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl sm:mt-8 sm:px-8 sm:py-4 sm:text-base md:mt-10 md:px-10 md:text-lg"
                        aria-label="Get a quote from Shivansh Infosys"
                      >
                        GET A QUOTE
                      </button>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative order-1 min-h-[300px] sm:min-h-[400px] lg:order-2 lg:min-h-[500px] xl:min-h-[600px]">
                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                      <div className="relative mx-auto w-full max-w-md">
                        <div
                          className="hover:shadow-3xl group transform cursor-pointer rounded-lg bg-white p-1 shadow-2xl transition-all duration-300 hover:scale-105"
                          onClick={handleImageClick}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleImageClick();
                            }
                          }}
                          aria-label="Click to view certificate in full size"
                        >
                          <div className="relative">
                            <Image
                              src="/images/certificate/tally.png"
                              alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys"
                              width={400}
                              height={300}
                              className="h-auto w-full rounded-md"
                              priority
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="bg-black50 bg-opacity-90 hadow-2xl {showImagePreview ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} fixed inset-0 z-50 flex origin-center transform items-center justify-center p-4 backdrop-blur-sm transition-opacity transition-transform duration-400"
          onClick={closePreview}
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl">
            <button
              onClick={closePreview}
              className="absolute -top-12 right-0 cursor-pointer text-white transition-colors duration-200 hover:text-gray-300"
              aria-label="Close image preview"
            >
              <X size={32} />
            </button>

            <div className="rounded-lg bg-white p-4 shadow-2xl sm:p-6">
              <Image
                src="/images/certificate/tally.png"
                alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys - Full Size"
                width={800}
                height={600}
                className="h-auto w-full rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
