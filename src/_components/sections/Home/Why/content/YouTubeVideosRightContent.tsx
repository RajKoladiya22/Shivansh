// "use client";
// import { mockVideos } from "public/data/YouTubeVideo";
// import React, { useState, useEffect, useRef, useCallback } from "react";

// interface YouTubeVideo {
//   id: string;
//   title: string;
//   thumbnail: string;
//   duration: string;
//   description: string;
//   videoId: string;
// }

// export const YouTubeVideosRightContent = () => {
//   const [videos, setVideos] = useState<YouTubeVideo[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const videoGridRef = useRef<HTMLDivElement>(null);
//   const itemsPerPage = 6;

//   // Load initial videos
//   useEffect(() => {
//     const initialVideos = mockVideos;
//     setVideos(initialVideos);
//   }, []);

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     if (!videoGridRef.current || isLoading) return;

//     const { scrollTop, clientHeight, scrollHeight } = videoGridRef.current;
//     const scrollPosition = scrollTop + clientHeight;

//     if (scrollPosition >= scrollHeight - 1000) {
//       loadMoreVideos();
//     }
//   }, [isLoading]);

//   // Setup scroll listener
//   useEffect(() => {
//     const gridElement = videoGridRef.current;
//     if (!gridElement) return;

//     const throttledScroll = throttle(handleScroll, 200);
//     gridElement.addEventListener('scroll', throttledScroll);

//     return () => {
//       gridElement.removeEventListener('scroll', throttledScroll);
//     };
//   }, [handleScroll]);

//   const loadMoreVideos = useCallback(() => {
//     setIsLoading(true);

//     setTimeout(() => {
//       const nextPage = page + 1;
//       const newVideos = mockVideos;
//       setVideos(prev => [...prev, ...newVideos]);
//       setPage(nextPage);
//       setIsLoading(false);
//     }, 1000);
//   }, [page]);

//   const playVideo = (video: YouTubeVideo) => {
//     setSelectedVideo(video);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeVideo = () => {
//     setSelectedVideo(null);
//     document.body.style.overflow = 'auto';
//   };

//   const getVideoUrl = (videoId: string) => {
//     return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//   };

//   return (
//     <div className="relative h-full bg-gray-50">
//       {/* Video Grid */}
//       <div
//         ref={videoGridRef}
//         className="h-full overflow-y-auto scroll-smooth"
//         style={{ scrollBehavior: 'smooth' }}
//       >
//         <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               onClick={() => playVideo(video)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   e.preventDefault();
//                   playVideo(video);
//                 }
//               }}
//               className={`group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
//                 selectedVideo?.id === video.id ? 'ring-2 ring-red-500 bg-red-50' : ''
//               }`}
//               role="button"
//               tabIndex={0}
//               aria-label={`Play video: ${video.title}`}
//             >
//               {/* Thumbnail */}
//               <div className="relative aspect-video overflow-hidden">
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   loading="lazy"
//                 />

//                 {/* Play Overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
//                   <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
//                     <i className="fas fa-play text-lg" aria-hidden="true" />
//                   </div>
//                 </div>

//                 {/* Duration Badge */}
//                 <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs font-semibold text-white">
//                   {video.duration}
//                 </div>
//               </div>

//               {/* Video Info */}
//               <div className="p-4">
//                 <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-red-600 sm:text-base">
//                   {video.title}
//                 </h3>
//                 <p className="line-clamp-3 text-xs text-gray-600 sm:text-sm">
//                   {video.description}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* Loading Indicator */}
//           {isLoading && (
//             <div className="col-span-full flex items-center justify-center gap-3 py-8">
//               <div className="h-6 w-6 animate-spin rounded-full border-3 border-gray-200 border-t-red-600" />
//               <span className="text-sm text-gray-600">Loading more videos...</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Video Player Modal */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
//           onClick={closeVideo}
//         >
//           <div
//             className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={closeVideo}
//               className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all duration-200 hover:bg-opacity-80"
//               aria-label="Close video"
//             >
//               <i className="fas fa-times text-lg" />
//             </button>

//             {/* Video Player */}
//             <div className="relative aspect-video">
//               <iframe
//                 src={getVideoUrl(selectedVideo.videoId)}
//                 className="h-full w-full"
//                 frameBorder="0"
//                 allowFullScreen
//                 title={selectedVideo.title}
//               />
//             </div>

//             {/* Video Details */}
//             <div className="p-6">
//               <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
//                 {selectedVideo.title}
//               </h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {selectedVideo.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Throttle utility function
// function throttle<T extends (...args: any[]) => any>(
//   func: T,
//   limit: number
// ): (...args: Parameters<T>) => void {
//   let inThrottle: boolean;
//   return function (this: any, ...args: Parameters<T>) {
//     if (!inThrottle) {
//       func.apply(this, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { mockVideos } from "public/data/YouTubeVideo";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoId: string;
}

export const YouTubeVideosRightContent = () => {
  const [videos] = useState<YouTubeVideo[]>(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const videosPerSlide = 6;
  const totalSlides = Math.ceil(videos.length / videosPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  // Pause auto-play on mouse enter, resume on mouse leave
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const playVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const getVideoUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const getCurrentVideos = () => {
    const startIndex = currentSlide * videosPerSlide;
    return videos.slice(startIndex, startIndex + videosPerSlide);
  };

  return (
    <div className="relative h-full bg-gray-50">
      {/* Slider Container */}
      <div
        className="relative h-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        {/* <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Video Library</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} / {totalSlides}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div> */}

        {/* Video Grid */}
        <div className="relative h-full p-4">
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getCurrentVideos().map((video) => (
              <div
                key={video.id}
                onClick={() => playVideo(video)}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${video.title}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    width={200}
                    height={200}
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Play Overlay */}
                  <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center transition-all duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <Play className="ml-1 h-6 w-6" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="bg-opacity-80 absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-red-600">
                    {video.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-gray-600">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="group absolute top-1/2 left-[-1%] z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors hover:bg-gray-50"
          aria-label="Previous videos"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-red-600" />
        </button>

        <button
          onClick={nextSlide}
          className="group absolute top-1/2 right-[-1%] z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-colors hover:bg-gray-50"
          aria-label="Next videos"
        >
          <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-red-600" />
        </button>

        {/* Auto-play indicator */}
        {/* <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-3 py-1 text-white text-xs">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`} />
          <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
        </div> */}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="bg-opacity-50 hover:bg-opacity-80 absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-200"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video">
              <iframe
                src={getVideoUrl(selectedVideo.videoId)}
                className="h-full w-full"
                frameBorder="0"
                allowFullScreen
                title={selectedVideo.title}
              />
            </div>

            {/* Video Details */}
            <div className="p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                {selectedVideo.title}
              </h2>
              <p className="leading-relaxed text-gray-600">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
