"use client";
import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogHero } from "./BlogHero";
import {
  CategoriesWidget,
  ContactWidget,
  HrCategoriesWidget,
  RecentPostsWidget,
  TopLikedWidget,
} from "./Sidebar";
import { blogPosts } from "public/data/Blog";
import { SocialShareModal } from "./SocialShare";

interface Author {
  name: string;
  bio: string;
  image: string; // URL to author's profile picture
}

export interface Blog {
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

export interface Category {
  name: string;
  count: number;
}

// Main Blog Page Component
export default function TheBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBlogForShare, setSelectedBlogForShare] = useState<Blog | null>(
    null,
  );

  useEffect(() => {
    setBlogs(blogPosts);
  }, []);

  const categories = [
    { name: "All", count: blogs.length },
    { name: "GST", count: blogs.filter((b) => b.category === "GST").length },
    {
      name: "Tally",
      count: blogs.filter((b) => b.category === "Tally").length,
    },
    {
      name: "Income Tax",
      count: blogs.filter((b) => b.category === "Income Tax").length,
    },
    {
      name: "Accounting",
      count: blogs.filter((b) => b.category === "Accounting").length,
    },
    {
      name: "Finance",
      count: blogs.filter((b) => b.category === "Finance").length,
    },
  ];

  const topLikedBlogs = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);
  const recentPosts = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const handleLike = (blogId: string | number) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              isLiked: !blog.isLiked,
              likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1,
            }
          : blog,
      ),
    );
  };

  // const handleShare = (blog : Blog) => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: blog.title,
  //       text: blog.excerpt,
  //       url: window.location.href
  //     });
  //   } else {
  //     // Fallback to clipboard
  //     navigator.clipboard.writeText(window.location.href);
  //     alert('Link copied to clipboard!');
  //   }
  // };

  // const handleSearch = (term:string) => {
  //   console.log('Searching for:', term);
  // };

  const handleShare = (blog: Blog) => {
    setSelectedBlogForShare(blog);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedBlogForShare(null);
  };

  return (
    <div className="min-h-screen">
      <BlogHero />

      <HrCategoriesWidget
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="bg-gradient-to-t from-white via-red-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  {selectedCategory === "All"
                    ? "Latest Articles"
                    : `${selectedCategory} Articles`}
                </h2>
                <p className="text-gray-600">
                  {filteredBlogs.length} article
                  {filteredBlogs.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onLike={handleLike}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* <SearchWidget onSearch={handleSearch} /> */}
                <RecentPostsWidget recentPosts={recentPosts} />

                <TopLikedWidget topLikedBlogs={topLikedBlogs} />
              </div>
              <div className="sticky top-22 space-y-6 pt-6">
                <CategoriesWidget
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />

                <ContactWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Social Share Modal */}
      {selectedBlogForShare && (
        <SocialShareModal
          blog={selectedBlogForShare}
          isOpen={shareModalOpen}
          onClose={handleCloseShareModal}
          currentUrl={`${window.location.origin}/blog/${selectedBlogForShare.id}`}
        />
      )}
    </div>
  );
}
