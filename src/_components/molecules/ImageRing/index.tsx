// "use client";

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
//   useCallback,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// export interface MediaItem {
//   id: string;
//   title: string;
//   thumbnail: string;
//   videoUrl?: string;
//   type: "video" | "image";
//   category?: string;
// }

// export interface VideoRingSliderProps {
//   items: MediaItem[];
//   autoRotate?: boolean;
//   rotationInterval?: number;
//   containerClassName?: string;
// }

// export function VideoRingSlider({
//   items,
//   autoRotate = true,
//   rotationInterval = 3000,
//   containerClassName = "",
// }: VideoRingSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

//   const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
//   const startX = useRef<number>(0);
//   const dragOffset = useRef<number>(0);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto rotation
//   const startAutoRotation = useCallback(() => {
//     if (!autoRotate || isHovered || isDragging || items.length === 0) return;

//     autoRotateRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % items.length);
//     }, rotationInterval);
//   }, [autoRotate, isHovered, isDragging, rotationInterval, items.length]);

//   const stopAutoRotation = useCallback(() => {
//     if (autoRotateRef.current) {
//       clearInterval(autoRotateRef.current);
//       autoRotateRef.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     if (items.length === 0) return;

//     if (!isHovered && !isDragging) {
//       startAutoRotation();
//     } else {
//       stopAutoRotation();
//     }

//     return stopAutoRotation;
//   }, [
//     isHovered,
//     isDragging,
//     startAutoRotation,
//     stopAutoRotation,
//     items.length,
//   ]);

//   // Manual navigation
//   const navigateToIndex = (index: number) => {
//     if (items.length === 0) return;
//     setCurrentIndex(index);
//   };

//   const navigateNext = () => {
//     if (items.length === 0) return;
//     const nextIndex = (currentIndex + 1) % items.length;
//     navigateToIndex(nextIndex);
//   };

//   const navigatePrev = () => {
//     if (items.length === 0) return;
//     const prevIndex = (currentIndex - 1 + items.length) % items.length;
//     navigateToIndex(prevIndex);
//   };

//   // Touch/drag functionality
//   const handleTouchStart = (event: React.TouchEvent) => {
//     setIsDragging(true);
//     const touch = event.touches[0];
//     if (!touch) return;
//     startX.current = touch.clientX;
//     dragOffset.current = 0;
//   };

//   const handleTouchMove = (event: React.TouchEvent) => {
//     if (!isDragging) return;
//     const touch = event.touches[0];
//     if (!touch) return;
//     const currentX = touch.clientX;
//     dragOffset.current = currentX - startX.current;
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     const threshold = 50;
//     if (Math.abs(dragOffset.current) > threshold) {
//       if (dragOffset.current > 0) {
//         navigatePrev();
//       } else {
//         navigateNext();
//       }
//     }
//     dragOffset.current = 0;
//   };

//   // Video controls
//   const toggleVideo = (itemId: string, videoElement: HTMLVideoElement) => {
//     setPlayingVideos((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(itemId)) {
//         newSet.delete(itemId);
//         videoElement.pause();
//       } else {
//         // Pause all other videos
//         newSet.forEach((id) => {
//           if (id !== itemId) {
//             const video = document.querySelector(
//               `video[data-id="${id}"]`,
//             ) as HTMLVideoElement;
//             if (video) video.pause();
//           }
//         });
//         newSet.clear();
//         newSet.add(itemId);
//         videoElement.play();
//       }
//       return newSet;
//     });
//   };

//   // Calculate card positions for arc formation
//   const getCardPosition = (index: number) => {
//     const isMobile = windowSize.width < 768;
//     const totalItems = items.length;
//     const centerIndex = currentIndex;

//     // Calculate the relative position from center
//     let offset = index - centerIndex;

//     // Handle wrapping for circular arrangement
//     if (offset > totalItems / 2) {
//       offset -= totalItems;
//     } else if (offset < -totalItems / 2) {
//       offset += totalItems;
//     }

//     // Improved arc parameters to match the reference
//     const baseRadius = isMobile ? 200 : 320;
//     const arcWidth = isMobile ? 1.4 : 1.6; // How wide the arc spreads
//     const verticalCurve = isMobile ? 0.3 : -0.4; // How much the arc curves downward

//     // Position along the arc (normalized from -1 to 1)
//     const normalizedPos = offset / Math.max(2.5, totalItems / 2);
//     const clampedPos = Math.max(-1, Math.min(1, normalizedPos));

//     // Calculate horizontal and vertical positions using a parabolic curve
//     const x = clampedPos * baseRadius * arcWidth;
//     const y = Math.pow(Math.abs(clampedPos), 1.5) * baseRadius * verticalCurve;

//     // Scale and opacity based on distance from center
//     const distance = Math.abs(offset);
//     let scale, opacity, zIndex, width, height;

//     if (offset === 0) {
//       // Center card (active)
//       scale = isMobile ? 1.0 : 1.1;
//       opacity = 1;
//       zIndex = totalItems + 2;
//       width = isMobile ? 140 : 180;
//       height = isMobile ? 200 : 260;
//     } else if (distance === 1) {
//       // First neighbors
//       scale = isMobile ? 0.85 : 0.9;
//       opacity = 0.9;
//       zIndex = totalItems + 1;
//       width = isMobile ? 120 : 160;
//       height = isMobile ? 170 : 230;
//     } else if (distance === 2) {
//       // Second neighbors
//       scale = isMobile ? 0.7 : 0.75;
//       opacity = 0.7;
//       zIndex = totalItems;
//       width = isMobile ? 100 : 140;
//       height = isMobile ? 140 : 200;
//     } else {
//       // Far cards
//       scale = isMobile ? 0.6 : 0.65;
//       opacity = distance > 3 ? 0.2 : 0.5;
//       zIndex = totalItems - distance;
//       width = isMobile ? 90 : 120;
//       height = isMobile ? 120 : 170;
//     }

//     return {
//       x,
//       y,
//       scale,
//       zIndex,
//       opacity,
//       width,
//       height,
//     };
//   };

//   if (items.length === 0) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-green-100">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             No media items available
//           </h2>
//           <p className="mt-2 text-gray-500">
//             Please add items to display in the slider
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const activeItem = items[currentIndex];

//   return (
//     <div
//       className={`relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-green-100 ${containerClassName}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header */}
//       <div className="absolute top-6 left-1/2 z-10 w-full -translate-x-1/2 transform px-4 text-center md:top-12">
//         <div className="mb-3 inline-block rounded-full bg-orange-400 px-4 py-2 text-xs font-medium text-white md:mb-4 md:text-sm">
//           Join over 100,000 happy creators
//         </div>
//         <h1 className="mb-3 text-3xl leading-tight font-bold text-gray-900 md:mb-4 md:text-5xl xl:text-6xl">
//           Engage Audiences
//           <br />
//           with Stunning Videos
//         </h1>
//         <p className="mx-auto mb-6 max-w-2xl px-2 text-sm leading-relaxed text-gray-600 md:mb-8 md:text-lg">
//           Boost Your Brand with High-Impact Short Videos from our expert content
//           creators. Our team is ready to propel your business forward
//         </p>
//       </div>

//       {/* Cards Container */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div
//           className="relative flex h-full w-full items-center justify-center"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             transform:
//               windowSize.width < 768 ? "translateY(60px)" : "translateY(40px)",
//           }}
//         >
//           {items.map((item, index) => {
//             const position = getCardPosition(index);
//             const isActive = index === currentIndex;

//             return (
//               <motion.div
//                 key={item.id}
//                 className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
//                 style={{
//                   width: `${position.width}px`,
//                   height: `${position.height}px`,
//                   zIndex: position.zIndex,
//                   transformOrigin: "center center",
//                 }}
//                 initial={false}
//                 animate={{
//                   x: position.x,
//                   y: position.y,
//                   scale: position.scale,
//                   opacity: position.opacity,
//                 }}
//                 transition={{
//                   duration: 0.7,
//                   ease: [0.25, 0.46, 0.45, 0.94],
//                   type: "spring",
//                   damping: 20,
//                   stiffness: 150,
//                 }}
//                 onClick={() => navigateToIndex(index)}
//                 whileHover={
//                   !isDragging && !isActive
//                     ? {
//                         scale: position.scale * 1.08,
//                         y: position.y - 8,
//                       }
//                     : {}
//                 }
//               >
//                 <div className="group relative h-full w-full">
//                   {item.type === "video" && item.videoUrl ? (
//                     <video
//                       className="h-full w-full object-cover"
//                       src={item.videoUrl}
//                       poster={item.thumbnail}
//                       loop
//                       muted
//                       playsInline
//                       data-id={item.id}
//                       ref={(el) => {
//                         if (el && !playingVideos.has(item.id)) {
//                           el.pause();
//                         }
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                       draggable={false}
//                     />
//                   )}

//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

//                   {/* Content overlay */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
//                   >
//                     <div className="absolute right-2 bottom-2 left-2 md:right-3 md:bottom-3 md:left-3">
//                       <h3 className="mb-1 line-clamp-2 text-xs leading-tight font-semibold text-white md:text-sm">
//                         {item.title}
//                       </h3>
//                       {item.category && (
//                         <span className="text-xs text-white/80">
//                           {item.category}
//                         </span>
//                       )}
//                     </div>

//                     {/* Play button for videos */}
//                     {item.type === "video" && item.videoUrl && isActive && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           const video =
//                             e.currentTarget.parentElement?.parentElement?.querySelector(
//                               "video",
//                             ) as HTMLVideoElement;
//                           if (video) toggleVideo(item.id, video);
//                         }}
//                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 md:p-3"
//                         aria-label={
//                           playingVideos.has(item.id)
//                             ? "Pause video"
//                             : "Play video"
//                         }
//                       >
//                         {playingVideos.has(item.id) ? (
//                           <Pause className="h-4 w-4 text-white md:h-5 md:w-5" />
//                         ) : (
//                           <Play className="ml-0.5 h-4 w-4 text-white md:h-5 md:w-5" />
//                         )}
//                       </button>
//                     )}
//                   </div>

//                   {/* Active card border highlight */}
//                   {isActive && (
//                     <div className="ring-opacity-60 absolute inset-0 rounded-2xl ring-2 ring-orange-400" />
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 transform items-center space-x-2 md:bottom-32">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => navigateToIndex(index)}
//             className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
//               index === currentIndex
//                 ? "scale-125 bg-orange-500 shadow-lg"
//                 : "bg-white/60 hover:scale-110 hover:bg-white/80"
//             }`}
//             aria-label={`Go to item ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Get Started Button */}
//       <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 transform text-center md:bottom-16">
//         <motion.button
//           className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:bg-orange-600 hover:shadow-2xl md:px-8 md:py-3 md:text-base"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           Get Started
//         </motion.button>
//         <div className="mt-1.5 text-xs font-medium text-gray-600 md:text-sm">
//           It's Free
//         </div>
//       </div>

//       {/* Decorative Arrow and Text */}
//       <div className="absolute top-1/3 right-6 z-10 hidden text-sm text-gray-500 md:right-12 md:block">
//         <div className="flex rotate-12 transform items-center space-x-2">
//           <span className="font-medium whitespace-nowrap">
//             Swipe to see more
//           </span>
//           <svg
//             width="45"
//             height="25"
//             viewBox="0 0 45 25"
//             className="text-gray-400"
//           >
//             <path
//               d="M5 12 Q22 6 40 12"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="3,3"
//               markerEnd="url(#arrowhead)"
//             />
//             <defs>
//               <marker
//                 id="arrowhead"
//                 markerWidth="10"
//                 markerHeight="7"
//                 refX="9"
//                 refY="3.5"
//                 orient="auto"
//               >
//                 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
//               </marker>
//             </defs>
//           </svg>
//         </div>
//       </div>

//       {/* Auto-rotation indicator */}
//       {autoRotate && !isHovered && !isDragging && (
//         <div className="absolute top-4 right-4 z-10">
//           <div className="flex items-center space-x-2 rounded-full bg-white/70 px-3 py-1.5 text-xs text-gray-600 shadow-lg backdrop-blur-sm md:text-sm">
//             <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
//             <span className="font-medium">Auto-rotating</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Demo component with sample data
// export function VideoRingDemo() {
//   const sampleItems: MediaItem[] = [
//     {
//       id: "1",
//       title: "Coffee Art Creation",
//       thumbnail:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Food & Beverage",
//     },
//     {
//       id: "2",
//       title: "Urban Photography",
//       thumbnail:
//         "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Photography",
//     },
//     {
//       id: "3",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Beauty & Wellness",
//     },
//     {
//       id: "4",
//       title: "Cooking Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Culinary",
//     },
//     {
//       id: "5",
//       title: "Fashion Content",
//       thumbnail:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Fashion",
//     },
//     {
//       id: "6",
//       title: "Travel Adventure",
//       thumbnail:
//         "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Travel",
//     },
//     {
//       id: "7",
//       title: "Tech Review",
//       thumbnail:
//         "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Technology",
//     },
//         {
//       id: "1",
//       title: "Coffee Art Creation",
//       thumbnail:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Food & Beverage",
//     },
//     {
//       id: "2",
//       title: "Urban Photography",
//       thumbnail:
//         "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Photography",
//     },
//     {
//       id: "3",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Beauty & Wellness",
//     },
//     {
//       id: "4",
//       title: "Cooking Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Culinary",
//     },
//     {
//       id: "5",
//       title: "Fashion Content",
//       thumbnail:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
//       type: "image",
//       category: "Fashion",
//     },
//   ];

//   return (
//     <div className="h-screen w-full">
//       <VideoRingSlider
//         items={sampleItems}
//         autoRotate={true}
//         rotationInterval={3500}
//       />
//     </div>
//   );
// }

// "use client";

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
//   useCallback,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// export interface MediaItem {
//   id: string;
//   title: string;
//   thumbnail: string;
//   videoUrl?: string;
//   type: "video" | "image";
//   category?: string;
// }

// export interface VideoRingSliderProps {
//   items: MediaItem[];
//   autoRotate?: boolean;
//   rotationInterval?: number;
//   containerClassName?: string;
// }

// export function VideoRingSlider({
//   items,
//   autoRotate = true,
//   rotationInterval = 3000,
//   containerClassName = "",
// }: VideoRingSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

//   const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
//   const startX = useRef<number>(0);
//   const dragOffset = useRef<number>(0);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto rotation
//   const startAutoRotation = useCallback(() => {
//     if (!autoRotate || isHovered || isDragging || items.length === 0) return;

//     autoRotateRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % items.length);
//     }, rotationInterval);
//   }, [autoRotate, isHovered, isDragging, rotationInterval, items.length]);

//   const stopAutoRotation = useCallback(() => {
//     if (autoRotateRef.current) {
//       clearInterval(autoRotateRef.current);
//       autoRotateRef.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     if (items.length === 0) return;

//     if (!isHovered && !isDragging) {
//       startAutoRotation();
//     } else {
//       stopAutoRotation();
//     }

//     return stopAutoRotation;
//   }, [
//     isHovered,
//     isDragging,
//     startAutoRotation,
//     stopAutoRotation,
//     items.length,
//   ]);

//   // Manual navigation
//   const navigateToIndex = (index: number) => {
//     if (items.length === 0) return;
//     setCurrentIndex(index);
//   };

//   const navigateNext = () => {
//     if (items.length === 0) return;
//     const nextIndex = (currentIndex + 1) % items.length;
//     navigateToIndex(nextIndex);
//   };

//   const navigatePrev = () => {
//     if (items.length === 0) return;
//     const prevIndex = (currentIndex - 1 + items.length) % items.length;
//     navigateToIndex(prevIndex);
//   };

//   // Touch/drag functionality
//   const handleTouchStart = (event: React.TouchEvent) => {
//     setIsDragging(true);
//     const touch = event.touches[0];
//     if (!touch) return;
//     startX.current = touch.clientX;
//     dragOffset.current = 0;
//   };

//   const handleTouchMove = (event: React.TouchEvent) => {
//     if (!isDragging) return;
//     const touch = event.touches[0];
//     if (!touch) return;
//     const currentX = touch.clientX;
//     dragOffset.current = currentX - startX.current;
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     const threshold = 50;
//     if (Math.abs(dragOffset.current) > threshold) {
//       if (dragOffset.current > 0) {
//         navigatePrev();
//       } else {
//         navigateNext();
//       }
//     }
//     dragOffset.current = 0;
//   };

//   // Video controls
//   const toggleVideo = (itemId: string, videoElement: HTMLVideoElement) => {
//     setPlayingVideos((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(itemId)) {
//         newSet.delete(itemId);
//         videoElement.pause();
//       } else {
//         // Pause all other videos
//         newSet.forEach((id) => {
//           if (id !== itemId) {
//             const video = document.querySelector(
//               `video[data-id="${id}"]`,
//             ) as HTMLVideoElement;
//             if (video) video.pause();
//           }
//         });
//         newSet.clear();
//         newSet.add(itemId);
//         videoElement.play();
//       }
//       return newSet;
//     });
//   };

//   // Improved arc formation with upside-down parabola
//   const getCardPosition = (index: number) => {
//     const isMobile = windowSize.width < 768;
//     const totalItems = items.length;
//     const centerIndex = currentIndex;

//     // Calculate the relative position from center
//     let offset = index - centerIndex;

//     // Handle wrapping for circular arrangement
//     if (offset > totalItems / 2) {
//       offset -= totalItems;
//     } else if (offset < -totalItems / 2) {
//       offset += totalItems;
//     }

//     // Enhanced arc parameters for proper upside-down parabola
//     const baseRadius = isMobile ? 180 : 280;
//     const arcSpread = isMobile ? 1.2 : 1.4; // Horizontal spread
//     const arcHeight = isMobile ? 80 : 120; // Maximum arc height (how much it curves up)
//     const visibleRange = Math.min(4, Math.floor(totalItems / 2) + 1);

//     // Normalize position within visible range
//     const normalizedPos = offset / visibleRange;
//     const clampedPos = Math.max(-1, Math.min(1, normalizedPos));

//     // Create upside-down parabola: y = -a*x² + height
//     // This creates an arc that curves upward (inverted parabola)
//     const x = clampedPos * baseRadius * arcSpread;
//     const y = -Math.pow(clampedPos, 2) * arcHeight; // Negative for upward curve

//     // Enhanced scaling and opacity based on distance from center
//     const distance = Math.abs(offset);
//     let scale, opacity, zIndex, width, height;

//     if (offset === 0) {
//       // Center card (active) - largest and most prominent
//       scale = isMobile ? 1.0 : 1.2;
//       opacity = 1;
//       zIndex = totalItems + 10;
//       width = isMobile ? 160 : 220;
//       height = isMobile ? 220 : 300;
//     } else if (distance === 1) {
//       // First neighbors - slightly smaller
//       scale = isMobile ? 0.85 : 0.95;
//       opacity = 0.95;
//       zIndex = totalItems + 5;
//       width = isMobile ? 135 : 180;
//       height = isMobile ? 190 : 250;
//     } else if (distance === 2) {
//       // Second neighbors
//       scale = isMobile ? 0.7 : 0.8;
//       opacity = 0.8;
//       zIndex = totalItems;
//       width = isMobile ? 115 : 150;
//       height = isMobile ? 160 : 210;
//     } else if (distance === 3) {
//       // Third neighbors
//       scale = isMobile ? 0.6 : 0.7;
//       opacity = 0.6;
//       zIndex = totalItems - 5;
//       width = isMobile ? 95 : 125;
//       height = isMobile ? 135 : 175;
//     } else {
//       // Far cards - very small and faded
//       scale = isMobile ? 0.5 : 0.6;
//       opacity = distance > 4 ? 0.2 : 0.4;
//       zIndex = totalItems - distance;
//       width = isMobile ? 80 : 100;
//       height = isMobile ? 110 : 140;
//     }

//     return {
//       x,
//       y,
//       scale,
//       zIndex,
//       opacity,
//       width,
//       height,
//     };
//   };

//   if (items.length === 0) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-green-100">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             No media items available
//           </h2>
//           <p className="mt-2 text-gray-500">
//             Please add items to display in the slider
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const activeItem = items[currentIndex];

//   return (
//     <div
//       className={`relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-green-100 ${containerClassName}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header */}
//       <div className="absolute top-6 left-1/2 z-10 w-full -translate-x-1/2 transform px-4 text-center md:top-12">
//         <div className="mb-3 inline-block rounded-full bg-orange-400 px-4 py-2 text-xs font-medium text-white md:mb-4 md:text-sm">
//           Join over 100,000 happy creators
//         </div>
//         <h1 className="mb-3 text-3xl leading-tight font-bold text-gray-900 md:mb-4 md:text-5xl xl:text-6xl">
//           Engage Audiences
//           <br />
//           with Stunning Videos
//         </h1>
//         <p className="mx-auto mb-6 max-w-2xl px-2 text-sm leading-relaxed text-gray-600 md:mb-8 md:text-lg">
//           Boost Your Brand with High-Impact Short Videos from our expert content
//           creators. Our team is ready to propel your business forward
//         </p>
//       </div>

//       {/* Cards Container - Repositioned for better arc display */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div
//           className="relative flex h-full w-full items-center justify-center"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             transform: windowSize.width < 768
//               ? "translateY(100px)"
//               : "translateY(80px)", // Adjusted for better header spacing
//           }}
//         >
//           {items.map((item, index) => {
//             const position = getCardPosition(index);
//             const isActive = index === currentIndex;

//             return (
//               <motion.div
//                 key={item.id}
//                 className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
//                 style={{
//                   width: `${position.width}px`,
//                   height: `${position.height}px`,
//                   zIndex: position.zIndex,
//                   transformOrigin: "center center",
//                 }}
//                 initial={false}
//                 animate={{
//                   x: position.x,
//                   y: position.y,
//                   scale: position.scale,
//                   opacity: position.opacity,
//                 }}
//                 transition={{
//                   duration: 0.8,
//                   ease: [0.25, 0.46, 0.45, 0.94],
//                   type: "spring",
//                   damping: 25,
//                   stiffness: 120,
//                 }}
//                 onClick={() => navigateToIndex(index)}
//                 whileHover={
//                   !isDragging && !isActive
//                     ? {
//                         scale: position.scale * 1.1,
//                         y: position.y - 12,
//                       }
//                     : {}
//                 }
//               >
//                 <div className="group relative h-full w-full">
//                   {item.type === "video" && item.videoUrl ? (
//                     <video
//                       className="h-full w-full object-cover"
//                       src={item.videoUrl}
//                       poster={item.thumbnail}
//                       loop
//                       muted
//                       playsInline
//                       data-id={item.id}
//                       ref={(el) => {
//                         if (el && !playingVideos.has(item.id)) {
//                           el.pause();
//                         }
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                       draggable={false}
//                     />
//                   )}

//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                   {/* Content overlay */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
//                   >
//                     <div className="absolute right-2 bottom-2 left-2 md:right-3 md:bottom-3 md:left-3">
//                       <h3 className="mb-1 line-clamp-2 text-xs leading-tight font-semibold text-white md:text-sm">
//                         {item.title}
//                       </h3>
//                       {item.category && (
//                         <span className="text-xs text-white/80">
//                           {item.category}
//                         </span>
//                       )}
//                     </div>

//                     {/* Play button for videos */}
//                     {item.type === "video" && item.videoUrl && isActive && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           const video =
//                             e.currentTarget.parentElement?.parentElement?.querySelector(
//                               "video",
//                             ) as HTMLVideoElement;
//                           if (video) toggleVideo(item.id, video);
//                         }}
//                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 md:p-3"
//                         aria-label={
//                           playingVideos.has(item.id)
//                             ? "Pause video"
//                             : "Play video"
//                         }
//                       >
//                         {playingVideos.has(item.id) ? (
//                           <Pause className="h-4 w-4 text-white md:h-5 md:w-5" />
//                         ) : (
//                           <Play className="ml-0.5 h-4 w-4 text-white md:h-5 md:w-5" />
//                         )}
//                       </button>
//                     )}
//                   </div>

//                   {/* Active card border highlight with glow effect */}
//                   {isActive && (
//                     <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400 shadow-orange-400/50 shadow-2xl" />
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 transform items-center space-x-2 md:bottom-32">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => navigateToIndex(index)}
//             className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
//               index === currentIndex
//                 ? "scale-125 bg-orange-500 shadow-lg"
//                 : "bg-white/60 hover:scale-110 hover:bg-white/80"
//             }`}
//             aria-label={`Go to item ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Get Started Button */}
//       <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2 transform text-center md:bottom-16">
//         <motion.button
//           className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:bg-orange-600 hover:shadow-2xl md:px-8 md:py-3 md:text-base"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           Get Started
//         </motion.button>
//         <div className="mt-1.5 text-xs font-medium text-gray-600 md:text-sm">
//           It's Free
//         </div>
//       </div>

//       {/* Decorative Arrow and Text */}
//       <div className="absolute top-1/3 right-6 z-10 hidden text-sm text-gray-500 md:right-12 md:block">
//         <div className="flex rotate-12 transform items-center space-x-2">
//           <span className="font-medium whitespace-nowrap">
//             Swipe to see more
//           </span>
//           <svg
//             width="45"
//             height="25"
//             viewBox="0 0 45 25"
//             className="text-gray-400"
//           >
//             <path
//               d="M5 12 Q22 6 40 12"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="3,3"
//               markerEnd="url(#arrowhead)"
//             />
//             <defs>
//               <marker
//                 id="arrowhead"
//                 markerWidth="10"
//                 markerHeight="7"
//                 refX="9"
//                 refY="3.5"
//                 orient="auto"
//               >
//                 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
//               </marker>
//             </defs>
//           </svg>
//         </div>
//       </div>

//       {/* Auto-rotation indicator */}
//       {autoRotate && !isHovered && !isDragging && (
//         <div className="absolute top-4 right-4 z-10">
//           <div className="flex items-center space-x-2 rounded-full bg-white/70 px-3 py-1.5 text-xs text-gray-600 shadow-lg backdrop-blur-sm md:text-sm">
//             <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
//             <span className="font-medium">Auto-rotating</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Demo component with sample data
// export function VideoRingDemo() {
//   const sampleItems = [
//     {
//       id: "1",
//       title: "Coffee Art Creation",
//       thumbnail:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Food & Beverage",
//     },
//     {
//       id: "2",
//       title: "Urban Photography",
//       thumbnail:
//         "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Photography",
//     },
//     {
//       id: "3",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Beauty & Wellness",
//     },
//     {
//       id: "4",
//       title: "Cooking Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Culinary",
//     },
//     {
//       id: "5",
//       title: "Fashion Content",
//       thumbnail:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Fashion",
//     },
//     {
//       id: "6",
//       title: "Travel Adventure",
//       thumbnail:
//         "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Travel",
//     },
//     {
//       id: "7",
//       title: "Tech Review",
//       thumbnail:
//         "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Technology",
//     },
//         {
//       id: "3",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Beauty & Wellness",
//     },
//     {
//       id: "4",
//       title: "Cooking Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Culinary",
//     },
//     {
//       id: "5",
//       title: "Fashion Content",
//       thumbnail:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Fashion",
//     },
//     {
//       id: "6",
//       title: "Travel Adventure",
//       thumbnail:
//         "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Travel",
//     },
//   ];

//   return (
//     <div className="h-screen w-full">
//       <VideoRingSlider
//         items={sampleItems}
//         autoRotate={true}
//         rotationInterval={3500}
//       />
//     </div>
//   );
// }

// export default VideoRingDemo;

// "use client";

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
//   useCallback,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
// import GalleryHero from "src/_components/sections/Gallery/GalleryHero";

// export interface MediaItem {
//   id: string;
//   title: string;
//   thumbnail: string;
//   videoUrl?: string;
//   type: "video" | "image";
//   category?: string;
// }

// export interface VideoRingSliderProps {
//   items: MediaItem[];
//   autoRotate?: boolean;
//   rotationInterval?: number;
//   containerClassName?: string;
// }

// export function VideoRingSlider({
//   items,
//   autoRotate = true,
//   rotationInterval = 3000,
//   containerClassName = "",
// }: VideoRingSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

//   const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
//   const startX = useRef<number>(0);
//   const dragOffset = useRef<number>(0);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto rotation
//   const startAutoRotation = useCallback(() => {
//     if (!autoRotate || isHovered || isDragging || items.length === 0) return;

//     autoRotateRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % items.length);
//     }, rotationInterval);
//   }, [autoRotate, isHovered, isDragging, rotationInterval, items.length]);

//   const stopAutoRotation = useCallback(() => {
//     if (autoRotateRef.current) {
//       clearInterval(autoRotateRef.current);
//       autoRotateRef.current = null;
//     }
//   }, []);

//   useEffect(() => {
//     if (items.length === 0) return;

//     if (!isHovered && !isDragging) {
//       startAutoRotation();
//     } else {
//       stopAutoRotation();
//     }

//     return stopAutoRotation;
//   }, [
//     isHovered,
//     isDragging,
//     startAutoRotation,
//     stopAutoRotation,
//     items.length,
//   ]);

//   // Manual navigation
//   const navigateToIndex = (index: number) => {
//     if (items.length === 0) return;
//     setCurrentIndex(index);
//   };

//   const navigateNext = () => {
//     if (items.length === 0) return;
//     const nextIndex = (currentIndex + 1) % items.length;
//     navigateToIndex(nextIndex);
//   };

//   const navigatePrev = () => {
//     if (items.length === 0) return;
//     const prevIndex = (currentIndex - 1 + items.length) % items.length;
//     navigateToIndex(prevIndex);
//   };

//   // Touch/drag functionality
//   const handleTouchStart = (event: React.TouchEvent) => {
//     setIsDragging(true);
//     const touch = event.touches[0];
//     if (!touch) return;
//     startX.current = touch.clientX;
//     dragOffset.current = 0;
//   };

//   const handleTouchMove = (event: React.TouchEvent) => {
//     if (!isDragging) return;
//     const touch = event.touches[0];
//     if (!touch) return;
//     const currentX = touch.clientX;
//     dragOffset.current = currentX - startX.current;
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     const threshold = 50;
//     if (Math.abs(dragOffset.current) > threshold) {
//       if (dragOffset.current > 0) {
//         navigatePrev();
//       } else {
//         navigateNext();
//       }
//     }
//     dragOffset.current = 0;
//   };

//   // Video controls
//   const toggleVideo = (itemId: string, videoElement: HTMLVideoElement) => {
//     setPlayingVideos((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(itemId)) {
//         newSet.delete(itemId);
//         videoElement.pause();
//       } else {
//         // Pause all other videos
//         newSet.forEach((id) => {
//           if (id !== itemId) {
//             const video = document.querySelector(
//               `video[data-id="${id}"]`,
//             ) as HTMLVideoElement;
//             if (video) video.pause();
//           }
//         });
//         newSet.clear();
//         newSet.add(itemId);
//         videoElement.play();
//       }
//       return newSet;
//     });
//   };

//   // Horizontal line arrangement like in the reference image
//   const getCardPosition = (index: number) => {
//     const isMobile = windowSize.width < 768;
//     const totalItems = items.length;
//     const centerIndex = currentIndex;

//     // Calculate the relative position from center
//     let offset = index - centerIndex;

//     // Handle wrapping for circular arrangement
//     if (offset > totalItems / 2) {
//       offset -= totalItems;
//     } else if (offset < -totalItems / 2) {
//       offset += totalItems;
//     }

//     // Horizontal arrangement parameters
//     const cardSpacing = isMobile ? 100 : 180; // Space between cards
//     const maxVisibleCards = 7; // Show more cards horizontally

//     // Calculate horizontal position
//     const x = offset * cardSpacing;
//     const y = 1; // Keep all cards at same vertical level

//     // Enhanced scaling and opacity based on distance from center
//     const distance = Math.abs(offset);
//     console.log("Distance ---->", distance);

//     let scale, opacity, zIndex, width, height;

//     if (offset === 0) {
//       // Center card (active) - largest
//       scale = isMobile ? 0.8 : 0.6;
//       opacity = 1;
//       zIndex = totalItems + 10;
//       width = isMobile ? 140 : 180;
//       height = isMobile ? 200 : 260;
//     } else if (distance === 1) {
//       // First neighbors
//       scale = isMobile ? 0.75 : 0.75;
//       opacity = 0.9;
//       zIndex = totalItems + 5;
//       width = isMobile ? 125 : 165;
//       height = isMobile ? 180 : 240;
//     } else if (distance === 2) {
//       // Second neighbors
//       scale = isMobile ? 0.65 : 0.9;
//       opacity = 0.7;
//       zIndex = totalItems;
//       width = isMobile ? 110 : 150;
//       height = isMobile ? 160 : 220;
//     } else if (distance === 3) {
//       // Third neighbors
//       scale = isMobile ? 0.7 : 1.2;
//       opacity = 0.5;
//       zIndex = totalItems - 5;
//       width = isMobile ? 95 : 135;
//       height = isMobile ? 140 : 200;
//     } else if (distance === 4) {
//       // Third neighbors
//       scale = isMobile ? 0.65 : 1.5;
//       opacity = 0.5;
//       zIndex = totalItems - 5;
//       width = isMobile ? 95 : 135;
//       height = isMobile ? 140 : 200;
//     } else {
//       // Far cards - hidden or very small
//       scale = isMobile ? 1.6 : 1.3;
//       opacity = distance > 4 ? 0 : 0.3;
//       zIndex = totalItems - distance;
//       width = isMobile ? 80 : 120;
//       height = isMobile ? 120 : 180;
//     }

//     return {
//       x,
//       y,
//       scale,
//       zIndex,
//       opacity,
//       width,
//       height,
//     };
//   };

//   if (items.length === 0) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-orange-100 via-pink-50 to-green-100">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             No media items available
//           </h2>
//           <p className="mt-2 text-gray-500">
//             Please add items to display in the slider
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const activeItem = items[currentIndex];

//   return (
//     <div
//       className={`relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 ${containerClassName}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header */}
//       <div className="absolute top-8 left-1/2 z-10 w-full -translate-x-1/2 transform px-4 text-center md:top-16">
//         <GalleryHero />
//       </div>

//       {/* Cards Container - Centered horizontally */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div
//           className="relative flex h-full w-full items-center justify-center"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           style={{
//             transform: "translateY(40px)", // Slight adjustment for better positioning
//           }}
//         >
//           {items.map((item, index) => {
//             const position = getCardPosition(index);
//             const isActive = index === currentIndex;

//             return (
//               <motion.div
//                 key={`${item.id}-${index}`}
//                 className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-lg"
//                 style={{
//                   width: `${position.width}px`,
//                   height: `${position.height}px`,
//                   zIndex: position.zIndex,
//                   transformOrigin: "center center",
//                 }}
//                 initial={false}
//                 animate={{
//                   x: position.x,
//                   y: position.y,
//                   scale: position.scale,
//                   opacity: position.opacity,
//                 }}
//                 transition={{
//                   duration: 0.6,
//                   ease: [0.25, 0.46, 0.45, 0.94],
//                 }}
//                 onClick={() => navigateToIndex(index)}
//                 whileHover={
//                   !isDragging && !isActive
//                     ? {
//                         scale: position.scale * 1.05,
//                         y: position.y - 8,
//                       }
//                     : {}
//                 }
//               >
//                 <div className="group relative h-full w-full">
//                   {item.type === "video" && item.videoUrl ? (
//                     <video
//                       className="h-full w-full object-cover"
//                       src={item.videoUrl}
//                       poster={item.thumbnail}
//                       loop
//                       muted
//                       playsInline
//                       data-id={item.id}
//                       ref={(el) => {
//                         if (el && !playingVideos.has(item.id)) {
//                           el.pause();
//                         }
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src={item.thumbnail}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                       draggable={false}
//                     />
//                   )}

//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//                   {/* Content overlay */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
//                   >
//                     <div className="absolute right-3 bottom-3 left-3">
//                       <h3 className="mb-1 line-clamp-2 text-sm leading-tight font-semibold text-white">
//                         {item.title}
//                       </h3>
//                       {item.category && (
//                         <span className="text-xs text-white/80">
//                           {item.category}
//                         </span>
//                       )}
//                     </div>

//                     {/* Play button for videos */}
//                     {item.type === "video" && item.videoUrl && isActive && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           const video =
//                             e.currentTarget.parentElement?.parentElement?.querySelector(
//                               "video",
//                             ) as HTMLVideoElement;
//                           if (video) toggleVideo(item.id, video);
//                         }}
//                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
//                         aria-label={
//                           playingVideos.has(item.id)
//                             ? "Pause video"
//                             : "Play video"
//                         }
//                       >
//                         {playingVideos.has(item.id) ? (
//                           <Pause className="h-5 w-5 text-white" />
//                         ) : (
//                           <Play className="ml-0.5 h-5 w-5 text-white" />
//                         )}
//                       </button>
//                     )}
//                   </div>

//                   {/* Active card border highlight */}
//                   {isActive && (
//                     <div className="absolute inset-0 rounded-2xl shadow-lg ring-2 shadow-orange-400/30 ring-orange-400" />
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Get Started Button */}
//       <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 transform text-center">
//         <motion.button
//           className="rounded-full bg-red-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl"
//           whileHover={{ scale: 1.05, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           Get Started
//         </motion.button>
//         <div className="mt-2 text-sm font-medium text-gray-600">It's Free</div>
//       </div>

//       {/* Navigation arrows */}
//       <div className="absolute top-1/2 left-8 z-10 -translate-y-1/2 transform">
//         <button
//           onClick={navigatePrev}
//           className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
//           aria-label="Previous item"
//         >
//           <ChevronLeft className="h-5 w-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-8 z-10 -translate-y-1/2 transform">
//         <button
//           onClick={navigateNext}
//           className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
//           aria-label="Next item"
//         >
//           <ChevronRight className="h-5 w-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Decorative elements */}
//       <div className="absolute top-1/3 right-12 z-10 hidden lg:block">
//         <div className="flex rotate-12 transform items-center space-x-2 text-sm text-gray-500">
//           <span className="font-medium whitespace-nowrap">
//             Swipe to see more
//           </span>
//           <svg
//             width="45"
//             height="25"
//             viewBox="0 0 45 25"
//             className="text-gray-400"
//           >
//             <path
//               d="M5 12 Q22 6 40 12"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="3,3"
//               markerEnd="url(#arrowhead)"
//             />
//             <defs>
//               <marker
//                 id="arrowhead"
//                 markerWidth="10"
//                 markerHeight="7"
//                 refX="9"
//                 refY="3.5"
//                 orient="auto"
//               >
//                 <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
//               </marker>
//             </defs>
//           </svg>
//         </div>
//       </div>

//       {/* Bottom left decorative arrow */}
//       <div className="absolute bottom-32 left-12 z-10 hidden lg:block">
//         <div className="flex -rotate-12 transform items-center space-x-2 text-sm text-gray-500">
//           <svg
//             width="35"
//             height="20"
//             viewBox="0 0 35 20"
//             className="text-gray-400"
//           >
//             <path
//               d="M5 10 Q18 4 30 10"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="2,2"
//             />
//           </svg>
//           <span className="font-medium whitespace-nowrap">It's Free</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Demo component with sample data
// export function VideoRingDemo() {
//   const sampleItems = [
//     {
//       id: "1",
//       title: "Coffee Art Creation",
//       thumbnail:
//         "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Food & Beverage",
//     },
//     {
//       id: "2",
//       title: "Urban Photography",
//       thumbnail:
//         "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Photography",
//     },
//     {
//       id: "3",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Beauty & Wellness",
//     },
//     {
//       id: "4",
//       title: "Cooking Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Culinary",
//     },
//     {
//       id: "5",
//       title: "Fashion Content",
//       thumbnail:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Fashion",
//     },
//     {
//       id: "6",
//       title: "Travel Adventure",
//       thumbnail:
//         "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Travel",
//     },
//     {
//       id: "7",
//       title: "Tech Review",
//       thumbnail:
//         "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Technology",
//     },
//     {
//       id: "8",
//       title: "Fitness Workout",
//       thumbnail:
//         "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Health & Fitness",
//     },
//     {
//       id: "9",
//       title: "Art Tutorial",
//       thumbnail:
//         "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Art & Design",
//     },
//     {
//       id: "10",
//       title: "Music Performance",
//       thumbnail:
//         "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Music",
//     },
//     {
//       id: "11",
//       title: "Music Performance",
//       thumbnail:
//         "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Music",
//     },
//     {
//       id: "12",
//       title: "Urban Photography",
//       thumbnail:
//         "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Photography",
//     },
//     {
//       id: "13",
//       title: "Skincare Routine",
//       thumbnail:
//         "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
//       type: "image" as const,
//       category: "Beauty & Wellness",
//     },
//   ];

//   return (
//     <div className="h-screen w-full">
//       <VideoRingSlider
//         items={sampleItems}
//         autoRotate={true}
//         rotationInterval={3500}
//       />
//     </div>
//   );
// }

// export default VideoRingDemo;

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import GalleryHero from "src/_components/sections/Gallery/GalleryHero";

export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  type: "video" | "image";
  category?: string;
}

export interface VideoRingSliderProps {
  items: MediaItem[];
  autoRotate?: boolean;
  rotationInterval?: number;
  containerClassName?: string;
}

export function VideoRingSlider({
  items,
  autoRotate = true,
  rotationInterval = 3000,
  containerClassName = "",
}: VideoRingSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number>(0);
  const dragOffset = useRef<number>(0);
  

  // Handle window resize to adjust mobile vs desktop layouts
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotation timer using useEffect and setInterval (cleanup on unmount)
  const startAutoRotation = useCallback(() => {
    if (!autoRotate || isHovered || isDragging || items.length === 0) return;
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, rotationInterval);
  }, [autoRotate, isHovered, isDragging, rotationInterval, items.length]);

  const stopAutoRotation = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    if (!isHovered && !isDragging) {
      startAutoRotation();
    } else {
      stopAutoRotation();
    }
    return stopAutoRotation;
  }, [
    isHovered,
    isDragging,
    startAutoRotation,
    stopAutoRotation,
    items.length,
  ]);

  // Manual navigation helpers
  const navigateToIndex = (index: number) => {
    if (items.length === 0) return;
    setCurrentIndex(index);
  };
  const navigateNext = () => {
    if (items.length === 0) return;
    navigateToIndex((currentIndex + 1) % items.length);
  };
  const navigatePrev = () => {
    if (items.length === 0) return;
    navigateToIndex((currentIndex - 1 + items.length) % items.length);
  };

  // Touch/drag navigation for mobile
  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    const touch = event.touches[0];
    if (!touch) return;
    startX.current = touch.clientX;
    dragOffset.current = 0;
  };
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    if (!touch) return;
    const currentX = touch.clientX;
    dragOffset.current = currentX - startX.current;
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (Math.abs(dragOffset.current) > threshold) {
      if (dragOffset.current > 0) {
        navigatePrev();
      } else {
        navigateNext();
      }
    }
    dragOffset.current = 0;
  };

  // Toggle play/pause for video cards
  const toggleVideo = (itemId: string, videoElement: HTMLVideoElement) => {
    setPlayingVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        videoElement.pause();
      } else {
        newSet.forEach((id) => {
          if (id !== itemId) {
            const vid = document.querySelector(
              `video[data-id="${id}"]`,
            ) as HTMLVideoElement;
            if (vid) vid.pause();
          }
        });
        newSet.clear();
        newSet.add(itemId);
        videoElement.play();
      }
      return newSet;
    });
  };

  // Compute 3D card transforms based on index offset from center
  // const getCardPosition = (index: number) => {
  //   const isMobile = windowSize.width < 768;
  //   const totalItems = items.length;
  //   const centerIndex = currentIndex;
  //   let offset = index - centerIndex;
  //   // Wrap around circularly
  //   if (offset > totalItems / 2) offset -= totalItems;
  //   if (offset < -totalItems / 2) offset += totalItems;

  //   const cardSpacing = isMobile ? 80 : 200;
  //   const baseWidth = isMobile ? 160 : 200;
  //   const baseHeight = isMobile ? 220 : 300;
  //   const distance = Math.abs(offset) ;

  //   // Default values
  //   let x = offset * cardSpacing;
  //   let y = 0;
  //   let z = 0;
  //   let rotateY = 0;
  //   let opacity = 1;
  //   let scale = 1;
  //   let zIndex = totalItems - distance;

  //   // if (offset === 0) {
  //   //   // Center card: largest and frontmost
  //   //   scale = 1.2;
  //   //   opacity = 1;
  //   //   z = 300;
  //   //   rotateY = 0;
  //   // } else if (distance === 1) {
  //   //   // Immediate neighbors: slightly smaller, slight tilt
  //   //   scale = 1.0;
  //   //   opacity = 0.9;
  //   //   z = 150;
  //   //   rotateY = offset * -30;  // tilt towards center
  //   // } else if (distance === 2) {
  //   //   scale = 0.8;
  //   //   opacity = 0.7;
  //   //   z = 100;
  //   //   rotateY = offset * -45;
  //   // } else {
  //   //   // Farther cards: much smaller / mostly hidden
  //   //   scale = 0.6;
  //   //   opacity = 0.5;
  //   //   z = 50;
  //   //   rotateY = offset > 0 ? -60 : 60;
  //   // }

  //   if (offset === 0) {
  //     // Center card: largest and frontmost
  //     scale = 0.6;
  //     opacity = 1.2;
  //     z = 300;
  //     rotateY = 0;
  //   } else if (distance === 1) {
  //     // Immediate neighbors: slightly smaller, slight tilt
  //     scale = 0.9;
  //     opacity = 0.9;
  //     z = 150;
  //     rotateY = offset * -25; // tilt towards center
  //   } else if (distance === 2) {
  //     scale = 1;
  //     opacity = 0.7;
  //     z = 100;
  //     rotateY = offset * -20;
  //   } else if (distance === 3) {
  //     scale = 1.2;
  //     opacity = 0.6;
  //     z = 100;
  //     rotateY = offset * -18;
  //   } else {
  //     // Farther cards: much smaller / mostly hidden
  //     scale = 0.6;
  //     opacity = 0;
  //     z = 50;
  //     rotateY = offset > 0 ? -60 : 60;
  //   }

  //   return {
  //     x,
  //     y,
  //     z,
  //     scale,
  //     rotateY,
  //     zIndex,
  //     opacity,
  //     width: baseWidth,
  //     height: baseHeight,
  //   };
  // };

  // Compute 3D card transforms based on index offset from center
  // const getCardPosition = (index: number) => {
  //   const isMobile = windowSize.width < 768;
  //   const totalItems = items.length;
  //   const centerIndex = currentIndex;
  //   let offset = index - centerIndex ;

  //   // Wrap around circularly
  //   if (offset > totalItems / 2) offset -= totalItems;
  //   if (offset < -totalItems / 2) offset += totalItems;

  //   // Tuned spacing / sizes to match the reference spacing + visual rhythm
  //   const cardSpacing = isMobile ? 84 : 280; // horizontal gap between card centers
  //   const baseWidth = isMobile ? 140 : 180;
  //   const baseHeight = isMobile ? 200 : 260;

  //  const distance = Math.abs(offset) ;

  //   // Defaults
  //   const x = offset * cardSpacing;
  //   const y = 0;
  //   let z = 0;
  //   let rotateY = 0;
  //   let opacity = 1;
  //   let scale = 1;
  //   let zIndex = 100 - distance; // simpler zIndex that decreases with distance

  //   // Tighter, more natural progression from center -> sides
  //   if (offset === 0) {
  //     // Center card - prominent but not absurdly large
  //     scale = isMobile ? 1.05 : 0.8;
  //     opacity = 1;
  //     z = 400;
  //     rotateY = 0;
  //   } else if (distance === 1) {
  //     // immediate neighbors - slight tilt and slightly smaller
  //     scale = isMobile ? 0.98 : 0.96;
  //     opacity = 0.95;
  //     z = 220;
  //     rotateY = -offset * 12; // tilt towards center (right cards tilt left and vice-versa)
  //   } else if (distance === 2) {
  //     // second neighbors
  //     scale = isMobile ? 0.88 : 1;
  //     opacity = 0.78;
  //     z = 140;
  //     rotateY = -offset * 12;
  //   } else if (distance === 3) {
  //     // third neighbors
  //     scale = isMobile ? 0.78 : 1.2;
  //     opacity = 0.55;
  //     z = 80;
  //     rotateY = -offset * 8;
  //   } else {
  //     // far cards - mostly hidden/flat
  //     scale = isMobile ? 0.68 : 1.3;
  //     opacity = 1;
  //     z = 30;
  //     rotateY = offset > 0 ? -20 : 20;
  //   }

  //   return {
  //     x,
  //     y,
  //     z,
  //     scale,
  //     rotateY,
  //     zIndex,
  //     opacity,
  //     width: baseWidth,
  //     height: baseHeight,
  //   };
  // };


  // Compute 3D card transforms based on index offset from center
const getCardPosition = (index: number) => {
  const isMobile = windowSize.width < 768;
  const totalItems = items.length;
  const centerIndex = currentIndex;
  let offset = index - centerIndex;

  // Wrap around circularly
  if (offset > totalItems / 2) offset -= totalItems;
  if (offset < -totalItems / 2) offset += totalItems;

  // Base sizes (these are the CSS widths/heights before transform scale)
  const baseWidth = isMobile ? 140 : 180;
  const baseHeight = isMobile ? 200 : 260;

  // Spacing gap between scaled card edges
  const baseGap = isMobile ? 10 : 18;

  // Determine scale/opacity/rotateY by distance
  const distance = Math.abs(offset);

  const getVisualScale = (d: number) => {
    if (d === 0) return isMobile ? 0.88 : 0.99;
    if (d === 1) return isMobile ? 1 : 1.1;
    if (d === 2) return isMobile ? 1.3 : 1.3;
    if (d === 3) return isMobile ? 1.5 : 1.5;
    return isMobile ? 0.68 : 0.7;
  };

  const getOpacity = (d: number) => {
    if (d === 0) return 1;
    if (d === 1) return 0.95;
    if (d === 2) return 0.78;
    if (d === 3) return 0.55;
    return 0;
  };

  const getRotateForDistance = (d: number, off: number) => {
    // tilt toward center: right side (positive offset) tilts left (negative rotateY)
    const sign = off > 0 ? -1 : 1;
    if (d === 0) return 0;
    if (d === 1) return sign * (isMobile ? 35 : 24);
    if (d === 2) return sign * (isMobile ? 39 : 29);
    if (d === 3) return sign * (isMobile ? 45 : 38);
    return sign * (isMobile ? 40 : 40);
  };

  // We'll compute positions by accumulating scaled half-widths + gap
  // Limit how many neighbors we compute precisely for performance / layout
  const maxVisible = 4; // compute exact positions for offsets in [-4..4]
  // Precompute scaled widths for offsets [-maxVisible .. maxVisible]
  const scaledWidthMap = new Map<number, number>();
  for (let d = -maxVisible; d <= maxVisible; d++) {
    const s = getVisualScale(Math.abs(d));
    scaledWidthMap.set(d, baseWidth * s);
  }

  // Build cumulative positions (center = 0). 
  // For positive side: x_k = sum_{i=1..k} (halfWidth_{i-1} + halfWidth_{i} + gap)
  const posMap = new Map<number, number>();
  posMap.set(0, 0);
  for (let k = 1; k <= maxVisible; k++) {
    const prev = posMap.get(k - 1) ?? 0;
    const widthPrev = scaledWidthMap.get(k - 1) ?? baseWidth * getVisualScale(Math.abs(k - 1));
    const widthCur = scaledWidthMap.get(k) ?? baseWidth * getVisualScale(Math.abs(k));
    const step = widthPrev / 2 + widthCur / 2 + baseGap;
    posMap.set(k, prev + step);
    posMap.set(-k, -(prev + step)); // mirrored negative side
  }

  // If the offset is outside computed visible range, push it further out evenly
  let x = 0;
  if (Math.abs(offset) <= maxVisible) {
    x = posMap.get(offset) ?? 0;
  } else {
    const sign = offset > 0 ? 1 : -1;
    // position it beyond the last computed visible card
    const lastPos = posMap.get(sign * maxVisible) ?? (sign * (baseWidth * maxVisible + baseGap * maxVisible));
    const extraSteps = Math.abs(offset) - maxVisible;
    // add an approximate extra spacing per extra card (use average scaled width * 0.8)
    const avgExtra = (baseWidth * getVisualScale(maxVisible) * 0.8) + baseGap;
    x = lastPos + sign * extraSteps * avgExtra;
  }

  // Now use the same visualScale to actually animate scale (transform)
  const scale = getVisualScale(distance);
  const opacity = getOpacity(distance);
  const rotateY = getRotateForDistance(distance, offset);

  // Use zIndex based on closeness (center front)
  const zIndex = 200 - distance;

  // Keep the DOM width/height equal to baseWidth/baseHeight — scale affects render
  return {
    x,
    y: 0,
    z: 0,
    scale,
    rotateY,
    zIndex,
    opacity,
    width: baseWidth,
    height: baseHeight,
  };
};


  if (items.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-orange-100 via-pink-50 to-green-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No media items available
          </h2>
          <p className="mt-2 text-gray-500">
            Please add items to display in the slider
          </p>
        </div>
      </div>
    );
  }

  const activeItem = items[currentIndex];

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header (kept as-is) */}
      <div className="absolute top-8 left-1/2 z-10 w-full -translate-x-1/2 transform px-4 text-center md:top-16">
        <GalleryHero />
      </div>

      {/* Cards Container with 3D perspective */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1000 }} // Add perspective for 3D depth
      >
        <div
          className="relative flex h-full w-full items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: "translateY(40px)",
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const isActive = index === currentIndex;
            return (
              <motion.div
                key={`${item.id}-${index}`}
                className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                style={{
                  width: `${position.width}px`,
                  height: `${position.height}px`,
                  zIndex: position.zIndex,
                  transformOrigin: "center center",
                }}
                initial={false}
                animate={{
                  x: position.x,
                  y: position.y,
                  z: position.z,
                  scale: position.scale,
                  rotateY: position.rotateY,
                  opacity: position.opacity,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={() => navigateToIndex(index)}
                whileHover={
                  !isDragging && !isActive
                    ? {
                        scale: position.scale * 1.05,
                        y: position.y - 8,
                        rotateY: position.rotateY,
                      }
                    : {}
                }
              >
                <div className="group relative h-full w-full">
                  {item.type === "video" && item.videoUrl ? (
                    <video
                      className="h-full w-full object-cover"
                      src={item.videoUrl}
                      poster={item.thumbnail}
                      loop
                      muted
                      playsInline
                      data-id={item.id}
                      ref={(el) => {
                        if (el && !playingVideos.has(item.id)) {
                          el.pause();
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Title/category overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
                  >
                    <div className="absolute right-3 bottom-3 left-3">
                      <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      {item.category && (
                        <span className="text-xs text-white/80">
                          {item.category}
                        </span>
                      )}
                    </div>
                    {/* Play/pause button for active video */}
                    {item.type === "video" && item.videoUrl && isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const video = e.currentTarget
                            .closest("div.relative")
                            ?.querySelector("video") as HTMLVideoElement;
                          if (video) toggleVideo(item.id, video);
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                        aria-label={
                          playingVideos.has(item.id)
                            ? "Pause video"
                            : "Play video"
                        }
                      >
                        {playingVideos.has(item.id) ? (
                          <Pause className="h-5 w-5 text-white" />
                        ) : (
                          <Play className="h-5 w-5 text-white" />
                        )}
                      </button>
                    )}
                  </div>
                  {/* Highlight border for active card */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl shadow-lg ring-2 shadow-orange-400/30 ring-orange-400" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Get Started Button (unchanged) */}
      <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 transform text-center">
        <motion.button
          className="rounded-full bg-red-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
        <div className="mt-2 text-sm font-medium text-gray-600">{`It's Free`}</div>
      </div>

      {/* Prev/Next arrows (unchanged) */}
      <div className="absolute top-1/2 left-8 z-10 -translate-y-1/2 transform">
        <button
          onClick={navigatePrev}
          className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
          aria-label="Previous item"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 right-8 z-10 -translate-y-1/2 transform">
        <button
          onClick={navigateNext}
          className="rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
          aria-label="Next item"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Decorative arrows and text (unchanged) */}
      <div className="absolute top-1/3 right-12 z-10 hidden lg:block">
        <div className="flex rotate-12 transform items-center space-x-2 text-sm text-gray-500">
          <span className="font-medium whitespace-nowrap">
            Swipe to see more
          </span>
          <svg
            width="45"
            height="25"
            viewBox="0 0 45 25"
            className="text-gray-400"
          >
            <path
              d="M5 12 Q22 6 40 12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="3,3"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-32 left-12 z-10 hidden lg:block">
        <div className="flex -rotate-12 transform items-center space-x-2 text-sm text-gray-500">
          <svg
            width="35"
            height="20"
            viewBox="0 0 35 20"
            className="text-gray-400"
          >
            <path
              d="M5 10 Q18 4 30 10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="2,2"
            />
          </svg>
          <span className="font-medium whitespace-nowrap">{`It's Free`}</span>
        </div>
      </div>
    </div>
  );
}

// Sample demo usage (unchanged)
export function VideoRingDemo() {
  const sampleItems: MediaItem[] = [
    {
      id: "1",
      title: "Coffee Art",
      thumbnail:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop",
      type: "image",
      category: "Food & Beverage",
    },
    {
      id: "2",
      title: "Urban Photo",
      thumbnail:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
      type: "image",
      category: "Photography",
    },
    {
      id: "3",
      title: "Skincare",
      thumbnail:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
      type: "image",
      category: "Beauty & Wellness",
    },
    {
      id: "4",
      title: "Cooking",
      thumbnail:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
      type: "image",
      category: "Culinary",
    },
    {
      id: "5",
      title: "Fashion",
      thumbnail:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
      type: "image",
      category: "Fashion",
    },
    {
      id: "6",
      title: "Travel",
      thumbnail:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
      type: "image",
      category: "Travel",
    },
    {
      id: "7",
      title: "Tech Review",
      thumbnail:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
      type: "image",
      category: "Technology",
    },
    {
      id: "8",
      title: "Fitness",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      type: "image",
      category: "Health & Fitness",
    },
    {
      id: "9",
      title: "Art Tutorial",
      thumbnail:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
      type: "image",
      category: "Art & Design",
    },
    {
      id: "10",
      title: "Music",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
      type: "image",
      category: "Music",
    },
    {
      id: "11",
      title: "Music 2",
      thumbnail:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=600&fit=crop",
      type: "image",
      category: "Music",
    },
    {
      id: "12",
      title: "Urban Photo 2",
      thumbnail:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
      type: "image",
      category: "Photography",
    },
    {
      id: "13",
      title: "Skincare 2",
      thumbnail:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=600&fit=crop",
      type: "image",
      category: "Beauty & Wellness",
    },
  ];
  return (
    <div className="h-screen w-full">
      <VideoRingSlider
        items={sampleItems}
        autoRotate={true}
        rotationInterval={3500}
      />
    </div>
  );
}

export default VideoRingDemo;
