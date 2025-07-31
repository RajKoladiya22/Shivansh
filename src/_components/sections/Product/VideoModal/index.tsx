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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className=" max-h-[80vh] w-full max-w-4xl rounded-lg bg-white">
        <button
          onClick={onClose}
          className="bg-black text-white hover:bg-black/50  absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-200"
        >
          <X className="h-6 w-6 text-white" />
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
