import React from 'react';

export interface Video {
  videoId: string;
  title: string;
  description: string;
}
export interface VideoIframeProps {
  /** Video object to render; if falsy, nothing renders */
  video?: Video;
  /** Returns the URL for the given videoId */
  getVideoUrl: (videoId: string) => string;
  /** Whether to show title + description below the video */
  showDetails?: boolean;
  /** Tailwind or custom class to control aspect ratio */
  aspectRatio?: string;
  /** CSS classes for the <iframe> itself */
  iframeClassName?: string;
  /** CSS classes for the container wrapping the iframe */
  containerClassName?: string;
  /** CSS classes for the details wrapper */
  detailsClassName?: string;
  /** CSS classes for the title element */
  titleClassName?: string;
  /** CSS classes for the description paragraph */
  descriptionClassName?: string;
}
export const VideoIframe : React.FC<VideoIframeProps>  = ({ 
  video,
  getVideoUrl,
  showDetails = true,
  aspectRatio = "aspect-video",
  iframeClassName = "h-full w-full",
  containerClassName = "relative",
  detailsClassName = "bg-white p-6",
  titleClassName = "mb-3 text-xl font-bold text-gray-900 sm:text-2xl",
  descriptionClassName = "leading-relaxed text-gray-600"
}) => {
  if (!video) return null;

  return (
    <>
      {/* Video Player */}
      <div className={`${containerClassName} ${aspectRatio}`}>
        <iframe
          src={getVideoUrl(video.videoId)}
          className={iframeClassName}
          allowFullScreen
          title={video.title}
        />
      </div>

      {/* Video Details */}
      {showDetails && (
        <div className={detailsClassName}>
          <h2 className={titleClassName}>
            {video.title}
          </h2>
          <p className={descriptionClassName}>
            {video.description}
          </p>
        </div>
      )}
    </>
  );
};


{/* <VideoIframe 
  video={selectedVideo}
  getVideoUrl={getVideoUrl}
/> */}


{/* <VideoIframe 
  video={selectedVideo}
  getVideoUrl={getVideoUrl}
  showDetails={false}
/> */}


{/* <VideoIframe 
  video={selectedVideo}
  getVideoUrl={getVideoUrl}
  aspectRatio="aspect-[4/3]"
  titleClassName="text-3xl font-bold text-blue-600"
  descriptionClassName="text-gray-500 italic"
/> */}