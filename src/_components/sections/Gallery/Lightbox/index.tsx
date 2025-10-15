import React, { useCallback, useEffect, useState } from "react";
import { categoryColors, categoryIcons, categoryLabels, type GalleryItem } from "..";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

// Lightbox Component
export function Lightbox({
  isOpen,
  currentItem,
  currentIndex,
  items,
  onClose,
  onPrevious,
  onNext,
}: {
  isOpen: boolean;
  currentItem: GalleryItem | null;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memoized keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrevious, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset image loaded state when item changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentItem]);

  // const handleShare = useCallback(async () => {
  //   if (!currentItem) return;

  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: currentItem.title,
  //         text: currentItem.description,
  //         url: window.location.href,
  //       });
  //     } catch (err) {
  //       console.log("Share cancelled");
  //     }
  //   } else {
  //     // Fallback: copy to clipboard
  //     try {
  //       await navigator.clipboard.writeText(
  //         `${currentItem.title} - ${window.location.href}`,
  //       );
  //       alert("Link copied to clipboard!");
  //     } catch (err) {
  //       console.error("Failed to copy link");
  //     }
  //   }
  // }, [currentItem]);

  // const handleDownload = useCallback(() => {
  //   if (!currentItem) return;

  //   const link = document.createElement("a");
  //   link.href = currentItem.image;
  //   link.download = `${currentItem.title.replace(/\s+/g, "_")}.jpg`;
  //   link.target = "_blank";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }, [currentItem]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
      {/* Close button */}
      <button
        onClick={onClose}
        className="cursor-pointer bg-black text-white hover:bg-black/50  absolute top-4 right-4 z-10 rounded-full  p-3 backdrop-blur-sm transition-all"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Navigation buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute top-35 sm:top-1/2 left-4 z-10 -translate-y-1/2 rounded-full  p-3 bg-[white] text-[red] transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={onNext}
            className="bg-opacity-20 hover:bg-opacity-30  absolute top-35 sm:top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-[white] text-[red] p-3 backdrop-blur-sm transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Main content */}
      <div className="mx-4 max-h-[100vh] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative lg:w-2/3">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div
                  className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300"
                  style={{ borderTopColor: "#C50202" }}
                ></div>
              </div>
            )}
            <Image
              width={1200} 
              height={900} 
              quality={95}
              src={currentItem.image}
              alt={currentItem.title}
              className={`h-64 w-full object-cover transition-opacity duration-300 sm:h-96 lg:h-[600px] ${imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Category Badge on Image */}
            {/* <div className="absolute top-4 left-4">
              <div
                className={`${categoryColors[currentItem.category]} flex items-center gap-2 rounded-full px-3 py-2 font-medium text-white shadow-lg`}
              >
                {React.createElement(categoryIcons[currentItem.category], {
                  className: "w-4 h-4",
                })}
                {categoryLabels[currentItem.category]}
              </div>
            </div> */}
            {currentItem.category !== "all" && (
              <div className="absolute top-4 left-4 opacity-80">
                <div
                  className={`${categoryColors[currentItem.category]} flex items-center gap-2 rounded-full px-3 py-2 font-medium text-white shadow-lg`}
                >
                  {React.createElement(categoryIcons[currentItem.category], {
                    className: "w-4 h-4",
                  })}
                  {categoryLabels[currentItem.category]}
                </div>
              </div>
            )}

            {/* Image counter */}
            <div className="bg-opacity-60 absolute right-4 bottom-4 rounded-full bg-black px-3 py-1 text-sm text-white backdrop-blur-sm">
              {currentIndex + 1} / {items.length}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 lg:w-1/3 lg:p-8">
            <div className="mb-3 text-sm font-medium text-gray-500">
              {currentItem.date}
            </div>

            <h2 className="mb-4 text-2xl leading-tight font-bold text-gray-900 lg:text-3xl">
              {currentItem.title}
            </h2>

            <p className="mb-6 leading-relaxed text-gray-700">
              {currentItem.description}
            </p>

            {/* Tags */}
            <div className="mb-6">
              <div className="mb-2 text-sm font-medium text-gray-500">
                Tags:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            {/* <div className="flex gap-3 border-t pt-6">
              <button
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition-colors hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                style={{ backgroundColor: "#C50202" }}
              >
                <Share className="h-4 w-4" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}