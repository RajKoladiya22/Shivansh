"use client";
import React from "react";
import { StatisticsLeftContent, YouTubeVideosRightContent } from "./content";


export const StatisticsSection = () => {
  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="row">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              {/* Main Content */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-1 xl:grid-cols-2">
                  {/* Left Content - Statistics */}
                  <StatisticsLeftContent />

                  {/* Right Content - YouTube Videos */}
                  <YouTubeVideosRightContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};