"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Type definitions
export type LayoutMode = "row" | "column" | "grid";
export type ArrowPosition = "inside" | "outside";

export interface ResponsiveConfig {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  [key: string]: number | undefined;
}

export interface SliderProps {
  // Core data
  items: any[];

  // Render function
  renderItem: (item: any, index: number) => ReactNode;

  // Layout configuration
  layout?: LayoutMode;
  itemsPerSlide?: number | ResponsiveConfig;
  rows?: number;
  columns?: number;
  gap?: string;

  // Auto-play configuration
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;

  // Controls configuration
  showArrows?: boolean;
  showDots?: boolean;
  showPlayPause?: boolean;
  arrowPosition?: ArrowPosition;

  // Responsive breakpoints
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };

  // Styling
  className?: string;
  slideClassName?: string;

  // Event handlers
  onSlideChange?: (currentSlide: number) => void;
  onItemClick?: (item: any, index: number) => void;
}

export const ReusableSlider: React.FC<SliderProps> = ({
  items,
  renderItem,
  layout = "row",
  itemsPerSlide = 1,
  rows = 1,
  columns = 1,
  autoPlay = false,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  showPlayPause = false,
  arrowPosition = "outside",
  breakpoints = { mobile: 0, tablet: 768, desktop: 1024 },
  className = "",
  slideClassName = "",
  gap = "1rem",
  onSlideChange,
  onItemClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate items per slide based on responsive config
  const calculateItemsPerSlide = useCallback(() => {
    if (typeof itemsPerSlide === "number") {
      return itemsPerSlide;
    }

    const width = window.innerWidth;
    if (width < breakpoints.tablet) {
      return itemsPerSlide.mobile ?? 1;
    } else if (width < breakpoints.desktop) {
      return itemsPerSlide.tablet ?? 2;
    } else {
      return itemsPerSlide.desktop ?? 3;
    }
  }, [itemsPerSlide, breakpoints]);

  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerSlide(calculateItemsPerSlide());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateItemsPerSlide]);

  // Calculate total slides
  const itemsPerSlideValue =
    layout === "grid" ? rows * columns : currentItemsPerSlide;
  const totalSlides = Math.ceil(items.length / itemsPerSlideValue);

  // Auto-play functionality
  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, autoPlayInterval);
    }
  }, [isPlaying, autoPlay, autoPlayInterval, totalSlides]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetAutoplay]);

  // Handle slide change
  const handleSlideChange = useCallback(
    (newSlide: number) => {
      setCurrentSlide(newSlide);
      onSlideChange?.(newSlide);
    },
    [onSlideChange],
  );

  // Navigation functions
  const nextSlide = useCallback(() => {
    const newSlide = (currentSlide + 1) % totalSlides;
    handleSlideChange(newSlide);
    resetAutoplay();
  }, [currentSlide, totalSlides, handleSlideChange, resetAutoplay]);

  const prevSlide = useCallback(() => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    handleSlideChange(newSlide);
    resetAutoplay();
  }, [currentSlide, totalSlides, handleSlideChange, resetAutoplay]);

  const goToSlide = useCallback(
    (index: number) => {
      handleSlideChange(index);
      resetAutoplay();
    },
    [handleSlideChange, resetAutoplay],
  );

  // Play/Pause controls
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPlaying(false);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoPlay) {
      setIsPlaying(true);
    }
  }, [pauseOnHover, autoPlay]);

  // Get current slide items
  const getCurrentItems = useCallback(() => {
    const startIndex = currentSlide * itemsPerSlideValue;
    return items.slice(startIndex, startIndex + itemsPerSlideValue);
  }, [currentSlide, items, itemsPerSlideValue]);

  // Get grid classes based on layout
  const getLayoutClasses = useCallback(() => {
    if (layout === "grid") {
      return `grid grid-cols-${columns} grid-rows-${rows}`;
    } else if (layout === "column") {
      return "flex flex-col";
    } else {
      return "flex";
    }
  }, [layout, columns, rows]);

  // Get slide width for row layout
  const getSlideWidth = useCallback(() => {
    if (layout === "row") {
      return `calc((100% - ${gap} * (${currentItemsPerSlide} - 1)) / ${currentItemsPerSlide})`;
    }
    return "auto";
  }, [layout, currentItemsPerSlide, gap]);

  return (
    <div
      ref={sliderRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Auto-play indicator */}
      {/* {autoPlay && (
        <div className="absolute top-2 left-2 z-20 flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          <div className={`h-2 w-2 rounded-full ${isPlaying ? "bg-green-400" : "bg-gray-400"}`} />
          <span>{isPlaying ? "Auto" : "Paused"}</span>
        </div>
      )} */}

      {/* Main slider container */}
      <div className="relative w-full overflow-visible">
        {/* Items container */}
        <div
          className={`${getLayoutClasses()} ${slideClassName}`}
          style={{ gap }}
        >
          {getCurrentItems().map((item, index) => (
            <div
              key={`${currentSlide}-${index}`}
              className={`flex-shrink-0 ${layout !== "column" ? "transition-transform duration-300" : ""}`}
              style={{
                width: getSlideWidth(),
                minWidth: getSlideWidth(),
              }}
              onClick={() => onItemClick?.(item, index)}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white ${
                arrowPosition === "inside" ? "left-4" : "-left-12"
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800 md:h-6 md:w-6" />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white ${
                arrowPosition === "inside" ? "right-4" : "-right-12"
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-800 md:h-6 md:w-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom controls */}
      {(showDots || (showPlayPause && autoPlay)) && (
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* Play/Pause Button */}
          {showPlayPause && autoPlay && (
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
              ) : (
                <Play className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
              )}
            </button>
          )}

          {/* Dots Navigation */}
          {showDots && totalSlides > 1 && (
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-6 bg-blue-500"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};




// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import type { ReactNode } from "react";
// import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// // Type definitions
// export type LayoutMode = "row" | "column" | "grid";
// export type ArrowPosition = "inside" | "outside";

// export interface ResponsiveConfig {
//   mobile?: number;
//   tablet?: number;
//   desktop?: number;
//   [key: string]: number | undefined;
// }

// // Enhanced grid configuration
// export interface ResponsiveGridConfig {
//   mobile?: { rows: number; columns: number };
//   tablet?: { rows: number; columns: number };
//   desktop?: { rows: number; columns: number };
// }

// export interface SliderProps {
//   // Core data
//   items: any[];

//   // Render function
//   renderItem: (item: any, index: number) => ReactNode;

//   // Layout configuration
//   layout?: LayoutMode;
//   itemsPerSlide?: number | ResponsiveConfig;
//   rows?: number;
//   columns?: number;
  
//   // Enhanced responsive grid configuration
//   gridConfig?: ResponsiveGridConfig;
  
//   gap?: string;

//   // Auto-play configuration
//   autoPlay?: boolean;
//   autoPlayInterval?: number;
//   pauseOnHover?: boolean;

//   // Controls configuration
//   showArrows?: boolean;
//   showDots?: boolean;
//   showPlayPause?: boolean;
//   arrowPosition?: ArrowPosition;

//   // Responsive breakpoints
//   breakpoints?: {
//     mobile: number;
//     tablet: number;
//     desktop: number;
//   };

//   // Styling
//   className?: string;
//   slideClassName?: string;

//   // Event handlers
//   onSlideChange?: (currentSlide: number) => void;
//   onItemClick?: (item: any, index: number) => void;
// }

// export const ReusableSlider: React.FC<SliderProps> = ({
//   items,
//   renderItem,
//   layout = "row",
//   itemsPerSlide = 1,
//   rows = 1,
//   columns = 1,
//   gridConfig,
//   autoPlay = false,
//   autoPlayInterval = 5000,
//   pauseOnHover = true,
//   showArrows = true,
//   showDots = true,
//   showPlayPause = false,
//   arrowPosition = "outside",
//   breakpoints = { mobile: 0, tablet: 768, desktop: 1024 },
//   className = "",
//   slideClassName = "",
//   gap = "1rem",
//   onSlideChange,
//   onItemClick,
// }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(1);
//   const [currentGridConfig, setCurrentGridConfig] = useState({ rows: 1, columns: 1 });
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const sliderRef = useRef<HTMLDivElement>(null);

//   // Calculate items per slide based on responsive config
//   const calculateItemsPerSlide = useCallback(() => {
//     if (typeof itemsPerSlide === "number") {
//       return itemsPerSlide;
//     }

//     const width = window.innerWidth;
//     if (width < breakpoints.tablet) {
//       return itemsPerSlide.mobile || 1;
//     } else if (width < breakpoints.desktop) {
//       return itemsPerSlide.tablet || 2;
//     } else {
//       return itemsPerSlide.desktop || 3;
//     }
//   }, [itemsPerSlide, breakpoints]);

//   // Calculate responsive grid configuration
//   const calculateGridConfig = useCallback(() => {
//     if (!gridConfig) {
//       return { rows, columns };
//     }

//     const width = window.innerWidth;
//     if (width < breakpoints.tablet) {
//       return gridConfig.mobile || { rows: 1, columns: 1 };
//     } else if (width < breakpoints.desktop) {
//       return gridConfig.tablet || { rows: 2, columns: 2 };
//     } else {
//       return gridConfig.desktop || { rows, columns };
//     }
//   }, [gridConfig, rows, columns, breakpoints]);

//   // Update items per slide and grid config on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setCurrentItemsPerSlide(calculateItemsPerSlide());
//       if (layout === "grid") {
//         setCurrentGridConfig(calculateGridConfig());
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [calculateItemsPerSlide, calculateGridConfig, layout]);

//   // Calculate total slides
//   const itemsPerSlideValue = layout === "grid" 
//     ? currentGridConfig.rows * currentGridConfig.columns 
//     : currentItemsPerSlide;
//   const totalSlides = Math.ceil(items.length / itemsPerSlideValue);

//   // Auto-play functionality
//   const resetAutoplay = useCallback(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     if (isPlaying && autoPlay) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % totalSlides);
//       }, autoPlayInterval);
//     }
//   }, [isPlaying, autoPlay, autoPlayInterval, totalSlides]);

//   useEffect(() => {
//     resetAutoplay();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [resetAutoplay]);

//   // Handle slide change
//   const handleSlideChange = useCallback(
//     (newSlide: number) => {
//       setCurrentSlide(newSlide);
//       onSlideChange?.(newSlide);
//     },
//     [onSlideChange],
//   );

//   // Navigation functions
//   const nextSlide = useCallback(() => {
//     const newSlide = (currentSlide + 1) % totalSlides;
//     handleSlideChange(newSlide);
//     resetAutoplay();
//   }, [currentSlide, totalSlides, handleSlideChange, resetAutoplay]);

//   const prevSlide = useCallback(() => {
//     const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//     handleSlideChange(newSlide);
//     resetAutoplay();
//   }, [currentSlide, totalSlides, handleSlideChange, resetAutoplay]);

//   const goToSlide = useCallback(
//     (index: number) => {
//       handleSlideChange(index);
//       resetAutoplay();
//     },
//     [handleSlideChange, resetAutoplay],
//   );

//   // Play/Pause controls
//   const togglePlayPause = useCallback(() => {
//     setIsPlaying((prev) => !prev);
//   }, []);

//   // Mouse event handlers
//   const handleMouseEnter = useCallback(() => {
//     if (pauseOnHover) {
//       setIsPlaying(false);
//     }
//   }, [pauseOnHover]);

//   const handleMouseLeave = useCallback(() => {
//     if (pauseOnHover && autoPlay) {
//       setIsPlaying(true);
//     }
//   }, [pauseOnHover, autoPlay]);

//   // Get current slide items
//   const getCurrentItems = useCallback(() => {
//     const startIndex = currentSlide * itemsPerSlideValue;
//     return items.slice(startIndex, startIndex + itemsPerSlideValue);
//   }, [currentSlide, items, itemsPerSlideValue]);

//   // Get grid classes based on layout with responsive support
//   const getLayoutClasses = useCallback(() => {
//     if (layout === "grid") {
//       // Use responsive grid configuration
//       const { rows: currentRows, columns: currentColumns } = currentGridConfig;
//       return `grid gap-4`;
//     } else if (layout === "column") {
//       return "flex flex-col";
//     } else {
//       return "flex";
//     }
//   }, [layout, currentGridConfig]);

//   // Get responsive grid styles
//   const getGridStyles = useCallback(() => {
//     if (layout === "grid") {
//       const { rows: currentRows, columns: currentColumns } = currentGridConfig;
//       return {
//         gridTemplateRows: `repeat(${currentRows}, 1fr)`,
//         gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
//         gap: gap,
//       };
//     }
//     return {};
//   }, [layout, currentGridConfig, gap]);

//   // Get slide width for row layout
//   const getSlideWidth = useCallback(() => {
//     if (layout === "row") {
//       return `calc((100% - ${gap} * (${currentItemsPerSlide} - 1)) / ${currentItemsPerSlide})`;
//     }
//     return "auto";
//   }, [layout, currentItemsPerSlide, gap]);

//   return (
//     <div
//       ref={sliderRef}
//       className={`relative overflow-hidden ${className}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Debug info (remove in production) */}
//       {layout === "grid" && (
//         <div className="absolute top-2 right-2 z-20 rounded bg-black/70 px-2 py-1 text-xs text-white">
//           Grid: {currentGridConfig.rows}×{currentGridConfig.columns}
//         </div>
//       )}

//       {/* Main slider container */}
//       <div className="relative w-full overflow-visible">
//         {/* Items container */}
//         <div
//           className={`${getLayoutClasses()} ${slideClassName}`}
//           style={layout === "grid" ? getGridStyles() : { gap }}
//         >
//           {getCurrentItems().map((item, index) => (
//             <div
//               key={`${currentSlide}-${index}`}
//               className={`${
//                 layout === "grid" 
//                   ? "w-full h-full" 
//                   : `flex-shrink-0 ${layout !== "column" ? "transition-transform duration-300" : ""}`
//               }`}
//               style={layout !== "grid" ? {
//                 width: getSlideWidth(),
//                 minWidth: getSlideWidth(),
//               } : {}}
//               onClick={() => onItemClick?.(item, index)}
//             >
//               {renderItem(item, index)}
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         {showArrows && totalSlides > 1 && (
//           <>
//             <button
//               onClick={prevSlide}
//               className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white ${
//                 arrowPosition === "inside" ? "left-4" : "-left-12"
//               }`}
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-5 w-5 text-gray-800 md:h-6 md:w-6" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white ${
//                 arrowPosition === "inside" ? "right-4" : "-right-12"
//               }`}
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-5 w-5 text-gray-800 md:h-6 md:w-6" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Bottom controls */}
//       {(showDots || (showPlayPause && autoPlay)) && (
//         <div className="mt-6 flex items-center justify-center gap-4">
//           {/* Play/Pause Button */}
//           {showPlayPause && autoPlay && (
//             <button
//               onClick={togglePlayPause}
//               className="flex items-center justify-center rounded-full bg-white p-2 shadow-lg transition-all duration-200 hover:bg-gray-50"
//               aria-label={isPlaying ? "Pause" : "Play"}
//             >
//               {isPlaying ? (
//                 <Pause className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
//               ) : (
//                 <Play className="h-4 w-4 text-gray-600 md:h-5 md:w-5" />
//               )}
//             </button>
//           )}

//           {/* Dots Navigation */}
//           {showDots && totalSlides > 1 && (
//             <div className="flex space-x-2">
//               {Array.from({ length: totalSlides }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? "w-6 bg-blue-500"
//                       : "w-2 bg-gray-300 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };