// import React, { useEffect, useRef, useState, useCallback } from "react";
// import type { ReactNode } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // Responsive breakpoint config: mobile, tablet, desktop
// export interface ResponsiveConfig {
//   mobile: number;
//   tablet: number;
//   desktop: number;
// }

// export type LayoutMode = "single-row" | "single-column" | "grid";

// export interface GridConfig {
//   rows: number;
//   cols: number;
// }

// interface SliderProps<T> {
//   items: T[];
//   renderItem: (item: T, index: number) => ReactNode;

//   // Layout
//   layout?: LayoutMode;
//   gridConfig?: GridConfig; // only for grid mode
//   slidesPerView?: number | ResponsiveConfig;
//   gap?: string;

//   // Autoplay
//   autoPlay?: boolean;
//   interval?: number;
//   pauseOnHover?: boolean;

//   // Controls
//   showArrows?: boolean;
//   showDots?: boolean;
//   arrowPosition?: "inside" | "outside";

//   // Styling
//   className?: string;
//   slideClassName?: string;

//   // Callbacks
//   onSlideChange?: (index: number) => void;
//   onItemClick?: (item: T, index: number) => void;
// }

// export function Slider<T>({
//   items,
//   renderItem,
//   layout = "single-row",
//   gridConfig = { rows: 1, cols: 1 },
//   slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
//   gap = "1rem",
//   autoPlay = false,
//   interval = 5000,
//   pauseOnHover = true,
//   showArrows = true,
//   showDots = true,
//   arrowPosition = "outside",
//   className = "",
//   slideClassName = "",
//   onSlideChange,
//   onItemClick,
// }: SliderProps<T>) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [viewCount, setViewCount] = useState(1);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   // Determine screen size
//   const calculateViewCount = useCallback(() => {
//     const width = window.innerWidth;
//     if (typeof slidesPerView === "number") return slidesPerView;
//     const cfg = slidesPerView as ResponsiveConfig;
//     if (width < cfg.tablet) return cfg.mobile;
//     if (width < cfg.desktop) return cfg.tablet;
//     return cfg.desktop;
//   }, [slidesPerView]);

//   useEffect(() => {
//     const handleResize = () => setViewCount(calculateViewCount());
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [calculateViewCount]);

//   // Calculate items per slide
//   const itemsPerSlide =
//     layout === "grid" ? gridConfig.rows * gridConfig.cols : viewCount;

//   // Total slides
//   const totalSlides = Math.ceil(items.length / itemsPerSlide);

//   // Get items for current slide
//   const getSlideItems = () => {
//     const start = currentSlide * itemsPerSlide;
//     return items.slice(start, start + itemsPerSlide);
//   };

//   // Autoplay
//   const resetInterval = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (autoPlay && isPlaying) {
//       intervalRef.current = setInterval(() => {
//         nextSlide();
//       }, interval);
//     }
//   }, [autoPlay, isPlaying, interval]);

//   useEffect(() => {
//     resetInterval();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [resetInterval, currentSlide]);

//   // Navigation
//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//     onSlideChange?.((currentSlide + 1) % totalSlides);
//   }, [currentSlide, onSlideChange, totalSlides]);

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//     onSlideChange?.((currentSlide - 1 + totalSlides) % totalSlides);
//   }, [currentSlide, onSlideChange, totalSlides]);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//     onSlideChange?.(index);
//   };

//   // Pause on hover
//   const handleMouseEnter = () => {
//     if (pauseOnHover) setIsPlaying(false);
//   };
//   const handleMouseLeave = () => {
//     if (pauseOnHover && autoPlay) setIsPlaying(true);
//   };

//   // Layout classes
//   const containerClasses =
//     layout === "grid"
//       ? `grid grid-cols-${gridConfig.cols} grid-rows-${gridConfig.rows} gap-${gap}`
//       : layout === "single-column"
//         ? `flex flex-col gap-${gap}`
//         : `flex gap-${gap}`;

//   return (
//     <div
//       className={`relative w-full overflow-hidden ${className}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Slides */}
//       <div className={`${containerClasses} ${slideClassName}`}>
//         {getSlideItems().map((item, i) => (
//           <div
//             key={i}
//             className={
//               layout === "single-row"
//                 ? `flex-shrink-0 w-[calc(100%/${viewCount})]`
//                 : ""
//             }
//             onClick={() => onItemClick?.(item, i)}
//           >
//             {renderItem(item, currentSlide * itemsPerSlide + i)}
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       {showArrows && totalSlides > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className={`absolute top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg ${arrowPosition === "inside" ? "left-4" : "-left-8"}`}
//             aria-label="Prev slide"
//           >
//             <ChevronLeft />
//           </button>
//           <button
//             onClick={nextSlide}
//             className={`absolute top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg ${arrowPosition === "inside" ? "right-4" : "-right-8"}`}
//             aria-label="Next slide"
//           >
//             <ChevronRight />
//           </button>
//         </>
//       )}

//       {/* Dots */}
//       {showDots && totalSlides > 1 && (
//         <div className="mt-4 flex justify-center">
//           {Array.from({ length: totalSlides }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`mx-1 h-2 rounded-full transition-all duration-300 ${
//                 idx === currentSlide ? "w-6 bg-red-500" : "w-2 bg-gray-300"
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

{
  /* <Slider
            items={testimonials}
            renderItem={(t) => <TestimonialCard testimonial={t} />}
            layout="grid"
            gridConfig={{ rows: 1, cols: 2 }}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap="1rem"
            autoPlay
            interval={5000}
            pauseOnHover
            showArrows
            showDots
            arrowPosition="inside"
            className="mt-10"
            onSlideChange={(i) => console.log("Slide:", i)}
            onItemClick={(item) => console.log("Clicked:", item)}
          /> */
}
