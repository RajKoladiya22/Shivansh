// import React, { useEffect, useRef, useState, useCallback } from "react";
// import type { TeamMember } from "src/_components/sections/types/team.type";

// type Props = {
//   members: TeamMember[];
//   speed?: number; // pixels per second
// };

// export default function RotatingTeamSlider({ members, speed = 60 }: Props) {
//   const clampedMembers = members.length > 0 ? members.slice(0, 14) : [];
//   const loopItems = [...clampedMembers, ...clampedMembers];

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const innerRef = useRef<HTMLDivElement | null>(null);
//   const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

//   const [paused, setPaused] = useState(false);
//   const [hoveredId, setHoveredId] = useState<string | number | null>(null);

//   // Animation state
//   const posRef = useRef(0);
//   const lastTimeRef = useRef<number | null>(null);
//   const loopWidthRef = useRef<number>(0);

//   if (!members || members.length === 0) return null;

//   // Measure widths
//   const measure = useCallback(() => {
//     const inner = innerRef.current;
//     const container = containerRef.current;
//     if (!inner || !container) return;

//     const children = Array.from(inner.children) as HTMLDivElement[];
//     if (children.length === 0) return;

//     const singleLoopWidth = children
//       .slice(0, Math.floor(children.length / 2))
//       .reduce((acc, el) => {
//         const rect = el.getBoundingClientRect();
//         return acc + rect.width;
//       }, 0);

//     loopWidthRef.current = singleLoopWidth;
//   }, []);

//   // Initialize item refs array
//   useEffect(() => {
//     // itemRefs.current = new Array(loopItems.length).fill(null);
//     itemRefs.current = new Array<HTMLDivElement | null>(loopItems.length).fill(
//       null,
//     );
//   }, [loopItems.length]);

//   useEffect(() => {
//     measure();
//     const handleResize = () => {
//       setTimeout(measure, 100);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [measure]);

//   // Animation loop
//   useEffect(() => {
//     let raf = 0;

//     function step(ts: number) {
//       // if (lastTimeRef.current == null) {
//       //   lastTimeRef.current ??= ts;
//       // }
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

//   // Pause handlers
//   const handleSliderEnter = useCallback(() => {
//     setPaused(true);
//   }, []);

//   const handleSliderLeave = useCallback(() => {
//     setPaused(false);
//     setHoveredId(null);
//   }, []);

//   const handleItemEnter = useCallback((memberId: string | number) => {
//     setHoveredId(memberId);
//   }, []);

//   const handleItemLeave = useCallback(() => {
//     setHoveredId(null);
//   }, []);

//   // Use sample data if no members provided
//   const displayMembers = members.length > 0 ? clampedMembers : [];
//   const displayLoopItems = [...displayMembers, ...displayMembers];

//   // Responsive image size classes
//   const imageSizeClasses =
//     "w-38 h-50 xs:w-28 xs:h-38 sm:w-32 sm:h-42 md:w-40 md:h-50 lg:w-48 lg:h-58 xl:w-52 xl:h-65";
//   const bioContainerClasses = "mt-4 text-center max-w-xs mx-auto px-2";
//   const sliderHeightClasses =
//     "h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]";

//   return (
//     <section aria-label="Team carousel" className="w-full">
//       <div className="mx-auto">
//         <div
//           ref={containerRef}
//           className={`relative w-full overflow-hidden ${sliderHeightClasses} flex items-center`}
//           onMouseEnter={handleSliderEnter}
//           onMouseLeave={handleSliderLeave}
//         >
//           <div
//             ref={innerRef}
//             className="flex items-center will-change-transform"
//             style={{ transform: "translateX(0px)" }}
//           >
//             {displayLoopItems.map((m, idx) => {
//               const originalIdx = idx % displayMembers.length;
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
//                     isHovered ? "z-20 scale-105" : "scale-100 opacity-80"
//                   }`}
//                   style={{
//                     width: "clamp(150px, 20vw, 240px)",
//                     // width: "clamp(120px, 20vw, 220px)",
//                     minWidth: "150px",
//                   }}
//                   onMouseEnter={() => handleItemEnter(m.id)}
//                   onMouseLeave={handleItemLeave}
//                 >
//                   <div
//                     className={`relative mx-auto overflow-hidden rounded-2xl border-4 border-white shadow-lg ${imageSizeClasses}`}
//                   >
//                     <img
//                       src={m.src}
//                       alt={m.name}
//                       className={`h-full w-full object-cover transition-transform duration-300 ${
//                         isHovered ? "scale-110" : "scale-100"
//                       } ${
//                         isHovered
//                           ? "scale-110 grayscale-0"
//                           : "scale-100 grayscale-[40%]"
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

//                   {/* Bio content displayed below the image on hover */}
//                   {/* <div
//                     className={`${bioContainerClasses} transition-all duration-300 ${
//                       isHovered
//                         ? "translate-y-0 opacity-100"
//                         : "pointer-events-none -translate-y-4 opacity-0"
//                     }`}
//                   >
//                     <p className="text-xs text-gray-700 md:text-sm">{m.bio}</p>
//                   </div> */}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }























import React, { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "src/_components/sections/types/team.type";

type Props = {
  members?: TeamMember[];
  speed?: number; // pixels per second
};

export default function RotatingTeamSlider({ members = [], speed = 60 }: Props) {
  // ---------- Hooks (must be unconditional) ----------
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const posRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const loopWidthRef = useRef<number>(0);

  // ---------- Derived data (safe) ----------
  const clampedMembers = members.slice(0, 14);
  const loopItems = [...clampedMembers, ...clampedMembers];

  // ---------- Callbacks and effects (still unconditional) ----------
  const measure = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const children = Array.from(inner.children) as HTMLElement[];
    if (children.length === 0) {
      loopWidthRef.current = 0;
      return;
    }
    const half = Math.floor(children.length / 2);
    const singleLoopWidth = children.slice(0, half).reduce((acc, el) => acc + el.getBoundingClientRect().width, 0);
    loopWidthRef.current = singleLoopWidth;
  }, []);

  useEffect(() => {
    // ensure typed length
    itemRefs.current = new Array<HTMLDivElement | null>(loopItems.length).fill(null);
  }, [loopItems.length]);

  useEffect(() => {
    measure();
    const onResize = () => {
      // small debounce to stabilize layout measurement
      window.clearTimeout((onResize as any).__t);
      (onResize as any).__t = window.setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout((onResize as any).__t);
    };
  }, [measure]);

  useEffect(() => {
    let raf = 0;
    function step(ts: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const dt = ts - (lastTimeRef.current ?? ts);
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

  const handleSliderEnter = useCallback(() => setPaused(true), []);
  const handleSliderLeave = useCallback(() => {
    setPaused(false);
    setHoveredId(null);
  }, []);
  const handleItemEnter = useCallback((id: string | number) => setHoveredId(id), []);
  const handleItemLeave = useCallback(() => setHoveredId(null), []);

  // ---------- Early return only AFTER all hooks ---------- 
  if (clampedMembers.length === 0) return null;

  // ---------- Render ----------
  return (
    <section aria-label="Team carousel" className="w-full">
      <div className="mx-auto">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden h-64 flex items-center"
          onMouseEnter={handleSliderEnter}
          onMouseLeave={handleSliderLeave}
        >
          <div ref={innerRef} className="flex items-center will-change-transform" style={{ transform: "translateX(0px)" }}>
            {loopItems.map((m, idx) => {
              const isHovered = hoveredId === m.id;
              return (
                <div
                  key={`${m.id}-${idx}`}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`p-2 flex-shrink-0 transform transition-all duration-300 ease-out ${isHovered ? "z-20 scale-105" : "scale-100 opacity-80"}`}
                  style={{ width: "clamp(150px, 20vw, 240px)", minWidth: 150 }}
                  onMouseEnter={() => handleItemEnter(m.id)}
                  onMouseLeave={handleItemLeave}
                >
                  <div className="relative mx-auto overflow-hidden rounded-2xl border-4 border-white shadow-lg w-full aspect-square">
                    {/* adapt to your TeamMember fields (src/alt/role/bio) */}
                    <img src={(m as any).src} alt={(m as any).name} className={`h-full w-full object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`} />
                    <div className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                      <div className="text-center text-white">
                        <h3 className="text-sm font-bold md:text-base">{(m as any).name}</h3>
                        <p className="text-xs opacity-90 md:text-sm">{(m as any).position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
