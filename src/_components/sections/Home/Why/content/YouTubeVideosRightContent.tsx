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
import { XIcon } from "lucide-react";

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
  const rawVideos = mockVideos as YouTubeVideo[];
  const [videos] = useState<YouTubeVideo[]>(rawVideos);
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
    <div className="relative h-full bg-gradient-to-br from-red-100 to-red-100">
      <ReusableSlider
        items={videos}
        renderItem={(video) => (
          <VideoCard
            key={Math.random().toString(36).substring(2, 15)}
            video={video as YouTubeVideo}
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
        className="px-4 sm:px-13 py-8"
      />

      {/* Video Player Modal */}
      <PreviewModal
        isOpen={!!selectedVideo}
        onClose={closeVideo}
        contentClassName="relative w-full max-w-7xl mx-auto h-[calc(100vh-2rem)] sm:h-[90vh] overflow-hidden rounded-none sm:rounded-xl shadow-2xl bg-white"
        backgroundClassName="bg-black/90 backdrop-blur-sm p-2 sm:p-4"
      >
        {selectedVideo && (
          <div className="flex h-full w-full flex-col lg:flex-row">
            {/* Main Video Section */}
            <div className="flex flex-1 flex-col bg-black lg:flex-[3]">
              {/* Video Header */}
              <div className="flex items-center justify-between bg-black/80 px-4 py-3 text-white">
                <h2 className="truncate pr-2 text-base font-medium sm:text-lg">
                  {selectedVideo.title}
                </h2>
                <button
                  onClick={closeVideo}
                  className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-700"
                  aria-label="Close video"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Responsive Video Container */}
              <div className="relative flex flex-1 items-center justify-center p-2 sm:p-4">
                <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-gray-900 shadow-xl">
                  <VideoIframe
                    video={selectedVideo}
                    getVideoUrl={getVideoUrl}
                    iframeClassName="w-full h-full"
                    showDetails={false}
                  />

                  {/* Video Controls Overlay */}
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button className="bg-black/60 text-white rounded-full p-2 hover:bg-black/80">
                  <PlayPauseIcon className="h-5 w-5" />
                </button>
                <div className="flex space-x-2">
                  <button className="bg-black/60 text-white rounded-full p-2 hover:bg-black/80">
                    <VolumeIcon className="h-5 w-5" />
                  </button>
                  <button className="bg-black/60 text-white rounded-full p-2 hover:bg-black/80">
                    <FullscreenIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div> */}
                </div>
              </div>

              {/* Video Metadata */}
              {/* <div className="px-4 py-3 bg-gray-900 text-white text-sm border-t border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{selectedVideo.creator}</span>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-blue-300">
                <ThumbsUpIcon className="h-4 w-4" />
                <span>{selectedVideo.likes || 0}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-300">
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
          <p className="text-gray-300 line-clamp-2">
            {selectedVideo.description || "No description available"}
          </p>
        </div> */}
            </div>

            {/* Comments Section */}
            <div className="flex h-[40vh] w-full flex-col border-t border-gray-200 bg-white lg:h-full lg:w-80 lg:border-t-0 lg:border-l xl:w-96">
              {/* Comments Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
                <h3 className="text-base font-medium text-gray-900">
                  Comments{" "}
                  <span className="text-gray-500">({commentItems.length})</span>
                </h3>
                {/* <button className="p-1 rounded hover:bg-gray-100">
            <RefreshCwIcon className="h-5 w-5 text-gray-500" />
          </button> */}
              </div>

              {/* Comments Content */}
              <div className="relative flex-1 overflow-hidden">
                {commentItems.length > 0 ? (
                  <div className="absolute inset-0">
                    <ImageSlider
                      type="component"
                      items={commentItems}
                      orientation="vertical"
                      direction="up"
                      speed="slow"
                      pauseOnHover={true}
                      showFadeEffect={false}
                      // fadeWidth="50px"
                      backgroundColor="white"
                      spacing="md"
                      verticalHeight="100%"
                      className="h-full px-3 py-2"
                      containerClassName="h-full image-slider-container"
                    />
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-3">
                      <svg
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h4 className="mb-1 text-lg font-medium text-gray-700">
                      No comments yet
                    </h4>
                    <p className="mb-4 max-w-xs text-sm text-gray-500">
                      Be the first to share your thoughts about this video
                    </p>
                    {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add Comment
              </button> */}
                  </div>
                )}
              </div>

              {/* Add Comment Form (Always visible) */}
              {/* <div className="border-t border-gray-200 p-3 bg-white">
          <div className="flex space-x-2">
            <div className="flex-shrink-0">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            </div>
            <div className="flex-1 flex">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg text-sm font-medium transition-colors">
                Post
              </button>
            </div>
          </div>
        </div> */}
            </div>

            {/* Scrollbar styling */}
            <style jsx>{`
              :global(.image-slider-container) {
                scrollbar-width: thin;
                scrollbar-color: #cbd5e0 transparent;
              }
              :global(.image-slider-container::-webkit-scrollbar) {
                width: 6px;
              }
              :global(.image-slider-container::-webkit-scrollbar-track) {
                background: transparent;
              }
              :global(.image-slider-container::-webkit-scrollbar-thumb) {
                background-color: #d1d5db;
                border-radius: 4px;
              }
              :global(.image-slider-container::-webkit-scrollbar-thumb:hover) {
                background-color: #9ca3af;
              }

              /* Mobile optimizations */
              @media (max-width: 640px) {
                :global(.image-slider-container::-webkit-scrollbar) {
                  width: 4px;
                }
              }
            `}</style>
          </div>
        )}
      </PreviewModal>
    </div>
  );
};
