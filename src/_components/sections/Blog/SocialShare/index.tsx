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
  currentUrl = window.location.href 
}: SocialShareModalProps) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  if (!isOpen) return null;

  const shareUrl = currentUrl;
  const shareTitle = blog.title;
  const shareText = blog.excerpt;
  const hashtags = blog.tags.join(',').replace(/\s+/g, '');

  // Social media share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle + ' - ' + shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&hashtags=${encodeURIComponent(hashtags)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + '\n\n' + shareText + '\n\n' + shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    const url = shareLinks[platform];
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
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
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#C50202]" />
            Share Article
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Article Preview */}
        <div className="p-6 border-b border-gray-100">
          <div className="bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] rounded-lg p-4 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#C50202] rounded-lg flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                  {blog.title}
                </h4>
                <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="bg-[#C50202] text-white px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <span>by {blog.author.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Options */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Share on social media</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Facebook */}
            <button
              onClick={() => handleSocialShare('facebook')}
              className="flex items-center gap-3 p-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5 fill-current" />
              <span className="font-medium">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              onClick={() => handleSocialShare('twitter')}
              className="flex items-center gap-3 p-3 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5 fill-current" />
              <span className="font-medium">Twitter</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleSocialShare('whatsapp')}
              className="flex items-center gap-3 p-3 bg-[#25D366] hover:bg-[#22C55E] text-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="flex items-center gap-3 p-3 bg-[#0A66C2] hover:bg-[#095BB0] text-white rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </button>

            {/* Telegram */}
            <button
              onClick={() => handleSocialShare('telegram')}
              className="flex items-center gap-3 p-3 bg-[#0088CC] hover:bg-[#0077B5] text-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Telegram</span>
            </button>

            {/* Native Share (if available) */}
            {typeof navigator.share === "function" && (
              <button
                onClick={handleNativeShare}
                className="flex items-center gap-3 p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">More</span>
              </button>
            )}
          </div>

          {/* Copy Link */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Or copy link</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="w-full bg-transparent text-sm text-gray-700 truncate focus:outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  copyStatus === "copied"
                    ? "bg-green-500 text-white"
                    : "bg-[#C50202] hover:bg-[#A50202] text-white"
                }`}
              >
                {copyStatus === "copied" ? (
                  <span className="flex items-center gap-1">
                    ✓ Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-4 h-4" />
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
  showText = true 
}: SocialShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202] transition-all text-sm font-medium ${className}`}
      >
        <Share2 className="w-4 h-4" />
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