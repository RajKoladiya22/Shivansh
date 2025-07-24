"use client";
import React from "react";
import { Award, Users, Lightbulb, Globe } from "lucide-react";
import { SectionHeader } from "src/_components/ui";
import Link from "next/link";
import { AboutUs } from "public/data/CompanyOverview";

export const CompanyOverview = () => {
  return (
    <div className="bg-gradient-to-b from-red-50 to-white py-12 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionHeader
            heading="Know More"
            headingText=" About Us"
            headingDescription="Discover our journey, values, and commitment to transforming financial management for Indian enterprises."
          />
        </div>

        {/* Sections */}
        <div className="space-y-20">
          {AboutUs.map((section, index) => (
            <div key={section.id} className="group">
              <div
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Side */}
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  {/* Section Header */}
                  <div className="flex items-center space-x-4">
                    <div
                      className={`rounded-2xl bg-gradient-to-r p-3 ${section.gradient} text-white shadow-lg`}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h3
                        className={`bg-gradient-to-r text-3xl font-bold md:text-4xl ${section.gradient} bg-clip-text text-transparent`}
                      >
                        {section.title}
                      </h3>
                      <div
                        className={`h-1 w-16 bg-gradient-to-r ${section.gradient} mt-2 rounded-full`}
                      ></div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-lg leading-relaxed text-gray-700">
                    {section.content}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-3">
                    {section.highlights.map((highlight, highlightIndex) => (
                      <span
                        key={highlightIndex}
                        className={`inline-flex items-center rounded-full bg-gradient-to-r px-4 py-2 text-sm font-medium ${section.gradient} text-white shadow-md transition-shadow duration-300 hover:shadow-lg`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Side */}
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div
                    className={`relative h-80 rounded-3xl bg-gradient-to-br md:h-96 ${section.gradient} group-hover:shadow-3xl overflow-hidden shadow-2xl transition-shadow duration-500`}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute inset-0">
                      {/* Geometric Shapes */}
                      <div className="absolute top-8 right-8 h-24 w-24 rounded-full bg-white/20"></div>
                      <div className="absolute bottom-12 left-8 h-16 w-16 rotate-45 rounded-2xl bg-white/15"></div>
                      <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10"></div>

                      {/* Pattern Overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 200 200"
                          fill="none"
                        >
                          <defs>
                            <pattern
                              id={`pattern-${index}`}
                              x="0"
                              y="0"
                              width="40"
                              height="40"
                              patternUnits="userSpaceOnUse"
                            >
                              <circle
                                cx="20"
                                cy="20"
                                r="2"
                                fill="white"
                                fillOpacity="0.3"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="200"
                            height="200"
                            fill={`url(#pattern-${index})`}
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Central Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-3xl bg-white/20 p-8 backdrop-blur-sm">
                        <div className="scale-150 transform text-white">
                          {section.icon}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute right-0 bottom-0 left-0 bg-black/20 p-6 backdrop-blur-sm">
                      <h4 className="text-lg font-semibold text-white">
                        {section.title}
                      </h4>
                      <p className="text-sm text-white/80">
                        {section.highlights.join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl md:p-12">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex justify-center">
                <div className="flex space-x-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="rounded-full bg-green-100 p-3">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="rounded-full bg-orange-100 p-3">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Ready to Transform Your Financial Journey?
              </h3>
              <p className="mb-8 text-xl text-gray-600">
                Join hundreds of successful businesses who trust us with their
                financial operations.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href={"/contact"}
                  className="transform rounded-xl bg-gradient-to-r from-red-600 to-red-900 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-red-700 hover:to-red-700 hover:shadow-xl"
                >
                  Get Started Today
                </Link>
                <Link
                  href={"/contact"}
                  className="rounded-xl border-2 border-red-300 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:bg-(--primery-color) hover:text-white"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default CompanyOverview;
