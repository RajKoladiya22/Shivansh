// "use client";
// import React, { useEffect, useRef, useState } from "react";
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
//   const [allSlides, setAllSlides] = useState<SlideData[]>([]);

//   const carouselConfig = { ...defaultConfig, ...config };
//   const updateRotationFunctionRef = useRef<(() => void) | null>(null);
//   const speedTweenRef = useRef<gsap.core.Tween | null>(null);
//   const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const lastUpdateTimeRef = useRef<number>(0);
//   const speedControllerRef = useRef({ value: 0 });

//   // CSS variables for the carousel
//   const carouselStyles = {
//     "--viewport-height": "35rem",
//     "--viewport-height-m": "35rem",
//     "--perspective": "600px",
//     "--perspective-m": "400px",
//     "--block-offset": "-18rem",
//     "--block-offset-m": "-6rem",
//     overflow: "hidden",
//     // 'zIndex' : '-1',
//     "--fadeout": fadeout
//       ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent 100%)"
//       : "none",
//   } as React.CSSProperties;

//   useEffect(() => {
//     // Initialize slides, duplicating if necessary
//     const originalSlideCount = slides.length;
//     let processedSlides = [...slides];

//     if (originalSlideCount < carouselConfig.slidesInRing) {
//       const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
//       for (let i = 0; i < duplicatesNeeded; i++) {
//         const slideToClone = slides[i % originalSlideCount]!;
//         processedSlides.push({
//           ...slideToClone,
//           id: `${slideToClone.id}-clone-${i}`,
//         });
//       }
//     }

//     setAllSlides(processedSlides);
//   }, [slides, carouselConfig.slidesInRing]);

//   useEffect(() => {
//     if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

//     const ring = ringRef.current;
//     const stage = stageRef.current;
//     const slideElements = ring.querySelectorAll(".carousel-slide");
//     const slideCount = slideElements.length;

//     // Calculate dimensions
//     const anglePerSlide = 360 / carouselConfig.slidesInRing;
//     const arcLength =
//       (anglePerSlide - carouselConfig.slideSpacing) *
//       (Math.PI / 180) *
//       carouselConfig.radius;
//     const slideWidth = arcLength;

//     console.log(
//       `Total slides: ${slideCount}, Angle per slide: ${anglePerSlide}°, Width: ${slideWidth}px`,
//     );

//     // Set container dimensions
//     stage.style.width = `${slideWidth}px`;
//     stage.style.height = `${carouselConfig.slideHeight}px`;

//     // Auto-rotation variables
//     const autoRotate = carouselConfig.autoRotate;
//     const targetRotationSpeed = carouselConfig.rotationSpeed;
//     const rotationDirection = carouselConfig.rotationDirection;

//     // Initialize timeline
//     const timeline = gsap.timeline();
//     timeline.set(ring, {
//       rotationY: carouselConfig.initialRotation,
//     });

//     // Position slides in 3D space
//     slideElements.forEach((slide, index) => {
//       const slideElement = slide as HTMLElement;
//       slideElement.style.width = `${slideWidth}px`;
//       slideElement.style.height = `${carouselConfig.slideHeight}px`;

//       gsap.set(slide, {
//         rotateY: index * -anglePerSlide,
//         transformOrigin: `50% 50% ${carouselConfig.radius}px`,
//         z: -carouselConfig.radius,
//         backfaceVisibility: "hidden",
//       });
//     });

//     // Update rotation function
//     const updateRotation = () => {
//       const currentRotationSpeed = speedControllerRef.current.value;
//       if (currentRotationSpeed === 0) return;

//       const currentTime = Date.now();
//       const deltaTime = currentTime - lastUpdateTimeRef.current;
//       lastUpdateTimeRef.current = currentTime;

//       const rotationAmount =
//         (deltaTime / 16.67) * currentRotationSpeed * rotationDirection;

//       gsap.to(ring, {
//         rotationY: `+=${rotationAmount}`,
//         duration: 0,
//         overwrite: true,
//       });
//     };

//     const startAutoRotation = () => {
//       if (!autoRotate) return;

//       lastUpdateTimeRef.current = Date.now();
//       updateRotationFunctionRef.current = updateRotation;
//       gsap.ticker.add(updateRotation);

//       if (speedTweenRef.current) {
//         speedTweenRef.current.kill();
//       }

//       speedTweenRef.current = gsap.to(speedControllerRef.current, {
//         value: targetRotationSpeed,
//         duration: carouselConfig.pauseEaseDuration,
//         ease: "power1.out",
//       });
//     };

//     const stopAutoRotation = () => {
//       if (speedTweenRef.current) {
//         speedTweenRef.current.kill();
//       }

//       speedTweenRef.current = gsap.to(speedControllerRef.current, {
//         value: 0,
//         duration: carouselConfig.pauseEaseDuration,
//         ease: "power1.in",
//         onComplete: () => {
//           if (updateRotationFunctionRef.current) {
//             gsap.ticker.remove(updateRotationFunctionRef.current);
//             updateRotationFunctionRef.current = null;
//           }
//         },
//       });
//     };

//     const resumeAutoRotation = () => {
//       if (autoRotateTimeoutRef.current) {
//         clearTimeout(autoRotateTimeoutRef.current);
//       }

//       autoRotateTimeoutRef.current = setTimeout(() => {
//         if (carouselConfig.autoRotate) {
//           startAutoRotation();
//         }
//       }, carouselConfig.resumeDelay);
//     };

//     // Add entrance animation
//     if (carouselConfig.entranceAnimation !== "none") {
//       let entranceAnimation: gsap.TweenVars = {};

//       switch (carouselConfig.entranceAnimation) {
//         case "fadeIn":
//           entranceAnimation = {
//             opacity: 0,
//             duration: carouselConfig.entranceDuration,
//             stagger: carouselConfig.entranceStagger,
//             ease: "power2.out",
//           };
//           break;
//         case "fadeUp":
//           entranceAnimation = {
//             y: carouselConfig.entranceDistance,
//             opacity: 0,
//             duration: carouselConfig.entranceDuration,
//             stagger: carouselConfig.entranceStagger,
//             ease: "power3.out",
//           };
//           break;
//       }

//       timeline.from(".carousel-slide", entranceAnimation).add(() => {
//         startAutoRotation();
//       });
//     } else {
//       startAutoRotation();
//     }

//     // Hover pause functionality
//     const handleMouseEnter = () => {
//       if (autoRotateTimeoutRef.current) {
//         clearTimeout(autoRotateTimeoutRef.current);
//       }
//       stopAutoRotation();
//     };

//     const handleMouseLeave = () => {
//       resumeAutoRotation();
//     };

//     const handleTouchStart = () => {
//       if (autoRotateTimeoutRef.current) {
//         clearTimeout(autoRotateTimeoutRef.current);
//       }
//       stopAutoRotation();
//     };

//     const handleTouchEnd = () => {
//       resumeAutoRotation();
//     };

//     // Add event listeners if pause on hover is enabled
//     if (carouselConfig.pauseOnHover && containerRef.current) {
//       const container = containerRef.current;
//       container.addEventListener("mouseenter", handleMouseEnter);
//       container.addEventListener("mouseleave", handleMouseLeave);
//       container.addEventListener("touchstart", handleTouchStart, {
//         passive: true,
//       });
//       container.addEventListener("touchend", handleTouchEnd);

//       // Cleanup function
//       return () => {
//         container.removeEventListener("mouseenter", handleMouseEnter);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//         container.removeEventListener("touchstart", handleTouchStart);
//         container.removeEventListener("touchend", handleTouchEnd);

//         if (updateRotationFunctionRef.current) {
//           gsap.ticker.remove(updateRotationFunctionRef.current);
//         }
//         if (speedTweenRef.current) {
//           speedTweenRef.current.kill();
//         }
//         if (autoRotateTimeoutRef.current) {
//           clearTimeout(autoRotateTimeoutRef.current);
//         }
//       };
//     }

//     // Cleanup function for non-hover case
//     return () => {
//       if (updateRotationFunctionRef.current) {
//         gsap.ticker.remove(updateRotationFunctionRef.current);
//       }
//       if (speedTweenRef.current) {
//         speedTweenRef.current.kill();
//       }
//       if (autoRotateTimeoutRef.current) {
//         clearTimeout(autoRotateTimeoutRef.current);
//       }
//     };
//   }, [allSlides, carouselConfig]);

//   const CSSstyles = {
//     base: {
//       perspective: "var(--perspective)",
//       "@media (max-width: 767px)": {
//         perspective: "var(--perspective-m)",
//       },
//     },
//   };

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
//           style={{
//             transformStyle: "preserve-3d",
//             gap: 0,
//           }}
//         >
//           {allSlides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className="carousel-slide absolute overflow-hidden"
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <img
//                 src={slide.src}
//                 alt={slide.alt}
//                 className="h-full w-full rounded-3xl object-cover"
//                 draggable={false}
//               />
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
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  resumeDelay: 0,
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
  
  const carouselConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  
  // Refs for cleanup and control
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedControllerRef = useRef({ value: 0 });
  const isActiveRef = useRef<boolean>(true);

  // Memoized styles for better performance
  const carouselStyles = useMemo(() => ({
    "--viewport-height": "35rem",
    "--viewport-height-m": "35rem",
    "--perspective": "600px",
    "--perspective-m": "400px",
    "--block-offset": "-18rem",
    "--block-offset-m": "-6rem",
    overflow: "hidden",
    "--fadeout": fadeout
      ? "linear-gradient(90deg, transparent, white 20%, white 80%, transparent 100%)"
      : "none",
  } as React.CSSProperties), [fadeout]);

  // Memoized slide processing
  const processedSlides = useMemo(() => {
    const originalSlideCount = slides.length;
    let processed = [...slides];

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
    if (!isActiveRef.current || !ringRef.current) return;
    
    const currentRotationSpeed = speedControllerRef.current.value;
    if (currentRotationSpeed === 0) {
      rafIdRef.current = null;
      return;
    }

    rotationValueRef.current += currentRotationSpeed * carouselConfig.rotationDirection;
    
    // Use transform directly for better performance
    ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
    
    rafIdRef.current = requestAnimationFrame(updateRotation);
  }, [carouselConfig.rotationDirection]);

  // Optimized start/stop functions
  const startAutoRotation = useCallback(() => {
    if (!carouselConfig.autoRotate || rafIdRef.current) return;

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
      }
    });
  }, [carouselConfig.autoRotate, carouselConfig.rotationSpeed, carouselConfig.pauseEaseDuration, updateRotation]);

  const stopAutoRotation = useCallback(() => {
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
      }
    });
  }, [carouselConfig.pauseEaseDuration]);

  const resumeAutoRotation = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }

    autoRotateTimeoutRef.current = setTimeout(() => {
      if (carouselConfig.autoRotate && isActiveRef.current) {
        startAutoRotation();
      }
    }, carouselConfig.resumeDelay);
  }, [carouselConfig.autoRotate, carouselConfig.resumeDelay, startAutoRotation]);

  // Event handlers with proper cleanup
  const handleMouseEnter = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    stopAutoRotation();
  }, [stopAutoRotation]);

  const handleMouseLeave = useCallback(() => {
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
    stage.style.willChange = 'transform';

    // Initialize ring rotation
    rotationValueRef.current = carouselConfig.initialRotation;
    ring.style.transform = `rotateY(${carouselConfig.initialRotation}deg)`;
    ring.style.willChange = 'transform';
    ring.style.transformStyle = 'preserve-3d';

    // Batch DOM updates for better performance
    const fragment = document.createDocumentFragment();
    
    // Position slides in 3D space with GPU acceleration
    slideElements.forEach((slide, index) => {
      const slideElement = slide as HTMLElement;
      
      // Set dimensions
      slideElement.style.width = `${slideWidth}px`;
      slideElement.style.height = `${carouselConfig.slideHeight}px`;
      
      // GPU-accelerated transforms
      slideElement.style.willChange = 'transform';
      slideElement.style.transformStyle = 'preserve-3d';
      slideElement.style.backfaceVisibility = 'hidden';
      slideElement.style.transform = `
        rotateY(${index * -anglePerSlide}deg) 
        translateZ(${-carouselConfig.radius}px)
      `;
      slideElement.style.transformOrigin = `50% 50% 0px`;
      
      // Optimize images for better performance
      const img = slideElement.querySelector('img');
      if (img) {
        img.style.willChange = 'auto';
        img.style.transform = 'translateZ(0)'; // Force GPU layer
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
            opacity: 0 
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
          slideElements.forEach(slide => {
            (slide as HTMLElement).style.willChange = 'auto';
          });
          startAutoRotation();
        }
      });
    } else {
      startAutoRotation();
    }

    // Add optimized event listeners
    if (carouselConfig.pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener("mouseenter", handleMouseEnter, { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      container.addEventListener("touchstart", handleMouseEnter, { passive: true });
      container.addEventListener("touchend", handleMouseLeave, { passive: true });
    }

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      
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

      if (containerRef.current) {
        const container = containerRef.current;
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchstart", handleMouseEnter);
        container.removeEventListener("touchend", handleMouseLeave);
      }
      
      // Clean up will-change properties
      if (slideElementsRef.current) {
        slideElementsRef.current.forEach(slide => {
          (slide as HTMLElement).style.willChange = 'auto';
        });
      }
      if (ring) ring.style.willChange = 'auto';
      if (stage) stage.style.willChange = 'auto';
    };
  }, [allSlides, carouselConfig, startAutoRotation, handleMouseEnter, handleMouseLeave]);

  // Component unmount cleanup
  useEffect(() => {
    isActiveRef.current = true;
    return () => {
      isActiveRef.current = false;
    };
  }, []);

  const CSSstyles = useMemo(() => ({
    base: {
      perspective: "var(--perspective)",
      "@media (max-width: 767px)": {
        perspective: "var(--perspective-m)",
      },
    },
  }), []);

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
              className="carousel-slide absolute overflow-hidden"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full rounded-3xl object-cover"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
                decoding="async"
              />
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