"use client";
import React, { useState } from "react";
import { mockVideos } from "public/data/YouTubeVideo";
import {
  CommentCard,
  ImageSlider,
  VideoCard,
  ReusableSlider,
  PreviewModal,
  VideoIframe,
} from "src/_components/molecules";
import { useMediaQuery } from "react-responsive";

interface Comment {
  id: string;
  author: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  likeCount: number;
  publishedAt: string; // ISO date string
}

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoId: string;
  comments?: Comment[];
}
const transformCommentsForSlider = (comments: Comment[]) => {
  return comments.map((comment) => ({
    id: parseInt(comment.id.replace(/\D/g, "")) || Math.random() * 1000, // Extract numbers or use random
    component: CommentCard,
    props: {
      comment,
      compact: true, // Use compact version for slider
      className:
        "bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow",
    },
  }));
};

export const YouTubeVideosRightContent = () => {
  const [videos] = useState<YouTubeVideo[]>(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

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

  const commentItems = selectedVideo?.comments
    ? transformCommentsForSlider(selectedVideo.comments)
    : [];

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const layoutType = isMobile ? "column" : "grid";

  return (
    <div className="relative h-full bg-(--bg-pink)">
      <ReusableSlider
        items={videos}
        renderItem={(video: any) => (
          <VideoCard
            key={video.id}
            video={video}
            onPlay={playVideo}
            className="custom-styles" // optional
          />
        )}
        layout={layoutType}
        rows={2}
        columns={2}
        itemsPerSlide={{
          mobile: 2,
          tablet: 2,
          desktop: 4,
        }}
        autoPlay={true}
        autoPlayInterval={5000}
        showArrows={false}
        showDots={true}
        // arrowPosition="inside"
        gap="1.5rem"
        className="px-13 py-8"
      />

      {/* Video Player Modal */}
      {/* Video Player Modal */}
      <PreviewModal
        isOpen={!!selectedVideo}
        onClose={closeVideo}
        contentClassName="relative w-full max-w-7xl mx-auto h-[calc(100vh-2rem)] sm:h-[90vh] overflow-hidden rounded-none sm:rounded-xl shadow-2xl bg-white"
        backgroundClassName="bg-black bg-opacity-95 p-2 sm:p-4"
      >
        {selectedVideo && (
          <div className="flex h-full w-full flex-col lg:flex-row">
            {/* Video Section */}
            <div className="flex flex-1 items-center justify-center bg-black lg:flex-[3]">
              <div className="relative flex h-full w-full items-center justify-center">
                {/* Centered video container with aspect ratio */}
                <div className="relative w-full max-w-4xl">
                  <div className="aspect-video w-full">
                    <VideoIframe
                      video={selectedVideo}
                      getVideoUrl={getVideoUrl}
                      iframeClassName="w-full h-full object-contain rounded-lg"
                      showDetails={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex h-[35vh] w-full flex-shrink-0 border-t border-gray-200 bg-white lg:h-full lg:w-80 lg:border-t-0 lg:border-l xl:w-96">
              {/* Header for mobile */}
              <div className="flex w-full flex-col">
                <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50 px-3 py-2 lg:hidden">
                  <h3 className="text-sm font-medium text-gray-900">
                    Comments
                  </h3>
                </div>

                {/* Comments Content */}
                <div className="flex-1 overflow-hidden">
                  {commentItems.length > 0 ? (
                    <div className="h-full">
                      <ImageSlider
                        type="component"
                        items={commentItems}
                        orientation="vertical"
                        direction="up"
                        speed="slow"
                        pauseOnHover={true}
                        showFadeEffect={false}
                        fadeWidth="lg"
                        backgroundColor="white"
                        spacing="sm"
                        verticalHeight="100%"
                        className="h-full px-2 py-2 lg:px-4 lg:py-4"
                        containerClassName="h-full image-slider-container"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-gray-500">
                      <div className="text-center">
                        <svg
                          className="mx-auto mb-3 h-8 w-8 text-gray-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          No comments yet
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Be the first to comment!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Scrollbar styling */}
              <style jsx>{`
                :global(.image-slider-container) {
                  scrollbar-width: thin;
                  scrollbar-color: #cbd5e0 transparent;
                }
                :global(.image-slider-container::-webkit-scrollbar) {
                  width: 4px;
                }
                :global(.image-slider-container::-webkit-scrollbar-track) {
                  background: transparent;
                }
                :global(.image-slider-container::-webkit-scrollbar-thumb) {
                  background-color: #d1d5db;
                  border-radius: 2px;
                }
                :global(
                  .image-slider-container::-webkit-scrollbar-thumb:hover
                ) {
                  background-color: #9ca3af;
                }

                /* Mobile optimizations */
                @media (max-width: 640px) {
                  :global(.image-slider-container::-webkit-scrollbar) {
                    width: 3px;
                  }
                }

                /* Ensure proper touch scrolling on mobile */
                :global(.image-slider-container) {
                  -webkit-overflow-scrolling: touch;
                  overscroll-behavior: contain;
                }
              `}</style>
            </div>
          </div>
        )}
      </PreviewModal>
    </div>
  );
};
