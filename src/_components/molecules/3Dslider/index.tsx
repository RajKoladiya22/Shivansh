"use client";
import React, { useEffect, useRef, useState } from "react";
import type { TeamMember } from "src/_components/sections/types/team.type";

type Props = {
  members: TeamMember[];
  speed?: number; // pixels per second
};

export default function RotatingTeamSlider({ members, speed = 60 }: Props) {
  // ---------- Derived data (compute first) ----------
  const clampedMembers = members?.slice(0, 14) || [];
  const loopItems = [...clampedMembers, ...clampedMembers];

  // Early return before any hooks.
  if (!members || members.length === 0 || clampedMembers.length === 0) {
    return null;
  }

  // ---------- Hooks (now unconditional) ----------
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const posRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const loopWidthRef = useRef<number>(0);

  // Initialize item refs array
  useEffect(() => {
    // itemRefs.current = new Array(loopItems.length).fill(null);
    itemRefs.current = new Array<HTMLDivElement | null>(loopItems.length).fill(
      null,
    );
  }, [loopItems.length]);

  // Measure widths

  // const measure =() => {
  //   const inner = innerRef.current;
  //   if (!inner) {
  //     loopWidthRef.current = 0;
  //     return;
  //   }
  //   const container = containerRef.current;
  //   if (!inner || !container) return;

  //   const children = Array.from(inner.children) as HTMLDivElement[];
  //   if (children.length === 0) {
  //     loopWidthRef.current = 0;
  //     return;
  //   }

  //   const singleLoopWidth = children
  //     .slice(0, Math.floor(children.length / 2))
  //     .reduce((acc, el) => {
  //       const rect = el.getBoundingClientRect();
  //       return acc + rect.width;
  //     }, 0);

  //   loopWidthRef.current = singleLoopWidth;
  // };

  useEffect(() => {
    // measure();
    const measure = () => {
      const inner = innerRef.current;
      if (!inner) {
        loopWidthRef.current = 0;
        return;
      }
      const container = containerRef.current;
      if (!inner || !container) return;

      const children = Array.from(inner.children) as HTMLDivElement[];
      if (children.length === 0) {
        loopWidthRef.current = 0;
        return;
      }

      const singleLoopWidth = children
        .slice(0, Math.floor(children.length / 2))
        .reduce((acc, el) => {
          const rect = el.getBoundingClientRect();
          return acc + rect.width;
        }, 0);

      loopWidthRef.current = singleLoopWidth;
    };
    const handleResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(measure, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    let raf = 0;

    function step(ts: number) {
      // if (lastTimeRef.current == null) {
      //   lastTimeRef.current ??= ts;
      // }
      lastTimeRef.current ??= ts;

      const dt = ts - lastTimeRef.current;
      lastTimeRef.current = ts;

      if (!paused && innerRef.current) {
        const deltaPx = (speed * dt) / 1000;
        posRef.current -= deltaPx;

        const loopW = loopWidthRef.current;
        if (loopW > 0 && Math.abs(posRef.current) >= loopW) {
          posRef.current += loopW;
        }

        innerRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      lastTimeRef.current = null;
    };
  }, [paused, speed]);

  const handleSliderEnter = () => setPaused(true);
  const handleSliderLeave = () => {
    setPaused(false);
    setHoveredId(null);
  };
  const handleItemEnter = (id: string | number) => setHoveredId(id);
  const handleItemLeave = () => setHoveredId(null);

  // Use sample data if no members provided
  const displayMembers = members.length > 0 ? clampedMembers : [];
  const displayLoopItems = [...displayMembers, ...displayMembers];

  // Responsive image size classes
  const imageSizeClasses =
    "w-38 h-50 xs:w-28 xs:h-38 sm:w-32 sm:h-42 md:w-40 md:h-50 lg:w-48 lg:h-58 xl:w-52 xl:h-65";
  const bioContainerClasses = "mt-4 text-center max-w-xs mx-auto px-2";
  const sliderHeightClasses =
    "h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]";

  return (
    <section aria-label="Team carousel" className="w-full">
      <div className="mx-auto">
        <div
          ref={containerRef}
          className={`relative w-full overflow-hidden ${sliderHeightClasses} flex items-center`}
          onMouseEnter={handleSliderEnter}
          onMouseLeave={handleSliderLeave}
        >
          <div
            ref={innerRef}
            className="flex items-center will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {displayLoopItems.map((m, idx) => {
              const originalIdx = idx % displayMembers.length;
              const isHovered = hoveredId === m.id;

              return (
                <div
                  key={`${m.id}-${idx}`}
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[idx] = el;
                    }
                  }}
                  className={`xs:p-3 flex-shrink-0 transform p-2 transition-all duration-300 ease-out sm:p-4 ${
                    isHovered ? "z-20 scale-105" : "scale-100 opacity-80"
                  }`}
                  style={{
                    width: "clamp(150px, 20vw, 240px)",
                    // width: "clamp(120px, 20vw, 220px)",
                    minWidth: "150px",
                  }}
                  onMouseEnter={() => handleItemEnter(m.id)}
                  onMouseLeave={handleItemLeave}
                >
                  <div
                    className={`relative mx-auto overflow-hidden rounded-2xl border-4 border-white shadow-lg ${imageSizeClasses}`}
                  >
                    <img
                      src={m.src}
                      alt={m.name}
                      className={`h-full w-full object-cover transition-transform duration-300 ${
                        isHovered ? "scale-110" : "scale-100"
                      } ${
                        isHovered
                          ? "scale-110 grayscale-0"
                          : "scale-100 grayscale-[40%]"
                      }`}
                    />

                    {/* Overlay that appears only on hover */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="text-center text-white">
                        <h3 className="text-sm font-bold md:text-base">
                          {m.name}
                        </h3>
                        <p className="text-xs opacity-90 md:text-sm">
                          {m.position}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bio content displayed below the image on hover */}
                  {/* <div
                    className={`${bioContainerClasses} transition-all duration-300 ${
                      isHovered
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-4 opacity-0"
                    }`}
                  >
                    <p className="text-xs text-gray-700 md:text-sm">{m.bio}</p>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// const imageSizeClasses =
//   "w-38 h-50 xs:w-28 xs:h-38 sm:w-32 sm:h-42 md:w-40 md:h-50 lg:w-48 lg:h-58 xl:w-52 xl:h-65";
// const bioContainerClasses = "mt-4 text-center max-w-xs mx-auto px-2";
// const sliderHeightClasses =
//   "h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]";
