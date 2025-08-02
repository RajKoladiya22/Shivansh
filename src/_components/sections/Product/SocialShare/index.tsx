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
  ShoppingBag,
  Star,
  Tag,
  IndianRupee,
} from "lucide-react";
import { BASE_URL } from "src/config/constants";
import type {
  Product,
  ProductSocialShareButtonProps,
  ProductSocialShareModalProps,
} from "../../types/product.type";

export const ProductSocialShareModal = ({
  product,
  isOpen,
  onClose,
  currentUrl = typeof window !== "undefined" ? window.location.href : "",
  ProID,
}: ProductSocialShareModalProps) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  if (!isOpen) return null;

  let shareUrl: string;
  if (ProID) {
    shareUrl = `${BASE_URL}/product/${ProID}`;
  } else {
    shareUrl = currentUrl;
  }
  const discountPercentage = Math.round(
    ((product.actualPrice - product.salePrice) / product.actualPrice) * 100,
  );
  const hasDiscount = product.salePrice < product.actualPrice;

  // Enhanced share content for products
  const shareTitle = `${product.title} - ${hasDiscount ? `${discountPercentage}% OFF` : "Best Price"}`;
  const shareText = `${product.description}\n\n💰 Price: ₹${product.salePrice.toLocaleString()}${hasDiscount ? ` (was ₹${product.actualPrice.toLocaleString()})` : ""}\n⭐ ${product.review.averageRating}/5 (${product.review.reviewCount} reviews)\n🏷️ ${product.category} | ${product.industry}`;
  const hashtags = [
    ...product.tags,
    product.category.toLowerCase(),
    "deals",
    "shopping",
  ]
    .join(",")
    .replace(/\s+/g, "");

  // Social media share URLs with product-specific content
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle + "\n\n" + shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${shareTitle}\n\n${product.description.substring(0, 100)}...\n\n💰 ₹${product.salePrice.toLocaleString()}${hasDiscount ? ` (${discountPercentage}% OFF!)` : ""}\n⭐ ${product.review.averageRating}/5`)}&hashtags=${encodeURIComponent(hashtags)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`🛍️ *${shareTitle}*\n\n${shareText}\n\n${shareUrl}\n\nCheck it out!`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`,
    instagram: `https://instagram.com/`, // Instagram doesn't support direct sharing with URL
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
    if (platform === "instagram") {
      // For Instagram, copy link and show instruction
      void handleCopyLink();
      alert(
        "Link copied! You can now paste it in your Instagram story or post.",
      );
      return;
    }
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
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/75 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Share2 className="h-5 w-5 text-[#C50202]" />
            Share Product
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Product Preview */}
        <div className="border-b border-gray-100 p-6">
          <div className="rounded-lg border border-gray-100 bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] p-4">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                {hasDiscount && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
                  {product.title}
                </h4>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 text-green-600" />
                    <span className="text-sm font-bold text-green-600">
                      {product.salePrice.toLocaleString()}
                    </span>
                  </div>
                  {hasDiscount && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.actualPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.review.averageRating} (
                      {product.review.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-[#C50202]" />
                    <span className="text-xs font-medium text-[#C50202]">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Options */}
        <div className="p-6">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-900">
            <ShoppingBag className="h-4 w-4 text-[#C50202]" />
            Share this amazing product
          </h4>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {/* Facebook */}
            <button
              onClick={() => handleSocialShare("facebook")}
              className="flex items-center gap-3 rounded-lg bg-[#1877F2] p-3 text-white transition-all hover:scale-105 hover:bg-[#166FE5]"
            >
              <Facebook className="h-5 w-5 fill-current" />
              <span className="font-medium">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              onClick={() => handleSocialShare("twitter")}
              className="flex items-center gap-3 rounded-lg bg-[#1DA1F2] p-3 text-white transition-all hover:scale-105 hover:bg-[#1A91DA]"
            >
              <Twitter className="h-5 w-5 fill-current" />
              <span className="font-medium">Twitter</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleSocialShare("whatsapp")}
              className="flex items-center gap-3 rounded-lg bg-[#25D366] p-3 text-white transition-all hover:scale-105 hover:bg-[#22C55E]"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">WhatsApp</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleSocialShare("linkedin")}
              className="flex items-center gap-3 rounded-lg bg-[#0A66C2] p-3 text-white transition-all hover:scale-105 hover:bg-[#095BB0]"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="font-medium">LinkedIn</span>
            </button>

            {/* Instagram */}
            <button
              onClick={() => handleSocialShare("instagram")}
              className="flex items-center gap-3 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] p-3 text-white transition-all hover:scale-105 hover:opacity-90"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Instagram</span>
            </button>

            {/* Native Share (if available) */}
            {typeof navigator !== "undefined" &&
              typeof navigator.share === "function" && (
                <button
                  onClick={handleNativeShare}
                  className="flex items-center gap-3 rounded-lg bg-gray-600 p-3 text-white transition-all hover:scale-105 hover:bg-gray-700"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">More</span>
                </button>
              )}
          </div>

          {/* Special Offers Highlight */}
          {hasDiscount && (
            <div className="mb-4 rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-3">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">
                  Limited Time: Save ₹
                  {(product.actualPrice - product.salePrice).toLocaleString()} (
                  {discountPercentage}% OFF)
                </span>
              </div>
            </div>
          )}

          {/* Copy Link */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="mb-3 text-sm font-medium text-gray-900">
              Or copy product link
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
                    ? "scale-105 bg-green-500 text-white"
                    : "bg-[#C50202] text-white hover:scale-105 hover:bg-[#A50202]"
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
            <p className="mt-2 text-xs text-gray-500">
              Share this link to help others discover this great product!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductSocialShareButton = ({
  product,
  className = "",
  showText = true,
  variant = "default",
  ProID,
}: ProductSocialShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(isModalOpen);

  const baseClasses = "flex items-center gap-2 transition-all";

  const variantClasses = {
    default:
      "rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]",
    minimal:
      "cursor-pointer rounded-full p-2 text-gray-400 hover:text-[#A50202]",
    prominent:
      "rounded-lg bg-[#C50202] px-6 py-3 text-white font-semibold hover:bg-[#A50202] hover:scale-105 shadow-lg",
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        title="Share this product"
      >
        <Share2 className={variant === "prominent" ? "h-5 w-5" : "h-4 w-4"} />
        {showText && variant !== "minimal" && <span>Share</span>}
      </button>

      <ProductSocialShareModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUrl={typeof window !== "undefined" ? window.location.href : ""}
        ProID={ProID}
      />
    </>
  );
};

// Usage Example Component
export const ProductShareExample = ({ product }: { product: Product }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedProductForShare, setSelectedProductForShare] =
    useState<Product | null>(null);

  const handleShare = () => {
    setSelectedProductForShare(product);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedProductForShare(null);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Method 1: Using the handleShare function */}
      <button
        onClick={handleShare}
        className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:text-[#A50202]"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {/* Method 2: Using the ProductSocialShareButton component */}
      <ProductSocialShareButton
        product={product}
        variant="minimal"
        showText={false}
      />

      {/* Method 3: Prominent share button */}
      <ProductSocialShareButton
        product={product}
        variant="prominent"
        showText={true}
      />

      {/* Social Share Modal */}
      {selectedProductForShare && (
        <ProductSocialShareModal
          product={selectedProductForShare}
          isOpen={shareModalOpen}
          onClose={handleCloseShareModal}
          currentUrl={typeof window !== "undefined" ? window.location.href : ""}
        />
      )}
    </div>
  );
};
