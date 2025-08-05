"use client";

import React from "react";
import { HowItWork } from "./HowWork";
import { TheFounder } from "./Founder";

export const AboutTheFounder = () => {
  return (
    // py-12 sm:py-16 lg:py-20
    <div className="mx-auto max-w-7xl ">
      <div className="py-14 sm:py-18">
        <TheFounder />
      </div>
      <div className="py-14 sm:py-18">
        <HowItWork />
      </div>
    </div>
  );
};
