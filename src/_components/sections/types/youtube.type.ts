export interface Comment {
  id: string;
  author: string;
  authorProfileImageUrl: string;
  textDisplay: string;
  likeCount: number;
  publishedAt: string; // ISO date string
}

export interface YouTubeVideo {
  id: string;
  title: string;
  like?: string;
  view?: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoId: string;
  comments?: Comment[];
}