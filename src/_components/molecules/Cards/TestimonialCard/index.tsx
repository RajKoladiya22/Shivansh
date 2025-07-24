"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TestimonialCardProps } from "../../types/card.type";

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  const { name, title, rating, quote } = testimonial;
  const [showFullScreen, setShowFullScreen] = useState(false);

  const renderStars = (count: number) => {
    const rating = Math.min(Math.max(count, 0), 5); // Ensure rating is between 0 and 5
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="flex flex-col rounded-2xl border border-red-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        {/* Rating */}
        <div className="mb-4 flex gap-1">{renderStars(rating)}</div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Quote */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute -top-3 -left-2 h-8 w-8 text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="pl-6 text-gray-700 italic">{quote}</p>
            </div>
          </div>

          {/* Document Preview */}
          <div className="mb-4">
            <div
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300 hover:shadow-md"
              onClick={() => setShowFullScreen(true)}
            >
              <div className="flex h-40 items-center justify-center p-5">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 transition-all duration-300 group-hover:scale-110">
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
                    View Certificate
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mt-4 flex items-center border-t border-gray-100 pt-4">
          <div className="mr-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-100 to-red-200">
            <span className="text-xl font-bold text-red-600">
              {name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
        </div>
      </motion.div>

      {/* Document Modal */}
      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setShowFullScreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {`${name}'s Certificate`}
                </h3>
                <button
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setShowFullScreen(false)}
                  aria-label="Close document"
                >
                  <svg
                    className="h-6 w-6"
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
              </div>

              {/* Document Content */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100">
                  <svg
                    className="h-12 w-12 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <h4 className="mb-4 text-xl font-bold text-gray-900">
                  Certificate of Excellence
                </h4>

                <div className="mb-8 max-w-2xl text-center">
                  <p className="mb-2 text-gray-700">
                    This certificate is presented to
                  </p>
                  <p className="mb-4 text-2xl font-bold text-red-600">{name}</p>
                  <p className="text-gray-600">
                    For outstanding service and commitment to excellence in the
                    implementation of Tally solutions.
                  </p>
                </div>

                <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Issued By</p>
                      <p className="font-medium">Shivansh Infosys</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">May 15, 2023</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-mono font-medium">SHIV-2023-0421</p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-medium text-white shadow-md transition-all hover:shadow-lg">
                  Download Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
