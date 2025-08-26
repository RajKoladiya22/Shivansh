// "use client";
// import Link from "next/link";
// import { SERVICE } from "public/data/Navigation";
// import { useCallback, useMemo } from "react";
// import {
//   CurvedCarousel,
//   type CarouselConfig,
// } from "src/_components/molecules/HeroSlider";
// import {
//   btn_color,
//   hero_content_font,
//   hero_heading_font,
//   hero_headline_font,
// } from "src/config/constants";

// export const Hero2 = () => {
//   const slides = useMemo(
//     () => [
//       {
//         id: "1",
//         src: "/images/STAFF/01.png",

//         name: "Priya Ma'am",
//       },
//       {
//         id: "2",
//         src: "/images/STAFF/02.png",
//         name: "Pooja Ma'am",
//       },
//       {
//         id: "3",
//         src: "/images/STAFF/03.png",
//         name: "Dhara ma'am",
//       },
//       {
//         id: "4",
//         src: "/images/STAFF/04.png",

//         name: "Krishna Ma'am",
//       },
//       {
//         id: "5",
//         src: "/images/STAFF/05.png",
//         name: "Hinal Ma'am",
//       },
//       {
//         id: "6",
//         src: "/images/STAFF/06.png",

//         name: "Mehul Sir",
//       },
//       {
//         id: "7",
//         src: "/images/STAFF/07.png",

//         name: "Madhavi ma'am",
//       },
//       {
//         id: "8",
//         src: "/images/STAFF/08.png",

//         name: "Suresh Sir",
//       },
//       {
//         id: "9",
//         src: "/images/STAFF/09.png",

//         name: "Harjeet Sir",
//       },
//       {
//         id: "10",
//         src: "/images/STAFF/10.png",

//         name: "_ Sir",
//       },
//     ],
//     [],
//   );

//   const customConfig = useMemo<Partial<CarouselConfig>>(
//     () => ({
//       slideHeight: 650,
//       slidesInRing: 15,
//       autoRotate: true,
//       rotationSpeed: 0.15,
//       pauseOnHover: true,
//       entranceAnimation: "fadeUp",
//       // fadeout: false
//     }),
//     [],
//   );

//   const responsiveCarouselConfig: Partial<CarouselConfig> = {
//     slideHeight:
//       typeof window !== "undefined"
//         ? window.innerWidth < 640
//           ? 260
//           : window.innerWidth < 1024
//             ? 650
//             : 680
//         : 350,
//     slidesInRing: 13, // Fewer slides for mobile, adjust for density
//     radius:
//       typeof window !== "undefined"
//         ? window.innerWidth < 640
//           ? 520
//           : window.innerWidth < 1024
//             ? 900
//             : 1200
//         : 900,
//     autoRotate: true,
//     rotationSpeed: 0.18,
//     pauseOnHover: true,
//     entranceAnimation: "fadeUp",
//   };

//   const handleYouTubeClick = useCallback(() => {
//     window.open("https://bitly.cx/rNEH4", "_blank", "noopener,noreferrer");
//   }, []);

//   return (
//     <>
//       <section className="relative flex h-screen flex-col bg-white">
//         {/* Header Content */}
//         <div className="flex-shrink-0 py-19 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
//             {/* Badge */}
//             <div className="mb-4 flex justify-center sm:mb-6 md:mb-8">
//               <div className="relative inline-block">
//                 <p
//                   className={`${hero_heading_font} text-center text-sm font-medium sm:text-base md:text-lg lg:text-xl`}
//                 >
//                   Meet Our Amazing Team
//                 </p>
//                 <div
//                   className="absolute top-0 h-[40%] rounded-md bg-[var(--pink)] sm:h-[50%] md:rounded-lg"
//                   style={{
//                     width: "calc(35% + 15px)",
//                     right: "0",
//                     transform: "translate(8%, -30%)",
//                     zIndex: 1,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Main Heading */}
//             <div className="mb-8 text-center sm:mb-12 md:mb-16">
//               <h1
//                 className={`${hero_headline_font} mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
//               >
//                 Meet Our{" "}
//                 <span className="relative inline-block">
//                   <span className="relative z-10 text-[var(--primery-color)]">
//                     Leadership Team
//                   </span>
//                   <span className="absolute bottom-0 left-0 z-0 h-1.5 w-full -rotate-1 transform bg-[var(--pink)] opacity-80 sm:h-2 md:h-3 lg:h-4"></span>
//                 </span>
//               </h1>
//               <p
//                 className={`mx-auto max-w-xs px-2 text-sm sm:max-w-lg sm:px-4 sm:text-base md:max-w-2xl md:px-6 md:text-lg lg:max-w-3xl lg:px-0 lg:text-xl xl:max-w-4xl ${hero_content_font} leading-relaxed`}
//               >
//                 Our experienced leadership team combines decades of expertise in
//                 finance, technology, and business strategy to drive innovation
//                 and excellence.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Carousel Container - Centered and Flexible */}
//         <div className="mb-[100px] flex min-h-0 flex-1 items-center justify-center px-4 sm:px-6 md:px-8">
//           <div className="max-w-8xl relative w-full">
//             {/* <div className="max-w-8xl w-full relative" style={{ height: '600px', position: 'relative' }}> */}
//             <CurvedCarousel
//               slides={slides}
//               config={customConfig}
//               fadeout={true}
//               className="w-full"
//             />
//             {/* <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} cameraFov={5}/> */}
//           </div>
//         </div>

//         {/* Action Buttons - Fixed to Bottom */}
//         <div className="z-10 mb-10 flex-shrink-0 py-6 sm:py-8">
//           <div className="mx-auto px-4 sm:px-6">
//             <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
//               <button
//                 aria-label="Click"
//                 className={`${btn_color} flex transform items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold`}
//                 onClick={handleYouTubeClick}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
//                 </svg>
//                 Watch on YouTube
//               </button>

//               <Link href={SERVICE}>
//                 <button
//                   aria-label="Click"
//                   className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#A00303] bg-white px-6 py-3 font-bold tracking-wide text-[#A00303] transition-all duration-300 hover:-translate-y-0.5 hover:border-2 hover:bg-[#A00303] hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
//                   // onClick={() => window.open("tel:+91 8141703007", "_self")}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20 22.621l-3.521-3.511c-1.22 1.22-3.07 1.27-4.56.27-1.761-1.22-2.399-2.64-2.62-3.84-.239-1.27.13-2.39.91-3.4 1.47-1.91 3.79-2.41 5.74-1.15.66.38 1.29.97 1.71 1.66l3.521-3.521c.27.94.33 1.85.17 2.72-.16.87-.54 1.72-1.11 2.48-.7.94-1.73 1.79-2.79 2.66-1.19 1-2.41 2.04-3.57 3.23-.98.95-1.82 1.89-2.42 2.72l4.25 4.25zm-8.79-22.621c-5.29-.539-6.03 5.57-6 8 .03 2.89.78 5.55 2.07 7.59.54 1.09 1.46 1.98 2.53 2.37l1.15.43c.56.2 1.17.12 1.7-.23 1.01-.65 1.86-1.69 2.89-2.99 1.52-1.93 3.17-4.03 4.71-6.13 1.34-1.81 2.56-3.92 1.86-6.01-.24-.73-.87-1.31-1.72-1.57-3.45-1.06-9.08-.98-12.19.54zm1.32 5.96c-.33 0-.64.14-.86.39-.22.25-.33.58-.29.92.04.34.22.65.5.86 1.12.88 2.28 1.7 3.49 2.45.33.19.73.17 1.04-.06.31-.23.49-.61.46-1-.03-.39-.26-.74-.62-.91-1.15-.63-2.27-1.37-3.35-2.15-.18-.15-.4-.23-.62-.23z" />
//                   </svg>
//                   View Services
//                 </button>
//               </Link>
//             </div>
//             {/* <span className="py-9"></span> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

"use client";
import Link from "next/link";
import { SERVICE } from "public/data/Navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  CurvedCarousel,
  type CarouselConfig,
} from "src/_components/molecules/HeroSlider";
import {
  btn_color,
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";

interface Slide {
  id: string | number;
  name: string;
  src: string;
  description?: string;
}

type MouseEventHandler =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

const MobileSlider = ({ slides }: { slides: Slide[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Calculate total slides (show 2 at a time)
  const totalSlides = Math.ceil(slides.length / 2);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3500); // Smooth auto-slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, isDragging]);

  // Touch/Mouse handlers for manual sliding
  const handleStart = (e: MouseEventHandler): void => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartTime(Date.now());

    const clientX =
      e.type === "mousedown"
        ? (e as React.MouseEvent).clientX
        : (e as React.TouchEvent).touches[0]!.clientX;
    setDragStart(clientX);
    setDragOffset(0);

    // Prevent default to avoid scrolling on mobile
    if (e.type === "touchstart") {
      e.preventDefault();
    }
  };

  const handleMove = (e: MouseEventHandler): void => {
    if (!isDragging) return;

    const clientX =
      e.type === "mousemove"
        ? (e as React.MouseEvent).clientX
        : (e as React.TouchEvent).touches[0]!.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);

    // Prevent default to avoid scrolling on mobile
    if (e.type === "touchmove") {
      e.preventDefault();
    }
  };

  const handleEnd = (e: MouseEventHandler): void => {
    if (!isDragging) return;

    setIsDragging(false);
    const endTime = Date.now();
    const duration = endTime - startTime;
    const velocity = Math.abs(dragOffset) / duration;

    // Determine if swipe was significant enough to change slide
    const threshold = 50;
    const isQuickSwipe = velocity > 0.3; // Quick swipe detection

    if (Math.abs(dragOffset) > threshold || isQuickSwipe) {
      if (dragOffset > 0) {
        // Swipe right - go to previous
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      } else {
        // Swipe left - go to next
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }
    }

    setDragOffset(0);

    // Resume auto-play after a delay
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 2000);
  };

  // Prevent context menu on long press
  const handleContextMenu = (e: MouseEventHandler): void => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  // Calculate transform value
  const getTransform = () => {
    const baseTransform = -currentSlide * 100;
    if (isDragging) {
      const containerWidth = 400; // Approximate container width
      const dragPercentage = (dragOffset / containerWidth) * 100;
      const dampedDrag = dragPercentage * 0.6; // Dampen the drag for better feel
      return baseTransform + dampedDrag;
    }
    return baseTransform;
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Slider Container */}
      <div
        className="relative cursor-grab overflow-hidden rounded-lg select-none active:cursor-grabbing"
        style={{ height: "280px" }}
        onMouseEnter={() => !isDragging && setIsAutoPlaying(false)}
        onMouseLeave={() => {
          if (!isDragging) {
            setIsAutoPlaying(true);
            setHoveredSlide(null);
          }
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        // onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onContextMenu={handleContextMenu}
      >
        <div
          className={`flex h-full ${
            isDragging
              ? "transition-none"
              : "transition-transform duration-700 ease-out"
          }`}
          style={{ transform: `translateX(${getTransform()}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex h-full w-full flex-shrink-0 gap-2 px-2"
            >
              {/* First image of the pair */}
              {slides[slideIndex * 2] && (
                <div
                  className="group relative flex-1 cursor-pointer overflow-hidden rounded-lg"
                  onMouseEnter={() =>
                    !isDragging && setHoveredSlide(slideIndex * 2)
                  }
                  onMouseLeave={() => setHoveredSlide(null)}
                >
                  <img
                    src={slides[slideIndex * 2]?.src}
                    alt={slides[slideIndex * 2]?.name ?? ""}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />

                  {/* Bottom overlay with faded black background */}
                  <div
                    className={`absolute right-0 bottom-0 left-0 transform bg-gradient-to-t from-black via-black/60 to-transparent p-4 transition-all duration-500 ease-out ${
                      hoveredSlide === slideIndex * 2 && !isDragging
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <div className="text-white">
                      <h3 className="mb-1 text-lg font-bold">
                        {slides[slideIndex * 2]?.name}
                      </h3>
                      <p className="text-sm opacity-90">
                        Leadership Team Member
                      </p>
                      <div className="mt-2 h-0.5 w-8 bg-[var(--primery-color)]"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Second image of the pair */}
              {slides[slideIndex * 2 + 1] && (
                <div
                  className="group relative flex-1 cursor-pointer overflow-hidden rounded-lg"
                  onMouseEnter={() =>
                    !isDragging && setHoveredSlide(slideIndex * 2 + 1)
                  }
                  onMouseLeave={() => setHoveredSlide(null)}
                >
                  <img
                    src={slides[slideIndex * 2 + 1]?.src}
                    alt={slides[slideIndex * 2 + 1]?.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />

                  {/* Bottom overlay with faded black background */}
                  <div
                    className={`absolute right-0 bottom-0 left-0 transform bg-gradient-to-t from-black via-black/60 to-transparent p-4 transition-all duration-500 ease-out ${
                      hoveredSlide === slideIndex * 2 + 1 && !isDragging
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <div className="text-white">
                      <h3 className="mb-1 text-lg font-bold">
                        {slides[slideIndex * 2 + 1]?.name}
                      </h3>
                      <p className="text-sm opacity-90">
                        Leadership Team Member
                      </p>
                      <div className="mt-2 h-0.5 w-8 bg-[var(--primery-color)]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Hero2 = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const slides = useMemo(
    () => [
      {
        id: "1",
        src: "/images/STAFF/01.png",
        name: "Priya Ma'am",
      },
      {
        id: "2",
        src: "/images/STAFF/02.png",
        name: "Pooja Ma'am",
      },
      {
        id: "3",
        src: "/images/STAFF/03.png",
        name: "Dhara ma'am",
      },
      {
        id: "4",
        src: "/images/STAFF/04.png",
        name: "Krishna Ma'am",
      },
      {
        id: "5",
        src: "/images/STAFF/05.png",
        name: "Hinal Ma'am",
      },
      {
        id: "6",
        src: "/images/STAFF/06.png",
        name: "Mehul Sir",
      },
      {
        id: "7",
        src: "/images/STAFF/07.png",
        name: "Madhavi ma'am",
      },
      {
        id: "8",
        src: "/images/STAFF/08.png",
        name: "Suresh Sir",
      },
      {
        id: "9",
        src: "/images/STAFF/09.png",
        name: "Harjeet Sir",
      },
      {
        id: "10",
        src: "/images/STAFF/10.png",
        name: "_ Sir",
      },
    ],
    [],
  );

  // Curved Carousel Config for larger screens
  const curvedCarouselConfig = useMemo<Partial<CarouselConfig>>(
    () => ({
      slideHeight:
        typeof window !== "undefined"
          ? window.innerWidth < 1024
            ? 450
            : 650
          : 650,
      slidesInRing: 13,
      radius:
        typeof window !== "undefined"
          ? window.innerWidth < 1024
            ? 800
            : 1200
          : 1200,
      autoRotate: true,
      rotationSpeed: 0.15,
      pauseOnHover: true,
      entranceAnimation: "fadeUp",
      fadeout: true,
    }),
    [typeof window !== "undefined" ? window.innerWidth : 0],
  );

  const handleYouTubeClick = useCallback(() => {
    window.open("https://bitly.cx/rNEH4", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <>
      <section className="relative flex h-screen flex-col bg-white">
        {/* Header Content */}
        <div className="flex-shrink-0 pt-18 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            {/* Badge */}
            <div className="mb-4 flex justify-center sm:mb-6 md:mb-8">
              <div className="relative inline-block">
                <p
                  className={`${hero_heading_font} text-center text-sm font-medium sm:text-base md:text-lg lg:text-xl`}
                >
                  Meet Our Amazing Team
                </p>
                <div
                  className="absolute top-0 h-[40%] rounded-md bg-[var(--pink)] sm:h-[50%] md:rounded-lg"
                  style={{
                    width: "calc(35% + 15px)",
                    right: "0",
                    transform: "translate(8%, -30%)",
                    zIndex: 1,
                  }}
                />
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-6 text-center sm:mb-8 md:mb-12">
              <h1
                className={`${hero_headline_font} mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
              >
                Meet Our{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[var(--primery-color)]">
                    Leadership Team
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-1.5 w-full -rotate-1 transform bg-[var(--pink)] opacity-80 sm:h-2 md:h-3 lg:h-4"></span>
                </span>
              </h1>
              <p
                className={`mx-auto max-w-xs px-2 text-sm sm:max-w-lg sm:px-4 sm:text-base md:max-w-2xl md:px-6 md:text-lg lg:max-w-3xl lg:px-0 lg:text-xl ${hero_content_font} leading-relaxed`}
              >
                Our experienced leadership team combines decades of expertise in
                finance, technology, and business strategy to drive innovation
                and excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Container - Responsive */}
        <div className="mb-8 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-6 md:px-8">
          {isMobile ? (
            // Mobile Slider
            <MobileSlider slides={slides} />
          ) : (
            // Desktop Curved Carousel
            <div className="max-w-8xl relative w-full">
              <CurvedCarousel
                slides={slides}
                config={curvedCarouselConfig}
                fadeout={true}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Action Buttons - Fixed to Bottom */}
        <div className="z-10 mb-6 flex-shrink-0 py-4 sm:py-6">
          <div className="mx-auto px-4 sm:px-6">
            <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                aria-label="Watch on YouTube"
                className={`${btn_color} flex transform items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-all duration-200 hover:scale-105`}
                onClick={handleYouTubeClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
              </button>

              <Link href={SERVICE}>
                <button
                  aria-label="View Services"
                  className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#A00303] bg-white px-6 py-3 font-bold tracking-wide text-[#A00303] transition-all duration-300 hover:-translate-y-0.5 hover:border-2 hover:bg-[#A00303] hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 22.621l-3.521-3.511c-1.22 1.22-3.07 1.27-4.56.27-1.761-1.22-2.399-2.64-2.62-3.84-.239-1.27.13-2.39.91-3.4 1.47-1.91 3.79-2.41 5.74-1.15.66.38 1.29.97 1.71 1.66l3.521-3.521c.27.94.33 1.85.17 2.72-.16.87-.54 1.72-1.11 2.48-.7.94-1.73 1.79-2.79 2.66-1.19 1-2.41 2.04-3.57 3.23-.98.95-1.82 1.89-2.42 2.72l4.25 4.25zm-8.79-22.621c-5.29-.539-6.03 5.57-6 8 .03 2.89.78 5.55 2.07 7.59.54 1.09 1.46 1.98 2.53 2.37l1.15.43c.56.2 1.17.12 1.7-.23 1.01-.65 1.86-1.69 2.89-2.99 1.52-1.93 3.17-4.03 4.71-6.13 1.34-1.81 2.56-3.92 1.86-6.01-.24-.73-.87-1.31-1.72-1.57-3.45-1.06-9.08-.98-12.19.54zm1.32 5.96c-.33 0-.64.14-.86.39-.22.25-.33.58-.29.92.04.34.22.65.5.86 1.12.88 2.28 1.7 3.49 2.45.33.19.73.17 1.04-.06.31-.23.49-.61.46-1-.03-.39-.26-.74-.62-.91-1.15-.63-2.27-1.37-3.35-2.15-.18-.15-.4-.23-.62-.23z" />
                  </svg>
                  View Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
