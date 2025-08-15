"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Website Loader Component
export const WebsiteLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Smooth progress increment with slight randomness
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white duration-300 transition-opacity ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-br from-red-50 via-pink-50 to-blue-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=`60` height=`60` viewBox=`0 0 60 60` xmlns=`http://www.w3.org/2000/svg`%3E%3Cg fill=`none` fill-rule=`evenodd`%3E%3Cg fill=`%23C50202` fill-opacity=`0.1`%3E%3Ccircle cx=`30` cy=`30` r=`4`/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div> */}

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Animated Ring */}
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div
                className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-red-600"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <div
                className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-pink-400"
                style={{
                  animation: "spin 1.5s linear infinite reverse",
                }}
              ></div>
            </div>

            {/* Logo/Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/90 shadow-lg">
                {/* Tally-inspired icon */}
                {/* <svg
                  className="h-8 w-8 animate-pulse text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  <path d="M8 11h8v2H8z" />
                  <path d="M8 7h8v2H8z" />
                  <path d="M8 15h8v2H8z" />
                </svg> */}
                <Image 
                className="h-8 w-8 animate-pulse"
                width={10}
                height={10}
                src={'/images/logo/Logo-name.svg'}
                alt='Shivansh logo'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
            Shivansh Infosys
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Your Trusted Tally Solutions Partner
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto mb-4 w-64">
          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-sm text-gray-500">
          <div className="animate-pulse">Preparing your experience...</div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 left-1/2 h-2 w-2 -translate-x-1/2 animate-bounce rounded-full bg-red-400"></div>
        <div
          className="absolute -bottom-4 left-1/4 h-1 w-1 animate-bounce rounded-full bg-pink-400"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute right-1/4 -bottom-4 h-1 w-1 animate-bounce rounded-full bg-blue-400"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
