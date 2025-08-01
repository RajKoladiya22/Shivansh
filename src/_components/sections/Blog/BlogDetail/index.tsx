"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Eye,
  Heart,
  Share2,
  Tag,
  User,
  ArrowLeft,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { blogPosts } from "public/data/Blog";
import { ContactWidget, RecentPostsWidget } from "../Sidebar";
import { SocialShareModal } from "../SocialShare";

interface Author {
  name: string;
  bio: string;
  image: string;
}

interface Blog {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: Author;
  date: string;
  likes: number;
  views: number;
  isLiked: boolean;
  relatedPosts: Array<number | string>;
}

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

// interface BlogDetailSEOProps {
//   blog: Blog;
// }

// const BlogDetailSEO = ({ blog }: BlogDetailSEOProps) => {
//   const siteUrl =
//     typeof window !== "undefined"
//       ? window.location.origin
//       : "https://shivansh-three.vercel.app";
//   const blogUrl = `${siteUrl}/blog/${blog.id}`;
  
//   // Dynamic OG Image URL - this will generate a card-style image
//   const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  
//   // Fallback image
//   const fallbackImage = `${siteUrl}/images/blog-default-og.png`;
  
//   // Clean excerpt for meta description (remove extra spaces, limit length)
//   const metaDescription = blog.excerpt.length > 155 
//     ? blog.excerpt.substring(0, 155).trim() + "..."
//     : blog.excerpt;

//   // Generate keywords from tags and category
//   const keywords = [
//     blog.category.toLowerCase(),
//     ...blog.tags.map(tag => tag.toLowerCase()),
//     "accounting",
//     "finance",
//     "tax",
//     "GST",
//     "business",
//     "compliance"
//   ].join(", ");

//   // Calculate reading time
//   const wordCount = blog.content ? blog.content.split(" ").length : 500;
//   const readingTime = Math.ceil(wordCount / 200);

//   // Format date for structured data
//   const publishedDate = new Date(blog.date).toISOString();
//   const modifiedDate = publishedDate; // Use same date or track actual modifications

//   return (
//     <Head>
//       {/* Primary Meta Tags */}
//       <title>{blog.title} | Shivansh Infosys</title>
//       <meta name="title" content={`${blog.title} | Shivansh Infosys`} />
//       <meta name="description" content={metaDescription} />
//       <meta name="keywords" content={keywords} />
//       <meta name="author" content={blog.author.name} />
//       <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
//       <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
//       <link rel="canonical" href={blogUrl} />

//       {/* Open Graph / Facebook */}
//       <meta property="og:type" content="article" />
//       <meta property="og:title" content={blog.title} />
//       <meta property="og:description" content={metaDescription} />
//       <meta property="og:image" content={ogImageUrl} />
//       <meta property="og:image:alt" content={`${blog.title} - ${blog.category} article`} />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />
//       <meta property="og:image:type" content="image/png" />
//       <meta property="og:url" content={blogUrl} />
//       <meta property="og:site_name" content={blog.title} />
//       <meta property="og:locale" content="en_US" />
//       <meta property="article:author" content={blog.author.name} />
//       <meta property="article:published_time" content={publishedDate} />
//       <meta property="article:modified_time" content={modifiedDate} />
//       <meta property="article:section" content={blog.category} />
//       {blog.tags.map((tag, index) => (
//         <meta key={index} property="article:tag" content={tag} />
//       ))}

//       {/* Twitter */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={blog.title} />
//       <meta name="twitter:description" content={metaDescription} />
//       <meta name="twitter:image" content={ogImageUrl} />
//       <meta name="twitter:image:alt" content={`${blog.title} - ${blog.category} article`} />
//       <meta name="twitter:site" content="@yourtwitterhandle" />
//       <meta name="twitter:creator" content="@yourtwitterhandle" />

//       {/* Additional SEO Meta Tags */}
//       <meta name="theme-color" content="#C50202" />
//       <meta name="msapplication-TileColor" content="#C50202" />
//       <meta name="application-name" content="Your Blog Name" />
//       <meta name="apple-mobile-web-app-title" content="Your Blog Name" />
      
//       {/* Article specific meta */}
//       <meta name="article:reading_time" content={`${readingTime}`} />
//       <meta name="article:word_count" content={`${wordCount}`} />

//       {/* Preconnect for performance */}
//       <link rel="preconnect" href="https://fonts.googleapis.com" />
//       <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             headline: blog.title,
//             description: metaDescription,
//             image: {
//               "@type": "ImageObject",
//               url: ogImageUrl,
//               width: 1200,
//               height: 630,
//               alt: `${blog.title} - ${blog.category} article`
//             },
//             publisher: {
//               "@type": "Organization",
//               name: `${blog.title}`,
//               description: `${blog.content}`,
//               logo: {
//                 "@type": "ImageObject",
//                 url: `${siteUrl}/logo.png`,
//                 width: 180,
//                 height: 60
//               },
//               url: siteUrl,
//               sameAs: [
//                 "https://twitter.com/yourtwitterhandle",
//                 "https://linkedin.com/company/yourcompany",
//                 "https://facebook.com/yourpage"
//               ]
//             },
//             datePublished: publishedDate,
//             dateModified: modifiedDate,
//             mainEntityOfPage: {
//               "@type": "WebPage",
//               "@id": blogUrl,
//               url: blogUrl,
//               name: blog.title,
//               description: metaDescription
//             },
//             articleSection: blog.category,
//             keywords: blog.tags,
//             wordCount: wordCount,
//             timeRequired: `PT${readingTime}M`,
//             inLanguage: "en-US",
//             isAccessibleForFree: true,
//             interactionStatistic: [
//               {
//                 "@type": "InteractionCounter",
//                 interactionType: "https://schema.org/LikeAction",
//                 userInteractionCount: blog.likes
//               },
//               {
//                 "@type": "InteractionCounter",
//                 interactionType: "https://schema.org/ViewAction",
//                 userInteractionCount: blog.views
//               }
//             ],
//             about: {
//               "@type": "Thing",
//               name: blog.category,
//               description: `Articles and insights about ${blog.category.toLowerCase()}`
//             },
//             mentions: blog.tags.map(tag => ({
//               "@type": "Thing",
//               name: tag
//             }))
//           })
//         }}
//       />

//       {/* Breadcrumb Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             itemListElement: [
//               {
//                 "@type": "ListItem",
//                 position: 1,
//                 name: "Home",
//                 item: siteUrl
//               },
//               {
//                 "@type": "ListItem",
//                 position: 2,
//                 name: "Blog",
//                 item: `${siteUrl}/blog`
//               },
//               {
//                 "@type": "ListItem",
//                 position: 3,
//                 name: blog.category,
//                 item: `${siteUrl}/blog/category/${blog.category.toLowerCase()}`
//               },
//               {
//                 "@type": "ListItem",
//                 position: 4,
//                 name: blog.title,
//                 item: blogUrl
//               }
//             ]
//           })
//         }}
//       />

//       {/* Website Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebSite",
//             name: `${blog.title}`,
//             description: `${blog.excerpt}`,
//             url: siteUrl,
//             potentialAction: {
//               "@type": "SearchAction",
//               target: {
//                 "@type": "EntryPoint",
//                 urlTemplate: `${siteUrl}/search?q={search_term_string}`
//               },
//               "query-input": "required name=search_term_string"
//             },
//             sameAs: [
//               "https://twitter.com/yourtwitterhandle",
//               "https://linkedin.com/company/yourcompany",
//               "https://facebook.com/yourpage"
//             ]
//           })
//         }}
//       />
//     </Head>
//   );
// };

export default function TheBlogDetailPage({ params }: BlogDetailPageProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBlogForShare, setSelectedBlogForShare] = useState<Blog | null>(
    null,
  );

  useEffect(() => {
    //Recent posts (top 4 newest by date)
    setRecentPosts(
      [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4),
    );

    // Find the blog post by ID
    const foundBlog = blogPosts.find(
      (post) => post.id.toString() === params.id,
    );

    if (foundBlog) {
      setBlog(foundBlog);

      // Calculate reading time (average 200 words per minute)
      const wordCount = foundBlog.content.split(" ").length;
      setReadingTime(Math.ceil(wordCount / 200));

      // Get related posts
      const related = blogPosts.filter((post) =>
        foundBlog.relatedPosts.includes(post.id),
      );
      setRelatedBlogs(related);
    }
  }, [params.id]);

  const handleLike = () => {
    if (!blog) return;

    setBlog({
      ...blog,
      isLiked: !blog.isLiked,
      likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
    });
  };

  const handleShare = (blog: Blog) => {
    setSelectedBlogForShare(blog);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedBlogForShare(null);
  };

  // const handleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };

  const handleBackToBlogs = () => {
    router.push("/blog");
  };

  const handleRelatedPostClick = (postId: number | string) => {
    router.push(`/blog/${postId}`);
  };

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEF6FF]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#C50202]">
            <Tag className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Loading...
          </h2>
          <p className="text-gray-600">
            Please wait while we load the article.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen  pt-14 md:pt-20">
        {/* Header */}
        <div className="border-b border-gray-200 ">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <button
              onClick={handleBackToBlogs}
              className="group mb-6 inline-flex items-center gap-2 text-[#C50202] transition-colors hover:text-[#A50202]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Blog</span>
            </button>

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <span>Blog</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#C50202]">{blog.category}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="truncate font-medium text-gray-900">
                {blog.title}
              </span>
            </nav>

            {/* Category Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FCF2F2] px-3 py-1 text-sm font-medium text-[#C50202]">
              <Tag className="h-3 w-3" />
              {blog.category}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  blog.isLiked
                    ? "bg-[#C50202] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${blog.isLiked ? "fill-current" : ""}`}
                />
                <span>{blog.likes}</span>
              </button>

              <button
                onClick={() => handleShare(blog)}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#FCF2F2] hover:text-[#C50202]"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>

              {/* <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isBookmarked
                  ? "bg-[#C50202] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              <span>Save</span>
            </button> */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {/* Featured Image Placeholder */}
                <div className="flex aspect-video items-center justify-center border-b border-gray-100 bg-gradient-to-br from-[#EEF6FF] to-[#FCF2F2] p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#C50202]">
                      <Tag className="h-10 w-10 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-[#C50202]">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-8">
                  {/* Excerpt */}
                  <div className="mb-8 rounded-r-lg border-l-4 border-[#C50202] bg-[#FCF2F2] p-6">
                    <p className="text-lg leading-relaxed font-medium text-gray-700">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <div className="space-y-6 leading-relaxed text-gray-700">
                      {blog.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-base leading-7">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {/* <div className="mt-12 border-t border-gray-200 pt-8">
                  <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-[#FCF2F2] hover:text-[#C50202]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div> */}

                  {/* Action Buttons */}
                  <div className="mt-12 flex items-center gap-3 border-t border-gray-200 pt-8">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        blog.isLiked
                          ? "bg-[#C50202] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${blog.isLiked ? "fill-current" : ""}`}
                      />
                      <span>{blog.likes}</span>
                    </button>

                    <button
                      onClick={() => handleShare(blog)}
                      className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-[#FCF2F2] hover:text-[#C50202]"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>

                    {/* <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isBookmarked
                  ? "bg-[#C50202] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              <span>Save</span>
            </button> */}
                  </div>
                </div>
              </article>

              {/* Author Bio */}
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C50202] to-[#A50202]">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      About {blog.author.name}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {blog.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Table of Contents (if needed) */}
                {/* <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                  <MessageCircle className="h-4 w-4 text-[#C50202]" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleLike}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#FCF2F2] hover:text-[#C50202]"
                  >
                    <Heart className="h-4 w-4" />
                    {blog.isLiked ? "Unlike" : "Like"} this article
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#FCF2F2] hover:text-[#C50202]"
                  >
                    <Share2 className="h-4 w-4" />
                    Share article
                  </button>
                  <button
                    onClick={handleBookmark}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#FCF2F2] hover:text-[#C50202]"
                  >
                    <Bookmark className="h-4 w-4" />
                    {isBookmarked ? "Remove bookmark" : "Bookmark"}
                  </button>
                </div>
              </div> */}

                <ContactWidget />

                <RecentPostsWidget recentPosts={recentPosts} />

                {/* Article Stats */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold text-gray-900">
                    Article Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium">
                        {blog.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Likes</span>
                      <span className="font-medium">{blog.likes}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reading Time</span>
                      <span className="font-medium">{readingTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold text-gray-900">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedBlogs.map((relatedBlog) => (
                  <article
                    key={relatedBlog.id}
                    className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                    onClick={() => handleRelatedPostClick(relatedBlog.id)}
                  >
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#EEF6FF] to-[#FCF2F2] p-4">
                      <div className="text-center">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#C50202]">
                          <Tag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-[#C50202]">
                          {relatedBlog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                        <span>{relatedBlog.date}</span>
                        <span>•</span>
                        <span>{relatedBlog.author.name}</span>
                      </div>

                      <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold text-gray-900 transition-colors hover:text-[#C50202]">
                        {relatedBlog.title}
                      </h3>

                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                        {relatedBlog.excerpt}
                      </p>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {relatedBlog.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {relatedBlog.views}
                          </span>
                        </div>

                        <ExternalLink className="h-4 w-4 text-[#C50202]" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Modal */}
          {selectedBlogForShare && (
            <SocialShareModal
              blog={selectedBlogForShare}
              isOpen={shareModalOpen}
              onClose={handleCloseShareModal}
              currentUrl={
                typeof window !== "undefined" ? window.location.href : ""
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
