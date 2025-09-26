"use client";

import Image from "next/image";
import React, { type ElementType } from "react";
import type {
  ImageSliderProps,
  SliderComponentItem,
  SliderImageItem,
  SliderItem,
} from "../types/slider.type";

// Type guard to check if item is an image item
const isImageItem = (item: SliderItem): item is SliderImageItem => {
  return "src" in item && "alt" in item;
};

// Type guard to check if item is a component item
const isComponentItem = (item: SliderItem): item is SliderComponentItem => {
  return "component" in item;
};

export const ImageSlider: React.FC<ImageSliderProps> = ({
  type,
  items,
  className = "",
  containerClassName = "",
  itemClassName = "",
  imageClassName = "",
  orientation = "horizontal",
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  showFadeEffect = true,
  fadeWidth = "lg",
  backgroundColor = "white",
  grayscale = false,
  grayscaleOnHover = false,
  spacing = "lg",
  priority = 3,
  verticalHeight = "400px",
  // respectReducedMotion = true,
}) => {
  // Validate direction based on orientation
  const validDirection = React.useMemo(() => {
    if (orientation === "horizontal") {
      return direction === "left" || direction === "right" ? direction : "left";
    } else {
      return direction === "up" || direction === "down" ? direction : "up";
    }
  }, [orientation, direction]);

  // Spacing classes for horizontal
  const horizontalSpacingClasses = {
    sm: "px-2 sm:px-3 md:px-4 lg:px-6",
    md: "px-3 sm:px-4 md:px-6 lg:px-8",
    lg: "px-4 sm:px-6 md:px-8 lg:px-12",
    xl: "px-6 sm:px-8 md:px-12 lg:px-16",
  };

  // Spacing classes for vertical
  const verticalSpacingClasses = {
    sm: "py-2 sm:py-3 md:py-4 lg:py-6",
    md: "py-3 sm:py-4 md:py-6 lg:py-8",
    lg: "py-4 sm:py-6 md:py-8 lg:py-12",
    xl: "py-6 sm:py-8 md:py-12 lg:py-16",
  };

  // Fade width classes for horizontal
  const horizontalFadeWidthClasses = {
    sm: "w-8 sm:w-16 md:w-24 lg:w-32",
    md: "w-12 sm:w-24 md:w-32 lg:w-48",
    lg: "w-16 sm:w-32 md:w-48 lg:w-64",
    xl: "w-20 sm:w-40 md:w-56 lg:w-80",
  };

  // Fade height classes for vertical
  const verticalFadeHeightClasses = {
    sm: "h-8 sm:h-16 md:h-24 lg:h-32",
    md: "h-12 sm:h-24 md:h-32 lg:h-48",
    lg: "h-16 sm:h-32 md:h-48 lg:h-64",
    xl: "h-20 sm:h-40 md:h-56 lg:h-80",
  };

  // Get current spacing classes
  const currentSpacingClasses =
    orientation === "horizontal"
      ? horizontalSpacingClasses[spacing]
      : verticalSpacingClasses[spacing];

  // Get current fade classes
  const currentFadeClasses =
    orientation === "horizontal"
      ? horizontalFadeWidthClasses[fadeWidth]
      : verticalFadeHeightClasses[fadeWidth];

  // Animation class based on orientation, direction and speed
  // Calculate duration based on number of items to ensure all items are visible
  const computeDurationSec = (sp: string | number) => {
    if (typeof sp === "number") return sp;
    const s = String(sp).trim().toLowerCase();
    
    // Base duration multiplied by item count factor to ensure all items show
    const itemCountFactor = Math.max(1, items.length / 8); // Scale based on item count
    
    if (s === "fast") return Math.round(15 * itemCountFactor);
    if (s === "normal") return Math.round(25 * itemCountFactor);
    if (s === "slow") return Math.round(40 * itemCountFactor);
    return Math.round(25 * itemCountFactor);
  };
  
  const durationSec = computeDurationSec(speed);
  
  const getAnimationClass = () => {
    const speedClass = speed === "fast" ? "fast" : speed === "slow" ? "slow" : "normal";
    return `animate-slide-${orientation}-${validDirection}-${speedClass}`;
  };

  // Container flex direction
  const flexDirection = orientation === "horizontal" ? "flex" : "flex-col";

  // Image classes
  const imageClasses = `object-contain transition-all duration-300 ${
    grayscale ? "grayscale" : ""
  } ${grayscaleOnHover ? "hover:grayscale" : ""} ${imageClassName}`;

  // Container height for vertical orientation
  const containerHeight =
    orientation === "vertical" ? { height: verticalHeight } : {};

  // Render individual item based on type
  const renderItem = (item: SliderItem, key: string) => {
    const itemContent = (() => {
      if (type === "image" && isImageItem(item)) {
        return (
          <div className="relative h-12 w-20 sm:h-16 sm:w-28 md:h-20 md:w-36 lg:h-24 lg:w-44 flex-shrink-0">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className={imageClasses}
              sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
              priority={item.id <= priority}
            />
          </div>
        );
      } else if (type === "component" && isComponentItem(item)) {
        // Handle both component types and react nodes
        if (React.isValidElement(item.component)) {
          // If it's already a React element, render it directly
          return item.component;
        } else if (typeof item.component === "function") {
          // If it's a component function, render it with props
          const Component = item.component as ElementType;
          return <Component {...(item.props ?? {})} />;
        } else {
          // Fallback for other cases
          return item.component;
        }
      }
      return null;
    })();

    return (
      <div
        key={key}
        className={`flex shrink-0 items-center justify-center ${currentSpacingClasses} ${itemClassName}`}
        style={{ minWidth: orientation === "horizontal" ? "auto" : undefined }}
      >
        {itemContent}
      </div>
    );
  };

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...containerHeight }}
    >
      {/* Fade Effects */}
      {showFadeEffect && orientation === "horizontal" && (
        <>
          <div
            className={`pointer-events-none absolute top-0 left-0 z-10 h-full ${currentFadeClasses}`}
            style={{
              background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className={`pointer-events-none absolute top-0 right-0 z-10 h-full ${currentFadeClasses}`}
            style={{
              background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
            }}
          />
        </>
      )}

      {showFadeEffect && orientation === "vertical" && (
        <>
          <div
            className={`pointer-events-none absolute top-0 left-0 z-10 w-full ${currentFadeClasses}`}
            style={{
              background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 z-10 w-full ${currentFadeClasses}`}
            style={{
              background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Scrolling Container */}
      <div
        className={`relative ${
          orientation === "vertical" ? "h-full" : ""
        } ${containerClassName}`}
      >
        <div
          className={`${getAnimationClass()} ${flexDirection} ${
            pauseOnHover ? "hover:pause" : ""
          }`}
          style={{ 
            animationDuration: `${durationSec}s`,
            width: orientation === "horizontal" ? "fit-content" : "100%"
          }}
        >
          {/* First set of items */}
          <div className={`${flexDirection} shrink-0 items-center`} style={{ width: "fit-content" }}>
            {items.map((item) => renderItem(item, `${item.id}-1`))}
          </div>

          {/* Second set for seamless loop */}
          <div className={`${flexDirection} shrink-0 items-center`} style={{ width: "fit-content" }}>
            {items.map((item) => renderItem(item, `${item.id}-2`))}
          </div>

          {/* Third set to ensure complete visibility on mobile */}
          <div className={`${flexDirection} shrink-0 items-center sm:hidden`} style={{ width: "fit-content" }}>
            {items.map((item) => renderItem(item, `${item.id}-3`))}
          </div>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        /* Horizontal Animations */
        @keyframes slide-horizontal-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slide-horizontal-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Vertical Animations */
        @keyframes slide-vertical-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes slide-vertical-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Base animation classes with dynamic durations based on item count */
        .animate-slide-horizontal-left-slow {
          animation: slide-horizontal-left 40s linear infinite;
        }
        .animate-slide-horizontal-left-normal {
          animation: slide-horizontal-left 30s linear infinite;
        }
        .animate-slide-horizontal-left-fast {
          animation: slide-horizontal-left 20s linear infinite;
        }

        .animate-slide-horizontal-right-slow {
          animation: slide-horizontal-right 40s linear infinite;
        }
        .animate-slide-horizontal-right-normal {
          animation: slide-horizontal-right 30s linear infinite;
        }
        .animate-slide-horizontal-right-fast {
          animation: slide-horizontal-right 20s linear infinite;
        }

        .animate-slide-vertical-up-slow {
          animation: slide-vertical-up 40s linear infinite;
        }
        .animate-slide-vertical-up-normal {
          animation: slide-vertical-up 30s linear infinite;
        }
        .animate-slide-vertical-up-fast {
          animation: slide-vertical-up 20s linear infinite;
        }

        .animate-slide-vertical-down-slow {
          animation: slide-vertical-down 40s linear infinite;
        }
        .animate-slide-vertical-down-normal {
          animation: slide-vertical-down 30s linear infinite;
        }
        .animate-slide-vertical-down-fast {
          animation: slide-vertical-down 20s linear infinite;
        }

        /* Pause on hover */
        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        /* Mobile responsive speeds (small screens) */
        @media (max-width: 640px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow,
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 30s;
          }
          
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal,
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 22s;
          }
          
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast,
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 16s;
          }
        }

        /* Tablet responsive speeds (medium screens) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow,
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 35s;
          }
          
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal,
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 26s;
          }
          
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast,
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 18s;
          }
        }

        /* Desktop responsive speeds (large screens) */
        @media (min-width: 1025px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow,
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 40s;
          }
          
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal,
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 30s;
          }
          
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast,
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 20s;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-slide-"] {
            animation: none;
          }
        }

        /* Performance optimization */
        [class*="animate-slide-"] {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

// Horizontal Sliding (Original behavior):

// <ImageSlider
//   items={Partnerlogos}
//   orientation="horizontal"  // New prop
//   direction="left"          // left or right
//   speed="normal"
//   pauseOnHover={true}
//   showFadeEffect={true}
//   fadeWidth="lg"
//   backgroundColor="white"
//   grayscale={false}
//   grayscaleOnHover={true}
//   spacing="lg"
//   priority={4}
//   respectReducedMotion={true}
// />

// Vertical Sliding (New feature):
{
  /* <ImageSlider
  items={Partnerlogos}
  orientation="vertical"     // New prop
  direction="up"            // up or down
  speed="normal"
  pauseOnHover={true}
  showFadeEffect={true}
  fadeWidth="lg"
  backgroundColor="white"
  grayscale={false}
  grayscaleOnHover={true}
  spacing="lg"
  priority={4}
  verticalHeight="500px"    // New prop for vertical height
  respectReducedMotion={true}
/> */
}
