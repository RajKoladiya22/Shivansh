"use client";
import React from "react";
import { ThumbsUp, MoreVertical } from "lucide-react";
import Image from "next/image";
import type { CommentCardProps } from "../types/card.type";

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  className = "",
  showLikes = true,
  showTimestamp = true,
  showMoreOptions = true,
  compact = false,
}) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarSize = compact ? "h-8 w-8" : "h-10 w-10";
  const textSize = compact ? "text-sm" : "text-base";
  const authorSize = compact ? "text-sm" : "text-base";

  return (
    <div
      className={`flex space-x-3 border border-red-100 ${compact ? "p-3" : "p-4"} ${className}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {comment.authorProfileImageUrl &&
        comment.authorProfileImageUrl !==
          "https://yt3.ggpht.com/abcd1234/..." ? (
          <Image
            width={40}
            height={40}
            src={comment.authorProfileImageUrl}
            alt={`${comment.author}'s avatar`}
            className={`${avatarSize} rounded-full object-cover`}
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`${avatarSize} items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white ${
            comment.authorProfileImageUrl &&
            comment.authorProfileImageUrl !==
              "https://yt3.ggpht.com/abcd1234/..."
              ? "hidden"
              : "flex"
          }`}
          style={{
            display:
              comment.authorProfileImageUrl &&
              comment.authorProfileImageUrl !==
                "https://yt3.ggpht.com/abcd1234/..."
                ? "none"
                : "flex",
          }}
        >
          <span className={compact ? "text-xs" : "text-sm"}>
            {getInitials(comment.author)}
          </span>
        </div>
      </div>

      {/* Comment Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Author and Timestamp */}
            <div className="mb-1 flex items-center space-x-2">
              <h4 className={`font-semibold text-gray-900 ${authorSize}`}>
                {comment.author}
              </h4>
              {showTimestamp && (
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(comment.publishedAt)}
                </span>
              )}
            </div>

            {/* Comment Text */}
            <div
              className={`leading-relaxed text-gray-700 ${textSize}`}
              dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
            />

            {/* Actions */}
            {showLikes && (
              <div className="mt-2 flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 transition-colors hover:text-blue-600">
                  <ThumbsUp size={compact ? 14 : 16} />
                  <span className="text-xs font-medium">
                    {comment.likeCount > 0 ? comment.likeCount : ""}
                  </span>
                </button>
                <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
                  Reply
                </button>
              </div>
            )}
          </div>

          {/* More Options */}
          {showMoreOptions && (
            <button className="flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <MoreVertical size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
