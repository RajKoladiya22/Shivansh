"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { SectionHeader } from "src/_components/ui";


// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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
  duration = 2000,
  start = false,
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

export const TheFounder = () => {
  const { ref: statsRef, isIntersecting } = useIntersectionObserver(0.3);
  const animatedNumber = useCountAnimation(13, 2000, isIntersecting);

  return (
    <>
      {/* Header Section */}
      <div className="mb-12 text-center sm:mb-16">
        <SectionHeader
          heading="ABOUT THE FOUNDER"
          headingText={`Hello, We're Shivansh Infosys`}
          headingDescription={`We are a digital agency with a team of passionate individuals. The
            journey started with a single man's dream to build a company with
            providing remarkable IT services and here we are!!`}
        />
      </div>

      <div className="mb-16 grid gap-8 py-4 sm:mb-20 lg:grid-cols-12 lg:gap-12">
        {/* Left Side – overlapping cards */}
        <div className="relative h-[16rem] py-4 sm:h-[18rem] md:h-[20rem] lg:col-span-6 lg:h-[24rem] xl:h-[26rem]">
          {/* Office card (bottom) */}
          <div
            ref={statsRef}
            className="relative top-8 right-0 z-10 h-full w-full max-w-[14rem] overflow-hidden rounded-2xl bg-white shadow-lg sm:top-10 sm:right-6 sm:max-w-[16rem] md:right-8 md:max-w-[18rem] lg:max-w-[20rem] xl:max-w-[22rem]"
          >
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Office environment"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Since 2007 badge */}
          <div className="bottom-[] absolute right-0 px-2 py-2 text-[var(--primery-color)] sm:px-4 sm:py-3">
            <p className="text-base font-semibold tracking-[1.5px] sm:text-lg sm:tracking-[2px] md:text-xl md:tracking-[2.5px] lg:text-2xl lg:tracking-[3px] xl:text-3xl">
              SINCE 2007
            </p>
          </div>
          {/* Founder card (top, overlapping) */}
          <div className="absolute right-0 bottom-8 z-20 h-full w-full max-w-[14rem] overflow-hidden rounded-2xl shadow-lg sm:bottom-10 sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] xl:max-w-[22rem]">
            <Image
              src="/images/founder/founder.png"
              alt="Founder"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          {/* 13+ badge */}
          <div className="absolute top-[-15px] left-0 z-30 flex items-center justify-center gap-2 px-2 py-2 sm:top-[-20px] sm:gap-3 sm:px-3 sm:py-3 md:top-[-25px] lg:top-[-25px]">
            <div className="text-2xl font-bold text-[var(--primery-color)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {isIntersecting ? `${animatedNumber}+` : "0+"}
            </div>
            <span className="text-xs font-semibold text-gray-900 sm:text-sm md:text-base lg:text-sm xl:text-base">
              Years Since <br /> Inception
            </span>
          </div>
        </div>
        {/* Right Side - Content */}
        <div className="lg:col-span-6">
          {/* Content */}
          <div className="flex h-full flex-col justify-center px-2 sm:px-4 md:px-6 lg:px-0">
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
              Our reputation grew and we began taking on bigger projects. We
              never lost sight of our main goal: building long-term
              relationships and making certain our clients are happy. Our
              reputation grew and we began taking on bigger projects. We never
              lost sight of our main goal: building long-term relationships and
              making certain our clients are happy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
