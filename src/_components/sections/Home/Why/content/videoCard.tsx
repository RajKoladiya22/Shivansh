import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoId: string;
}

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  onPlay, 
  className = "" 
}) => {
  return (
    <div
      key={video.id}
      onClick={() => onPlay(video)}
      className={`group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none ${className}`}
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
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-red-600 truncate">
          {video.title}
        </h3>
        <p className="line-clamp-2 text-xs text-gray-600 truncate-2">{video.description}</p>
      </div>
    </div>

    
  );
};

export default VideoCard;