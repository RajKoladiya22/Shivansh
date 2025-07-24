import type { Comment } from "src/_components/sections/types/youtube.type";

export interface Testimonial {
    id: number;
    name: string;
    title: string;
    rating: number;
    quote: string;
    document: string;
}

export interface TestimonialCardProps {
    testimonial: Testimonial;
}

export interface TestimonialQuoteProps {
    text: string;
    lines?: number;
}

export interface CommentCardProps {
    comment: Comment;
    className?: string;
    showLikes?: boolean;
    showTimestamp?: boolean;
    showMoreOptions?: boolean;
    compact?: boolean;
}

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


// TeamCard Component matching the exact design
export type TeamCardProps = {
    name: string;
    role: string;
    rating: number;
    reviews: number;
    description: string;
    imgSrc: string;
    imagePosition?: "left" | "right";
    compact?: boolean;
    style?: React.CSSProperties;
};