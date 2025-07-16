"use client";

import Image from "next/image";
import React from "react";

export interface SliderItem {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ImageSliderProps {
  items: SliderItem[];
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  imageClassName?: string;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  showFadeEffect?: boolean;
  fadeWidth?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: string;
  grayscale?: boolean;
  grayscaleOnHover?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
  priority?: number;
  respectReducedMotion?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  items,
  className = "",
  containerClassName = "",
  itemClassName = "",
  imageClassName = "",
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  showFadeEffect = true,
  fadeWidth = "lg",
  backgroundColor = "white",
  grayscale = false,
  grayscaleOnHover = false,
  spacing = "lg",
  priority = 3,
  // respectReducedMotion = true,
}) => {
  // Spacing classes
  const spacingClasses = {
    sm: "px-2 sm:px-3 md:px-4 lg:px-6",
    md: "px-3 sm:px-4 md:px-6 lg:px-8",
    lg: "px-4 sm:px-6 md:px-8 lg:px-12",
    xl: "px-6 sm:px-8 md:px-12 lg:px-16",
  };

  // Fade width classes
  const fadeWidthClasses = {
    sm: "w-8 sm:w-16 md:w-24 lg:w-32",
    md: "w-12 sm:w-24 md:w-32 lg:w-48",
    lg: "w-16 sm:w-32 md:w-48 lg:w-64",
    xl: "w-20 sm:w-40 md:w-56 lg:w-80",
  };

  // Animation class based on direction and speed
  const getAnimationClass = () => {
    const speedClass =
      speed === "fast" ? "fast" : speed === "slow" ? "slow" : "normal";
    return `animate-slide-${direction}-${speedClass}`;
  };

  // Image classes
  const imageClasses = `object-contain transition-all duration-300 ${
    grayscale ? "grayscale" : ""
  } ${grayscaleOnHover ? "hover:grayscale" : ""} ${imageClassName}`;

  return (
    <section
      className={`relative overflow-hidden  ${className}`}
      style={{ backgroundColor }}
    >
      {/* Fade Effects */}
      {showFadeEffect && (
        <>
          <div
            className={`pointer-events-none absolute top-0 left-0 z-10 h-full ${fadeWidthClasses[fadeWidth]}`}
            style={{
              background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className={`pointer-events-none absolute top-0 right-0 z-10 h-full ${fadeWidthClasses[fadeWidth]}`}
            style={{
              background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Scrolling Container */}
      <div className={`relative ${containerClassName}`}>
        <div
          className={`${getAnimationClass()} flex ${pauseOnHover ? "hover:pause" : ""}`}
        >
          {/* First set of items */}
          <div className="flex shrink-0 items-center">
            {items.map((item) => (
              <div
                key={`${item.id}-1`}
                className={`flex shrink-0 items-center justify-center ${spacingClasses[spacing]} ${itemClassName}`}
              >
                <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={imageClasses}
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                    priority={item.id <= priority}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second set for seamless loop */}
          <div className="flex shrink-0 items-center">
            {items.map((item) => (
              <div
                key={`${item.id}-2`}
                className={`flex shrink-0 items-center justify-center ${spacingClasses[spacing]} ${itemClassName}`}
              >
                <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={imageClasses}
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Left direction animations */
        .animate-slide-left-slow {
          animation: slide-left 40s linear infinite;
        }
        .animate-slide-left-normal {
          animation: slide-left 30s linear infinite;
        }
        .animate-slide-left-fast {
          animation: slide-left 20s linear infinite;
        }

        /* Right direction animations */
        .animate-slide-right-slow {
          animation: slide-right 40s linear infinite;
        }
        .animate-slide-right-normal {
          animation: slide-right 30s linear infinite;
        }
        .animate-slide-right-fast {
          animation: slide-right 20s linear infinite;
        }

        /* Pause on hover */
        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        /* Responsive speeds */
        @media (max-width: 640px) {
          .animate-slide-left-slow {
            animation-duration: 25s;
          }
          .animate-slide-left-normal {
            animation-duration: 20s;
          }
          .animate-slide-left-fast {
            animation-duration: 15s;
          }
          .animate-slide-right-slow {
            animation-duration: 25s;
          }
          .animate-slide-right-normal {
            animation-duration: 20s;
          }
          .animate-slide-right-fast {
            animation-duration: 15s;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .animate-slide-left-slow {
            animation-duration: 35s;
          }
          .animate-slide-left-normal {
            animation-duration: 25s;
          }
          .animate-slide-left-fast {
            animation-duration: 18s;
          }
          .animate-slide-right-slow {
            animation-duration: 35s;
          }
          .animate-slide-right-normal {
            animation-duration: 25s;
          }
          .animate-slide-right-fast {
            animation-duration: 18s;
          }
        }

        @media (min-width: 1025px) {
          .animate-slide-left-slow {
            animation-duration: 45s;
          }
          .animate-slide-left-normal {
            animation-duration: 35s;
          }
          .animate-slide-left-fast {
            animation-duration: 25s;
          }
          .animate-slide-right-slow {
            animation-duration: 45s;
          }
          .animate-slide-right-normal {
            animation-duration: 35s;
          }
          .animate-slide-right-fast {
            animation-duration: 25s;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-left-slow,
          .animate-slide-left-normal,
          .animate-slide-left-fast,
          .animate-slide-right-slow,
          .animate-slide-right-normal,
          .animate-slide-right-fast {
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

// export default ImageSlider;

// Example usage in a component

// <ImageSlider
//   items={industryLogos}
//   direction="left"
//   speed="normal"
//   pauseOnHover={true}
//   showFadeEffect={true}
//   fadeWidth="lg"
//   backgroundColor="white"
//   grayscale={false}
//   grayscaleOnHover={true}
//   spacing="lg"
//   priority={3}
//   respectReducedMotion={true}
// />
