"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export const AboutUsRightContent = () => {
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
    <div className="relative min-h-[390px] bg-gradient-to-br from-red-100 to-red-100 sm:min-h-[450px] md:min-h-[500px] lg:min-h-[500px]">
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
          <div className="sn:-bottom-2 absolute -right-4 -bottom-4 z-10 rounded-full bg-white p-3 shadow-xl sm:right-8 md:right-12 lg:-right-10 lg:bottom-16">
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
