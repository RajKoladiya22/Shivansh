"use client";

import React from "react";
import { ThumbsUp, MoreVertical } from "lucide-react";
import Image from "next/image";

export interface Comment {
  id: string;
  author: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  likeCount: number;
  publishedAt: string; // ISO date string
}

export interface CommentCardProps {
  comment: Comment;
  className?: string;
  showLikes?: boolean;
  showTimestamp?: boolean;
  showMoreOptions?: boolean;
  compact?: boolean;
}

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
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarSize = compact ? "h-8 w-8" : "h-10 w-10";
  const textSize = compact ? "text-sm" : "text-base";
  const authorSize = compact ? "text-sm" : "text-base";

  return (
    <div className={`border border-red-100 flex space-x-3 ${compact ? 'p-3' : 'p-4'} ${className}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {comment.authorProfileImageUrl && comment.authorProfileImageUrl !== "https://yt3.ggpht.com/abcd1234/..." ? (
          <Image
            width={40}
            height={40}
            src={comment.authorProfileImageUrl}
            alt={`${comment.author}'s avatar`}
            className={`${avatarSize} rounded-full object-cover`}
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`${avatarSize} items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium ${
            comment.authorProfileImageUrl && comment.authorProfileImageUrl !== "https://yt3.ggpht.com/abcd1234/..." ? 'hidden' : 'flex'
          }`}
          style={{ display: comment.authorProfileImageUrl && comment.authorProfileImageUrl !== "https://yt3.ggpht.com/abcd1234/..." ? 'none' : 'flex' }}
        >
          <span className={compact ? "text-xs" : "text-sm"}>
            {getInitials(comment.author)}
          </span>
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Author and Timestamp */}
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`font-semibold text-gray-900 ${authorSize}`}>
                {comment.author}
              </h4>
              {showTimestamp && (
                <span className="text-gray-500 text-xs">
                  {formatTimeAgo(comment.publishedAt)}
                </span>
              )}
            </div>

            {/* Comment Text */}
            <div 
              className={`text-gray-700 leading-relaxed ${textSize}`}
              dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
            />

            {/* Actions */}
            {showLikes && (
              <div className="flex items-center mt-2 space-x-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={compact ? 14 : 16} />
                  <span className="text-xs font-medium">
                    {comment.likeCount > 0 ? comment.likeCount : ''}
                  </span>
                </button>
                <button className="text-xs text-gray-600 hover:text-gray-800 font-medium">
                  Reply
                </button>
              </div>
            )}
          </div>

          {/* More Options */}
          {showMoreOptions && (
            <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};