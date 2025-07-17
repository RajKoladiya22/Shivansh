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
import React, { useState, useEffect, useRef, useCallback } from "react";
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

// const mockVideos = [
//   {
//     id: "video-0",
//     title: "Important for GSTR-1 Filing from TallyPrime 6.1",
//     thumbnail: "https://img.youtube.com/vi/Ixhablct0Kw/maxresdefault.jpg",
//     duration: "10:21",
//     description: "Documents Summary Important for GSTR-1 Filing from TallyPrime 6.1",
//     videoId: "Ixhablct0Kw"
//   },
//   {
//     id: "video-1",
//     title: "Lock Transaction TallyPrime No Alter",
//     thumbnail: "https://img.youtube.com/vi/aQLWBvdjpII/maxresdefault.jpg",
//     duration: "05:07",
//     description: "Lock Selected Transaction in TallyPrime | No Alter - Delete & Cancel by User",
//     videoId: "aQLWBvdjpII"
//   },
//   {
//     id: "video-2",
//     title: "How to Reset Tally License Activation Password in TallyPrime 6.1",
//     thumbnail: "https://img.youtube.com/vi/x8R1L0oVmMA/maxresdefault.jpg",
//     duration: "01:07",
//     description: "Detailed explanation How to Reset Tally License Activation Password in TallyPrime 6.1",
//     videoId: "x8R1L0oVmMA"
//   },
//   {
//     id: "video-3",
//     title: "TallyPrime 6.1 is LIVE! Upgrade Now 🚀 | Hetansh Academy",
//     thumbnail: "https://img.youtube.com/vi/t-p-dvk7-1U/maxresdefault.jpg",
//     duration: "00:51",
//     description: "Detailed explanation TallyPrime 6.1 is LIVE! Upgrade Now 🚀 | Hetansh Academy",
//     videoId: "t-p-dvk7-1U"
//   },
//   {
//     id: "video-4",
//     title: "TallyPrime 6.1 New Update Full Demo",
//     thumbnail: "https://img.youtube.com/vi/qvdOBkDZFc0/maxresdefault.jpg",
//     duration: "08:46",
//     description: "TallyPrime 6.1 New Update Full Demo | IMS, Edit Log Report, MSME, GSTR-1, Smart Bank Reco",
//     videoId: "qvdOBkDZFc0"
//   },
//   {
//     id: "video-5",
//     title: "TDL FOR TALLY PRIME USERS",
//     thumbnail: "https://img.youtube.com/vi/GYmHhR7-mzQ/maxresdefault.jpg",
//     duration: "02:24",
//     description: "🚀 PARTY ADDRESS BOOK IN TALLY PRIME WITH MULTIPLE FILTER | TDL FOR TALLY PRIME",
//     videoId: "GYmHhR7-mzQ"
//   },
//   {
//     id: "video-6",
//     title: "CSS Flexbox Guide",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "08:30",
//     description: "Detailed explanation of css flexbox guide. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   },
//   {
//     id: "video-7",
//     title: "HTML5 Semantic Elements",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "07:45",
//     description: "Detailed explanation of html5 semantic elements. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   },
//   {
//     id: "video-8",
//     title: "Next.js Basics",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "13:10",
//     description: "Detailed explanation of next.js basics. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   },
//   {
//     id: "video-9",
//     title: "GraphQL vs REST",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "15:20",
//     description: "Detailed explanation of graphql vs rest. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   },
//   {
//     id: "video-10",
//     title: "Using Docker for Development",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "18:05",
//     description: "Detailed explanation of using docker for development. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   },
//   {
//     id: "video-11",
//     title: "Deploying to Vercel",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "10:17",
//     description: "Detailed explanation of deploying to vercel. Learn step-by-step process with practical examples.",
//     videoId: "dQw4w9WgXcQ"
//   }
// ];

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
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 h-full">
            {getCurrentVideos().map((video) => (
              <div
                key={video.id}
                onClick={() => playVideo(video)}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                  <div className="absolute inset-0 flex items-center justify-center  bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs font-semibold text-white">
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
          className="absolute left-[-1%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10 group"
          aria-label="Previous videos"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-[-1%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10 group"
          aria-label="Next videos"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all duration-200 hover:bg-opacity-80"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
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
              <p className="text-gray-600 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};