// "use client";
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import { gsap } from "gsap";

// export interface CarouselConfig {
//   slideHeight: number;
//   slidesInRing: number;
//   slideSpacing: number;
//   radius: number;
//   initialRotation: number;
//   autoRotate: boolean;
//   rotationSpeed: number;
//   rotationDirection: 1 | -1;
//   pauseOnHover: boolean;
//   resumeDelay: number;
//   pauseEaseDuration: number;
//   entranceAnimation: "fadeIn" | "fadeUp" | "none";
//   entranceDuration: number;
//   entranceStagger: number;
//   entranceDistance: number;
// }

// export interface SlideData {
//   id?: string;
//   src?: string;
//   alt?: string;
// }

// interface CurvedCarouselProps {
//   slides: SlideData[];
//   config?: Partial<CarouselConfig>;
//   fadeout?: boolean;
//   className?: string;
// }

// const defaultConfig: CarouselConfig = {
//   slideHeight: 600,
//   slidesInRing: 21,
//   slideSpacing: 1,
//   radius: 1200,
//   initialRotation: 180,
//   autoRotate: true,
//   rotationSpeed: 0.1,
//   rotationDirection: 1,
//   pauseOnHover: true,
//   resumeDelay: 0,
//   pauseEaseDuration: 0.5,
//   entranceAnimation: "fadeIn",
//   entranceDuration: 1.5,
//   entranceStagger: 0.1,
//   entranceDistance: 100,
// };

// export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
//   slides,
//   config = {},
//   fadeout = false,
//   className = "",
// }) => {
//   const ringRef = useRef<HTMLDivElement>(null);
//   const stageRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const containerRefHov = useRef<HTMLDivElement>(null);
//   const slideElementsRef = useRef<NodeListOf<Element> | null>(null);
//   const [allSlides, setAllSlides] = useState<SlideData[]>([]);

//   // Performance optimization: Use RAF for smooth animations
//   const rafIdRef = useRef<number | null>(null);
//   const rotationValueRef = useRef<number>(0);

//   const carouselConfig = useMemo(
//     () => ({ ...defaultConfig, ...config }),
//     [config],
//   );

//   // Refs for cleanup and control
//   const speedTweenRef = useRef<gsap.core.Tween | null>(null);
//   const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const speedControllerRef = useRef({ value: 0 });
//   const isActiveRef = useRef<boolean>(true);

//   // Memoized styles for better performance
//   const carouselStyles = useMemo(
//     () =>
//       ({
//         "--viewport-height": "35rem",
//         "--viewport-height-m": "35rem",
//         "--perspective": "600px",
//         "--perspective-m": "400px",
//         "--block-offset": "-18rem",
//         "--block-offset-m": "-6rem",
//         overflow: "hidden",
//         zIndex: 1,
//         "--fadeout": fadeout
//           ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent 100%)"
//           : "none",
//       }) as React.CSSProperties,
//     [fadeout],
//   );

//   // Memoized slide processing
//   const processedSlides = useMemo(() => {
//     const originalSlideCount = slides.length;
//     const processed = [...slides];

//     if (originalSlideCount < carouselConfig.slidesInRing) {
//       const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
//       for (let i = 0; i < duplicatesNeeded; i++) {
//         const slideToClone = slides[i % originalSlideCount]!;
//         processed.push({
//           ...slideToClone,
//           id: `${slideToClone.id}-clone-${i}`,
//         });
//       }
//     }
//     return processed;
//   }, [slides, carouselConfig.slidesInRing]);

//   // High-performance rotation update using RAF
//   const updateRotation = useCallback(() => {
//     if (!isActiveRef.current || !ringRef.current) return;

//     const currentRotationSpeed = speedControllerRef.current.value;
//     if (currentRotationSpeed === 0) {
//       rafIdRef.current = null;
//       return;
//     }

//     rotationValueRef.current +=
//       currentRotationSpeed * carouselConfig.rotationDirection;

//     // Use transform directly for better performance
//     ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

//     rafIdRef.current = requestAnimationFrame(updateRotation);
//   }, [carouselConfig.rotationDirection]);

//   // Optimized start/stop functions
//   const startAutoRotation = useCallback(() => {
//     if (!carouselConfig.autoRotate || rafIdRef.current) return;

//     if (speedTweenRef.current) {
//       speedTweenRef.current.kill();
//     }

//     speedTweenRef.current = gsap.to(speedControllerRef.current, {
//       value: carouselConfig.rotationSpeed,
//       duration: carouselConfig.pauseEaseDuration,
//       ease: "power1.out",
//       onUpdate: () => {
//         if (!rafIdRef.current && speedControllerRef.current.value > 0) {
//           rafIdRef.current = requestAnimationFrame(updateRotation);
//         }
//       },
//     });
//   }, [
//     carouselConfig.autoRotate,
//     carouselConfig.rotationSpeed,
//     carouselConfig.pauseEaseDuration,
//     updateRotation,
//   ]);

//   const stopAutoRotation = useCallback(() => {
//     if (speedTweenRef.current) {
//       speedTweenRef.current.kill();
//     }

//     speedTweenRef.current = gsap.to(speedControllerRef.current, {
//       value: 0,
//       duration: carouselConfig.pauseEaseDuration,
//       ease: "power1.in",
//       onComplete: () => {
//         if (rafIdRef.current) {
//           cancelAnimationFrame(rafIdRef.current);
//           rafIdRef.current = null;
//         }
//       },
//     });
//   }, [carouselConfig.pauseEaseDuration]);

//   const resumeAutoRotation = useCallback(() => {
//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }

//     autoRotateTimeoutRef.current = setTimeout(() => {
//       if (carouselConfig.autoRotate && isActiveRef.current) {
//         startAutoRotation();
//       }
//     }, carouselConfig.resumeDelay);
//   }, [
//     carouselConfig.autoRotate,
//     carouselConfig.resumeDelay,
//     startAutoRotation,
//   ]);

//   // Event handlers with proper cleanup
//   const handleMouseEnter = useCallback(() => {
//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }
//     stopAutoRotation();
//   }, [stopAutoRotation]);

//   const handleMouseLeave = useCallback(() => {
//     resumeAutoRotation();
//   }, [resumeAutoRotation]);

//   // Initialize slides
//   useEffect(() => {
//     setAllSlides(processedSlides);
//   }, [processedSlides]);

//   // Main setup effect with performance optimizations
//   useEffect(() => {
//     if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

//     const ring = ringRef.current;
//     const stage = stageRef.current;

//     // Cache slide elements for better performance
//     slideElementsRef.current = ring.querySelectorAll(".carousel-slide");
//     const slideElements = slideElementsRef.current;
//     const slideCount = slideElements.length;

//     // Calculate dimensions once
//     const anglePerSlide = 360 / carouselConfig.slidesInRing;
//     const arcLength =
//       (anglePerSlide - carouselConfig.slideSpacing) *
//       (Math.PI / 180) *
//       carouselConfig.radius;
//     const slideWidth = arcLength;

//     // Set container dimensions with GPU acceleration
//     stage.style.width = `${slideWidth}px`;
//     stage.style.height = `${carouselConfig.slideHeight}px`;
//     stage.style.willChange = "transform";

//     // Initialize ring rotation
//     rotationValueRef.current = carouselConfig.initialRotation;
//     ring.style.transform = `rotateY(${carouselConfig.initialRotation}deg)`;
//     ring.style.willChange = "transform";
//     ring.style.transformStyle = "preserve-3d";

//     // Batch DOM updates for better performance
//     const fragment = document.createDocumentFragment();

//     // Position slides in 3D space with GPU acceleration
//     slideElements.forEach((slide, index) => {
//       const slideElement = slide as HTMLElement;

//       // Set dimensions
//       slideElement.style.width = `${slideWidth}px`;
//       slideElement.style.height = `${carouselConfig.slideHeight}px`;

//       // GPU-accelerated transforms
//       slideElement.style.willChange = "transform";
//       slideElement.style.transformStyle = "preserve-3d";
//       slideElement.style.backfaceVisibility = "hidden";
//       slideElement.style.transform = `
//         rotateY(${index * -anglePerSlide}deg) 
//         translateZ(${-carouselConfig.radius}px)
//       `;
//       slideElement.style.transformOrigin = `50% 50% 0px`;

//       // Optimize images for better performance
//       const img = slideElement.querySelector("img");
//       if (img) {
//         img.style.willChange = "auto";
//         img.style.transform = "translateZ(0)"; // Force GPU layer
//       }
//     });

//     // Entrance animation with better performance
//     if (carouselConfig.entranceAnimation !== "none") {
//       let entranceAnimation: gsap.TweenVars = {};

//       switch (carouselConfig.entranceAnimation) {
//         case "fadeIn":
//           gsap.set(slideElements, { opacity: 0 });
//           entranceAnimation = {
//             opacity: 1,
//             duration: carouselConfig.entranceDuration,
//             stagger: carouselConfig.entranceStagger,
//             ease: "power2.out",
//             force3D: true,
//           };
//           break;
//         case "fadeUp":
//           gsap.set(slideElements, {
//             y: carouselConfig.entranceDistance,
//             opacity: 0,
//           });
//           entranceAnimation = {
//             y: 0,
//             opacity: 1,
//             duration: carouselConfig.entranceDuration,
//             stagger: carouselConfig.entranceStagger,
//             ease: "power3.out",
//             force3D: true,
//           };
//           break;
//       }

//       gsap.to(slideElements, {
//         ...entranceAnimation,
//         onComplete: () => {
//           // Remove will-change after animation completes
//           slideElements.forEach((slide) => {
//             (slide as HTMLElement).style.willChange = "auto";
//           });
//           startAutoRotation();
//         },
//       });
//     } else {
//       startAutoRotation();
//     }

//     // Add optimized event listeners
//     if (carouselConfig.pauseOnHover && containerRefHov.current) {
//       const container = containerRefHov.current;
//       container.addEventListener("mouseenter", handleMouseEnter, {
//         passive: true,
//       });
//       container.addEventListener("mouseleave", handleMouseLeave, {
//         passive: true,
//       });
//       container.addEventListener("touchstart", handleMouseEnter, {
//         passive: true,
//       });
//       container.addEventListener("touchend", handleMouseLeave, {
//         passive: true,
//       });
//     }

//     // Cleanup function
//     return () => {
//       isActiveRef.current = false;

//       if (rafIdRef.current) {
//         cancelAnimationFrame(rafIdRef.current);
//         rafIdRef.current = null;
//       }

//       if (speedTweenRef.current) {
//         speedTweenRef.current.kill();
//       }

//       if (autoRotateTimeoutRef.current) {
//         clearTimeout(autoRotateTimeoutRef.current);
//       }

//       if (containerRef.current) {
//         const container = containerRef.current;
//         container.removeEventListener("mouseenter", handleMouseEnter);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//         container.removeEventListener("touchstart", handleMouseEnter);
//         container.removeEventListener("touchend", handleMouseLeave);
//       }

//       // Clean up will-change properties
//       if (slideElementsRef.current) {
//         slideElementsRef.current.forEach((slide) => {
//           (slide as HTMLElement).style.willChange = "auto";
//         });
//       }
//       if (ring) ring.style.willChange = "auto";
//       if (stage) stage.style.willChange = "auto";
//     };
//   }, [
//     allSlides,
//     carouselConfig,
//     startAutoRotation,
//     handleMouseEnter,
//     handleMouseLeave,
//   ]);

//   // Component unmount cleanup
//   useEffect(() => {
//     isActiveRef.current = true;
//     return () => {
//       isActiveRef.current = false;
//     };
//   }, []);

//   const CSSstyles = useMemo(
//     () => ({
//       base: {
//         perspective: "var(--perspective)",
//         "@media (max-width: 767px)": {
//           perspective: "var(--perspective-m)",
//         },
//       },
//     }),
//     [],
//   );

//   return (
//     <div
//       ref={containerRef}
//       className={`curved-carousel relative z-10 w-full overflow-visible select-none ${className}`}
//       style={carouselStyles}
//     >
//       {/* Stage */}
//       <div
//         ref={stageRef}
//         className="curved-carousel__stage absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         style={CSSstyles.base}
//       >
//         {/* Ring */}
//         <div
//           ref={ringRef}
//           className="curved-carousel__ring absolute h-full w-full"
//         >
//           {allSlides.map((slide, index) => (
//             <div
//             ref={containerRefHov}
//               key={slide.id}
//               className="carousel-slide group absolute cursor-pointer overflow-hidden"
//             >
//               <img
              
//                 src={slide.src}
//                 alt={slide.alt}
//                 className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
//                 draggable={false}
//                 loading={index < 5 ? "eager" : "lazy"}
//                 decoding="async"
//               />
//               {/* Hover overlay content */}
//               <div className="bg-opacity-60 absolute inset-0 flex items-center justify-center rounded-3xl bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                 <div className="p-4 text-center text-white">
//                   <h3 className="mb-2 text-lg font-bold">
//                     {slide.alt || "Image"}
//                   </h3>
//                   <p className="text-sm opacity-90">
//                     Hover content for slide {index + 1}
//                   </p>
//                   <div className="mt-3">
//                     <button className="bg-opacity-20 hover:bg-opacity-30 rounded-lg bg-white px-4 py-2 text-sm transition-colors">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .curved-carousel {
//           height: var(--viewport-height);
//           margin-block: var(--block-offset);
//           transform-style: preserve-3d;
//           -webkit-mask-image: var(--fadeout);
//           mask-image: var(--fadeout);
//           contain: layout style paint;
//         }

//         .carousel-slide {
//           contain: layout style paint;
//         }

//         .carousel-slide img {
//           image-rendering: -webkit-optimize-contrast;
//           image-rendering: optimize-contrast;
//         }

//         @media (max-width: 767px) {
//           .curved-carousel {
//             height: var(--viewport-height-m);
//             margin-block: var(--block-offset-m);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };




"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";

export interface CarouselConfig {
  slideHeight: number;
  slidesInRing: number;
  slideSpacing: number;
  radius: number;
  initialRotation: number;
  autoRotate: boolean;
  rotationSpeed: number;
  rotationDirection: 1 | -1;
  pauseOnHover: boolean;
  resumeDelay: number;
  pauseEaseDuration: number;
  entranceAnimation: "fadeIn" | "fadeUp" | "none";
  entranceDuration: number;
  entranceStagger: number;
  entranceDistance: number;
}

export interface SlideData {
  id?: string;
  src?: string;
  alt?: string;
}

interface CurvedCarouselProps {
  slides: SlideData[];
  config?: Partial<CarouselConfig>;
  fadeout?: boolean;
  className?: string;
}

const defaultConfig: CarouselConfig = {
  slideHeight: 600,
  slidesInRing: 21,
  slideSpacing: 1,
  radius: 1200,
  initialRotation: 180,
  autoRotate: true,
  rotationSpeed: 0.1,
  rotationDirection: 1,
  pauseOnHover: true,
  resumeDelay: 1000, // Increased delay to prevent rapid start/stop
  pauseEaseDuration: 0.5,
  entranceAnimation: "fadeIn",
  entranceDuration: 1.5,
  entranceStagger: 0.1,
  entranceDistance: 100,
};

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
  slides,
  config = {},
  fadeout = false,
  className = "",
}) => {
  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideElementsRef = useRef<NodeListOf<Element> | null>(null);
  const [allSlides, setAllSlides] = useState<SlideData[]>([]);

  // Performance optimization: Use RAF for smooth animations
  const rafIdRef = useRef<number | null>(null);
  const rotationValueRef = useRef<number>(0);

  const carouselConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  // Refs for cleanup and control
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedControllerRef = useRef({ value: 0 });
  const isActiveRef = useRef<boolean>(true);
  const isPausedRef = useRef<boolean>(false);

  // Memoized styles for better performance
  const carouselStyles = useMemo(
    () =>
      ({
        "--viewport-height": "35rem",
        "--viewport-height-m": "35rem",
        "--perspective": "600px",
        "--perspective-m": "400px",
        "--block-offset": "-18rem",
        "--block-offset-m": "-6rem",
        overflow: "hidden",
        zIndex: 1,
        "--fadeout": fadeout
          ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent 100%)"
          : "none",
      }) as React.CSSProperties,
    [fadeout],
  );

  // Memoized slide processing
  const processedSlides = useMemo(() => {
    const originalSlideCount = slides.length;
    const processed = [...slides];

    if (originalSlideCount < carouselConfig.slidesInRing) {
      const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
      for (let i = 0; i < duplicatesNeeded; i++) {
        const slideToClone = slides[i % originalSlideCount]!;
        processed.push({
          ...slideToClone,
          id: `${slideToClone.id}-clone-${i}`,
        });
      }
    }
    return processed;
  }, [slides, carouselConfig.slidesInRing]);

  // High-performance rotation update using RAF
  const updateRotation = useCallback(() => {
    if (!isActiveRef.current || !ringRef.current || isPausedRef.current) {
      rafIdRef.current = null;
      return;
    }

    const currentRotationSpeed = speedControllerRef.current.value;
    if (currentRotationSpeed === 0) {
      rafIdRef.current = requestAnimationFrame(updateRotation);
      return;
    }

    rotationValueRef.current +=
      currentRotationSpeed * carouselConfig.rotationDirection;

    // Use transform directly for better performance
    ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

    rafIdRef.current = requestAnimationFrame(updateRotation);
  }, [carouselConfig.rotationDirection]);

  // Optimized start/stop functions
  const startAutoRotation = useCallback(() => {
    if (!carouselConfig.autoRotate || isPausedRef.current) return;

    if (speedTweenRef.current) {
      speedTweenRef.current.kill();
    }

    speedTweenRef.current = gsap.to(speedControllerRef.current, {
      value: carouselConfig.rotationSpeed,
      duration: carouselConfig.pauseEaseDuration,
      ease: "power1.out",
      onUpdate: () => {
        if (!rafIdRef.current && speedControllerRef.current.value > 0) {
          rafIdRef.current = requestAnimationFrame(updateRotation);
        }
      },
    });
  }, [
    carouselConfig.autoRotate,
    carouselConfig.rotationSpeed,
    carouselConfig.pauseEaseDuration,
    updateRotation,
  ]);

  const stopAutoRotation = useCallback(() => {
    isPausedRef.current = true;

    if (speedTweenRef.current) {
      speedTweenRef.current.kill();
    }

    speedTweenRef.current = gsap.to(speedControllerRef.current, {
      value: 0,
      duration: carouselConfig.pauseEaseDuration,
      ease: "power1.in",
      onComplete: () => {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
    });
  }, [carouselConfig.pauseEaseDuration]);

  const resumeAutoRotation = useCallback(() => {
    isPausedRef.current = false;

    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }

    autoRotateTimeoutRef.current = setTimeout(() => {
      if (carouselConfig.autoRotate && isActiveRef.current && !isPausedRef.current) {
        startAutoRotation();
      }
    }, carouselConfig.resumeDelay);
  }, [
    carouselConfig.autoRotate,
    carouselConfig.resumeDelay,
    startAutoRotation,
  ]);

  // Event handlers for container hover
  const handleContainerMouseEnter = useCallback(() => {
    if (!carouselConfig.pauseOnHover) return;
    
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    stopAutoRotation();
  }, [carouselConfig.pauseOnHover, stopAutoRotation]);

  const handleContainerMouseLeave = useCallback(() => {
    if (!carouselConfig.pauseOnHover) return;
    resumeAutoRotation();
  }, [carouselConfig.pauseOnHover, resumeAutoRotation]);

  // Individual slide hover handlers
  const handleSlideMouseEnter = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    stopAutoRotation();
  }, [stopAutoRotation]);

  const handleSlideMouseLeave = useCallback(() => {
    resumeAutoRotation();
  }, [resumeAutoRotation]);

  // Initialize slides
  useEffect(() => {
    setAllSlides(processedSlides);
  }, [processedSlides]);

  // Main setup effect with performance optimizations
  useEffect(() => {
    if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

    const ring = ringRef.current;
    const stage = stageRef.current;

    // Cache slide elements for better performance
    slideElementsRef.current = ring.querySelectorAll(".carousel-slide");
    const slideElements = slideElementsRef.current;
    const slideCount = slideElements.length;

    // Calculate dimensions once
    const anglePerSlide = 360 / carouselConfig.slidesInRing;
    const arcLength =
      (anglePerSlide - carouselConfig.slideSpacing) *
      (Math.PI / 180) *
      carouselConfig.radius;
    const slideWidth = arcLength;

    // Set container dimensions with GPU acceleration
    stage.style.width = `${slideWidth}px`;
    stage.style.height = `${carouselConfig.slideHeight}px`;
    stage.style.willChange = "transform";

    // Initialize ring rotation
    rotationValueRef.current = carouselConfig.initialRotation;
    ring.style.transform = `rotateY(${carouselConfig.initialRotation}deg)`;
    ring.style.willChange = "transform";
    ring.style.transformStyle = "preserve-3d";

    // Position slides in 3D space with GPU acceleration
    slideElements.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;

      // Set dimensions
      slideElement.style.width = `${slideWidth}px`;
      slideElement.style.height = `${carouselConfig.slideHeight}px`;

      // GPU-accelerated transforms
      slideElement.style.willChange = "transform";
      slideElement.style.transformStyle = "preserve-3d";
      slideElement.style.backfaceVisibility = "hidden";
      slideElement.style.transform = `
        rotateY(${index * -anglePerSlide}deg) 
        translateZ(${-carouselConfig.radius}px)
      `;
      slideElement.style.transformOrigin = `50% 50% 0px`;

      // Optimize images for better performance
      const img = slideElement.querySelector("img");
      if (img) {
        img.style.willChange = "auto";
        img.style.transform = "translateZ(0)"; // Force GPU layer
      }
    });

    // Entrance animation with better performance
    if (carouselConfig.entranceAnimation !== "none") {
      let entranceAnimation: gsap.TweenVars = {};

      switch (carouselConfig.entranceAnimation) {
        case "fadeIn":
          gsap.set(slideElements, { opacity: 0 });
          entranceAnimation = {
            opacity: 1,
            duration: carouselConfig.entranceDuration,
            stagger: carouselConfig.entranceStagger,
            ease: "power2.out",
            force3D: true,
          };
          break;
        case "fadeUp":
          gsap.set(slideElements, {
            y: carouselConfig.entranceDistance,
            opacity: 0,
          });
          entranceAnimation = {
            y: 0,
            opacity: 1,
            duration: carouselConfig.entranceDuration,
            stagger: carouselConfig.entranceStagger,
            ease: "power3.out",
            force3D: true,
          };
          break;
      }

      gsap.to(slideElements, {
        ...entranceAnimation,
        onComplete: () => {
          // Remove will-change after animation completes
          slideElements.forEach((slide) => {
            (slide as HTMLElement).style.willChange = "auto";
          });
          startAutoRotation();
        },
      });
    } else {
      startAutoRotation();
    }

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      isPausedRef.current = true;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (speedTweenRef.current) {
        speedTweenRef.current.kill();
      }

      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }

      // Clean up will-change properties
      if (slideElementsRef.current) {
        slideElementsRef.current.forEach((slide) => {
          (slide as HTMLElement).style.willChange = "auto";
        });
      }
      if (ring) ring.style.willChange = "auto";
      if (stage) stage.style.willChange = "auto";
    };
  }, [
    allSlides,
    carouselConfig,
    startAutoRotation,
  ]);

  // Component unmount cleanup
  useEffect(() => {
    isActiveRef.current = true;
    isPausedRef.current = false;
    return () => {
      isActiveRef.current = false;
      isPausedRef.current = true;
    };
  }, []);

  const CSSstyles = useMemo(
    () => ({
      base: {
        perspective: "var(--perspective)",
        "@media (max-width: 767px)": {
          perspective: "var(--perspective-m)",
        },
      },
    }),
    [],
  );

  return (
    <div
      ref={containerRef}
      className={`curved-carousel relative z-10 w-full overflow-visible select-none ${className}`}
      style={carouselStyles}
 
    >
      {/* Stage */}
      <div
        ref={stageRef}
        className="curved-carousel__stage absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={CSSstyles.base}
      >
        {/* Ring */}
        <div
          ref={ringRef}
          className="curved-carousel__ring absolute h-full w-full"
        >
          {allSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel-slide group absolute cursor-pointer overflow-hidden"
              onMouseEnter={handleSlideMouseEnter}
              onMouseLeave={handleSlideMouseLeave}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Hover overlay content */}
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl transition-all duration-300 group-hover:bg-opacity-60">
                <div className="transform scale-90 p-4 text-center text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <h3 className="mb-2 text-lg font-bold">
                    {slide.alt || "Image"}
                  </h3>
                  <p className="text-sm opacity-90">
                    Hover content for slide {index + 1}
                  </p>
                  <div className="mt-3">
                    <button className="rounded-lg bg-white bg-opacity-20 px-4 py-2 text-sm transition-colors hover:bg-opacity-30">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .curved-carousel {
          height: var(--viewport-height);
          margin-block: var(--block-offset);
          transform-style: preserve-3d;
          -webkit-mask-image: var(--fadeout);
          mask-image: var(--fadeout);
          contain: layout style paint;
        }

        .carousel-slide {
          contain: layout style paint;
        }

        .carousel-slide img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
        }

        @media (max-width: 767px) {
          .curved-carousel {
            height: var(--viewport-height-m);
            margin-block: var(--block-offset-m);
          }
        }
      `}</style>
    </div>
  );
};