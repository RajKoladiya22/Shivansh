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
  // optional alt if user wants it explicitly
  alt?: string;
}

interface CurvedCarouselProps {
  slides: SlideData[];
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

// Ultra-lightweight blur placeholder
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5xZqHBKHOOUV8p7eCWTMiUhqKAlADpuN6Y8TpQGPNaFO7LYjJiubyRXSG9ug==";

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

  const [isLoading, setIsLoading] = useState(true);

  // Performance & control refs
  const rafIdRef = useRef<number | null>(null);
  const rotationValueRef = useRef<number>(0);
  const speedTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const speedControllerRef = useRef({ value: 0 });
  const isActiveRef = useRef<boolean>(true);
  const isPausedRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(0);

  // Drag state
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number | null>(null);
  const velocityRef = useRef(0);

  // Prefers reduced motion (set in effect)
  const prefersReducedMotionRef = useRef(false);

  const carouselConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  // compute isMobile from windowSize (kept up-to-date via resize listener)
  const isMobile = windowSize.width < 768;

  // inline style (no invalid '@media' here)
  // const carouselStyles = useMemo(
  //   () =>
  //     ({
  //       "--viewport-height": "35rem",
  //       "--viewport-height-m": "35rem",
  //       "--perspective": "1000px",
  //       "--perspective-m": "800px",
  //       "--block-offset": "-18rem",
  //       "--block-offset-m": "-6rem",
  //       overflow: "hidden",
  //       zIndex: 1,
  //       "--fadeout": fadeout
  //         ? "linear-gradient(90deg, transparent, white 5%, white 95%, transparent 100%)"
  //         : "none",
  //     }) as React.CSSProperties,
  //   [fadeout],
  // );
  const carouselStyles = useMemo(
    () =>
      ({
        "--viewport-height": "clamp(30rem, 60vh, 50rem)", // Responsive height
        "--viewport-height-m": "clamp(25rem, 50vh, 40rem)", // Mobile height
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
    [fadeout],
  );

  // -- Guard & processed slides (avoid division by zero)
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

    // Ensure every slide has an id to use as React key
    return processed.map((s, i) => ({ ...s, id: s.id ?? `slide-${i}` }));
  }, [slides, carouselConfig.slidesInRing]);

  // normalize helper
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

    // Use tween on controller; RAF started in onUpdate
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

  // goToIndex snaps to a slide index (index is in [0, slideCount))
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

      // Stop auto rotation while animating to index
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

          // small pause then resume auto rotation if allowed
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

  // Tap / click handler: toggle selection on mobile
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

  // Mouse enter/leave handlers
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

  // Initialize slides state
  useEffect(() => {
    setAllSlides(processedSlides);
  }, [processedSlides]);

  // Setup main effect (positioning + entrance animation)
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

      // Positioning transform uses same sign as original code
      slideEl.style.transform = `rotateY(${index * -anglePerSlide}deg) translateZ(${-carouselConfig.radius}px)`;
      slideEl.style.transformOrigin = `50% 50% 0px`;

      const img = slideEl.querySelector("img");
      if (img) {
        (img as HTMLElement).style.willChange = "auto";
        (img as HTMLElement).style.transform = "translateZ(0)";
      }
    });

    // Entrance animations: respect prefers-reduced-motion
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

    // cleanup on unmount
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
    // intentionally include allSlides and carouselConfig and startAutoRotation
  }, [allSlides, carouselConfig, startAutoRotation]);

  // mount/unmount lifecycle and preferences
  useEffect(() => {
    isActiveRef.current = true;
    isPausedRef.current = false;

    // prefers reduce motion
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

  // Resize listener to update windowSize (so isMobile is accurate)
  useEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keyboard navigation (focus must be on container)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === " " || e.key === "Spacebar") {
        // toggle pause/play
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

  // Pointer / drag handlers for touch & mouse
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      // capture pointer for consistent move/up events
      (e.target as Element).setPointerCapture?.(e.pointerId);

      isDraggingRef.current = true;
      lastPointerXRef.current = e.clientX;
      lastPointerTimeRef.current = e.timeStamp;
      velocityRef.current = 0;

      // stop auto rotation while dragging
      stopAutoRotation();
    },
    [stopAutoRotation],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || lastPointerXRef.current == null) return;

    const now = e.timeStamp;
    const deltaX = e.clientX - lastPointerXRef.current;
    const dt = Math.max(1, now - (lastPointerTimeRef.current ?? now));
    // sensitivity: degree per pixel (tweakable)
    const sensitivity = 0.35; // deg per px
    const deltaDeg = deltaX * sensitivity;

    rotationValueRef.current += deltaDeg;
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
    }

    // compute velocity (deg / ms)
    velocityRef.current = deltaDeg / dt;

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      lastPointerXRef.current = null;
      lastPointerTimeRef.current = null;

      // snap to nearest slide
      const anglePerSlide = 360 / carouselConfig.slidesInRing;
      const slideCount =
        slideElementsRef.current?.length ?? processedSlides.length;
      if (slideCount === 0) {
        resumeAutoRotation();
        return;
      }

      // compute nearest index (see analysis: -index*angle + rotation ≈ 0 => index ≈ rotation/angle)
      const current = normalize(rotationValueRef.current);
      let nearestIndex = Math.round(current / anglePerSlide) % slideCount;
      if (nearestIndex < 0) nearestIndex += slideCount;

      goToIndex(nearestIndex);

      // resume rotation after a short delay using existing resumeAutoRotation
      resumeAutoRotation();
    },
    [
      carouselConfig.slidesInRing,
      goToIndex,
      processedSlides.length,
      resumeAutoRotation,
    ],
  );

  // attach pointer handlers on container DOM element via props in JSX (so React manages capture)
  // (no global listeners required)

  // CSS styles for stage (simple)
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
      tabIndex={0} // focusable for keyboard
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
              <Image
                src={slide.src ?? "/images/STAFF/06.png"}
                width={100}
                height={100}
                alt={slide.alt ?? slide.name ?? `Slide ${index + 1}`}
                className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
                decoding="async"
                blurDataURL={BLUR_DATA_URL}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                placeholder="blur"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gray-100">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                </div>
              )}
              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-transparent via-black/70 to-black transition-opacity duration-400 ${
                  selectedIndex === index ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100`}
              >
                <div
                  className={`transform p-4 text-white transition-transform duration-500 ease-out md:p-5 lg:p-6`}
                >
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <h3 className="line-clamp-1 text-2xl font-bold md:text-5xl">
                        {slide.name ?? `Team Member ${index + 1}`}
                      </h3>
                      <p className="text-xl font-medium text-red-300 md:text-3xl">
                        {slide.position ?? "Team Member"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Controls */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="pointer-events-auto rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-black/80 transition-colors"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="pointer-events-auto rounded-full bg-black/60 p-3 text-white backdrop-blur hover:bg-black/80 transition-colors"
        >
          ›
        </button>
      </div> */}
      <div className="pointer-events-none absolute -inset-4 z-30 flex sm:hidden">
        {/* Left / Right buttons (center vertically) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-6">
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 md:h-14 md:w-14 md:p-4"
          >
            <span className="text-2xl leading-none select-none md:text-3xl">
              ‹
            </span>
          </button>

          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 md:h-14 md:w-14 md:p-4"
          >
            <span className="text-2xl leading-none select-none md:text-3xl">
              ›
            </span>
          </button>
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
        @media (max-width: 600px) {
          .curved-carousel {
            -webkit-mask-image: none;
            mask-image: none;
          }
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

        /* Ensure buttons are always visible and properly positioned */
        @media (max-width: 640px) {
          .curved-carousel .absolute.bottom-6 {
            bottom: 1rem;
            padding: 0 1rem;
          }

          .curved-carousel .absolute.bottom-6 > div {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }

          .curved-carousel .absolute.bottom-6 button {
            width: 100%;
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

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
//   alt?: string;
//   // Optimized image URLs for better performance
//   thumbnailSrc?: string; // Ultra low quality placeholder (~5KB)
//   mobileSrc?: string; // Mobile optimized version
//   mediumSrc?: string; // Medium quality version
// }

// interface CurvedCarouselProps {
//   slides: SlideData[];
//   config?: Partial<CarouselConfig>;
//   fadeout?: boolean;
//   className?: string;
//   // Performance optimization props
//   imageQuality?: number;
//   enableProgressiveLoading?: boolean;
//   preloadCount?: number;
//   lazyLoadThreshold?: number;
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

// // Ultra-lightweight blur placeholder
// const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5xZqHBKHOOUV8p7eCWTMiUhqKAlADpuN6Y8TpQGPNaFO7LYjJiubyRXSG9ug==";

// // Optimized image component with faster loading strategy
// const OptimizedCarouselImage: React.FC<{
//   slide: SlideData;
//   index: number;
//   isPriority?: boolean;
//   isVisible?: boolean;
//   quality?: number;
//   onLoadComplete?: () => void;
// }> = ({
//   slide,
//   index,
//   isPriority = false,
//   isVisible = false,
//   quality = 60, // Reduced default quality for faster loading
//   onLoadComplete
// }) => {
//   const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
//   const [imageSrc, setImageSrc] = useState<string>('');
//   const imgRef = useRef<HTMLImageElement>(null);
//   const loadTimeoutRef = useRef<NodeJS.Timeout>();

//   // Simplified image optimization - prioritize speed over progressive loading
//   const getOptimizedSrc = useCallback((originalSrc: string, targetWidth: number, targetQuality: number) => {
//     if (!originalSrc) return '/images/STAFF/06.png';

//     // If it's already optimized or from an external CDN, return as-is
//     if (originalSrc.includes('?') || originalSrc.includes('cloudinary') || originalSrc.includes('imgix')) {
//       return originalSrc;
//     }

//     // For Next.js Image optimization - use smaller sizes for faster loading
//     return `${originalSrc}?w=${targetWidth}&q=${targetQuality}`;
//   }, []);

//   // Fast loading strategy - load appropriate size immediately, skip progressive loading
//   useEffect(() => {
//     if (!slide.src || !isVisible) return;

//     let isMounted = true;

//     // Clear any existing timeout
//     if (loadTimeoutRef.current) {
//       clearTimeout(loadTimeoutRef.current);
//     }

//     const loadImage = async () => {
//       try {
//         const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
//         let targetSrc: string;

//         // Choose appropriate image source based on device and priority
//         if (slide.mobileSrc && isMobile) {
//           targetSrc = slide.mobileSrc;
//         } else if (slide.mediumSrc && !isPriority) {
//           targetSrc = slide.mediumSrc;
//         } else {
//           // Use smaller dimensions for faster loading
//           const targetWidth = isMobile ? 300 : (isPriority ? 600 : 400);
//           const targetQuality = isMobile ? 50 : (isPriority ? quality : 45);
//           targetSrc = getOptimizedSrc(slide.src!, targetWidth, targetQuality);
//         }

//         // Preload the image
//         const img = new window.Image();
//         img.src = targetSrc;

//         // Add timeout for slow loading images
//         const timeoutPromise = new Promise((_, reject) => {
//           loadTimeoutRef.current = setTimeout(() => reject(new Error('Timeout')), 5000);
//         });

//         const loadPromise = new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//         });

//         await Promise.race([loadPromise, timeoutPromise]);

//         if (loadTimeoutRef.current) {
//           clearTimeout(loadTimeoutRef.current);
//         }

//         if (isMounted) {
//           setImageSrc(targetSrc);
//           setImageState('loaded');
//           onLoadComplete?.();
//         }

//       } catch (error) {
//         console.warn(`Failed to load image for slide ${index}:`, error);
//         if (isMounted) {
//           setImageSrc('/images/STAFF/06.png');
//           setImageState('error');
//         }
//       }
//     };

//     void loadImage();

//     return () => {
//       isMounted = false;
//       if (loadTimeoutRef.current) {
//         clearTimeout(loadTimeoutRef.current);
//       }
//     };
//   }, [slide.src, slide.mobileSrc, slide.mediumSrc, isVisible, isPriority, index, quality, onLoadComplete, getOptimizedSrc]);

//   // Show placeholder for non-visible slides
//   if (!isVisible && !isPriority && imageState === 'loading') {
//     return (
//       <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
//         <div className="animate-pulse h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative h-full w-full overflow-hidden rounded-3xl">
//       {imageSrc ? (
//         <Image
//           ref={imgRef}
//           src={imageSrc}
//           width={400}
//           height={400}
//           alt={slide.alt ?? slide.name ?? `Team member ${index + 1}`}
//           className={`
//             h-full w-full object-cover transition-all duration-300 rounded-3xl
//             group-hover:scale-105
//             ${imageState === 'loading' ? 'opacity-70' : 'opacity-100'}
//           `}
//           draggable={false}
//           loading={isPriority ? "eager" : "lazy"}
//           priority={isPriority}
//           placeholder="blur"
//           blurDataURL={slide.thumbnailSrc ?? BLUR_DATA_URL}
//           sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 450px"
//           quality={quality}
//           unoptimized={false}
//           onError={() => {
//             setImageState('error');
//             setImageSrc('/images/STAFF/06.png');
//           }}
//           onLoadingComplete={() => {
//             setImageState('loaded');
//             onLoadComplete?.();
//           }}
//         />
//       ) : (
//         <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200" />
//       )}

//       {/* Simple loading indicator */}
//       {imageState === 'loading' && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-3xl backdrop-blur-sm">
//           <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
//         </div>
//       )}
//     </div>
//   );
// };

// // Simplified visibility hook
// const useVisibilityTracker = (
//   rotationValue: number,
//   totalSlides: number,
//   slidesInRing: number
// ) => {
//   return useMemo(() => {
//     if (totalSlides === 0) return new Set<number>();

//     const anglePerSlide = 360 / slidesInRing;
//     const currentRotation = ((rotationValue % 360) + 360) % 360;
//     const visibleRange = 140; // Slightly wider range for smoother loading

//     const visible = new Set<number>();

//     for (let i = 0; i < totalSlides; i++) {
//       const slideAngle = ((i * anglePerSlide - currentRotation) % 360 + 360) % 360;
//       const normalizedAngle = slideAngle > 180 ? slideAngle - 360 : slideAngle;

//       if (Math.abs(normalizedAngle) < visibleRange / 2) {
//         visible.add(i);
//         // Also include adjacent slides for smooth loading
//         if (i > 0) visible.add(i - 1);
//         if (i < totalSlides - 1) visible.add(i + 1);
//       }
//     }

//     return visible;
//   }, [rotationValue, totalSlides, slidesInRing]);
// };

// export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({
//   slides,
//   config = {},
//   fadeout = false,
//   className = "",
//   imageQuality = 60, // Reduced default quality
//   enableProgressiveLoading = true,
//   preloadCount = 5, // Increased preload count
//   lazyLoadThreshold = 5,
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
//   const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

//   // Performance & control refs
//   const rafIdRef = useRef<number | null>(null);
//   const rotationValueRef = useRef<number>(0);
//   const speedTweenRef = useRef<gsap.core.Tween | null>(null);
//   const autoRotateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const speedControllerRef = useRef({ value: 0 });
//   const isActiveRef = useRef<boolean>(true);
//   const isPausedRef = useRef<boolean>(false);
//   const currentIndexRef = useRef<number>(0);

//   // Enhanced drag state with better sensitivity
//   const isDraggingRef = useRef(false);
//   const dragDataRef = useRef<{
//     startX: number;
//     startRotation: number;
//     startTime: number;
//     lastX: number;
//     lastTime: number;
//     velocity: number;
//     totalDelta: number;
//   } | null>(null);

//   // Prefers reduced motion
//   const prefersReducedMotionRef = useRef(false);

//   const carouselConfig = useMemo(
//     () => ({ ...defaultConfig, ...config }),
//     [config]
//   );

//   const isMobile = windowSize.width < 768;

//   // Track visible slides for performance optimization
//   const visibleSlides = useVisibilityTracker(
//     rotationValueRef.current,
//     allSlides.length,
//     carouselConfig.slidesInRing
//   );

//   const carouselStyles = useMemo(
//     () => ({
//       "--viewport-height": "clamp(30rem, 60vh, 50rem)",
//       "--viewport-height-m": "clamp(25rem, 50vh, 40rem)",
//       "--perspective": "clamp(800px, 100vw, 1200px)",
//       "--perspective-m": "600px",
//       "--block-offset": "clamp(-12rem, -15vh, -18rem)",
//       "--block-offset-m": "clamp(-4rem, -8vh, -6rem)",
//       overflow: "hidden",
//       zIndex: 1,
//       "--fadeout": fadeout
//         ? "linear-gradient(90deg, transparent, white 5%, white 95%, transparent 100%)"
//         : "none",
//     }) as React.CSSProperties,
//     [fadeout]
//   );

//   // Process slides with duplication if needed
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

//     return processed.map((s, i) => ({ ...s, id: s.id ?? `slide-${i}` }));
//   }, [slides, carouselConfig.slidesInRing]);

//   const normalize = (a: number) => ((a % 360) + 360) % 360;

//   // Optimized rotation update
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

//     rotationValueRef.current += currentRotationSpeed * carouselConfig.rotationDirection;
//     ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

//     rafIdRef.current = requestAnimationFrame(updateRotation);
//   }, [carouselConfig.rotationDirection]);

//   // Auto-rotation control
//   const startAutoRotation = useCallback(() => {
//     if (!carouselConfig.autoRotate || isPausedRef.current) return;

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

//   const goToIndex = useCallback(
//     (index: number) => {
//       const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
//       if (!ringRef.current || slideCount === 0) return;

//       const anglePerSlide = 360 / carouselConfig.slidesInRing;
//       const baseAngle = normalize(index * anglePerSlide);
//       const current = normalize(rotationValueRef.current);
//       const k = Math.round((current - baseAngle) / 360);
//       const target = baseAngle + 360 * k;

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
//     const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
//     const currentIndex = currentIndexRef.current;
//     const nextIndex = (currentIndex - 1 + slideCount) % slideCount;
//     goToIndex(nextIndex);
//   }, [goToIndex, processedSlides.length]);

//   const next = useCallback(() => {
//     const slideCount = slideElementsRef.current?.length ?? processedSlides.length;
//     const currentIndex = currentIndexRef.current;
//     const nextIndex = (currentIndex + 1) % slideCount;
//     goToIndex(nextIndex);
//   }, [goToIndex, processedSlides.length]);

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

//   // Mouse handlers
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

//   // Handle image load completion
//   const handleImageLoadComplete = useCallback((index: number) => {
//     setLoadedImages(prev => new Set(prev).add(index));
//   }, []);

//   // Initialize slides
//   useEffect(() => {
//     setAllSlides(processedSlides);
//   }, [processedSlides]);

//   // Main setup effect
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

//       slideEl.style.transform = `rotateY(${index * -anglePerSlide}deg) translateZ(${-carouselConfig.radius}px)`;
//       slideEl.style.transformOrigin = `50% 50% 0px`;

//       const img = slideEl.querySelector("img");
//       if (img) {
//         (img as HTMLElement).style.willChange = "auto";
//         (img as HTMLElement).style.transform = "translateZ(0)";
//       }
//     });

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
//   }, [allSlides, carouselConfig, startAutoRotation]);

//   useEffect(() => {
//     isActiveRef.current = true;
//     isPausedRef.current = false;

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

//   useEffect(() => {
//     const onResize = () =>
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     onResize();
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent) => {
//       if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         prev();
//       } else if (e.key === "ArrowRight") {
//         e.preventDefault();
//         next();
//       } else if (e.key === " " || e.key === "Spacebar") {
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

//   // Enhanced pointer/drag handlers with improved responsiveness
//   const onPointerDown = useCallback(
//     (e: React.PointerEvent) => {
//       e.preventDefault();
//       const el = containerRef.current;
//       if (!el) return;

//       (e.target as Element).setPointerCapture?.(e.pointerId);

//       isDraggingRef.current = true;
//       dragDataRef.current = {
//         startX: e.clientX,
//         startRotation: rotationValueRef.current,
//         startTime: e.timeStamp,
//         lastX: e.clientX,
//         lastTime: e.timeStamp,
//         velocity: 0,
//         totalDelta: 0,
//       };

//       stopAutoRotation();
//     },
//     [stopAutoRotation],
//   );

//   const onPointerMove = useCallback((e: React.PointerEvent) => {
//     if (!isDraggingRef.current || !dragDataRef.current) return;

//     e.preventDefault();
//     const now = e.timeStamp;
//     const currentX = e.clientX;
//     const dragData = dragDataRef.current;

//     const deltaX = currentX - dragData.lastX;
//     const deltaTime = Math.max(1, now - dragData.lastTime);

//     // Enhanced sensitivity calculation
//     const baseSensitivity = isMobile ? 0.8 : 0.6;
//     const speedMultiplier = Math.min(2, Math.abs(deltaX) / 10 + 1); // Speed up for faster drags
//     const sensitivity = baseSensitivity * speedMultiplier;

//     const rotationDelta = deltaX * sensitivity;

//     rotationValueRef.current += rotationDelta;
//     dragData.totalDelta += Math.abs(deltaX);

//     if (ringRef.current) {
//       ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;
//     }

//     // Update velocity for momentum
//     dragData.velocity = rotationDelta / deltaTime;
//     dragData.lastX = currentX;
//     dragData.lastTime = now;
//   }, [isMobile]);

//   const onPointerUp = useCallback(
//     (e: React.PointerEvent) => {
//       if (!isDraggingRef.current || !dragDataRef.current) return;

//       e.preventDefault();
//       const dragData = dragDataRef.current;

//       isDraggingRef.current = false;

//       const anglePerSlide = 360 / carouselConfig.slidesInRing;
//       const slideCount = slideElementsRef.current?.length ?? processedSlides.length;

//       if (slideCount === 0) {
//         dragDataRef.current = null;
//         resumeAutoRotation();
//         return;
//       }

//       // Enhanced snapping logic
//       const current = normalize(rotationValueRef.current);
//       let targetIndex = Math.round(current / anglePerSlide) % slideCount;
//       if (targetIndex < 0) targetIndex += slideCount;

//       // Apply momentum if there's significant velocity and movement
//       const velocityThreshold = 0.05;
//       const movementThreshold = 20;

//       if (Math.abs(dragData.velocity) > velocityThreshold && dragData.totalDelta > movementThreshold) {
//         const momentumDirection = dragData.velocity > 0 ? 1 : -1;
//         const momentumStrength = Math.min(3, Math.abs(dragData.velocity) * 10);
//         const momentumSlides = Math.round(momentumStrength);

//         targetIndex = (targetIndex + momentumDirection * momentumSlides + slideCount) % slideCount;
//       }

//       dragDataRef.current = null;
//       goToIndex(targetIndex);
//     },
//     [
//       carouselConfig.slidesInRing,
//       goToIndex,
//       processedSlides.length,
//       resumeAutoRotation,
//     ],
//   );

//   // Touch/pointer event handlers for better mobile support
//   const onTouchStart = useCallback((e: React.TouchEvent) => {
//     if (e.touches.length === 1) {
//       const touch = e.touches[0]!;
//       const syntheticEvent = {
//         ...e,
//         clientX: touch.clientX,
//         clientY: touch.clientY,
//         pointerId: 0,
//         timeStamp: e.timeStamp,
//         preventDefault: e.preventDefault.bind(e),
//         target: e.target,
//       } as React.PointerEvent;
//       onPointerDown(syntheticEvent);
//     }
//   }, [onPointerDown]);

//   const onTouchMove = useCallback((e: React.TouchEvent) => {
//     if (e.touches.length === 1 && isDraggingRef.current) {
//       e.preventDefault(); // Prevent scrolling
//       const touch = e.touches[0]!;
//       const syntheticEvent = {
//         ...e,
//         clientX: touch.clientX,
//         clientY: touch.clientY,
//         pointerId: 0,
//         timeStamp: e.timeStamp,
//         preventDefault: e.preventDefault.bind(e),
//         target: e.target,
//       } as React.PointerEvent;
//       onPointerMove(syntheticEvent);
//     }
//   }, [onPointerMove]);

//   const onTouchEnd = useCallback((e: React.TouchEvent) => {
//     if (isDraggingRef.current) {
//       e.preventDefault();
//       const syntheticEvent = {
//         ...e,
//         clientX: dragDataRef.current?.lastX ?? 0,
//         clientY: 0,
//         pointerId: 0,
//         timeStamp: e.timeStamp,
//         preventDefault: e.preventDefault.bind(e),
//         target: e.target,
//       } as React.PointerEvent;
//       onPointerUp(syntheticEvent);
//     }
//   }, [onPointerUp]);

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
//       className={`curved-carousel group relative z-10 w-full overflow-visible select-none ${className}`}
//       style={carouselStyles}
//       onMouseEnter={handleContainerMouseEnter}
//       onMouseLeave={handleContainerMouseLeave}
//       onKeyDown={handleKeyDown}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Curved image carousel"
//       tabIndex={0}
//     >
//       <div
//         ref={stageRef}
//         className="curved-carousel__stage absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         style={CSSstyles.base}
//       >
//         <div
//           ref={ringRef}
//           className="curved-carousel__ring absolute h-full w-full"
//         >
//           {allSlides.map((slide, index) => {
//             const isPriority = index < preloadCount;
//             const isVisible = visibleSlides.has(index) || isPriority;
//             const shouldRender = enableProgressiveLoading ? isVisible : true;

//             return (
//               <div
//                 key={slide.id}
//                 data-render-index={index}
//                 className="carousel-slide group/slide absolute cursor-pointer overflow-hidden rounded-3xl transition-transform duration-200"
//                 onMouseEnter={handleSlideMouseEnter}
//                 onMouseLeave={handleSlideMouseLeave}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (!isDraggingRef.current) {
//                     if (isMobile) {
//                       handleSlideTap(index);
//                     } else {
//                       goToIndex(index);
//                     }
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     goToIndex(index);
//                   }
//                 }}
//               >
//                 {shouldRender ? (
//                   <OptimizedCarouselImage
//                     slide={slide}
//                     index={index}
//                     isPriority={isPriority}
//                     isVisible={isVisible}
//                     quality={imageQuality}
//                     onLoadComplete={() => handleImageLoadComplete(index)}
//                   />
//                 ) : (
//                   <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200">
//                     <div className="animate-pulse h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-3xl" />
//                   </div>
//                 )}

//                 {/* Enhanced hover overlay */}
//                 <div
//                   className={`absolute inset-0 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-transparent via-black/50 to-black/80 transition-all duration-300 ${
//                     selectedIndex === index ? "opacity-100" : "opacity-0"
//                   } group-hover/slide:opacity-100`}
//                 >
//                   <div
//                     className="transform p-4 text-white transition-all duration-300 ease-out md:p-5 lg:p-6"
//                     style={{
//                       transform: selectedIndex === index ||
//                         (typeof window !== 'undefined' && window.innerWidth >= 768)
//                         ? 'translateY(0)' : 'translateY(20px)'
//                     }}
//                   >
//                     <div className="space-y-2 md:space-y-3">
//                       <div>
//                         <h3 className="line-clamp-1 text-xl font-bold drop-shadow-lg md:text-4xl lg:text-5xl">
//                           {slide.name ?? `Team Member ${index + 1}`}
//                         </h3>
//                         <p className="text-lg font-medium text-red-300 drop-shadow-md md:text-2xl lg:text-3xl">
//                           {slide.position ?? "Team Member"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Enhanced Navigation Controls */}
//       <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-4 md:px-6">
//         <button
//           type="button"
//           aria-label="Previous slide"
//           onClick={(e) => {
//             e.stopPropagation();
//             prev();
//           }}
//           className={`
//             pointer-events-auto flex h-12 w-12 items-center justify-center
//             rounded-full bg-black/50 backdrop-blur-md text-white shadow-xl
//             transition-all duration-300 hover:bg-black/70 hover:scale-110 active:scale-95
//             focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50
//             md:h-14 md:w-14
//             ${isMobile ? 'opacity-90' : 'opacity-0 group-hover:opacity-90'}
//           `}
//         >
//           <span className="text-2xl leading-none select-none md:text-3xl" aria-hidden="true">‹</span>
//         </button>

//         <button
//           type="button"
//           aria-label="Next slide"
//           onClick={(e) => {
//             e.stopPropagation();
//             next();
//           }}
//           className={`
//             pointer-events-auto flex h-12 w-12 items-center justify-center
//             rounded-full bg-black/50 backdrop-blur-md text-white shadow-xl
//             transition-all duration-300 hover:bg-black/70 hover:scale-110 active:scale-95
//             focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50
//             md:h-14 md:w-14
//             ${isMobile ? 'opacity-90' : 'opacity-0 group-hover:opacity-90'}
//           `}
//         >
//           <span className="text-2xl leading-none select-none md:text-3xl" aria-hidden="true">›</span>
//         </button>
//       </div>

//       {/* Simplified loading indicator */}
//       {enableProgressiveLoading && allSlides.length > 0 && (
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
//           <div className="flex space-x-1 opacity-60">
//             {Array.from({ length: Math.min(allSlides.length, 8) }).map((_, i) => (
//               <div
//                 key={i}
//                 className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                   loadedImages.has(i) ? 'bg-green-400' :
//                   visibleSlides.has(i) ? 'bg-blue-400' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .curved-carousel {
//           height: var(--viewport-height);
//           margin-block: var(--block-offset);
//           transform-style: preserve-3d;
//           -webkit-mask-image: var(--fadeout);
//           mask-image: var(--fadeout);
//           contain: layout style paint;
//           /* Improve touch responsiveness */
//           touch-action: pan-y pinch-zoom;
//         }

//         @media (max-width: 600px) {
//           .curved-carousel {
//             -webkit-mask-image: none;
//             mask-image: none;
//             /* Allow horizontal panning on mobile */
//             touch-action: pan-y;
//           }
//         }

//         @media (max-width: 767px) {
//           .curved-carousel {
//             height: var(--viewport-height-m);
//             margin-block: var(--block-offset-m);
//           }
//         }

//         .carousel-slide {
//           contain: layout style paint;
//           /* Enhanced GPU acceleration */
//           transform: translate3d(0, 0, 0);
//           will-change: transform;
//         }

//         .carousel-slide img {
//           image-rendering: -webkit-optimize-contrast;
//           image-rendering: optimize-contrast;
//           /* Prevent image dragging on all browsers */
//           -webkit-user-drag: none;
//           -khtml-user-drag: none;
//           -moz-user-drag: none;
//           -o-user-drag: none;
//           user-drag: none;
//           /* Improve image loading performance */
//           content-visibility: auto;
//         }

//         /* Enhanced hover effects for desktop */
//         @media (hover: hover) and (pointer: fine) {
//           .curved-carousel:hover .pointer-events-auto {
//             opacity: 0.9;
//           }

//           .carousel-slide:hover {
//             transform: scale(1.02);
//           }
//         }

//         /* Smooth transitions for better UX */
//         .carousel-slide * {
//           transition-property: transform, opacity;
//           transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* Performance optimizations */
//         .curved-carousel__stage {
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//           contain: layout style paint;
//         }

//         .curved-carousel__ring {
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//           contain: layout style paint;
//         }

//         /* Improve mobile scrolling */
//         @media (max-width: 767px) {
//           .curved-carousel {
//             -webkit-overflow-scrolling: touch;
//             overscroll-behavior: contain;
//           }
//         }

//         /* Loading optimization */
//         .carousel-slide[data-render-index] {
//           content-visibility: auto;
//           contain-intrinsic-size: 320px 320px;
//         }
//       `}</style>
//     </div>
//   );
// };
