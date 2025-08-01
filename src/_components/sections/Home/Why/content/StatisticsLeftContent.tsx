"use client";
import React, { useState, useEffect, useRef } from "react";
import { stats } from "public/data/countState";
import type { StatItem } from "src/_components/sections/types/startItem.type";

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if (entry && entry.isIntersecting) {
        //   setIsIntersecting(true);
        // }
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

      // Easing function for smooth animation
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

// Extract number from string (e.g., "1000+" -> 1000)
const extractNumber = (str: string): number => {
  // const match = str.match(/[\d,]+/);
  // const match = /[\d,]+/.exec(str);
  // return match ? parseInt(match[0].replace(/,/g, "")) : 0;

  const match = /[\d,]+/.exec(str);
  return match?.[0] ? parseInt(match[0].replace(/,/g, "")) : 0;
};

// Format number with commas and preserve suffix
const formatNumber = (value: number, originalString: string): string => {
  const suffix = originalString.replace(/[\d,]/g, "");
  const formattedNumber = value.toLocaleString();
  return formattedNumber + suffix;
};

// Individual stat component with animation
const AnimatedStat: React.FC<{
  stat: StatItem;
  index: number;
  startAnimation: boolean;
}> = ({ stat, index, startAnimation }) => {
  const targetNumber = extractNumber(stat.number);
  const currentNumber = useCountAnimation(
    targetNumber,
    2000 + index * 200,
    startAnimation,
  );

  return (
    <div className="group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-800/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
          <stat.icon className="h-6 w-6 text-red-500 transition-colors duration-200 group-hover:text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-900 transition-all duration-300 sm:text-3xl lg:text-4xl">
            {startAnimation ? formatNumber(currentNumber, stat.number) : "0"}
          </div>
          <div className="mt-1 text-sm text-gray-600 sm:text-base">
            {stat.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatisticsLeftContent = () => {
  const { ref, isIntersecting } = useIntersectionObserver(0.3);

  return (
    <div
      className="relative px-6 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-100" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Shivansh Infosys
            </h2>
            <p className="mt-4 max-w-xl text-gray-600">
              {`With over a decade of experience, we've helped thousands of businesses 
            streamline their accounting with Tally solutions.`}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              stat={stat}
              index={index}
              startAnimation={isIntersecting}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
