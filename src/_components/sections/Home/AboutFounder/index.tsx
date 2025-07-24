"use client";

import React from "react";
import { HowItWork } from "./HowWork";
import { TheFounder } from "./Founder";

export const AboutTheFounder = () => {
  return (
    // py-12 sm:py-16 lg:py-20
    <div className="bg-gradient-to-b from-red to-red-50 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TheFounder />

        <HowItWork />
      </div>
    </div>
  );
};
