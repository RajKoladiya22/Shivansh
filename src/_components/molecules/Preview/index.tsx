"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { PreviewModalProps } from "../types/preview.type";

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  backgroundClassName = "bg-black bg-opacity-9",
  contentClassName = "relative w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl",
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backgroundClassName} ${className}`}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="bg-opacity-50 hover:bg-opacity-80 focus:ring-opacity-50 absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

// Example usage component
// const VideoPreviewExample = () => {
//   const [selectedVideo, setSelectedVideo] = React.useState(null);

//   const sampleVideo = {
//     videoId: 'dQw4w9WgXcQ',
//     title: 'Sample Video Title',
//     description: 'This is a sample video description that demonstrates how the preview modal works with video content.'
//   };

//   const getVideoUrl = (videoId:string) => {
//     return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//   };

//   const openVideo = () => {
//     setSelectedVideo(sampleVideo);
//   };

//   const closeVideo = () => {
//     setSelectedVideo(null);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">PreviewModal Component Demo</h1>

//       {/* Trigger Button */}
//       <button
//         onClick={openVideo}
//         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         Open Video Preview
//       </button>

//       {/* Preview Modal with Video Content */}
//       <PreviewModal
//         isOpen={!!selectedVideo}
//         onClose={closeVideo}
//       >
//         {selectedVideo && (
//           <>
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
//               <p className="leading-relaxed text-gray-600">
//                 {selectedVideo.description}
//               </p>
//             </div>
//           </>
//         )}
//       </PreviewModal>

//       {/* Example with Image Content */}
//       <ImagePreviewExample />
//     </div>
//   );
// };

// Another example with different content type
// const ImagePreviewExample = () => {
//   const [showImagePreview, setShowImagePreview] = React.useState(false);

//   return (
//     <div className="mt-8">
//       <button
//         onClick={() => setShowImagePreview(true)}
//         className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//       >
//         Open Image Preview
//       </button>

//       <PreviewModal
//         isOpen={showImagePreview}
//         onClose={() => setShowImagePreview(false)}
//         contentClassName="relative max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl"
//       >
//         <div className="p-8">
//           <h2 className="text-2xl font-bold mb-4">Sample Image Preview</h2>
//           <div className="bg-gradient-to-br from-blue-400 to-purple-600 h-96 rounded-lg flex items-center justify-center">
//             <p className="text-white text-xl font-semibold">Sample Image Content</p>
//           </div>
//           <p className="mt-4 text-gray-600">
//             This demonstrates how you can use the same PreviewModal component for different types of content.
//           </p>
//         </div>
//       </PreviewModal>
//     </div>
//   );
// };

// export default VideoPreviewExample;
