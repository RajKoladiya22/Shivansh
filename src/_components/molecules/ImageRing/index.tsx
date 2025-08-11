"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import GalleryHero from "src/_components/sections/Gallery/GalleryHero";
import Image from "next/image";

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
  const toggleVideo = async (
    itemId: string,
    videoElement: HTMLVideoElement,
  ) => {
    setPlayingVideos((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        void videoElement.pause();
      } else {
        newSet.forEach((id) => {
          if (id != itemId) {
            const vid = document.querySelector<HTMLVideoElement>(
              `video[data-id="${id}"]`,
            );
            if (vid) void vid.pause();
          }
        });
        newSet.clear();
        newSet.add(itemId);
        void videoElement.play();
      }
      return newSet;
    });
  };

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
      return isMobile ? 0.68 : 1.6;
    };

    const getOpacity = (d: number) => {
      if (d === 0) return 1;
      if (d === 1) return 0.97;
      if (d === 2) return 0.91;
      if (d === 3) return 0.97;
      return 0;
    };

    const getRotateForDistance = (d: number, off: number) => {
      // tilt toward center: right side (positive offset) tilts left (negative rotateY)
      const sign = off > 0 ? -1 : 1;
      if (d === 0) return 0;
      if (d === 1) return sign * (isMobile ? 35 : 29);
      if (d === 2) return sign * (isMobile ? 39 : 39);
      if (d === 3) return sign * (isMobile ? 45 : 49);
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
      const widthPrev =
        scaledWidthMap.get(k - 1) ??
        baseWidth * getVisualScale(Math.abs(k - 1));
      const widthCur =
        scaledWidthMap.get(k) ?? baseWidth * getVisualScale(Math.abs(k));
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
      const lastPos =
        posMap.get(sign * maxVisible) ??
        sign * (baseWidth * maxVisible + baseGap * maxVisible);
      const extraSteps = Math.abs(offset) - maxVisible;
      // add an approximate extra spacing per extra card (use average scaled width * 0.8)
      const avgExtra = baseWidth * getVisualScale(maxVisible) * 0.8 + baseGap;
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

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-red-50 ${containerClassName}`}
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                key={`${item.id}-${index}`}
                className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                style={{
                  width: `${position.width}px`,
                  height: `${position.height}px`,
                  zIndex: position.zIndex,
                  transformOrigin: "center center",
                  // transformOrigin: "top center",
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
                  // ease: [0.25, 0.46, 0.45, 0.94],
                  ease: "linear",
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
                    <Image
                      width={100}
                      height={100}
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
                            ?.querySelector<HTMLVideoElement>("video");
                          if (video) void toggleVideo(item.id, video);
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
      {/* <div className="absolute top-1/2 left-8 z-10 -translate-y-1/2 transform">
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
      </div> */}

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
export function HomeHero2() {
  const sampleItems: MediaItem[] = [
    {
      id: "1",
      title: "Coffee Art",
      thumbnail: "/images/STAFF/SURESH.png",
      type: "image",
      category: "Food & Beverage",
    },
    {
      id: "2",
      title: "Urban Photo",
      thumbnail: "/images/STAFF/ADARSH.png",
      type: "image",
      category: "Photography",
    },
    {
      id: "3",
      title: "Skincare",
      thumbnail: "/images/STAFF/DAS.png",
      type: "image",
      category: "Beauty & Wellness",
    },
    {
      id: "4",
      title: "Cooking",
      thumbnail: "/images/STAFF/HARJEET.png",
      type: "image",
      category: "Culinary",
    },
    {
      id: "5",
      title: "Fashion",
      thumbnail: "/images/STAFF/KRISHNA.png",
      type: "image",
      category: "Fashion",
    },
    {
      id: "6",
      title: "Travel",
      thumbnail: "/images/STAFF/MADHVI.png",
      type: "image",
      category: "Travel",
    },
    {
      id: "7",
      title: "Tech Review",
      thumbnail: "/images/STAFF/POOJA.png",
      type: "image",
      category: "Technology",
    },
    {
      id: "8",
      title: "Fitness",
      thumbnail: "/images/STAFF/PRIA.png",
      type: "image",
      category: "Health & Fitness",
    },
    {
      id: "13",
      title: "Skincare 2",
      thumbnail: "/images/team/hero/hinalMam.png",
      type: "image",
      category: "Beauty & Wellness",
    },
    {
      id: "13",
      title: "Skincare 2",
      thumbnail: "/images/STAFF/HINAL.png",
      type: "image",
      category: "Beauty & Wellness",
    },
  ];
  return (
    <div className="h-screen w-full">
      <VideoRingSlider
        items={sampleItems}
        autoRotate={true}
        rotationInterval={1900}
      />
    </div>
  );
}
