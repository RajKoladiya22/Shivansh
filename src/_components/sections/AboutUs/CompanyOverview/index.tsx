"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import Link from "next/link";
import { AboutUs } from "public/data/CompanyOverview";

export const CompanyOverview = () => {
  return (
    <div className="bg-gradient-to-b from-white via-red-50 to-white py-12 md:py-10">
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

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {/* <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
                About Our Company
              </h2>
              <div className="mx-auto mb-6 h-1 w-24 bg-red-600"></div>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Discover our journey, values, and commitment to transforming
                financial management for businesses across India.
              </p>
            </div> */}

            {/* Content Grid */}
            <div className="space-y-16 lg:space-y-24">
              {AboutUs.map((section, index) => (
                <div key={section.id} className="group">
                  <div
                    className={`group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12`}
                  >
                    {/* Content Column */}
                    <div
                      className={`space-y-6 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"} `}
                    >
                      {/* Section Title with Icon */}
                      <div className="mb-6 flex items-center space-x-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                          <div className="text-red-600">{section.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-black md:text-3xl">
                            {section.title}
                          </h3>
                          <div className="mt-2 h-0.5 w-12 bg-red-600"></div>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="prose prose-lg max-w-none">
                        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                          {section.content}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {section.highlights.map((highlight, highlightIndex) => (
                          <span
                            key={highlightIndex}
                            className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visual Column */}
                    <div
                      className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                    >
                      <div className="relative">
                        {/* Main Visual Card */}
                        <div className="relative flex h-80 flex-col items-center justify-center rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-sm transition-all duration-300 group-hover:shadow-md md:h-96 md:p-12">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-red-200 opacity-20"></div>
                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-red-300 opacity-15"></div>
                            <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-100 opacity-25"></div>
                          </div>

                          {/* Central Icon */}
                          <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
                              <div className="scale-150 text-red-600">
                                {section.icon}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-xl font-semibold text-gray-800">
                                {section.title}
                              </h4>
                              <p className="max-w-xs text-sm text-gray-600">
                                {section.highlights.join(" • ")}
                              </p>
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-6 left-6 h-2 w-2 rounded-full bg-red-400 opacity-60"></div>
                          <div className="absolute right-8 bottom-8 h-3 w-3 rounded-full bg-red-500 opacity-40"></div>
                          <div className="absolute top-1/3 right-6 h-1.5 w-1.5 rounded-full bg-red-600 opacity-50"></div>
                        </div>

                        {/* Mobile-only: Number indicator */}
                        <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-md lg:hidden">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mx-auto mt-15 max-w-7xl">
          <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-center text-white sm:rounded-2xl sm:p-8 md:p-12">
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Ready to Transform Your Financial Journey?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join hundreds of successful businesses who trust us with their
                financial operations.`}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="tel:+918141703007"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                Call Now: +91 8141703007
              </Link>
              <Link
                href="/gallery"
                className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                View Archivments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default CompanyOverview;

// <div className="space-y-20">
//   {AboutUs.map((section, index) => (
//     <div key={section.id} className="group">
//       <div
//         className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
//           index % 2 === 1 ? "lg:flex-row-reverse" : ""
//         }`}
//       >
//         {/* Content Side */}
//         <div
//           className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
//         >
//           {/* Section Header */}
//           <div className="flex items-center space-x-4">
//             <div
//               className={`rounded-2xl bg-gradient-to-r p-3 ${section.gradient} text-white shadow-lg`}
//             >
//               {section.icon}
//             </div>
//             <div>
//               <h3
//                 className={`bg-gradient-to-r text-3xl font-bold md:text-4xl ${section.gradient} bg-clip-text text-transparent`}
//               >
//                 {section.title}
//               </h3>
//               <div
//                 className={`h-1 w-16 bg-gradient-to-r ${section.gradient} mt-2 rounded-full`}
//               ></div>
//             </div>
//           </div>

//           {/* Content */}
//           <p className="text-lg leading-relaxed text-gray-700">
//             {section.content}
//           </p>

//           {/* Highlights */}
//           <div className="flex flex-wrap gap-3">
//             {section.highlights.map((highlight, highlightIndex) => (
//               <span
//                 key={highlightIndex}
//                 className={`inline-flex items-center rounded-full bg-gradient-to-r px-4 py-2 text-sm font-medium ${section.gradient} text-white shadow-md transition-shadow duration-300 hover:shadow-lg`}
//               >
//                 {highlight}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Visual Side */}
//         <div
//           className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
//         >
//           <div
//             className={`relative h-80 rounded-3xl bg-gradient-to-br md:h-96 ${section.gradient} group-hover:shadow-3xl overflow-hidden shadow-2xl transition-shadow duration-500`}
//           >
//             {/* Decorative Elements */}
//             <div className="absolute inset-0">
//               {/* Geometric Shapes */}
//               <div className="absolute top-8 right-8 h-24 w-24 rounded-full bg-white/20"></div>
//               <div className="absolute bottom-12 left-8 h-16 w-16 rotate-45 rounded-2xl bg-white/15"></div>
//               <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/10"></div>

//               {/* Pattern Overlay */}
//               <div className="absolute inset-0 opacity-30">
//                 <svg
//                   className="h-full w-full"
//                   viewBox="0 0 200 200"
//                   fill="none"
//                 >
//                   <defs>
//                     <pattern
//                       id={`pattern-${index}`}
//                       x="0"
//                       y="0"
//                       width="40"
//                       height="40"
//                       patternUnits="userSpaceOnUse"
//                     >
//                       <circle
//                         cx="20"
//                         cy="20"
//                         r="2"
//                         fill="white"
//                         fillOpacity="0.3"
//                       />
//                     </pattern>
//                   </defs>
//                   <rect
//                     width="200"
//                     height="200"
//                     fill={`url(#pattern-${index})`}
//                   />
//                 </svg>
//               </div>
//             </div>

//             {/* Central Icon */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="rounded-3xl bg-white/20 p-8 backdrop-blur-sm">
//                 <div className="scale-150 transform text-white">
//                   {section.icon}
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Info */}
//             <div className="absolute right-0 bottom-0 left-0 bg-black/20 p-6 backdrop-blur-sm">
//               <h4 className="text-lg font-semibold text-white">
//                 {section.title}
//               </h4>
//               <p className="text-sm text-white/80">
//                 {section.highlights.join(" • ")}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
