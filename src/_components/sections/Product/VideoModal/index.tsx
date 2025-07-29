import { X } from "lucide-react";

export interface VideoModalProps {
  /** YouTube video ID to embed. If undefined or empty, the modal won't render */
  videoId?: string | null;
  /** Callback to close the modal */
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="relative max-h-[80vh] w-full max-w-4xl rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="h-full w-full rounded-lg"
            allowFullScreen
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};
