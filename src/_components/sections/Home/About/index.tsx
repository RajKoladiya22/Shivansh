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
  <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gradient-to-br from-[#C50202] via-red-500 to-[#C50202] text-white">
    <div className="max-w-2xl mx-auto">
      <div className="inline-block bg-gradient-to-r from-red-100 to-[#C50202]-50 text-gray-900 px-3 py-1 rounded-full text-xs font-bold mb-4 sm:mb-6">
        TALLY 3 STAR CERTIFIED PARTNER
      </div>
      
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        SHIVANSH INFOSYS
      </h3>

      <div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
        <p className="bg-red-800/30 backdrop-blur-sm p-4 rounded-xl">
          Founded in April 2007, Shivansh Infosys began with a vision to deliver exceptional service to our clients. 
          Our commitment to excellence has driven our growth and success in the industry.
        </p>
        
        <p className="bg-red-800/30 backdrop-blur-sm p-4 rounded-xl">
          {`Today, we're proud to serve over 1500 end users and 450 companies across India. 
          Our clients' trust and support have been instrumental in our journey, and we're grateful for the opportunity to contribute to their success.`}
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          className="px-6 py-3 bg-white text-red-700 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 text-center"
          aria-label="Get a quote from Shivansh Infosys"
        >
          GET A QUOTE
        </button>
        
        <button
          className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 text-center"
          aria-label="Learn more about Shivansh Infosys"
        >
          OUR STORY
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="bg-red-900/40 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">13+</div>
          <div className="text-xs opacity-80">Years Experience</div>
        </div>
        <div className="bg-red-900/40 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">1500+</div>
          <div className="text-xs opacity-80">End Users</div>
        </div>
        <div className="bg-red-900/40 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold">450+</div>
          <div className="text-xs opacity-80">Companies</div>
        </div>
        <div className="bg-red-900/40 p-3 rounded-lg text-center">
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
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    setShowImagePreview(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative min-h-[390px] sm:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-red-100 to-red-100">
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="relative w-full max-w-md">
          <div 
            className="group relative cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
            aria-label="View Tally Certificate"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-xl shadow-2xl p-4 transform transition-all duration-500 group-hover:shadow-2xl">
              <div className="border-4 border-blue-500 rounded-lg overflow-hidden">
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
                <p className="font-bold text-gray-800">Tally 3 Star Certified Partner</p>
                <p className="text-sm text-gray-600 mt-1">Click to view certificate</p>
              </div>
            </div>
          </div>
          
          {/* Floating Tally Logo */}
          <div className="absolute -bottom-8 right-4 sm:right-8 md:right-12 lg:-right-10 lg:bottom-16 bg-white p-3 rounded-full shadow-xl z-10">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <Image
              src="/images/industry_logo/tally.avif"
              alt="Tally Logo"
              width={64}
              height={64}
              className="absolute inset-0 object-contain"
              style={{ margin: 'auto', top: '60%', left: '50%', transform: 'translate(-50%, -40%)' }}
            />
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closePreview}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors"
              aria-label="Close preview"
            >
              <X size={32} />
            </button>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/certificate/tally.png"
                  alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys - Full Size"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-center font-medium text-gray-800">Tally 3 Star Certified Partner - Shivansh Infosys</p>
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
    <section className="py-12 sm:py-16 md:py-24 lg:py-28 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            <h3 className="text-xl font-bold text-(--primery-color) mb-6">Our Other Services</h3>
            
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