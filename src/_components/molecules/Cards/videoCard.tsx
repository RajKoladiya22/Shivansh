import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import type { YouTubeVideo } from "src/_components/sections/types/youtube.type";

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  className = "",
}) => {
  return (
    <div
      key={video.id}
      onClick={() => onPlay(video)}
      className={`group cursor-pointer overflow-hidden rounded-xl border-2 border-red-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none ${className}`}
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

        {/* Hover to show */}
        {/* <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center transition-all duration-300">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
            <Play className="ml-1 h-6 w-6" />
          </div>
        </div> */}

        {/* Normal Show */}
        {/* <div className="bg-opacity-30 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center transition-all duration-300">
          <div className="flex h-14 w-14 scale-100 items-center justify-center rounded-full bg-red-600 text-white opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
            <Play className="ml-1 h-6 w-6" />
          </div>
        </div> */}

        {/* Ping Animation Around the Button */}
        <div className="bg-opacity-30 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Ripple */}
            <span className="bg-opacity-3 absolute inset-0 inline-flex animate-ping rounded-full bg-red-600 opacity-75"></span>
            {/* Button */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-(--primery-color) text-white transition-all duration-300 group-hover:scale-110">
              <Play className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="bg-opacity-80 absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs font-semibold text-white">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{video.view?.toLocaleString() || '0'}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{video.like?.toLocaleString() || '0'}</span>
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 truncate text-sm font-semibold text-gray-900 group-hover:text-red-600">
          {video.title}
        </h3>
        <p className="truncate-2 line-clamp-2 text-xs text-gray-600">
          {video.description}
        </p>
      </div>
    </div>
  );
};

// export default VideoCard;
