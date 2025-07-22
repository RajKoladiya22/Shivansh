// "use client";
// import React from "react";
// import { SectionHeader } from "src/_components/ui";
// import { AboutUsLeftContent, AboutUsRightContent } from "./content";

// export const AboutUsSection = () => {
//   return (
//     <>
//       <section className="py-1 sm:py-12 md:py-20 lg:py-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="row">
//             <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
//               {/* Section Header */}
//               <div className="py-8">
//                 <SectionHeader
//                   heading="ABout us"
//                   headingClassName="text-sm font-bold text-red-600 tracking-wider"
//                   headingText="We Are Standing With 10+ Years Of Experience "
//                   headingTextClassName="text-(43px) font-[600] text-gray-900"
//                   showDescription={false}
//                 />
//               </div>
//               {/* Main Content */}
//               <div className="overflow-hidden rounded-2xl bg-(--primery-color) shadow-2xl sm:rounded-3xl">
//                 <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
//                   {/* Left Content */}
//                   <AboutUsLeftContent />

//                   {/* Right Image */}
//                   <AboutUsRightContent />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SectionHeader } from "src/_components/ui";
import { Partnerlogos } from "public/data/partnersLogo";
import { ImageSlider } from "src/_components/molecules";

// Section Header Component
// const SectionHeader = ({ heading, headingText, headingClassName, headingTextClassName }) => (
//   <div className="text-center mb-10 md:mb-14 lg:mb-16">
//     <h2 className={`mb-3 uppercase ${headingClassName || "text-sm font-bold text-red-600 tracking-wider"}`}>
//       {heading}
//     </h2>
//     <h3 className={`${headingTextClassName || "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"}`}>
//       {headingText}
//     </h3>
//   </div>
// );

// Left Content Component
const AboutUsLeftContent = () => (
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
          {`Today, we're proud to serve over 1500 end users and 450 companies across India. 
          Our clients' trust and support have been instrumental in our journey, and we're grateful for the opportunity to contribute to their success.`}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          className="flex-1 rounded-full bg-white px-6 py-3 text-center font-bold text-red-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          aria-label="Get a quote from Shivansh Infosys"
        >
          GET A QUOTE
        </button>

        <button
          className="flex-1 rounded-full border-2 border-white bg-transparent px-6 py-3 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          aria-label="Learn more about Shivansh Infosys"
        >
          OUR STORY
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">13+</div>
          <div className="text-xs opacity-80">Years Experience</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">1500+</div>
          <div className="text-xs opacity-80">End Users</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">450+</div>
          <div className="text-xs opacity-80">Companies</div>
        </div>
        <div className="rounded-lg bg-red-900/40 p-3 text-center">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-xs opacity-80">Support</div>
        </div>
      </div>
    </div>
  </div>
);

// Right Content Component
const AboutUsRightContent = () => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageClick = () => {
    setShowImagePreview(true);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setShowImagePreview(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative min-h-[390px] bg-gradient-to-br from-red-100 to-red-100 sm:min-h-[400px] lg:min-h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="relative w-full max-w-md">
          <div
            className="group relative cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
            aria-label="View Tally Certificate"
          >
            <div className="absolute inset-0 rotate-6 transform rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 transition-transform duration-500 group-hover:rotate-3"></div>
            <div className="relative transform rounded-xl bg-white p-4 shadow-2xl transition-all duration-500 group-hover:shadow-2xl">
              <div className="overflow-hidden rounded-lg border-4 border-blue-500">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/certificate/tally.png"
                    alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-bold text-gray-800">
                  Tally 3 Star Certified Partner
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Click to view certificate
                </p>
              </div>
            </div>
          </div>

          {/* Floating Tally Logo */}
          <div className="absolute right-4 -bottom-8 z-10 rounded-full bg-white p-3 shadow-xl sm:right-8 md:right-12 lg:-right-10 lg:bottom-16">
            <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
            <Image
              src="/images/industry_logo/tally.avif"
              alt="Tally Logo"
              width={64}
              height={64}
              className="absolute inset-0 object-contain"
              style={{
                margin: "auto",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -40%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={closePreview}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black"
              aria-label="Close preview"
            >
              <X size={32} />
            </button>

            <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/certificate/tally.png"
                  alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys - Full Size"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <p className="text-center font-medium text-gray-800">
                  Tally 3 Star Certified Partner - Shivansh Infosys
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main About Us Section Component
export const AboutUsSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-red-50 py-12 sm:py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            heading="ABOUT US"
            headingText="We Are Standing With 10+ Years Of Experience"
          />

          <div className="overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <AboutUsLeftContent />
              <AboutUsRightContent />
            </div>
          </div>

          {/* Trusted Partners */}
          <div className="mt-16 text-center">
            <h3 className="mb-6 text-xl font-bold text-(--primery-color)">
              We Also Work With
            </h3>

            {/* <div className="flex flex-wrap justify-center gap-6">
              {Partnerlogos.map((p, i) => (
                <>
                
                <div key={i} className="border-2 border-dashed rounded-xl w-20 h-20  hover:opacity-100 transition-opacity" >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                </>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <ImageSlider
        type="image"
        items={Partnerlogos}
        orientation="horizontal"
        direction="left" // left or right
        speed="normal"
        pauseOnHover={true}
        showFadeEffect={true}
        fadeWidth="lg"
        backgroundColor="bg-red-50"
        grayscale={false}
        grayscaleOnHover={true}
        spacing="lg"
        priority={4}
        respectReducedMotion={true}
      />
    </section>
  );
};
