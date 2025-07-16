"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export const AboutUsRightContent = () => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageClick = () => {
    setShowImagePreview(true);
  };

  const closePreview = () => {
    setShowImagePreview(false);
  };

  return (
    <>
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
