// "use client";
// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import type { TeamMember } from "src/_components/sections/types/team.type";

// type Props = {
//   members: TeamMember[];
//   speed?: number; // pixels per second
// };

// export default function RotatingTeamSlider({ members, speed = 60 }: Props) {
 
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const innerRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const swipe = useRef<{
//     startX: number;
//     currentX: number;
//     isSwiping: boolean;
//   }>({
//     startX: 0,
//     currentX: 0,
//     isSwiping: false,
//   });

//   const [paused, setPaused] = useState(false);
//   const [hoveredId, setHoveredId] = useState<string | number | null>(null);

//   const posRef = useRef<number>(0);
//   const lastTimeRef = useRef<number | null>(null);
//   const loopWidthRef = useRef<number>(0);

//   // ---------- Derived data (compute after hooks) ----------
//   const clampedMembers = members?.slice(0, 14) || [];
//   const loopItems = [...clampedMembers, ...clampedMembers];

//   // Initialize item refs array
//   useEffect(() => {
//     itemRefs.current = new Array<HTMLDivElement | null>(loopItems.length).fill(
//       null,
//     );
//   }, [loopItems.length]);

//   const measure = () => {
//     const inner = innerRef.current;
//     if (!inner) {
//       loopWidthRef.current = 0;
//       return;
//     }
//     const container = containerRef.current;
//     if (!inner || !container) return;

//     const children = Array.from(inner.children) as HTMLDivElement[];
//     if (children.length === 0) {
//       loopWidthRef.current = 0;
//       return;
//     }

//     const singleLoopWidth = children
//       .slice(0, Math.floor(children.length / 2))
//       .reduce((acc, el) => {
//         const rect = el.getBoundingClientRect();
//         return acc + rect.width;
//       }, 0);

//     loopWidthRef.current = singleLoopWidth;
//   };

//   useEffect(() => {
//     measure();

//     const handleResize = () => {
//       if (resizeTimer.current) clearTimeout(resizeTimer.current);
//       resizeTimer.current = setTimeout(measure, 100);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (resizeTimer.current) clearTimeout(resizeTimer.current);
//     };
//   }, []);

//   // Animation loop
//   useEffect(() => {
//     let raf = 0;

//     function step(ts: number) {
//       lastTimeRef.current ??= ts;

//       const dt = ts - lastTimeRef.current;
//       lastTimeRef.current = ts;

//       if (!paused && innerRef.current) {
//         const deltaPx = (speed * dt) / 1000;
//         posRef.current -= deltaPx;

//         const loopW = loopWidthRef.current;
//         if (loopW > 0 && Math.abs(posRef.current) >= loopW) {
//           posRef.current += loopW;
//         }

//         innerRef.current.style.transform = `translateX(${posRef.current}px)`;
//       }

//       raf = requestAnimationFrame(step);
//     }

//     raf = requestAnimationFrame(step);

//     return () => {
//       cancelAnimationFrame(raf);
//       lastTimeRef.current = null;
//     };
//   }, [paused, speed]);

//   const handleSliderEnter = () => setPaused(true);
//   const handleSliderLeave = () => {
//     setPaused(false);
//     setHoveredId(null);
//   };
//   const handleItemEnter = (id: string | number) => setHoveredId(id);
//   const handleItemLeave = () => setHoveredId(null);

//   // ---------- Early return AFTER all hooks ----------
//   if (!members || members.length === 0 || clampedMembers.length === 0) {
//     return null;
//   }

//   // Use sample data if no members provided
//   const displayMembers = members.length > 0 ? clampedMembers : [];
//   const displayLoopItems = [...displayMembers, ...displayMembers];

//   // Responsive image size classes
//   const imageSizeClasses =
//     "w-38 h-50 xs:w-28 xs:h-38 sm:w-32 sm:h-42 md:w-40 md:h-50 lg:w-48 lg:h-58 xl:w-52 xl:h-65";
//   const sliderHeightClasses =
//     "h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]";

//   // Add inside your RotatingTeamSlider component, before the return

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setPaused(true);
//     swipe.current.startX = e.touches[0]!.clientX;
//     swipe.current.currentX = e.touches[0]!.clientX;
//     swipe.current.isSwiping = true;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!swipe.current.isSwiping) return;
//     const touchX = e.touches[0]!.clientX;
//     const dx = touchX - swipe.current.currentX;
//     swipe.current.currentX = touchX;

//     if (innerRef.current) {
//       posRef.current += dx; // Move the slider by swipe distance
//       const loopW = loopWidthRef.current;
//       if (loopW > 0) {
//         if (posRef.current < -loopW) posRef.current += loopW;
//         if (posRef.current > 0) posRef.current -= loopW;
//       }
//       innerRef.current.style.transform = `translateX(${posRef.current}px)`;
//     }
//   };

//   const handleTouchEnd = () => {
//     swipe.current.isSwiping = false;
//     setPaused(false);
//   };

//   return (
//     <section aria-label="Team carousel" className="w-full">
//       <div className="mx-auto">
//         <div
//           ref={containerRef}
//           className={`relative w-full overflow-hidden ${sliderHeightClasses} flex items-center`}
//           onMouseEnter={handleSliderEnter}
//           onMouseLeave={handleSliderLeave}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             ref={innerRef}
//             className="flex items-center will-change-transform"
//             style={{ transform: "translateX(0px)" }}
//           >
//             {displayLoopItems.map((m, idx) => {
//               const isHovered = hoveredId === m.id;

//               return (
//                 <div
//                   key={`${m.id}-${idx}`}
//                   ref={(el) => {
//                     if (itemRefs.current) {
//                       itemRefs.current[idx] = el;
//                     }
//                   }}
//                   className={`xs:p-3 flex-shrink-0 transform p-2 transition-all duration-300 ease-out sm:p-4 ${
//                     isHovered ? "z-20 scale-105" : "scale-100"
//                   }`}
//                   style={{
//                     width: "clamp(150px, 20vw, 240px)",
//                     minWidth: "150px",
//                   }}
//                   onMouseEnter={() => handleItemEnter(m.id)}
//                   onMouseLeave={handleItemLeave}
//                 >
//                   <div
//                     className={`relative mx-auto overflow-hidden rounded-2xl border-4 border-white shadow-lg ${imageSizeClasses}`}
//                   >
//                     <Image
//                       width={208}
//                       height={260}
//                       src={m.src ?? "/images/team/skeleton_1.png"}
//                       alt={m.name}
//                       className={`h-full w-full object-cover transition-transform duration-300 ${
//                         isHovered ? "scale-110" : "scale-100"
//                       } ${
//                         isHovered ? "scale-110 grayscale-[40%]" : "scale-100"
//                       }`}
//                     />

//                     {/* Overlay that appears only on hover */}
//                     <div
//                       className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 transition-opacity duration-300 ${
//                         isHovered ? "opacity-100" : "opacity-0"
//                       }`}
//                     >
//                       <div className="text-center text-white">
//                         <h3 className="text-sm font-bold md:text-base">
//                           {m.name}
//                         </h3>
//                         <p className="text-xs opacity-90 md:text-sm">
//                           {m.position}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// const imageSizeClasses =
//   "w-38 h-50 xs:w-28 xs:h-38 sm:w-32 sm:h-42 md:w-40 md:h-50 lg:w-48 lg:h-58 xl:w-52 xl:h-65";
// const bioContainerClasses = "mt-4 text-center max-w-xs mx-auto px-2";
// const sliderHeightClasses =
//   "h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]";
















"use client";
"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import type { TeamMember } from "src/_components/sections/types/team.type";

type Props = {
  members: TeamMember[];
  speed?: number; // pixels per second
};

export default function RotatingTeamSlider({ members, speed = 60 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const swipe = useRef<{
    startX: number;
    currentX: number;
    isSwiping: boolean;
  }>({
    startX: 0,
    currentX: 0,
    isSwiping: false,
  });

  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const posRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const loopWidthRef = useRef<number>(0);

  const clampedMembers = members?.slice(0, 14) ?? [];
  const loopItems = [...clampedMembers, ...clampedMembers];

  useEffect(() => {
    itemRefs.current = new Array<HTMLDivElement | null>(loopItems.length).fill(null);
  }, [loopItems.length]);

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

  useEffect(() => {
    measure();

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

  useEffect(() => {
    let raf = 0;

    function step(ts: number) {
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

  if (!members || members.length === 0 || clampedMembers.length === 0) {
    return null;
  }

  const displayMembers = members.length > 0 ? clampedMembers : [];
  const displayLoopItems = [...displayMembers, ...displayMembers];

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    swipe.current.startX = e.touches[0]!.clientX;
    swipe.current.currentX = e.touches[0]!.clientX;
    swipe.current.isSwiping = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipe.current.isSwiping) return;
    const touchX = e.touches[0]!.clientX;
    const dx = touchX - swipe.current.currentX;
    swipe.current.currentX = touchX;

    if (innerRef.current) {
      posRef.current += dx;
      const loopW = loopWidthRef.current;
      if (loopW > 0) {
        if (posRef.current < -loopW) posRef.current += loopW;
        if (posRef.current > 0) posRef.current -= loopW;
      }
      innerRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    swipe.current.isSwiping = false;
    setPaused(false);
  };

  return (
    <section aria-label="Team carousel" className="w-full py-12 overflow-hidden" >
      <div className="mx-auto">

        <div
          ref={containerRef} //h-[28rem] md:h-[32rem] lg:h-[36rem]
          className="relative w-full overflow-hidden h-[280px] md:h-[310px] lg:h-[280px]  flex items-center"
          onMouseEnter={handleSliderEnter}
          onMouseLeave={handleSliderLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-7 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-7 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div
            ref={innerRef}
            className="flex items-center will-change-transform gap-6"
            style={{ transform: "translateX(0px)" }}
          >
            {displayLoopItems.map((m, idx) => {
              const isHovered = hoveredId === m.id;

              return (
                <div
                  key={`${m.id}-${idx}`}
                  ref={(el) => {
                    if (itemRefs.current) {
                      itemRefs.current[idx] = el;
                    }
                  }}
                  className={`flex-shrink-0 transform transition-all duration-500 ease-out overflow-hidden ${
                    isHovered ? "z-20 scale-110 -rotate-1" : "scale-100 rotate-0"
                  }`}
                  style={{
                    width: "clamp(200px, 22vw, 280px)",
                    minWidth: "200px",
                  }}
                  onMouseEnter={() => handleItemEnter(m.id)}
                  onMouseLeave={handleItemLeave}
                >
                  {/* Card Container with 3D effect */}
                  <div
                    className={`group relative mx-auto overflow-hidden rounded-3xl transition-all duration-500 ${
                      isHovered
                        ? "shadow-2xl shadow-blue-500/30"
                        : "shadow-xl shadow-gray-300/50"
                    }`}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Main Image Container */}
                    <div className="relative w-full h-[250px] md:h-[290px] lg:h-[250px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        width={280}
                        height={420}
                        src={m.src ?? "/images/team/skeleton_1.png"}
                        alt={m.name}
                        className={`h-full w-full object-cover transition-all duration-700 ${
                          isHovered ? "scale-110 brightness-110" : "scale-100 brightness-95"
                        }`}
                      />

                      {/* Gradient Overlay - always visible but changes on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                          isHovered
                            ? "from-blue-900/90 via-blue-900/40 to-transparent opacity-100"
                            : "from-gray-900/70 via-gray-900/20 to-transparent opacity-100"
                        }`}
                      />

                      {/* Animated shine effect on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
                          isHovered ? "translate-x-full" : "-translate-x-full"
                        }`}
                        style={{ transform: "skewX(-20deg)" }}
                      />

                      {/* Content Overlay - Only shows on hover */}
                      <div
                        className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                      >
                        <div>
                          <h3 className="font-bold text-white mb-2 text-2xl">
                            {m.name}
                          </h3>
                          <p className="text-white/90 font-medium text-base mb-3">
                            {m.position}
                          </p>
                          {/* {m.bio && (
                            <p className="text-white/80 text-sm leading-relaxed">
                              {m.bio}
                            </p>
                          )} */}
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div
                        className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-400/30 to-transparent transition-all duration-100 ${
                          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Text */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Hover or swipe to pause • {displayMembers.length} team members
          </p>
        </div> */}
      </div>
    </section>
  );
}