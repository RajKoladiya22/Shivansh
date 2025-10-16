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
import type { TeamMember } from "src/_components/sections/types/team.type";

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
  id?: string | number;
  src?: string;
  name?: string;
  position?: string;
  alt?: string;
}

interface CurvedCarouselProps {
  slides: TeamMember[];
  config?: Partial<CarouselConfig>;
  fadeout?: boolean;
  className?: string;
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

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
  slides,
  config = {},
  fadeout = false,
  className = "",
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

  // Performance & control refs
  const rafIdRef = useRef<number | null>(null);
  const rotationValueRef = useRef<number>(0);
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedControllerRef = useRef({ value: 0 });
  const isActiveRef = useRef<boolean>(true);
  const isPausedRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  // Drag state
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const wasDraggingRef = useRef(false);
  const dragStartXRef = useRef<number>(0);

  // Hover state - SIMPLIFIED
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);

  // Prefers reduced motion
  const prefersReducedMotionRef = useRef(false);

  const carouselConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  // Compute responsive breakpoints
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  // Dynamic image dimensions
  const getImageDimensions = useMemo(() => {
    const slideHeight = carouselConfig.slideHeight;
    const anglePerSlide = 360 / carouselConfig.slidesInRing;
    const arcLength =
      (anglePerSlide - carouselConfig.slideSpacing) *
      (Math.PI / 180) *
      carouselConfig.radius;

    let width: number;
    let height: number;

    if (isMobile) {
      width = Math.min(300, arcLength);
      height = slideHeight;
    } else if (isTablet) {
      width = Math.min(400, arcLength);
      height = slideHeight;
    } else {
      width = Math.min(500, arcLength);
      height = slideHeight;
    }

    // Ensure minimum quality
    const minWidth = 400;
    const minHeight = 400;

    return {
      width: Math.max(width, minWidth),
      height: Math.max(height, minHeight),
    };
  }, [carouselConfig, isMobile, isTablet]);

  const carouselStyles = useMemo(
    () =>
      ({
        "--viewport-height": "clamp(30rem, 60vh, 50rem)",
        "--viewport-height-m": "clamp(25rem, 50vh, 40rem)",
        "--perspective": "clamp(800px, 100vw, 1400px)",
        "--perspective-m": "700px",
        "--block-offset": "clamp(-12rem, -15vh, -18rem)",
        "--block-offset-m": "clamp(-4rem, -8vh, -6rem)",
        overflow: "hidden",
        zIndex: 1,
        "--fadeout": fadeout
          ? "linear-gradient(90deg, transparent, white 15%, white 85%, transparent 100%)"
          : "none",
      }) as React.CSSProperties,
    [fadeout],
  );

  // FIXED: Process slides with proper duplication to avoid first slide repeating
  const processedSlides = useMemo(() => {
    if (!slides || slides.length === 0) return [];
    const originalSlideCount = slides.length;
    
    // If we have enough slides, just use them with unique keys
    if (originalSlideCount >= carouselConfig.slidesInRing) {
      return slides.map((slide, idx) => ({
        ...slide,
        uniqueKey: `slide-${idx}`,
      }));
    }

    // If we need more slides, distribute duplicates evenly
    const processed: Array<TeamMember & { uniqueKey: string }> = [];
    const totalNeeded = carouselConfig.slidesInRing;
    const duplicatesPerSlide = Math.ceil(totalNeeded / originalSlideCount);
    
    for (let i = 0; i < totalNeeded; i++) {
      const sourceIndex = i % originalSlideCount;
      const duplicateCount = Math.floor(i / originalSlideCount);
      const slideToUse = slides[sourceIndex]!;
      
      processed.push({
        ...slideToUse,
        uniqueKey: `slide-${sourceIndex}-dup-${duplicateCount}`,
      });
    }

    return processed;
  }, [slides, carouselConfig.slidesInRing]);

  // Normalize angle helper
  const normalize = (a: number) => ((a % 360) + 360) % 360;

  // Rotation update (RAF)
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
        !isPausedRef.current &&
        !isHoveringRef.current
      ) {
        startAutoRotation();
      }
    }, carouselConfig.resumeDelay);
  }, [
    carouselConfig.autoRotate,
    carouselConfig.resumeDelay,
    startAutoRotation,
  ]);

  // Navigation
  const goToIndex = useCallback(
    (index: number) => {
      const slideCount =
        slideElementsRef.current?.length ?? processedSlides.length;
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
            if (!isHoveringRef.current) {
              resumeAutoRotation();
            }
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
    const slideCount =
      slideElementsRef.current?.length ?? processedSlides.length;
    const currentIndex = currentIndexRef.current;
    const nextIndex = (currentIndex - 1 + slideCount) % slideCount;
    goToIndex(nextIndex);
  }, [goToIndex, processedSlides.length]);

  const next = useCallback(() => {
    const slideCount =
      slideElementsRef.current?.length ?? processedSlides.length;
    const currentIndex = currentIndexRef.current;
    const nextIndex = (currentIndex + 1) % slideCount;
    goToIndex(nextIndex);
  }, [goToIndex, processedSlides.length]);

  // Event handlers
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

  // FIXED: Simplified hover logic
  const handleContainerMouseEnter = useCallback(() => {
    if (!carouselConfig.pauseOnHover) return;
    
    isHoveringRef.current = true;
    
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Only stop if we're not dragging
    if (!isDraggingRef.current) {
      if (autoRotateTimeoutRef.current) {
        clearTimeout(autoRotateTimeoutRef.current);
      }
      stopAutoRotation();
    }
  }, [carouselConfig.pauseOnHover, stopAutoRotation]);

  const handleContainerMouseLeave = useCallback(() => {
    if (!carouselConfig.pauseOnHover) return;
    
    isHoveringRef.current = false;
    
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Resume after a short delay if not dragging
    if (!isDraggingRef.current) {
      hoverTimeoutRef.current = setTimeout(() => {
        if (!isHoveringRef.current && !isDraggingRef.current) {
          resumeAutoRotation();
        }
      }, carouselConfig.resumeDelay);
    }
  }, [carouselConfig.pauseOnHover, carouselConfig.resumeDelay, resumeAutoRotation]);

  // Initialize slides
  useEffect(() => {
    setAllSlides(
      processedSlides.map((slide, i) => ({
        id: slide.uniqueKey,
        src: slide.src ?? slide.image,
        name: slide.name,
        position: slide.position,
        alt: slide.name,
      })),
    );
  }, [processedSlides]);

  // Setup carousel positioning and animation
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
    const slideWidth = Math.max(arcLength, getImageDimensions.width);

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
      slideEl.style.position = "absolute";

      const img = slideEl.querySelector("img");
      if (img) {
        (img as HTMLElement).style.willChange = "auto";
        (img as HTMLElement).style.transform = "translateZ(0)";
      }
    });

    // Entrance animations
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
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      if (slideElementsRef.current) {
        slideElementsRef.current.forEach((slide) => {
          (slide as HTMLElement).style.willChange = "auto";
        });
      }
      if (ring) ring.style.willChange = "auto";
      if (stage) stage.style.willChange = "auto";
    };
  }, [allSlides, carouselConfig, startAutoRotation, getImageDimensions.width]);

  // Lifecycle and preferences
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

  // Resize listener
  useEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keyboard navigation
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

  // Pointer/drag handlers
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      (e.target as Element).setPointerCapture?.(e.pointerId);

      isDraggingRef.current = true;
      wasDraggingRef.current = false;
      dragStartXRef.current = e.clientX;
      lastPointerXRef.current = e.clientX;
      lastPointerTimeRef.current = e.timeStamp;
      velocityRef.current = 0;

      // Clear hover timeouts
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      stopAutoRotation();
    },
    [stopAutoRotation],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || lastPointerXRef.current == null) return;

    const now = e.timeStamp;
    const deltaX = e.clientX - lastPointerXRef.current;
    const totalDeltaX = e.clientX - dragStartXRef.current;
    
    // Track if we've actually moved significantly (more than 5px total) - this is a drag
    if (Math.abs(totalDeltaX) > 5) {
      wasDraggingRef.current = true;
    }
    
    const dt = Math.max(1, now - (lastPointerTimeRef.current ?? now));
    const sensitivity = 0.35;
    const deltaDeg = deltaX * sensitivity;

    rotationValueRef.current += deltaDeg;
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
    }

    velocityRef.current = deltaDeg / dt;

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      
      const wasDragging = wasDraggingRef.current;
      
      isDraggingRef.current = false;
      lastPointerXRef.current = null;
      lastPointerTimeRef.current = null;

      const anglePerSlide = 360 / carouselConfig.slidesInRing;
      const slideCount =
        slideElementsRef.current?.length ?? processedSlides.length;
      
      if (slideCount === 0) {
        if (!isHoveringRef.current) {
          resumeAutoRotation();
        }
        return;
      }

      // Only snap to nearest if we actually dragged
      if (wasDragging) {
        const current = normalize(rotationValueRef.current);
        let nearestIndex = Math.round(current / anglePerSlide) % slideCount;
        if (nearestIndex < 0) nearestIndex += slideCount;

        goToIndex(nearestIndex);
      }
      
      // Resume rotation after a delay, unless hovering
      setTimeout(() => {
        if (!isHoveringRef.current) {
          resumeAutoRotation();
        }
        wasDraggingRef.current = false;
      }, 100);
    },
    [
      carouselConfig.slidesInRing,
      goToIndex,
      processedSlides.length,
      resumeAutoRotation,
    ],
  );

  const onPointerCancel = useCallback(() => {
    isDraggingRef.current = false;
    wasDraggingRef.current = false;
    lastPointerXRef.current = null;
    lastPointerTimeRef.current = null;
    
    if (!isHoveringRef.current) {
      resumeAutoRotation();
    }
  }, [resumeAutoRotation]);

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
      className={`curved-carousel relative z-10 w-full overflow-visible select-none ${className} `}
      style={carouselStyles}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Curved image carousel"
      tabIndex={0}
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
              data-render-index={index}
              className="carousel-slide group absolute cursor-pointer overflow-hidden rounded-3xl shadow-xl"
              onClick={(e) => {
                // Prevent click if user was dragging
                if (wasDraggingRef.current) {
                  e.preventDefault();
                  wasDraggingRef.current = false;
                  return;
                }
                if (isMobile) {
                  handleSlideTap(index);
                } else {
                  goToIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToIndex(index);
                }
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.src ?? "/images/team/skeleton_1.png"}
                  fill
                  sizes="(max-width: 767px) 300px, (max-width: 1024px) 400px, 500px"
                  quality={90}
                  alt={slide.alt ?? slide.name ?? `Team Member ${index + 1}`}
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ 
                    imageRendering: "auto", 
                    transform: "translateZ(0)" 
                  }}
                  priority={index < 3}
                />
              </div>

              {/* Hover Overlay - Only shows on hover */}
              <div className="absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                <div className="transform p-4 text-white transition-all duration-500 ease-out md:p-6 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-2">
                    <h3 className="line-clamp-2 text-xl font-bold md:text-3xl lg:text-4xl">
                      {slide.name ?? `Team Member ${index + 1}`}
                    </h3>
                    <p className="text-base font-medium text-white/90 md:text-xl lg:text-2xl">
                      {slide.position ?? "Team Member"}
                    </p>
                    <div className="mt-2 h-0.5 w-20 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Show on mobile only */}
      {isMobile && (
        <div className="pointer-events-none absolute inset-0 z-30 flex">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur transition-all hover:bg-black/75 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <span className="text-2xl leading-none select-none">‹</span>
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur transition-all hover:bg-black/75 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <span className="text-2xl leading-none select-none">›</span>
            </button>
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
        }

        .carousel-slide img {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};