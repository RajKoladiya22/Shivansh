"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  const carouselStyles = useMemo(
    () =>
      ({
        "--viewport-height": "35rem",
        "--viewport-height-m": "35rem",
        "--perspective": "1000px",
        "--perspective-m": "800px",
        "--block-offset": "-18rem",
        "--block-offset-m": "-6rem",
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
              <img
                src={slide.src}
                alt={slide.alt ?? slide.name ?? `Slide ${index + 1}`}
                className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
                decoding="async"
              />
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
//   name?: string;
//   position?: string;
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
//   resumeDelay: 100, // Increased delay to prevent rapid start/stop
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
//   const slideElementsRef = useRef<NodeListOf<Element> | null>(null);
//   const [allSlides, setAllSlides] = useState<SlideData[]>([]);
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

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
//   const isPausedRef = useRef<boolean>(false);

//   const isMobile = windowSize.width < 768;

//   // Memoized styles for better performance
//   const carouselStyles = useMemo(
//     () =>
//       ({
//         "--viewport-height": "35rem",
//         "--viewport-height-m": "35rem",
//         "--perspective": "1000px",
//         "--perspective-m": "800px",
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

//     // Use transform directly for better performance
//     ringRef.current.style.transform = `rotateY(${rotationValueRef.current}deg)`;

//     rafIdRef.current = requestAnimationFrame(updateRotation);
//   }, [carouselConfig.rotationDirection]);

//   // Optimized start/stop functions
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
//     carouselConfig.rotationSpeed,
//     carouselConfig.pauseEaseDuration,
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

//   // Event handlers for container hover
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

//   // Individual slide hover handlers
//   const handleSlideMouseEnter = useCallback(() => {
//     if (autoRotateTimeoutRef.current) {
//       clearTimeout(autoRotateTimeoutRef.current);
//     }
//     stopAutoRotation();
//   }, [stopAutoRotation]);

//   const handleSlideMouseLeave = useCallback(() => {
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

//     // Cleanup function
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

//       // Clean up will-change properties
//       if (slideElementsRef.current) {
//         slideElementsRef.current.forEach((slide) => {
//           (slide as HTMLElement).style.willChange = "auto";
//         });
//       }
//       if (ring) ring.style.willChange = "auto";
//       if (stage) stage.style.willChange = "auto";
//     };
//   }, [allSlides, carouselConfig, startAutoRotation]);

//   // Component unmount cleanup
//   useEffect(() => {
//     isActiveRef.current = true;
//     isPausedRef.current = false;
//     return () => {
//       isActiveRef.current = false;
//       isPausedRef.current = true;
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
//               key={slide.id}
//               className="carousel-slide group absolute cursor-pointer overflow-hidden rounded-3xl"
//               onMouseEnter={handleSlideMouseEnter}
//               onMouseLeave={handleSlideMouseLeave}
//             >
//               <img
//                 src={slide.src}
//                 alt={slide.name}
//                 className="max-h-full max-w-full rounded-3xl object-contain transition-transform duration-300 group-hover:scale-105"
//                 draggable={false}
//                 loading={index < 5 ? "eager" : "lazy"}
//                 decoding="async"
//               />
//               {/* Hover Overlay - Full Coverage */}

//               <div className="absolute inset-0 bottom-30 flex flex-col justify-end rounded-3xl bg-gradient-to-b from-transparent via-black/70 to-black opacity-0 transition-opacity duration-400 group-hover:opacity-100">
//                 <div className="translate-y-full transform p-4 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 md:p-5 lg:p-6">
//                   <div className="space-y-2 md:space-y-3">
//                     <div>
//                       <h3 className="line-clamp-1 text-2xl font-bold md:text-5xl">
//                         {slide.name || `Team Member ${index + 1}`}
//                       </h3>
//                       <p className="text-xl font-medium text-red-300 md:text-3xl">
//                         {slide.position || "Team Member"}
//                       </p>
//                     </div>
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
