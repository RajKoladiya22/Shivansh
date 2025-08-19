// "use client";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { gsap } from "gsap";
// import Image from "next/image";

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
//   name?: string;
//   position?: string;
//   // optional alt if user wants it explicitly
//   alt?: string;
// }

// interface CurvedCarouselProps {
//   slides: SlideData[];
//   config?: Partial<CarouselConfig>;
//   fadeout?: boolean;
//   className?: string;
// }

// const defaultConfig: CarouselConfig = {
//   slideHeight: 320,
//   slidesInRing: 21,
//   slideSpacing: 1,
//   radius: 1200,
//   initialRotation: 180,
//   autoRotate: true,
//   rotationSpeed: 0.1,
//   rotationDirection: 1,
//   pauseOnHover: true,
//   resumeDelay: 100,
//   pauseEaseDuration: 0.5,
//   entranceAnimation: "fadeIn",
//   entranceDuration: 1.5,
//   entranceStagger: 0.1,
//   entranceDistance: 100,
// };


// type Slide = {
//   src: string;
//   alt?: string;
//   [key: string]: any; // If it has other properties
// };

// type OptimizedImageProps = {
//   slide: Slide;
//   index: number;
// };

// const OptimizedImage: React.FC<OptimizedImageProps> = ({ slide, index }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <div className="relative h-full w-full">
//       <Image
//         src={slide.src ?? '/images/STAFF/06.png'}
//         width={100}
//         height={100}
//         alt={slide.alt ?? slide.name ?? `Slide ${index + 1}`}
//         className={`h-full w-full rounded-3xl object-cover transition-all duration-300 group-hover:scale-105 ${
//           isLoading ? 'blur-sm' : 'blur-0'
//         }`}
//         draggable={false}
//         loading={index < 3 ? "eager" : "lazy"} // Reduced eager loading
//         decoding="async"
//         priority={index < 2} // Add priority for first 2 images
//         quality={75} // Reduce quality from default 75 to balance size/quality
//         placeholder="blur"
//         blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5xZqHBKHOOUV8p7eCWTMiUhqKAlADpuN6Y8TpQGPNaFO7LYjJiubyRXSG9ug=="
//         onLoad={() => setIsLoading(false)}
//         onError={() => setIsLoading(false)}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//       />
      
//       {/* Loading spinner */}
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-3xl">
//           <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProgressiveImage : React.FC<OptimizedImageProps> = ({ slide, index }) => {
//   const [currentSrc, setCurrentSrc] = useState(`${slide.src}?w=50&q=10`); // Low quality placeholder
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const img = new window.Image();
//     img.src = `${slide.src}?w=400&q=75`; // Medium quality
//     img.onload = () => {
//       setCurrentSrc(`${slide.src}?w=400&q=75`);
      
//       // Then load full quality
//       const fullImg = new window.Image();
//       fullImg.src = slide.src;
//       fullImg.onload = () => {
//         setCurrentSrc(slide.src);
//         setIsLoaded(true);
//       };
//     };
//   }, [slide.src]);

//   return (
//     <Image
//       src={currentSrc}
//       width={100}
//       height={100}
//       alt={slide.alt ?? slide.name ?? `Slide ${index + 1}`}
//       className={`h-full w-full rounded-3xl object-cover transition-all duration-500 group-hover:scale-105 ${
//         isLoaded ? 'opacity-100' : 'opacity-80'
//       }`}
//       draggable={false}
//       loading={index < 3 ? "eager" : "lazy"}
//       decoding="async"
//     />
//   );
// };

// export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
//   slides,
//   config = {},
//   fadeout = false,
//   className = "",
// }) => {
//   // Refs
//   const ringRef = useRef<HTMLDivElement | null>(null);
//   const stageRef = useRef<HTMLDivElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const slideElementsRef = useRef<NodeListOf<Element> | null>(null);

//   // State
//   const [allSlides, setAllSlides] = useState<SlideData[]>([]);
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const [isLoading, setIsLoading] = useState(true);

//   // Performance & control refs
//   const rafIdRef = useRef<number | null>(null);
//   const rotationValueRef = useRef<number>(0);
//   const speedTweenRef = useRef<gsap.core.Tween | null>(null);
//   const autoRotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
//     null,
//   );
//   const speedControllerRef = useRef({ value: 0 });
//   const isActiveRef = useRef<boolean>(true);
//   const isPausedRef = useRef<boolean>(false);
//   const currentIndexRef = useRef<number>(0);

//   // Drag state
//   const isDraggingRef = useRef(false);
//   const lastPointerXRef = useRef<number | null>(null);
//   const lastPointerTimeRef = useRef<number | null>(null);
//   const velocityRef = useRef(0);

//   // Prefers reduced motion (set in effect)
//   const prefersReducedMotionRef = useRef(false);

//   const carouselConfig = useMemo(
//     () => ({ ...defaultConfig, ...config }),
//     [config],
//   );

//   // compute isMobile from windowSize (kept up-to-date via resize listener)
//   const isMobile = windowSize.width < 768;

//   // inline style (no invalid '@media' here)
//   // const carouselStyles = useMemo(
//   //   () =>
//   //     ({
//   //       "--viewport-height": "35rem",
//   //       "--viewport-height-m": "35rem",
//   //       "--perspective": "1000px",
//   //       "--perspective-m": "800px",
//   //       "--block-offset": "-18rem",
//   //       "--block-offset-m": "-6rem",
//   //       overflow: "hidden",
//   //       zIndex: 1,
//   //       "--fadeout": fadeout
//   //         ? "linear-gradient(90deg, transparent, white 5%, white 95%, transparent 100%)"
//   //         : "none",
//   //     }) as React.CSSProperties,
//   //   [fadeout],
//   // );
//   const carouselStyles = useMemo(
//   () => ({
//     "--viewport-height": "clamp(30rem, 60vh, 50rem)", // Responsive height
//     "--viewport-height-m": "clamp(25rem, 50vh, 40rem)", // Mobile height
//     "--perspective": "clamp(800px, 100vw, 1200px)",
//     "--perspective-m": "600px",
//     "--block-offset": "clamp(-12rem, -15vh, -18rem)",
//     "--block-offset-m": "clamp(-4rem, -8vh, -6rem)",
//     overflow: "hidden",
//     zIndex: 1,
//     "--fadeout": fadeout
//       ? "linear-gradient(90deg, transparent, white 5%, white 95%, transparent 100%)"
//       : "none",
//   }) as React.CSSProperties,
//   [fadeout]
// );


//   // -- Guard & processed slides (avoid division by zero)
//   const processedSlides = useMemo(() => {
//     if (!slides || slides.length === 0) return [];
//     const originalSlideCount = slides.length;
//     const processed = [...slides];

//     if (originalSlideCount < carouselConfig.slidesInRing) {
//       const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
//       for (let i = 0; i < duplicatesNeeded; i++) {
//         const slideToClone = slides[i % originalSlideCount]!;
//         processed.push({
//           ...slideToClone,
//           id: `${slideToClone.id ?? i}-clone-${i}`,
//         });
//       }
//     }

//     // Ensure every slide has an id to use as React key
//     return processed.map((s, i) => ({ ...s, id: s.id ?? `slide-${i}` }));
//   }, [slides, carouselConfig.slidesInRing]);

//   // normalize helper
//   const normalize = (a: number) => ((a % 360) + 360) % 360;

//   // Rotation update (RAF)
//   const updateRotation = useCallback(() => {
//     if (!isActiveRef.current || !ringRef.current || isPausedRef.current) {
//       rafIdRef.current = null;
//       return;
//     }

//     const currentRotationSpeed = speedControllerRef.current.value;
//     if (currentRotationSpeed === 0) {
//       rafIdRef.current = requestAnimationFrame(updateRotation);
//       return;
//     }

//     rotationValueRef.current +=
//       currentRotationSpeed * carouselConfig.rotationDirection;

//     ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

//     rafIdRef.current = requestAnimationFrame(updateRotation);
//   }, [carouselConfig.rotationDirection]);

//   // Auto-rotation control
//   const startAutoRotation = useCallback(() => {
//     if (!carouselConfig.autoRotate || isPausedRef.current) return;

//     if (speedTweenRef.current) {
//       speedTweenRef.current.kill();
//     }

//     // Use tween on controller; RAF started in onUpdate
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
//     carouselConfig.pauseEaseDuration,
//     carouselConfig.rotationSpeed,
//     updateRotation,
//   ]);

//   const stopAutoRotation = useCallback(() => {
//     isPausedRef.current = true;

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
//     isPausedRef.current = false;

//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }

//     autoRotateTimeoutRef.current = setTimeout(() => {
//       if (
//         carouselConfig.autoRotate &&
//         isActiveRef.current &&
//         !isPausedRef.current
//       ) {
//         startAutoRotation();
//       }
//     }, carouselConfig.resumeDelay);
//   }, [
//     carouselConfig.autoRotate,
//     carouselConfig.resumeDelay,
//     startAutoRotation,
//   ]);

//   // goToIndex snaps to a slide index (index is in [0, slideCount))
//   const goToIndex = useCallback(
//     (index: number) => {
//       const slideCount =
//         slideElementsRef.current?.length ?? processedSlides.length;
//       if (!ringRef.current || slideCount === 0) return;

//       const anglePerSlide = 360 / carouselConfig.slidesInRing;
//       const baseAngle = normalize(index * anglePerSlide);
//       const current = normalize(rotationValueRef.current);
//       const k = Math.round((current - baseAngle) / 360);
//       const target = baseAngle + 360 * k;

//       // Stop auto rotation while animating to index
//       stopAutoRotation();

//       const rotationObj = { value: rotationValueRef.current };
//       gsap.to(rotationObj, {
//         value: target,
//         duration: 0.8,
//         ease: "power2.out",
//         onUpdate: () => {
//           rotationValueRef.current = rotationObj.value;
//           if (ringRef.current) {
//             ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
//           }
//         },
//         onComplete: () => {
//           currentIndexRef.current = index % slideCount;
//           setSelectedIndex(index % slideCount);

//           // small pause then resume auto rotation if allowed
//           setTimeout(() => {
//             isPausedRef.current = false;
//             resumeAutoRotation();
//           }, 200);
//         },
//       });
//     },
//     [
//       carouselConfig.slidesInRing,
//       processedSlides.length,
//       resumeAutoRotation,
//       stopAutoRotation,
//     ],
//   );

//   const prev = useCallback(() => {
//     const slideCount =
//       slideElementsRef.current?.length ?? processedSlides.length;
//     const currentIndex = currentIndexRef.current;
//     const nextIndex = (currentIndex - 1 + slideCount) % slideCount;
//     goToIndex(nextIndex);
//   }, [goToIndex, processedSlides.length]);

//   const next = useCallback(() => {
//     const slideCount =
//       slideElementsRef.current?.length ?? processedSlides.length;
//     const currentIndex = currentIndexRef.current;
//     const nextIndex = (currentIndex + 1) % slideCount;
//     goToIndex(nextIndex);
//   }, [goToIndex, processedSlides.length]);

//   // Tap / click handler: toggle selection on mobile
//   const handleSlideTap = useCallback(
//     (index: number) => {
//       if (selectedIndex === index) {
//         setSelectedIndex(null);
//         resumeAutoRotation();
//         return;
//       }
//       goToIndex(index);
//     },
//     [goToIndex, resumeAutoRotation, selectedIndex],
//   );

//   // Mouse enter/leave handlers
//   const handleContainerMouseEnter = useCallback(() => {
//     if (!carouselConfig.pauseOnHover) return;
//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }
//     stopAutoRotation();
//   }, [carouselConfig.pauseOnHover, stopAutoRotation]);

//   const handleContainerMouseLeave = useCallback(() => {
//     if (!carouselConfig.pauseOnHover) return;
//     resumeAutoRotation();
//   }, [carouselConfig.pauseOnHover, resumeAutoRotation]);

//   const handleSlideMouseEnter = useCallback(() => {
//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }
//     stopAutoRotation();
//   }, [stopAutoRotation]);

//   const handleSlideMouseLeave = useCallback(() => {
//     resumeAutoRotation();
//   }, [resumeAutoRotation]);

//   // Initialize slides state
//   useEffect(() => {
//     setAllSlides(processedSlides);
//   }, [processedSlides]);

//   // Setup main effect (positioning + entrance animation)
//   useEffect(() => {
//     if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

//     const ring = ringRef.current;
//     const stage = stageRef.current;
//     slideElementsRef.current = ring.querySelectorAll(".carousel-slide");
//     const slideElements = slideElementsRef.current;
//     const slideCount = slideElements.length;
//     if (slideCount === 0) return;

//     const anglePerSlide = 360 / carouselConfig.slidesInRing;
//     const arcLength =
//       (anglePerSlide - carouselConfig.slideSpacing) *
//       (Math.PI / 180) *
//       carouselConfig.radius;
//     const slideWidth = arcLength;

//     stage.style.width = `${slideWidth}px`;
//     stage.style.height = `${carouselConfig.slideHeight}px`;
//     stage.style.willChange = "transform";

//     rotationValueRef.current = carouselConfig.initialRotation;
//     ring.style.transform = `rotateY(${carouselConfig.initialRotation}deg)`;
//     ring.style.willChange = "transform";
//     ring.style.transformStyle = "preserve-3d";

//     slideElements.forEach((slide, index) => {
//       const slideEl = slide as HTMLElement;
//       slideEl.style.width = `${slideWidth}px`;
//       slideEl.style.height = `${carouselConfig.slideHeight}px`;
//       slideEl.style.willChange = "transform";
//       slideEl.style.transformStyle = "preserve-3d";
//       slideEl.style.backfaceVisibility = "hidden";

//       // Positioning transform uses same sign as original code
//       slideEl.style.transform = `rotateY(${index * -anglePerSlide}deg) translateZ(${-carouselConfig.radius}px)`;
//       slideEl.style.transformOrigin = `50% 50% 0px`;

//       const img = slideEl.querySelector("img");
//       if (img) {
//         (img as HTMLElement).style.willChange = "auto";
//         (img as HTMLElement).style.transform = "translateZ(0)";
//       }
//     });

//     // Entrance animations: respect prefers-reduced-motion
//     const doEntrance =
//       carouselConfig.entranceAnimation !== "none" &&
//       !prefersReducedMotionRef.current;

//     if (doEntrance) {
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
//           slideElements.forEach((slide) => {
//             (slide as HTMLElement).style.willChange = "auto";
//           });
//           startAutoRotation();
//         },
//       });
//     } else {
//       startAutoRotation();
//     }

//     // cleanup on unmount
//     return () => {
//       isActiveRef.current = false;
//       isPausedRef.current = true;

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

//       if (slideElementsRef.current) {
//         slideElementsRef.current.forEach((slide) => {
//           (slide as HTMLElement).style.willChange = "auto";
//         });
//       }
//       if (ring) ring.style.willChange = "auto";
//       if (stage) stage.style.willChange = "auto";
//     };
//     // intentionally include allSlides and carouselConfig and startAutoRotation
//   }, [allSlides, carouselConfig, startAutoRotation]);

//   // mount/unmount lifecycle and preferences
//   useEffect(() => {
//     isActiveRef.current = true;
//     isPausedRef.current = false;

//     // prefers reduce motion
//     if (typeof window !== "undefined" && "matchMedia" in window) {
//       prefersReducedMotionRef.current = window.matchMedia(
//         "(prefers-reduced-motion: reduce)",
//       ).matches;
//     }

//     return () => {
//       isActiveRef.current = false;
//       isPausedRef.current = true;
//     };
//   }, []);

//   // Resize listener to update windowSize (so isMobile is accurate)
//   useEffect(() => {
//     const onResize = () =>
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     onResize();
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Keyboard navigation (focus must be on container)
//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent) => {
//       if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         prev();
//       } else if (e.key === "ArrowRight") {
//         e.preventDefault();
//         next();
//       } else if (e.key === " " || e.key === "Spacebar") {
//         // toggle pause/play
//         e.preventDefault();
//         if (isPausedRef.current) {
//           resumeAutoRotation();
//         } else {
//           stopAutoRotation();
//         }
//       } else if (e.key === "Escape") {
//         setSelectedIndex(null);
//         resumeAutoRotation();
//       }
//     },
//     [next, prev, resumeAutoRotation, stopAutoRotation],
//   );

//   // Pointer / drag handlers for touch & mouse
//   const onPointerDown = useCallback(
//     (e: React.PointerEvent) => {
//       const el = containerRef.current;
//       if (!el) return;

//       // capture pointer for consistent move/up events
//       (e.target as Element).setPointerCapture?.(e.pointerId);

//       isDraggingRef.current = true;
//       lastPointerXRef.current = e.clientX;
//       lastPointerTimeRef.current = e.timeStamp;
//       velocityRef.current = 0;

//       // stop auto rotation while dragging
//       stopAutoRotation();
//     },
//     [stopAutoRotation],
//   );

//   const onPointerMove = useCallback((e: React.PointerEvent) => {
//     if (!isDraggingRef.current || lastPointerXRef.current == null) return;

//     const now = e.timeStamp;
//     const deltaX = e.clientX - lastPointerXRef.current;
//     const dt = Math.max(1, now - (lastPointerTimeRef.current ?? now));
//     // sensitivity: degree per pixel (tweakable)
//     const sensitivity = 0.35; // deg per px
//     const deltaDeg = deltaX * sensitivity;

//     rotationValueRef.current += deltaDeg;
//     if (ringRef.current) {
//       ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
//     }

//     // compute velocity (deg / ms)
//     velocityRef.current = deltaDeg / dt;

//     lastPointerXRef.current = e.clientX;
//     lastPointerTimeRef.current = now;
//   }, []);

//   const onPointerUp = useCallback(
//     (e: React.PointerEvent) => {
//       if (!isDraggingRef.current) return;
//       isDraggingRef.current = false;
//       lastPointerXRef.current = null;
//       lastPointerTimeRef.current = null;

//       // snap to nearest slide
//       const anglePerSlide = 360 / carouselConfig.slidesInRing;
//       const slideCount =
//         slideElementsRef.current?.length ?? processedSlides.length;
//       if (slideCount === 0) {
//         resumeAutoRotation();
//         return;
//       }

//       // compute nearest index (see analysis: -index*angle + rotation ≈ 0 => index ≈ rotation/angle)
//       const current = normalize(rotationValueRef.current);
//       let nearestIndex = Math.round(current / anglePerSlide) % slideCount;
//       if (nearestIndex < 0) nearestIndex += slideCount;

//       goToIndex(nearestIndex);

//       // resume rotation after a short delay using existing resumeAutoRotation
//       resumeAutoRotation();
//     },
//     [
//       carouselConfig.slidesInRing,
//       goToIndex,
//       processedSlides.length,
//       resumeAutoRotation,
//     ],
//   );

//   // attach pointer handlers on container DOM element via props in JSX (so React manages capture)
//   // (no global listeners required)

//   // CSS styles for stage (simple)
//   const CSSstyles = useMemo(
//     () => ({
//       base: {
//         perspective: "var(--perspective)",
//       },
//     }),
//     [],
//   );

//   return (
//     <div
//       ref={containerRef}
//       className={`curved-carousel relative z-10 w-full overflow-visible select-none ${className}`}
//       style={carouselStyles}
//       onMouseEnter={handleContainerMouseEnter}
//       onMouseLeave={handleContainerMouseLeave}
//       onKeyDown={handleKeyDown}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Curved image carousel"
//       tabIndex={0} // focusable for keyboard
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
//               key={slide.id}
//               data-render-index={index}
//               className="carousel-slide group absolute cursor-pointer overflow-hidden rounded-3xl"
//               onMouseEnter={handleSlideMouseEnter}
//               onMouseLeave={handleSlideMouseLeave}
//               onClick={() =>
//                 isMobile ? handleSlideTap(index) : goToIndex(index)
//               }
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   goToIndex(index);
//                 }
//               }}
//             >
//               <Image
//                 src={slide.src ?? '/images/STAFF/06.png'}
//                 width={100}
//                 height={100}
//                 alt={slide.alt ?? slide.name ?? `Slide ${index + 1}`}
//                 className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
//                 draggable={false}
//                 loading={index < 5 ? "eager" : "lazy"}
//                 decoding="async"
//               />
//               {/* Hover Overlay */}
//               <div
//                 className={`absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-transparent via-black/70 to-black transition-opacity duration-400 ${
//                   selectedIndex === index ? "opacity-100" : "opacity-0"
//                 } group-hover:opacity-100`}
//               >
//                 <div
//                   className={`transform p-4 text-white transition-transform duration-500 ease-out md:p-5 lg:p-6`}
//                 >
//                   <div className="space-y-2 md:space-y-3">
//                     <div>
//                       <h3 className="line-clamp-1 text-2xl font-bold md:text-5xl">
//                         {slide.name ?? `Team Member ${index + 1}`}
//                       </h3>
//                       <p className="text-xl font-medium text-red-300 md:text-3xl">
//                         {slide.position ?? "Team Member"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Prev / Next Controls */}
//       {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6">
//         <button
//           type="button"
//           aria-label="Previous"
//           onClick={prev}
//           className="pointer-events-auto rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-black/80 transition-colors"
//         >
//           ‹
//         </button>

//         <button
//           type="button"
//           aria-label="Next"
//           onClick={next}
//           className="pointer-events-auto rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-black/80 transition-colors"
//         >
//           ›
//         </button>
//       </div> */}
//       <div className="pointer-events-none absolute -inset-4 z-30 flex sm:hidden">
//         {/* Left / Right buttons (center vertically) */}
//         <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-6">
//           <button
//             type="button"
//             aria-label="Previous"
//             onClick={prev}
//             className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 md:h-14 md:w-14 md:p-4"
//           >
//             <span className="text-2xl leading-none select-none md:text-3xl">
//               ‹
//             </span>
//           </button>

//           <button
//             type="button"
//             aria-label="Next"
//             onClick={next}
//             className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 md:h-14 md:w-14 md:p-4"
//           >
//             <span className="text-2xl leading-none select-none md:text-3xl">
//               ›
//             </span>
//           </button>
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
//         @media (max-width: 600px) {
//           .curved-carousel {
//             -webkit-mask-image: none;
//             mask-image: none;
//           }
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

//         /* Ensure buttons are always visible and properly positioned */
//         @media (max-width: 640px) {
//           .curved-carousel .absolute.bottom-6 {
//             bottom: 1rem;
//             padding: 0 1rem;
//           }

//           .curved-carousel .absolute.bottom-6 > div {
//             flex-direction: column;
//             gap: 1rem;
//             width: 100%;
//           }

//           .curved-carousel .absolute.bottom-6 button {
//             width: 100%;
//             min-width: 200px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };







"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import Image from "next/image";

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
  name?: string;
  position?: string;
  alt?: string;
  // Optimized image URLs for better performance
  thumbnailSrc?: string; // Ultra low quality placeholder (~5KB)
  mobileSrc?: string; // Mobile optimized version
  mediumSrc?: string; // Medium quality version
}

interface CurvedCarouselProps {
  slides: SlideData[];
  config?: Partial<CarouselConfig>;
  fadeout?: boolean;
  className?: string;
  // Performance optimization props
  imageQuality?: number;
  enableProgressiveLoading?: boolean;
  preloadCount?: number;
  lazyLoadThreshold?: number;
}

const defaultConfig: CarouselConfig = {
  slideHeight: 320,
  slidesInRing: 21,
  slideSpacing: 1,
  radius: 1200,
  initialRotation: 180,
  autoRotate: true,
  rotationSpeed: 0.1,
  rotationDirection: 1,
  pauseOnHover: true,
  resumeDelay: 100,
  pauseEaseDuration: 0.5,
  entranceAnimation: "fadeIn",
  entranceDuration: 1.5,
  entranceStagger: 0.1,
  entranceDistance: 100,
};

// Ultra-lightweight blur placeholder
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5xZqHBKHOOUV8p7eCWTMiUhqKAlADpuN6Y8TpQGPNaFO7LYjJiubyRXSG9ug==";

// Smart image component with progressive loading and responsive sizing
const SmartCarouselImage: React.FC<{
  slide: SlideData;
  index: number;
  isPriority?: boolean;
  isVisible?: boolean;
  quality?: number;
  onLoadComplete?: () => void;
}> = ({ 
  slide, 
  index, 
  isPriority = false, 
  isVisible = false, 
  quality = 75, 
  onLoadComplete 
}) => {
  const [loadingStage, setLoadingStage] = useState<'placeholder' | 'low' | 'medium' | 'high' | 'error'>('placeholder');
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URLs
  const getOptimizedSrc = (originalSrc: string, width: number, quality: number) => {
    if (!originalSrc) return '/images/STAFF/06.png';
    
    // If it's already optimized or from an external CDN, return as-is
    if (originalSrc.includes('?') || originalSrc.includes('cloudinary') || originalSrc.includes('imgix')) {
      return originalSrc;
    }
    
    // For Next.js Image optimization
    return `${originalSrc}?w=${width}&q=${quality}`;
  };

  // Progressive loading effect
  useEffect(() => {
    if (!slide.src || !isVisible) return;

    let isMounted = true;

    const loadImageProgressive = async () => {
      try {
        // Stage 1: Ultra low quality placeholder (if available)
        if (slide.thumbnailSrc && isMounted) {
          setCurrentSrc(slide.thumbnailSrc);
          setLoadingStage('low');
        }

        // Stage 2: Low quality version
        const lowQualityImg = new window.Image();
        lowQualityImg.src = getOptimizedSrc(slide.src!, 200, 30);
        
        await new Promise((resolve, reject) => {
          lowQualityImg.onload = resolve;
          lowQualityImg.onerror = reject;
        });

        if (isMounted) {
          setCurrentSrc(lowQualityImg.src);
          setLoadingStage('medium');
        }

        // Stage 3: Medium quality version (for mobile or if final)
        const isMobile = window.innerWidth < 768;
        const mediumQualityImg = new window.Image();
        mediumQualityImg.src = isMobile 
          ? (slide.mobileSrc ?? getOptimizedSrc(slide.src!, 400, 60))
          : getOptimizedSrc(slide.src!, 600, 65);

        await new Promise((resolve, reject) => {
          mediumQualityImg.onload = resolve;
          mediumQualityImg.onerror = reject;
        });

        if (isMounted) {
          setCurrentSrc(mediumQualityImg.src);
          if (isMobile) {
            setLoadingStage('high');
            onLoadComplete?.();
            return;
          }
        }

        // Stage 4: High quality version (desktop only, for priority images)
        if (!isMobile && (isPriority || index < 3)) {
          const highQualityImg = new window.Image();
          highQualityImg.src = slide.mediumSrc ?? getOptimizedSrc(slide.src!, 800, quality);

          await new Promise((resolve, reject) => {
            highQualityImg.onload = resolve;
            highQualityImg.onerror = reject;
          });

          if (isMounted) {
            setCurrentSrc(highQualityImg.src);
            setLoadingStage('high');
          }
        } else if (isMounted) {
          setLoadingStage('high');
        }

        onLoadComplete?.();

      } catch (error) {
        console.warn(`Failed to load image for slide ${index}:`, error);
        if (isMounted) {
          setCurrentSrc('/images/STAFF/06.png');
          setLoadingStage('error');
        }
      }
    };

    void loadImageProgressive();

    return () => {
      isMounted = false;
    };
  }, [slide.src, slide.thumbnailSrc, slide.mobileSrc, slide.mediumSrc, isVisible, isPriority, index, quality, onLoadComplete]);

  // Don't render anything if not visible and not priority
  if (!isVisible && !isPriority && loadingStage === 'placeholder') {
    return (
      <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="animate-pulse h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl" />
      </div>
    );
  }

  const isLoading = loadingStage === 'placeholder' || loadingStage === 'low';

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      {currentSrc ? (
        <Image
          ref={imgRef}
          src={currentSrc ?? '/images/STAFF/06.png'}
          width={400}
          height={400}
          alt={slide.alt ?? slide.name ?? `Team member ${index + 1}`}
          className={`
            h-full w-full object-cover transition-all duration-500 rounded-3xl
            group-hover:scale-105 
            ${isLoading ? 'blur-sm scale-95 brightness-90' : 'blur-0 scale-100 brightness-100'}
            ${loadingStage === 'high' ? 'opacity-100' : 'opacity-90'}
          `}
          draggable={false}
          loading={isPriority ? "eager" : "lazy"}
          priority={isPriority}
          placeholder="blur"
          blurDataURL={slide.thumbnailSrc ?? BLUR_DATA_URL}
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
          quality={quality}
          unoptimized={false}
          onError={() => {
            setLoadingStage('error');
            setCurrentSrc('/images/STAFF/06.png');
          }}
        />
      ) : (
        <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200" />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 rounded-3xl backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Progressive loading indicator */}
      <div className="absolute bottom-2 right-2">
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
          loadingStage === 'high' ? 'bg-green-400' : 
          loadingStage === 'medium' ? 'bg-yellow-400' :
          loadingStage === 'low' ? 'bg-orange-400' : 
          'bg-gray-400'
        } ${isLoading ? 'animate-pulse' : ''}`} />
      </div>
    </div>
  );
};

// Visibility hook to track which slides are in view
const useVisibilityTracker = (
  rotationValue: number, 
  totalSlides: number, 
  slidesInRing: number
) => {
  return useMemo(() => {
    if (totalSlides === 0) return new Set<number>();
    
    const anglePerSlide = 360 / slidesInRing;
    const currentRotation = ((rotationValue % 360) + 360) % 360;
    const visibleRange = 120; // Degrees of visibility (reduced for performance)
    
    const visible = new Set<number>();
    
    for (let i = 0; i < totalSlides; i++) {
      const slideAngle = ((i * anglePerSlide - currentRotation) % 360 + 360) % 360;
      const normalizedAngle = slideAngle > 180 ? slideAngle - 360 : slideAngle;
      
      if (Math.abs(normalizedAngle) < visibleRange / 2) {
        visible.add(i);
        // Also include adjacent slides for smooth loading
        if (i > 0) visible.add(i - 1);
        if (i < totalSlides - 1) visible.add(i + 1);
      }
    }
    
    return visible;
  }, [rotationValue, totalSlides, slidesInRing]);
};

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
  slides,
  config = {},
  fadeout = false,
  className = "",
  imageQuality = 75,
  enableProgressiveLoading = true,
  preloadCount = 3,
  lazyLoadThreshold = 5,
}) => {
  // Refs
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideElementsRef = useRef<NodeListOf<Element> | null>(null);

  // State
  const [allSlides, setAllSlides] = useState<SlideData[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Performance & control refs
  const rafIdRef = useRef<number | null>(null);
  const rotationValueRef = useRef<number>(0);
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedControllerRef = useRef({ value: 0 });
  const isActiveRef = useRef<boolean>(true);
  const isPausedRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  // Drag state with improved responsiveness
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const dragStartRotationRef = useRef<number>(0);

  // Prefers reduced motion
  const prefersReducedMotionRef = useRef(false);

  const carouselConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config]
  );

  const isMobile = windowSize.width < 768;

  // Track visible slides for performance optimization
  const visibleSlides = useVisibilityTracker(
    rotationValueRef.current, 
    allSlides.length, 
    carouselConfig.slidesInRing
  );

  const carouselStyles = useMemo(
    () => ({
      "--viewport-height": "clamp(30rem, 60vh, 50rem)",
      "--viewport-height-m": "clamp(25rem, 50vh, 40rem)",
      "--perspective": "clamp(800px, 100vw, 1200px)",
      "--perspective-m": "600px",
      "--block-offset": "clamp(-12rem, -15vh, -18rem)",
      "--block-offset-m": "clamp(-4rem, -8vh, -6rem)",
      overflow: "hidden",
      zIndex: 1,
      "--fadeout": fadeout
        ? "linear-gradient(90deg, transparent, white 5%, white 95%, transparent 100%)"
        : "none",
    }) as React.CSSProperties,
    [fadeout]
  );

  // Process slides with duplication if needed
  const processedSlides = useMemo(() => {
    if (!slides || slides.length === 0) return [];
    const originalSlideCount = slides.length;
    const processed = [...slides];

    if (originalSlideCount < carouselConfig.slidesInRing) {
      const duplicatesNeeded = carouselConfig.slidesInRing - originalSlideCount;
      for (let i = 0; i < duplicatesNeeded; i++) {
        const slideToClone = slides[i % originalSlideCount]!;
        processed.push({
          ...slideToClone,
          id: `${slideToClone.id ?? i}-clone-${i}`,
        });
      }
    }

    return processed.map((s, i) => ({ ...s, id: s.id ?? `slide-${i}` }));
  }, [slides, carouselConfig.slidesInRing]);

  const normalize = (a: number) => ((a % 360) + 360) % 360;

  // Optimized rotation update with throttled visibility updates
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

    rotationValueRef.current += currentRotationSpeed * carouselConfig.rotationDirection;
    ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

    rafIdRef.current = requestAnimationFrame(updateRotation);
  }, [carouselConfig.rotationDirection]);

  // Auto-rotation control
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
    carouselConfig.pauseEaseDuration,
    carouselConfig.rotationSpeed,
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
      if (
        carouselConfig.autoRotate &&
        isActiveRef.current &&
        !isPausedRef.current
      ) {
        startAutoRotation();
      }
    }, carouselConfig.resumeDelay);
  }, [
    carouselConfig.autoRotate,
    carouselConfig.resumeDelay,
    startAutoRotation,
  ]);

  const goToIndex = useCallback(
    (index: number) => {
      const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
      if (!ringRef.current || slideCount === 0) return;

      const anglePerSlide = 360 / carouselConfig.slidesInRing;
      const baseAngle = normalize(index * anglePerSlide);
      const current = normalize(rotationValueRef.current);
      const k = Math.round((current - baseAngle) / 360);
      const target = baseAngle + 360 * k;

      stopAutoRotation();

      const rotationObj = { value: rotationValueRef.current };
      gsap.to(rotationObj, {
        value: target,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          rotationValueRef.current = rotationObj.value;
          if (ringRef.current) {
            ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
          }
        },
        onComplete: () => {
          currentIndexRef.current = index % slideCount;
          setSelectedIndex(index % slideCount);

          setTimeout(() => {
            isPausedRef.current = false;
            resumeAutoRotation();
          }, 200);
        },
      });
    },
    [
      carouselConfig.slidesInRing,
      processedSlides.length,
      resumeAutoRotation,
      stopAutoRotation,
    ],
  );

  const prev = useCallback(() => {
    const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
    const currentIndex = currentIndexRef.current;
    const nextIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToIndex(nextIndex);
  }, [goToIndex, processedSlides.length]);

  const next = useCallback(() => {
    const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
    const currentIndex = currentIndexRef.current;
    const nextIndex = (currentIndex + 1) % slideCount;
    goToIndex(nextIndex);
  }, [goToIndex, processedSlides.length]);

  const handleSlideTap = useCallback(
    (index: number) => {
      if (selectedIndex === index) {
        setSelectedIndex(null);
        resumeAutoRotation();
        return;
      }
      goToIndex(index);
    },
    [goToIndex, resumeAutoRotation, selectedIndex],
  );

  // Mouse handlers
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

  const handleSlideMouseEnter = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    stopAutoRotation();
  }, [stopAutoRotation]);

  const handleSlideMouseLeave = useCallback(() => {
    resumeAutoRotation();
  }, [resumeAutoRotation]);

  // Handle image load completion
  const handleImageLoadComplete = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  // Initialize slides
  useEffect(() => {
    setAllSlides(processedSlides);
  }, [processedSlides]);

  // Main setup effect
  useEffect(() => {
    if (!ringRef.current || !stageRef.current || allSlides.length === 0) return;

    const ring = ringRef.current;
    const stage = stageRef.current;
    slideElementsRef.current = ring.querySelectorAll(".carousel-slide");
    const slideElements = slideElementsRef.current;
    const slideCount = slideElements.length;
    if (slideCount === 0) return;

    const anglePerSlide = 360 / carouselConfig.slidesInRing;
    const arcLength =
      (anglePerSlide - carouselConfig.slideSpacing) *
      (Math.PI / 180) *
      carouselConfig.radius;
    const slideWidth = arcLength;

    stage.style.width = `${slideWidth}px`;
    stage.style.height = `${carouselConfig.slideHeight}px`;
    stage.style.willChange = "transform";

    rotationValueRef.current = carouselConfig.initialRotation;
    ring.style.transform = `rotateY(${carouselConfig.initialRotation}deg)`;
    ring.style.willChange = "transform";
    ring.style.transformStyle = "preserve-3d";

    slideElements.forEach((slide, index) => {
      const slideEl = slide as HTMLElement;
      slideEl.style.width = `${slideWidth}px`;
      slideEl.style.height = `${carouselConfig.slideHeight}px`;
      slideEl.style.willChange = "transform";
      slideEl.style.transformStyle = "preserve-3d";
      slideEl.style.backfaceVisibility = "hidden";

      slideEl.style.transform = `rotateY(${index * -anglePerSlide}deg) translateZ(${-carouselConfig.radius}px)`;
      slideEl.style.transformOrigin = `50% 50% 0px`;

      const img = slideEl.querySelector("img");
      if (img) {
        (img as HTMLElement).style.willChange = "auto";
        (img as HTMLElement).style.transform = "translateZ(0)";
      }
    });

    const doEntrance =
      carouselConfig.entranceAnimation !== "none" &&
      !prefersReducedMotionRef.current;

    if (doEntrance) {
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
          slideElements.forEach((slide) => {
            (slide as HTMLElement).style.willChange = "auto";
          });
          startAutoRotation();
        },
      });
    } else {
      startAutoRotation();
    }

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

      if (slideElementsRef.current) {
        slideElementsRef.current.forEach((slide) => {
          (slide as HTMLElement).style.willChange = "auto";
        });
      }
      if (ring) ring.style.willChange = "auto";
      if (stage) stage.style.willChange = "auto";
    };
  }, [allSlides, carouselConfig, startAutoRotation]);

  useEffect(() => {
    isActiveRef.current = true;
    isPausedRef.current = false;

    if (typeof window !== "undefined" && "matchMedia" in window) {
      prefersReducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    return () => {
      isActiveRef.current = false;
      isPausedRef.current = true;
    };
  }, []);

  useEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (isPausedRef.current) {
          resumeAutoRotation();
        } else {
          stopAutoRotation();
        }
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
        resumeAutoRotation();
      }
    },
    [next, prev, resumeAutoRotation, stopAutoRotation],
  );

  // Improved pointer/drag handlers with better responsiveness
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      (e.target as Element).setPointerCapture?.(e.pointerId);

      isDraggingRef.current = true;
      lastPointerXRef.current = e.clientX;
      lastPointerTimeRef.current = e.timeStamp;
      dragStartRotationRef.current = rotationValueRef.current;
      velocityRef.current = 0;

      stopAutoRotation();
    },
    [stopAutoRotation],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || lastPointerXRef.current == null) return;

    const now = e.timeStamp;
    const deltaX = e.clientX - lastPointerXRef.current;
    const dt = Math.max(1, now - (lastPointerTimeRef.current ?? now));
    
    // Improved sensitivity for different screen sizes
    const sensitivity = isMobile ? 0.5 : 0.35;
    const deltaDeg = deltaX * sensitivity;

    rotationValueRef.current += deltaDeg;
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
    }

    velocityRef.current = deltaDeg / dt;

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  }, [isMobile]);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      lastPointerXRef.current = null;
      lastPointerTimeRef.current = null;

      const anglePerSlide = 360 / carouselConfig.slidesInRing;
      const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
      if (slideCount === 0) {
        resumeAutoRotation();
        return;
      }

      // Enhanced snapping with velocity consideration
      const current = normalize(rotationValueRef.current);
      let nearestIndex = Math.round(current / anglePerSlide) % slideCount;
      if (nearestIndex < 0) nearestIndex += slideCount;

      // If there's significant velocity, advance one more slide in that direction
      const velocityThreshold = 0.1;
      if (Math.abs(velocityRef.current) > velocityThreshold) {
        const velocityDirection = velocityRef.current > 0 ? 1 : -1;
        nearestIndex = (nearestIndex + velocityDirection + slideCount) % slideCount;
      }

      goToIndex(nearestIndex);
      resumeAutoRotation();
    },
    [
      carouselConfig.slidesInRing,
      goToIndex,
      processedSlides.length,
      resumeAutoRotation,
    ],
  );

  const CSSstyles = useMemo(
    () => ({
      base: {
        perspective: "var(--perspective)",
      },
    }),
    [],
  );

  return (
    <div
      ref={containerRef}
      className={`curved-carousel relative z-10 w-full overflow-visible select-none ${className}`}
      style={carouselStyles}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Curved image carousel"
      tabIndex={0}
    >
      <div
        ref={stageRef}
        className="curved-carousel__stage absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={CSSstyles.base}
      >
        <div
          ref={ringRef}
          className="curved-carousel__ring absolute h-full w-full"
        >
          {allSlides.map((slide, index) => {
            const isPriority = index < preloadCount;
            const isVisible = visibleSlides.has(index) ?? isPriority;
            const shouldRender = enableProgressiveLoading ? isVisible : true;

            return (
              <div
                key={slide.id}
                data-render-index={index}
                className="carousel-slide group absolute cursor-pointer overflow-hidden rounded-3xl"
                onMouseEnter={handleSlideMouseEnter}
                onMouseLeave={handleSlideMouseLeave}
                onClick={() =>
                  isMobile ? handleSlideTap(index) : goToIndex(index)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToIndex(index);
                  }
                }}
              >
                {shouldRender ? (
                  <SmartCarouselImage
                    slide={slide}
                    index={index}
                    isPriority={isPriority}
                    isVisible={isVisible}
                    quality={imageQuality}
                    onLoadComplete={() => handleImageLoadComplete(index)}
                  />
                ) : (
                  <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="animate-pulse h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl" />
                  </div>
                )}

                {/* Hover Overlay with improved animation */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-transparent via-black/70 to-black transition-all duration-400 ${
                    selectedIndex === index ? "opacity-100" : "opacity-0"
                  } group-hover:opacity-100`}
                >
                  <div
                    className="transform p-4 text-white transition-all duration-500 ease-out md:p-5 lg:p-6"
                    style={{
                      transform: selectedIndex === index || 
                        (typeof window !== 'undefined' && window.innerWidth >= 768) 
                        ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <h3 className="line-clamp-1 text-xl font-bold md:text-4xl lg:text-5xl">
                          {slide.name ?? `Team Member ${index + 1}`}
                        </h3>
                        <p className="text-lg font-medium text-red-300 md:text-2xl lg:text-3xl">
                          {slide.position ?? "Team Member"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls - Always visible on mobile, hover on desktop */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-4 md:px-6">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className={`
            pointer-events-auto flex h-12 w-12 items-center justify-center 
            rounded-full bg-black/40 backdrop-blur-md text-white shadow-lg 
            transition-all duration-300 hover:bg-black/60 hover:scale-110
            focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 
            md:h-14 md:w-14
            ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
        >
          <span className="text-2xl leading-none select-none md:text-3xl">‹</span>
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className={`
            pointer-events-auto flex h-12 w-12 items-center justify-center 
            rounded-full bg-black/40 backdrop-blur-md text-white shadow-lg 
            transition-all duration-300 hover:bg-black/60 hover:scale-110
            focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 
            md:h-14 md:w-14
            ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
        >
          <span className="text-2xl leading-none select-none md:text-3xl">›</span>
        </button>
      </div>

      {/* Loading Progress Indicator */}
      {enableProgressiveLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(allSlides.length, 10) }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  loadedImages.has(i) ? 'bg-green-400' : 
                  visibleSlides.has(i) ? 'bg-yellow-400' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .curved-carousel {
          height: var(--viewport-height);
          margin-block: var(--block-offset);
          transform-style: preserve-3d;
          -webkit-mask-image: var(--fadeout);
          mask-image: var(--fadeout);
          contain: layout style paint;
        }
        
        @media (max-width: 600px) {
          .curved-carousel {
            -webkit-mask-image: none;
            mask-image: none;
          }
        }

        @media (max-width: 767px) {
          .curved-carousel {
            height: var(--viewport-height-m);
            margin-block: var(--block-offset-m);
          }
        }

        .carousel-slide {
          contain: layout style paint;
          /* Enhanced GPU acceleration */
          transform: translate3d(0, 0, 0);
        }

        .carousel-slide img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: optimize-contrast;
          /* Prevent image dragging on all browsers */
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        /* Enhanced hover effects for desktop */
        @media (hover: hover) and (pointer: fine) {
          .curved-carousel:hover .pointer-events-auto {
            opacity: 1;
          }
        }

        /* Smooth transitions for better UX */
        .carousel-slide * {
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Performance optimizations */
        .curved-carousel__stage {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .curved-carousel__ring {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};