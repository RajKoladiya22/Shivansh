"use client";
import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogHero } from "./BlogHero";
import { CategoriesWidget, ContactWidget, RecentPostsWidget, SearchWidget, TopLikedWidget } from "./Sidebar";

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  views: number;
  isLiked: boolean;
}

export interface Category {
  name: string;
  count: number;
}

// Main Blog Page Component
export default function TheBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Complete Guide to GST Filing for Small Businesses in 2024",
      excerpt: "Learn the step-by-step process of GST filing, important deadlines, and common mistakes to avoid. This comprehensive guide covers everything you need to know.",
      category: "GST",
      author: "Priya Sharma",
      date: "July 20, 2024",
      likes: 142,
      views: 1205,
      isLiked: false
    },
    {
      id: 2,
      title: "Tally Prime: Advanced Features You Should Know About",
      excerpt: "Discover the powerful features of Tally Prime that can streamline your accounting processes and improve business efficiency.",
      category: "Tally",
      author: "Rajesh Kumar",
      date: "July 18, 2024",
      likes: 98,
      views: 856,
      isLiked: true
    },
    {
      id: 3,
      title: "Income Tax Deductions Under Section 80C: A Complete Guide",
      excerpt: "Maximize your tax savings with our detailed guide on Section 80C deductions, including eligible investments and documentation required.",
      category: "Income Tax",
      author: "Anita Patel",
      date: "July 15, 2024",
      likes: 176,
      views: 1456,
      isLiked: false
    },
    {
      id: 4,
      title: "Digital Accounting Trends That Will Shape 2024",
      excerpt: "Stay ahead with the latest digital accounting trends, from AI-powered bookkeeping to cloud-based solutions.",
      category: "Accounting",
      author: "Vikram Singh",
      date: "July 12, 2024",
      likes: 89,
      views: 724,
      isLiked: false
    },
    {
      id: 5,
      title: "How to Prepare for Upcoming GST Audit",
      excerpt: "Essential checklist and documentation requirements for GST audit preparation. Ensure compliance and avoid penalties.",
      category: "GST",
      author: "Meera Joshi",
      date: "July 10, 2024",
      likes: 134,
      views: 967,
      isLiked: true
    },
    {
      id: 6,
      title: "Financial Planning for Startups: Best Practices",
      excerpt: "Critical financial planning strategies every startup should implement for sustainable growth and investor readiness.",
      category: "Finance",
      author: "Arjun Gupta",
      date: "July 8, 2024",
      likes: 211,
      views: 1789,
      isLiked: false
    },
  {
    "id": 13,
    "title": "Major GST Compliance Changes From July 2025",
    "excerpt": "Understand the new 3-year time‑bar rule and why GSTR‑3B will become non‑editable—you must act before the July cut‑off.",
    "category": "GST",
    "author": "Abhijeet Yadav",
    "date": "July 2, 2025",
    "likes": 230,
    "views": 2045,
    "isLiked": false
  },
  {
    "id": 14,
    "title": "Latest GST Updates (May–July 2025): HSN Validation & Table 13 Changes",
    "excerpt": "New rules around HSN dropdown enforcement and mandatory document summary (Table 13) are live on GSTR‑1 from July 2025.",
    "category": "GST",
    "author": "Jupeak Solutions",
    "date": "July 5, 2025",
    "likes": 180,
    "views": 1670,
    "isLiked": true
  },
  {
    "id": 15,
    "title": "GST Filing 2025: Key Regulatory Changes Affecting Corporates",
    "excerpt": "From mandatory MFA and e‑invoicing threshold to changes in GSTR‑6 and ISD rules—navigate the evolving compliance landscape.",
    "category": "Accounting",
    "author": "BC L India",
    "date": "July 2, 2025",
    "likes": 210,
    "views": 2380,
    "isLiked": false
  },
  {
    "id": 16,
    "title": "Karnataka Govt Launches 'Know GST' Campaign Amid UPI‑based Notices",
    "excerpt": "Small traders received GST notices using UPI data; the government is rolling out workshops and helplines to clarify transition rules.",
    "category": "GST",
    "author": "Times of India",
    "date": "July 22, 2025",
    "likes": 145,
    "views": 1120,
    "isLiked": false
  },
  {
    "id": 17,
    "title": "Karnataka CM Offers GST Arrears Waiver if Traders Register",
    "excerpt": "Chief Minister Siddaramaiah pledged to waive pending GST dues if small merchants get registered, resolving the recent compliance crisis.",
    "category": "GST",
    "author": "Economic Times",
    "date": "July 23, 2025",
    "likes": 165,
    "views": 1290,
    "isLiked": true
  },
  {
    "id": 18,
    "title": "UPI Data Used to Identify Unregistered Traders—Govt Steps In",
    "excerpt": "Nearly 14,000 traders identified via QR‑based UPI transactions are being asked to register or face GST notices.",
    "category": "Finance",
    "author": "Indiatimes Worth",
    "date": "July 2025",
    "likes": 190,
    "views": 1543,
    "isLiked": false
  },
  {
    "id": 7,
    "title": "Why GSTR‑3B Will Be Locked and How to Correct via GSTR‑1A",
    "excerpt": "Since GSTR‑3B becomes non‑editable from July 2025, corrections must now go through GSTR‑1A—here’s your step‑by‑step walkthrough.",
    "category": "GST",
    "author": "IndiaFilings",
    "date": "July 7, 2025",
    "likes": 120,
    "views": 900,
    "isLiked": false
  },
  {
    "id": 8,
    "title": "Digital Accounting Trends: AI, Cloud & GST‑compliance Tools in 2025",
    "excerpt": "AI-assisted bookkeeping, real‑time invoice reconciliation and cloud‑based GST filing software lead the way for modern finance.",
    "category": "Accounting",
    "author": "Vikram Singh",
    "date": "July 12, 2025",
    "likes": 98,
    "views": 860,
    "isLiked": false
  },
  {
    "id": 9,
    "title": "Tally Prime vs Zoho Books: What’s Right for Growing SMEs?",
    "excerpt": "We compare accessibility, integration and analytics—discover why some businesses are moving from Tally to cloud tools.",
    "category": "Tally",
    "author": "Rajesh Kumar",
    "date": "July 2025",
    "likes": 132,
    "views": 1124,
    "isLiked": true
  },
  {
    "id": 10,
    "title": "Income Tax Deadline Extended & PAN‑Aadhaar Rules Tightened",
    "excerpt": "With ITR deadline now set to September 15 and Aadhaar mandatory for PAN-linked GST users, here’s what finance teams must prepare.",
    "category": "Finance",
    "author": "Indiatimes",
    "date": "July 2025",
    "likes": 140,
    "views": 1210,
    "isLiked": false
  },
  {
    "id": 11,
    "title": "GSTR‑9 / 9C Filing Open for FY 2023‑24: Do You Need It?",
    "excerpt": "Annual and reconciliation returns are mandatory only above certain turnover thresholds—check eligibility and compliance dates.",
    "category": "Income Tax",
    "author": "CA Prateek Mitruka",
    "date": "October 17, 2024",
    "likes": 75,
    "views": 580,
    "isLiked": false
  },
  {
    "id": 12,
    "title": "How Tally Legacy Users Are Transitioning to Analytics Tools",
    "excerpt": "Many entrepreneurs still rely on Tally but need tools like Zoho or custom UIs to access dashboards and mine old transaction data.",
    "category": "Tally",
    "author": "Discussion in r/personalfinanceindia",
    "date": "March 16, 2025",
    "likes": 220,
    "views": 1650,
    "isLiked": false
  }
  ]);

  const categories = [
    { name: 'All', count: blogs.length },
    { name: 'GST', count: blogs.filter(b => b.category === 'GST').length },
    { name: 'Tally', count: blogs.filter(b => b.category === 'Tally').length },
    { name: 'Income Tax', count: blogs.filter(b => b.category === 'Income Tax').length },
    { name: 'Accounting', count: blogs.filter(b => b.category === 'Accounting').length },
    { name: 'Finance', count: blogs.filter(b => b.category === 'Finance').length }
  ];

  const topLikedBlogs = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 5);
  const recentPosts = [...blogs]
  .sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  .slice(0, 4);


  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const handleLike = (blogId:string | number) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { 
            ...blog, 
            isLiked: !blog.isLiked, 
            likes: blog.isLiked ? blog.likes - 1 : blog.likes + 1 
          }
        : blog
    ));
  };

  const handleShare = (blog : Record<string, any>) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSearch = (term:string) => {
    console.log('Searching for:', term);
  };

  return (
    <div className="min-h-screen bg-[#EEF6FF]">
      <BlogHero />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-gray-600">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map(blog => (
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
              
              <CategoriesWidget
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
              
              <TopLikedWidget topLikedBlogs={topLikedBlogs} />
            </div>
              <div className="sticky top-22 space-y-6 pt-6">

              <RecentPostsWidget recentPosts={recentPosts} />
              
              <ContactWidget />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}















