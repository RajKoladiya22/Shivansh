// "use client";

// import Image from "next/image";
// import React from "react";

// export interface SliderItem {
//   id: number;
//   src: string;
//   alt: string;
//   width?: number;
//   height?: number;
// }

// export interface ImageSliderProps {
//   items: SliderItem[];
//   className?: string;
//   containerClassName?: string;
//   itemClassName?: string;
//   imageClassName?: string;
//   direction?: "left" | "right";
//   speed?: "slow" | "normal" | "fast";
//   pauseOnHover?: boolean;
//   showFadeEffect?: boolean;
//   fadeWidth?: "sm" | "md" | "lg" | "xl";
//   backgroundColor?: string;
//   grayscale?: boolean;
//   grayscaleOnHover?: boolean;
//   spacing?: "sm" | "md" | "lg" | "xl";
//   priority?: number;
//   respectReducedMotion?: boolean;
// }

// export const ImageSlider: React.FC<ImageSliderProps> = ({
//   items,
//   className = "",
//   containerClassName = "",
//   itemClassName = "",
//   imageClassName = "",
//   direction = "left",
//   speed = "normal",
//   pauseOnHover = true,
//   showFadeEffect = true,
//   fadeWidth = "lg",
//   backgroundColor = "white",
//   grayscale = false,
//   grayscaleOnHover = false,
//   spacing = "lg",
//   priority = 3,
//   // respectReducedMotion = true,
// }) => {
//   // Spacing classes
//   const spacingClasses = {
//     sm: "px-2 sm:px-3 md:px-4 lg:px-6",
//     md: "px-3 sm:px-4 md:px-6 lg:px-8",
//     lg: "px-4 sm:px-6 md:px-8 lg:px-12",
//     xl: "px-6 sm:px-8 md:px-12 lg:px-16",
//   };

//   // Fade width classes
//   const fadeWidthClasses = {
//     sm: "w-8 sm:w-16 md:w-24 lg:w-32",
//     md: "w-12 sm:w-24 md:w-32 lg:w-48",
//     lg: "w-16 sm:w-32 md:w-48 lg:w-64",
//     xl: "w-20 sm:w-40 md:w-56 lg:w-80",
//   };

//   // Animation class based on direction and speed
//   const getAnimationClass = () => {
//     const speedClass =
//       speed === "fast" ? "fast" : speed === "slow" ? "slow" : "normal";
//     return `animate-slide-${direction}-${speedClass}`;
//   };

//   // Image classes
//   const imageClasses = `object-contain transition-all duration-300 ${
//     grayscale ? "grayscale" : ""
//   } ${grayscaleOnHover ? "hover:grayscale" : ""} ${imageClassName}`;

//   return (
//     <section
//       className={`relative overflow-hidden  ${className}`}
//       style={{ backgroundColor }}
//     >
//       {/* Fade Effects */}
//       {showFadeEffect && (
//         <>
//           <div
//             className={`pointer-events-none absolute top-0 left-0 z-10 h-full ${fadeWidthClasses[fadeWidth]}`}
//             style={{
//               background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
//             }}
//           />
//           <div
//             className={`pointer-events-none absolute top-0 right-0 z-10 h-full ${fadeWidthClasses[fadeWidth]}`}
//             style={{
//               background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
//             }}
//           />
//         </>
//       )}

//       {/* Scrolling Container */}
//       <div className={`relative ${containerClassName}`}>
//         <div
//           className={`${getAnimationClass()} flex ${pauseOnHover ? "hover:pause" : ""}`}
//         >
//           {/* First set of items */}
//           <div className="flex shrink-0 items-center">
//             {items.map((item) => (
//               <div
//                 key={`${item.id}-1`}
//                 className={`flex shrink-0 items-center justify-center ${spacingClasses[spacing]} ${itemClassName}`}
//               >
//                 <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
//                   <Image
//                     src={item.src}
//                     alt={item.alt}
//                     fill
//                     className={imageClasses}
//                     sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
//                     priority={item.id <= priority}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Second set for seamless loop */}
//           <div className="flex shrink-0 items-center">
//             {items.map((item) => (
//               <div
//                 key={`${item.id}-2`}
//                 className={`flex shrink-0 items-center justify-center ${spacingClasses[spacing]} ${itemClassName}`}
//               >
//                 <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48">
//                   <Image
//                     src={item.src}
//                     alt={item.alt}
//                     fill
//                     className={imageClasses}
//                     sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CSS Animation Styles */}
//       <style jsx>{`
//         @keyframes slide-left {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         @keyframes slide-right {
//           0% {
//             transform: translateX(-50%);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         /* Left direction animations */
//         .animate-slide-left-slow {
//           animation: slide-left 40s linear infinite;
//         }
//         .animate-slide-left-normal {
//           animation: slide-left 30s linear infinite;
//         }
//         .animate-slide-left-fast {
//           animation: slide-left 20s linear infinite;
//         }

//         /* Right direction animations */
//         .animate-slide-right-slow {
//           animation: slide-right 40s linear infinite;
//         }
//         .animate-slide-right-normal {
//           animation: slide-right 30s linear infinite;
//         }
//         .animate-slide-right-fast {
//           animation: slide-right 20s linear infinite;
//         }

//         /* Pause on hover */
//         .hover\\:pause:hover {
//           animation-play-state: paused;
//         }

//         /* Responsive speeds */
//         @media (max-width: 640px) {
//           .animate-slide-left-slow {
//             animation-duration: 25s;
//           }
//           .animate-slide-left-normal {
//             animation-duration: 20s;
//           }
//           .animate-slide-left-fast {
//             animation-duration: 15s;
//           }
//           .animate-slide-right-slow {
//             animation-duration: 25s;
//           }
//           .animate-slide-right-normal {
//             animation-duration: 20s;
//           }
//           .animate-slide-right-fast {
//             animation-duration: 15s;
//           }
//         }

//         @media (min-width: 641px) and (max-width: 1024px) {
//           .animate-slide-left-slow {
//             animation-duration: 35s;
//           }
//           .animate-slide-left-normal {
//             animation-duration: 25s;
//           }
//           .animate-slide-left-fast {
//             animation-duration: 18s;
//           }
//           .animate-slide-right-slow {
//             animation-duration: 35s;
//           }
//           .animate-slide-right-normal {
//             animation-duration: 25s;
//           }
//           .animate-slide-right-fast {
//             animation-duration: 18s;
//           }
//         }

//         @media (min-width: 1025px) {
//           .animate-slide-left-slow {
//             animation-duration: 45s;
//           }
//           .animate-slide-left-normal {
//             animation-duration: 35s;
//           }
//           .animate-slide-left-fast {
//             animation-duration: 25s;
//           }
//           .animate-slide-right-slow {
//             animation-duration: 45s;
//           }
//           .animate-slide-right-normal {
//             animation-duration: 35s;
//           }
//           .animate-slide-right-fast {
//             animation-duration: 25s;
//           }
//         }

//         /* Reduced motion support */
//         @media (prefers-reduced-motion: reduce) {
//           .animate-slide-left-slow,
//           .animate-slide-left-normal,
//           .animate-slide-left-fast,
//           .animate-slide-right-slow,
//           .animate-slide-right-normal,
//           .animate-slide-right-fast {
//             animation: none;
//           }
//         }

//         /* Performance optimization */
//         [class*="animate-slide-"] {
//           will-change: transform;
//         }
//       `}</style>
//     </section>
//   );
// };

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

"use client";

import Image from "next/image";
import React, { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

export interface SliderImageItem {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// export interface SliderComponentItem {
//   id: number;
//   component: React.ComponentType<any> | React.ReactNode;
//   props?: Record<string, any>;
// }

export interface SliderComponentItem<Tag extends ElementType = ElementType> {
  id: number;
  component: Tag | ReactNode;
  props?: ComponentPropsWithoutRef<Tag>;
}

export type SliderItem = SliderImageItem | SliderComponentItem;

export interface ImageSliderProps {
  type: "image" | "component";
  items: SliderItem[];
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  imageClassName?: string;
  orientation?: "horizontal" | "vertical";
  direction?: "left" | "right" | "up" | "down";
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
  verticalHeight?: string;
}

// Type guard to check if item is an image item
const isImageItem = (item: SliderItem): item is SliderImageItem => {
  return 'src' in item && 'alt' in item;
};

// Type guard to check if item is a component item
const isComponentItem = (item: SliderItem): item is SliderComponentItem => {
  return 'component' in item;
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
  speed = "normal",
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
  const getAnimationClass = () => {
    const speedClass =
      speed === "fast" ? "fast" : speed === "slow" ? "slow" : "normal";
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
        );
      } else if (type === "component" && isComponentItem(item)) {
        // Handle both component types and react nodes
        if (React.isValidElement(item.component)) {
          // If it's already a React element, render it directly
          return item.component;
        } else if (typeof item.component === 'function') {
          // If it's a component function, render it with props
          const Component = item.component as ElementType;
          return<Component {...(item.props!)} />
        } else {
          // Fallback for other cases
          return item.component;
        }
      }
      return null;
    })();

    return (
      <div key={key} className={`flex shrink-0 items-center justify-center ${currentSpacingClasses} ${itemClassName}`}
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
        className={`relative ${orientation === "vertical" ? "h-full" : ""} ${containerClassName}`}
      >
        <div
          className={`${getAnimationClass()} ${flexDirection} ${pauseOnHover ? "hover:pause" : ""}`}
        >
          {/* First set of items */}
          <div className={`${flexDirection} shrink-0 items-center`}>
            {items.map((item) => renderItem(item, `${item.id}-1`))}
          </div>

          {/* Second set for seamless loop */}
          <div className={`${flexDirection} shrink-0 items-center`}>
            {items.map((item) => renderItem(item, `${item.id}-2`))}
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

        /* Horizontal Left direction animations */
        .animate-slide-horizontal-left-slow {
          animation: slide-horizontal-left 40s linear infinite;
        }
        .animate-slide-horizontal-left-normal {
          animation: slide-horizontal-left 30s linear infinite;
        }
        .animate-slide-horizontal-left-fast {
          animation: slide-horizontal-left 20s linear infinite;
        }

        /* Horizontal Right direction animations */
        .animate-slide-horizontal-right-slow {
          animation: slide-horizontal-right 40s linear infinite;
        }
        .animate-slide-horizontal-right-normal {
          animation: slide-horizontal-right 30s linear infinite;
        }
        .animate-slide-horizontal-right-fast {
          animation: slide-horizontal-right 20s linear infinite;
        }

        /* Vertical Up direction animations */
        .animate-slide-vertical-up-slow {
          animation: slide-vertical-up 40s linear infinite;
        }
        .animate-slide-vertical-up-normal {
          animation: slide-vertical-up 30s linear infinite;
        }
        .animate-slide-vertical-up-fast {
          animation: slide-vertical-up 20s linear infinite;
        }

        /* Vertical Down direction animations */
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

        /* Responsive speeds for horizontal */
        @media (max-width: 640px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow {
            animation-duration: 25s;
          }
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal {
            animation-duration: 20s;
          }
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast {
            animation-duration: 15s;
          }
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 25s;
          }
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 20s;
          }
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 15s;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow {
            animation-duration: 35s;
          }
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal {
            animation-duration: 25s;
          }
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast {
            animation-duration: 18s;
          }
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 35s;
          }
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 25s;
          }
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 18s;
          }
        }

        @media (min-width: 1025px) {
          .animate-slide-horizontal-left-slow,
          .animate-slide-horizontal-right-slow {
            animation-duration: 45s;
          }
          .animate-slide-horizontal-left-normal,
          .animate-slide-horizontal-right-normal {
            animation-duration: 35s;
          }
          .animate-slide-horizontal-left-fast,
          .animate-slide-horizontal-right-fast {
            animation-duration: 25s;
          }
          .animate-slide-vertical-up-slow,
          .animate-slide-vertical-down-slow {
            animation-duration: 45s;
          }
          .animate-slide-vertical-up-normal,
          .animate-slide-vertical-down-normal {
            animation-duration: 35s;
          }
          .animate-slide-vertical-up-fast,
          .animate-slide-vertical-down-fast {
            animation-duration: 25s;
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
{/* <ImageSlider
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
/> */}
