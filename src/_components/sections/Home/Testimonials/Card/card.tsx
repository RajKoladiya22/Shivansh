import React, { useState } from "react";

// import Image from "next/image";
import { TestimonialQuote } from "./quote";

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  rating: number;
  quote: string;
  document: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  const { name, title, rating, quote, document } = testimonial;
  const [showFullScreen, setShowFullScreen] = useState(false);
  // const [currentDocument, setCurrentDocument] = useState("");

  const openDocument = (documentUrl: string) => {
    // setCurrentDocument(documentUrl);
    setShowFullScreen(true);
  };

  const renderStars = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <span key={i} className="text-xl text-yellow-400">
        ★
      </span>
    ));

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-lg">
      {/* Rating */}
      <div className="mb-4 flex">{renderStars(rating)}</div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Quote */}
        <div className="flex-1">
          <TestimonialQuote text={quote} lines={3} />
        </div>

        {/* Document Preview */}
        <div className="col-span-6 mb-6">
          <div
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-md"
            onClick={() => openDocument(document)}
          >
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-red-500">
                  View Document
                </p>
              </div>
            </div>
            <div className="bg-opacity-0 group-hover:bg-opacity-10 absolute inset-0 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex items-center">
        <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-300">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-red-600">{name}</h3>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
      </div>

      {showFullScreen && (
        <div
          className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={() => setShowFullScreen(false)}
        >
          <div className="relative max-h-[90vh] max-w-4xl">
            <button
              className="absolute top-0 -right-12 z-10 text-white hover:text-gray-300 md:-right-16"
              onClick={() => setShowFullScreen(false)}
              aria-label="Close document"
            >
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-white">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg">Document Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
