"use client";
import { useState } from "react";
import {
  Share2,
  X,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Copy,
  Link,
  ExternalLink,
} from "lucide-react";

interface Blog {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    bio: string;
    image: string;
  };
  date: string;
  likes: number;
  views: number;
  isLiked: boolean;
  relatedPosts: Array<number | string>;
}

interface SocialShareModalProps {
  blog: Blog;
  isOpen: boolean;
  onClose: () => void;
  currentUrl?: string;
}

export const SocialShareModal = ({
  blog,
  isOpen,
  onClose,
  currentUrl = window.location.href,
}: SocialShareModalProps) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  if (!isOpen) return null;

  const shareUrl = currentUrl;
  const shareTitle = blog.title;
  const shareText = blog.excerpt;
  const hashtags = blog.tags?.join(",").replace(/\s+/g, "");

  // Social media share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle + " - " + shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&hashtags=${encodeURIComponent(hashtags)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + "\n\n" + shareText + "\n\n" + shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    instagram: `https://instagram.com/${encodeURIComponent(shareUrl)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    const url = shareLinks[platform];
    window.open(
      url,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes",
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Share2 className="h-5 w-5 text-[#C50202]" />
            Share Article
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Article Preview */}
        <div className="border-b border-gray-100 p-6">
          <div className="rounded-lg border border-gray-100 bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#C50202]">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
                  {blog.title}
                </h4>
                <p className="mb-2 line-clamp-2 text-xs text-gray-600">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-[#C50202] px-2 py-1 text-white">
                    {blog.category}
                  </span>
                  <span>by {blog.author?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Options */}
        <div className="p-6">
          <h4 className="mb-4 text-sm font-medium text-gray-900">
            Share on social media
          </h4>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {/* Facebook */}
            <button
              onClick={() => handleSocialShare("facebook")}
              className="flex items-center gap-3 rounded-lg bg-[#1877F2] p-3 text-white transition-colors hover:bg-[#166FE5]"
            >
              <Facebook className="h-5 w-5 fill-current" />
              <span className="font-medium">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              onClick={() => handleSocialShare("twitter")}
              className="flex items-center gap-3 rounded-lg bg-[#1DA1F2] p-3 text-white transition-colors hover:bg-[#1A91DA]"
            >
              <Twitter className="h-5 w-5 fill-current" />
              <span className="font-medium">Twitter</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleSocialShare("whatsapp")}
              className="flex items-center gap-3 rounded-lg bg-[#25D366] p-3 text-white transition-colors hover:bg-[#22C55E]"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleSocialShare("linkedin")}
              className="flex items-center gap-3 rounded-lg bg-[#0A66C2] p-3 text-white transition-colors hover:bg-[#095BB0]"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="font-medium">LinkedIn</span>
            </button>

            {/* instagram */}
            <button
              onClick={() => handleSocialShare("instagram")}
              className="flex items-center gap-3 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] p-3 text-white transition-colors hover:opacity-90"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Instagram</span>
            </button>

            {/* Native Share (if available) */}
            {typeof navigator.share === "function" && (
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-3 rounded-lg bg-gray-600 p-3 text-white transition-colors hover:bg-gray-700"
              >
                <Share2 className="h-5 w-5" />
                <span className="font-medium">More</span>
              </button>
            )}
          </div>

          {/* Copy Link */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="mb-3 text-sm font-medium text-gray-900">
              Or copy link
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full truncate bg-transparent text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  copyStatus === "copied"
                    ? "bg-green-500 text-white"
                    : "bg-[#C50202] text-white hover:bg-[#A50202]"
                }`}
              >
                {copyStatus === "copied" ? (
                  <span className="flex items-center gap-1">✓ Copied</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="h-4 w-4" />
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Share Button Component
interface SocialShareButtonProps {
  blog: Blog;
  className?: string;
  showText?: boolean;
}

export const SocialShareButton = ({
  blog,
  className = "",
  showText = true,
}: SocialShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#FCF2F2] hover:text-[#C50202] ${className}`}
      >
        <Share2 className="h-4 w-4" />
        {showText && <span>Share</span>}
      </button>

      <SocialShareModal
        blog={blog}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
