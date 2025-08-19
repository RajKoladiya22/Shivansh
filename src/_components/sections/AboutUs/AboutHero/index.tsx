"use client";
import Image from "next/image";
import { teamFacts } from "public/data/Team";
import React, { useState, useEffect } from "react";
import {
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";

export const AboutUsHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Rotate through team facts
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) =>
        prevIndex === teamFacts.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-red-100 opacity-50" />
        <div
          className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-blue-100 opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 h-12 w-12 animate-pulse rounded-full bg-green-100 opacity-30"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute right-1/3 bottom-20 h-24 w-24 animate-bounce rounded-full bg-purple-100 opacity-25"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10 px-4 pt-22 sm:px-6 sm:pt-1 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div
            className={`container mx-auto transform space-y-8 px-4 text-center transition-all duration-1000 sm:px-6 lg:px-8 lg:text-left ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="relative inline-block">
              <p className={`z-10 ${hero_heading_font}`}>
                Meet Our Amazing Team
              </p>
              <div
                className={`absolute top-0 h-[50%] rounded-lg bg-(--pink) sm:h-full`}
                style={{
                  width: "calc(40% + 20px)",
                  right: "0",
                  transform: "translate(10%, -40%)",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className={`${hero_headline_font}`}>
                We Are{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Shivansh Infosys
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`max-w-2xl ${hero_content_font}`}>
                {`A passionate team of creative professionals dedicated to
                transforming your digital vision into reality. We don't just
                build websites and apps – we craft experiences that inspire and
                engage.`}
              </p>
            </div>

            {/* Rotating Stats */}
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 lg:justify-start">
              <div className="text-center">
                <div className="mb-1 text-xl font-bold text-gray-800 sm:text-2xl">
                  Since 2007
                </div>
                <div className="text-sm tracking-wide text-gray-500 uppercase">
                  Building Dreams
                </div>
              </div>
              <div className="hidden h-12 w-px bg-gray-300 sm:block" />
              <div className="text-center sm:text-left">
                <div className="mb-1 text-2xl font-bold text-red-600 sm:text-3xl">
                  {teamFacts[currentFactIndex]}
                </div>
                <div className="text-sm tracking-wide text-gray-500 uppercase">
                  Our Achievement
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <button
              aria-label="Click-to-youtube"
                className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primery-color) from-blue-600 to-indigo-700 px-6 py-3 font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => window.open("https://bitly.cx/rNEH4", "_blank")}
              >
                Start Your Project
                <svg
                  className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <button
              aria-label="Click-to-call"
                className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-(--primery-color) bg-white px-6 py-3 font-bold tracking-wide text-(--primery-color) shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-(--primery-color) hover:text-white hover:shadow-lg"
                onClick={() => window.open("tel:+918141703007", "_self")}
              >
                Our Story
                <svg
                  className="ml-2 h-5 w-5 transform transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mb-6 border-b border-gray-200 pb-2 text-gray-800"></div>

            {/* Bottom Section - Team Values */}
            <div
              className={`mt-10 transform text-center transition-all delay-500 duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } px-4 sm:px-6 lg:px-8`}
            >
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature Item */}
                <div className="group">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-red-200 transition-transform group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                    Innovation
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    We bring fresh ideas and cutting-edge solutions to every
                    project.
                  </p>
                </div>

                {/* Collaboration */}
                <div className="group">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-blue-200 transition-transform group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                    Collaboration
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    We work closely with our clients to achieve exceptional
                    results.
                  </p>
                </div>

                {/* Excellence */}
                <div className="group">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-100 to-green-200 transition-transform group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                    Excellence
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    {`We're committed to delivering the highest quality in everything we do.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Team Photo */}
          <div
            className={`relative transform py-9 transition-all delay-300 duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Photo Container with Creative Border */}
            <div className="group relative">
              {/* Background Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-red-200 to-red-300 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-50" />

              {/* Main Photo Frame */}
              <div className="relative mx-auto w-full max-w-[1000px] transform rounded-3xl bg-white p-2 shadow-2xl transition-all duration-500 group-hover:scale-105">
                {/* aspect‑ratio wrapper */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Image
                    width={200}
                    height={200}
                    src="/images/team/group/team.jpg"
                    alt="Shivansh Infosys Team - Creative professionals working together"
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                    style={{ filter: "brightness(1.05) contrast(1.1)" }}
                  />
                </div>

                {/* Photo Overlay */}
                <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Floating Team Cards */}
              <div className="absolute -top-6 -right-6 rotate-6 transform rounded-2xl bg-white p-4 shadow-lg transition-transform duration-300 hover:rotate-0">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
                    <span className="text-sm font-bold text-white">12</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      Team Members
                    </div>
                    <div className="text-xs text-gray-500">Ready to Help</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 -rotate-6 transform rounded-2xl bg-white p-4 shadow-lg transition-transform duration-300 hover:rotate-0">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      Available
                    </div>
                    <div className="text-xs text-gray-500">
                      For New Projects
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              {/* <div className="absolute top-1/2 -left-12 hidden -translate-y-1/2 transform flex-col space-y-4 lg:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110">
                  <span className="text-2xl">⚛️</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110">
                  <span className="text-2xl">🎨</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// export default AboutUsHero;
