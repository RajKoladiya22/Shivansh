"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { mockVideos } from "public/data/YouTubeVideo";
import { VideoCard } from "./videoCard";
import { ReusableSlider } from "src/_components/molecules/Slider";

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

  return (
    <div className="relative h-full bg-(--bg-pink)">
      <ReusableSlider
        items={videos}
        renderItem={(video:any) => (
          <VideoCard
            key={video.id}
            video={video}
            onPlay={playVideo}
            className="custom-styles" // optional
          />
        )}
        layout="grid"
        rows={2}
        columns={2}
        itemsPerSlide={{
          mobile: 2,
          tablet: 2,
          desktop: 4,
        }}
        autoPlay={true}
        autoPlayInterval={5000}
        showArrows={true}
        showDots={true}
        // arrowPosition="inside"
        gap="1.5rem"
        className="px-13 py-8"

        // items={videos}
        // layout="grid"
        // gridConfig={{
        //   mobile: { rows: 1, columns: 1 }, // 1 item per slide on mobile
        //   tablet: { rows: 2, columns: 2 }, // 4 items per slide on tablet
        //   desktop: { rows: 2, columns: 2 }, // 6 items per slide on desktop
        // }}
        // gap="1rem"
        // autoPlay={true}
        // autoPlayInterval={5000}
        // showArrows={true}
        // showDots={true}
        // pauseOnHover={true}
        // className="w-full"
        // renderItem={(video, index) => (
        //   <VideoCard
        //     key={video.id}
        //     video={video}
        //     onPlay={playVideo}
        //     className="custom-styles" // optional
        //   />
        // )}
        // onSlideChange={(slide) => console.log("Slide changed:", slide)}
      />

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
