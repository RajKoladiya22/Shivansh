"use client";
import React, { useState, useEffect, useRef } from "react";
import { SectionHeader } from "src/_components/ui";

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isIntersecting };
};

// Hook for number animation
const useCountAnimation = (
  targetValue: number,
  duration: number = 2000,
  start: boolean = false,
) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeOutQuart * targetValue);

      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, start]);

  return currentValue;
};

export const AboutTheFounder = () => {
  const { ref: statsRef, isIntersecting } = useIntersectionObserver(0.3);
  const animatedNumber = useCountAnimation(13, 2000, isIntersecting);

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <SectionHeader
            heading="ABOUT THE FOUNDER"
            headingText="Hello, We're Shivansh Infosys"
            headingDescription="We are a digital agency with a team of passionate individuals. The
            journey started with a single man's dream to build a company with
            providing remarkable IT services and here we are!!"
          />
        </div>

        {/* Main Content Section */}
        <div className="mb-16 grid gap-8 sm:mb-20 lg:grid-cols-12 lg:gap-12">
          {/* Left Side - Stats and Office Image */}
          <div className="space-y-6 lg:col-span-5">
            {/* Years Since Inception */}
            <div ref={statsRef} className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-red-600 sm:text-5xl lg:text-6xl">
                  {isIntersecting ? `${animatedNumber}+` : "0+"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 sm:text-xl">
                    Years Since
                  </p>
                  <p className="text-lg font-semibold text-gray-900 sm:text-xl">
                    Inception
                  </p>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Office environment"
                className="h-48 w-full object-cover sm:h-56 lg:h-64"
              />
            </div>
          </div>

          {/* Right Side - Founder Image and Content */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {/* Founder Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                    alt="Founder"
                    className="h-64 w-full object-cover sm:h-72 lg:h-80"
                  />
                </div>

                {/* Since 2007 Badge */}
                <div className="absolute -bottom-4 left-4 rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg">
                  <p className="text-sm font-semibold tracking-wide">
                    SINCE 2007
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                  Our reputation grew and we began taking on bigger projects. We
                  never lost sight of our main goal: building long-term
                  relationships and making certain our clients are happy. Our
                  reputation grew and we began taking on bigger projects. We
                  never lost sight of our main goal: building long-term
                  relationships and making certain our clients are happy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12 text-center sm:mb-16">
          <SectionHeader
            heading="HOW IT WORKS?"
            headingText="Story Behind of Shivansh"
            headingDescription="Finding a business with congruent values and business culture is
            important choosing a partner. When this first tier of trust is
            established, it is more likely that each party will continue with a
            valued level of transparency and communication. You can count on us.
            We are always here to help our clients."
          />
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Vision Card */}
          <div className="transform rounded-2xl bg-red-600 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="text-4xl font-bold opacity-80 sm:text-5xl lg:text-6xl">
                01
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Vision</h3>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                Transparency is not just a buzzword. It's one of our core values
                that continue to impress our clients.
              </p>
              <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                Transparency is not just a buzzword. It's one of our core values
                that continue to impress our clients.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="transform rounded-2xl bg-red-600 p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="text-4xl font-bold opacity-80 sm:text-5xl lg:text-6xl">
                02
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Mission</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
              We have partnered with some of the world's most exciting companies
              to deliver exceptional IT Solutions. We successfully work
              alongside clients to identify the problem and develop effective
              solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
