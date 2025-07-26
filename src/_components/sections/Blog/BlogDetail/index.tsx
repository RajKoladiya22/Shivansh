// "use client";
// import React, { useState, useEffect } from "react";
// import { Heart, Share2, MessageCircle, Eye, Calendar, User, Tag, ArrowLeft, Clock, Bookmark, ChevronUp, Facebook, Twitter, Linkedin, Copy, MessageSquare } from "lucide-react";

// export interface Blog {
//   id: number;
//   title: string;
//   excerpt: string;
//   category: string;
//   author: string;
//   date: string;
//   likes: number;
//   views: number;
//   isLiked: boolean;
// }

// export interface Category {
//   name: string;
//   count: number;
// }

// export interface BlogData {
//   [key: number]: Blog;
// }

// interface ShareModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   blog: Blog;
// }

// interface Heading {
//   level: number;
//   text: string;
//   id: string;
// }

// interface TableOfContentsProps {
//   content: string;
// }

// interface RelatedPostsProps {
//   relatedPostIds: number[];
//   blogData: BlogData;
// }





// // Mock blog data - in real app, this would come from an API
// const blogData = {
//   1: {
//     id: 1,
//     title: "Complete Guide to GST Filing for Small Businesses in 2024",
//     excerpt: "Learn the step-by-step process of GST filing, important deadlines, and common mistakes to avoid. This comprehensive guide covers everything you need to know.",
//     content: `
// # Complete Guide to GST Filing for Small Businesses in 2024

// ## Introduction

// The Goods and Services Tax (GST) system has revolutionized the way businesses handle taxation in India. For small businesses, understanding the GST filing process is crucial for compliance and avoiding penalties. This comprehensive guide will walk you through everything you need to know about GST filing in 2024.

// ## What is GST Filing?

// GST filing is the process of submitting your tax returns to the government, declaring your sales, purchases, and the tax collected and paid during a specific period. All registered businesses must file GST returns regularly to maintain compliance.

// ## Types of GST Returns

// ### GSTR-1: Outward Supplies
// - **Purpose**: Details of all outward supplies of goods or services
// - **Due Date**: 11th of the following month
// - **Frequency**: Monthly for regular taxpayers, Quarterly for small taxpayers

// ### GSTR-3B: Summary Return
// - **Purpose**: Summary of outward supplies, input tax credit, and tax payment
// - **Due Date**: 20th of the following month
// - **Frequency**: Monthly

// ### GSTR-9: Annual Return
// - **Purpose**: Consolidated annual return
// - **Due Date**: 31st December of the following financial year
// - **Frequency**: Annually

// ## Step-by-Step GST Filing Process

// ### Step 1: Gather Required Documents
// Before you begin filing, ensure you have:
// - Sales invoices and bills of supply
// - Purchase invoices and debit/credit notes
// - Bank statements and payment receipts
// - Previous GST return acknowledgments

// ### Step 2: Login to GST Portal
// 1. Visit the official GST portal (www.gst.gov.in)
// 2. Enter your GSTIN and password
// 3. Complete the OTP verification

// ### Step 3: Navigate to Returns Dashboard
// - Click on "Services" → "Returns" → "Returns Dashboard"
// - Select the return period you want to file

// ### Step 4: Fill Return Details
// - **GSTR-1**: Enter details of all outward supplies
// - **GSTR-3B**: Provide summary information and calculate tax liability
// - Verify all entries carefully before submission

// ### Step 5: Pay Tax Dues
// - Calculate your tax liability
// - Make payment through the GST portal
// - Keep payment confirmation for records

// ### Step 6: Submit Return
// - Review all entered information
// - Click "Submit" and download the acknowledgment
// - File the acknowledgment safely for future reference

// ## Important Deadlines for 2024

// | Return Type | Due Date | Late Fee (if applicable) |
// |-------------|----------|-------------------------|
// | GSTR-1 | 11th of next month | ₹50 per day |
// | GSTR-3B | 20th of next month | ₹50 per day |
// | GSTR-9 | 31st December 2024 | ₹100 per day |

// ## Common Mistakes to Avoid

// ### 1. Incorrect GSTIN Details
// Always double-check the GSTIN of your suppliers and customers. Incorrect GSTIN can lead to input tax credit rejection.

// ### 2. Mismatched Invoice Details
// Ensure that invoice numbers, dates, and amounts match exactly with your accounting records.

// ### 3. Late Filing
// File your returns on time to avoid late fees and interest charges. Set up reminders to never miss a deadline.

// ### 4. Incorrect Tax Calculation
// Use the GST calculator or consult with a tax professional to ensure accurate tax calculations.

// ## Benefits of Timely GST Filing

// - **Avoid Penalties**: Timely filing helps you avoid late fees and interest charges
// - **Input Tax Credit**: Claim legitimate input tax credits to reduce your tax burden
// - **Business Credibility**: Maintain good standing with tax authorities
// - **Smooth Operations**: Avoid disruptions in your business operations

// ## Tools and Software for GST Filing

// ### Government Tools
// - GST Portal: Official portal for all GST-related activities
// - Mobile App: GST Mobile app for basic filing operations

// ### Third-Party Software
// - Tally Prime: Comprehensive accounting with GST features
// - ClearTax: Online GST filing platform
// - Zoho Books: Cloud-based accounting with GST compliance

// ## Tips for Small Businesses

// 1. **Maintain Proper Records**: Keep all invoices and documents organized
// 2. **Regular Reconciliation**: Match your books with GST portal data monthly
// 3. **Professional Help**: Consider hiring a CA or tax consultant for complex cases
// 4. **Stay Updated**: Keep track of GST law changes and notifications
// 5. **Use Technology**: Leverage accounting software for accurate and efficient filing

// ## Conclusion

// GST filing doesn't have to be complicated. With proper preparation, understanding of the process, and timely action, small businesses can easily comply with GST requirements. Remember to maintain accurate records, file on time, and seek professional help when needed.

// Stay compliant, stay successful!
//     `,
//     category: "GST",
//     author: "Priya Sharma",
//     authorBio: "Priya is a Chartered Accountant with over 8 years of experience in taxation and compliance. She specializes in GST and helps small businesses navigate complex tax regulations.",
//     authorImage: "PS",
//     date: "July 20, 2024",
//     readTime: "12 min read",
//     likes: 142,
//     views: 1205,
//     comments: 28,
//     isLiked: false,
//     isBookmarked: false,
//     tags: ["GST", "Small Business", "Tax Filing", "Compliance", "2024"],
//     relatedPosts: [2, 5, 3]
//   },
//   2: {
//     id: 2,
//     title: "Tally Prime: Advanced Features You Should Know About",
//     excerpt: "Discover the powerful features of Tally Prime that can streamline your accounting processes and improve business efficiency.",
//     content: `
// # Tally Prime: Advanced Features You Should Know About

// ## Introduction

// Tally Prime has revolutionized business accounting with its intuitive interface and powerful features. Beyond basic bookkeeping, Tally Prime offers advanced capabilities that can significantly enhance your business operations and decision-making processes.

// ## Advanced Inventory Management

// ### Multi-Location Inventory
// Track inventory across multiple locations, warehouses, and godowns with real-time updates and transfers.

// ### Batch and Serial Number Tracking
// Maintain detailed records of products with batch numbers and serial numbers for better traceability.

// ## Advanced Reporting Features

// ### Customizable Reports
// Create custom reports tailored to your business needs with drag-and-drop functionality.

// ### Real-time MIS Reports
// Generate Management Information System reports for better business insights and decision making.

// ## Conclusion

// Tally Prime's advanced features can transform how you manage your business finances and operations.
//     `,
//     category: "Tally",
//     author: "Rajesh Kumar",
//     authorBio: "Rajesh is a Tally expert and business consultant with 10+ years of experience helping businesses optimize their accounting processes.",
//     authorImage: "RK",
//     date: "July 18, 2024",
//     readTime: "8 min read",
//     likes: 98,
//     views: 856,
//     comments: 15,
//     isLiked: true,
//     isBookmarked: true,
//     tags: ["Tally", "Accounting", "Software", "Business"],
//     relatedPosts: [1, 4, 6]
//   }
// };

// const ShareModal: React.FC<ShareModalProps> = ({
//   isOpen,
//   onClose,
//   blog,
// }) => {
//   const [copied, setCopied] = useState(false);
  
//   if (!isOpen) return null;

//   const shareUrl = `${window.location.origin}/blog/${blog.id}`;
//   const shareText = `Check out this article: ${blog.title}`;

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(shareUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const shareOptions = [
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
//       color: 'bg-blue-600'
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
//       color: 'bg-sky-500'
//     },
//     {
//       name: 'LinkedIn',
//       icon: Linkedin,
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
//       color: 'bg-blue-700'
//     },
//     {
//       name: 'WhatsApp',
//       icon: MessageSquare,
//       url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
//       color: 'bg-green-500'
//     }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-bold text-gray-900">Share Article</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             ✕
//           </button>
//         </div>
        
//         <div className="grid grid-cols-2 gap-3 mb-6">
//           {shareOptions.map((option) => (
//             <a
//               key={option.name}
//               href={option.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`${option.color} text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
//             >
//               <option.icon className="w-5 h-5" />
//               <span className="text-sm font-medium">{option.name}</span>
//             </a>
//           ))}
//         </div>
        
//         <div className="border-t pt-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Copy Link</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={shareUrl}
//               readOnly
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
//             />
//             <button
//               onClick={handleCopyLink}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 copied 
//                   ? 'bg-green-500 text-white' 
//                   : 'bg-[#C50202] text-white hover:bg-[#C5020280]'
//               }`}
//             >
//               {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
//   const [headings, setHeadings] = useState<Heading[]>([]);

//  useEffect(() => {
//     // Extract headings from content
//     const headingRegex = /^(#{1,6})\s+(.+)$/gm;
//     const extractedHeadings = [];
//     let match;

//     while ((match = headingRegex.exec(content)) !== null) {
//       const level = match[1]?.length;
//       const text = match[2];
//       const id = text?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
//       extractedHeadings.push({
//         level,
//         text,
//         id
//       });
//     }

//     setHeadings(extractedHeadings);
//   }, [content]);

//   return (
//     <div className="bg-[#FCF2F2] rounded-xl p-6 mb-8">
//       <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
//       <nav className="space-y-2">
//         {headings.map((heading, index) => (
//           <a
//             key={index}
//             href={`#${heading.id}`}
//             className={`block text-sm hover:text-[#C50202] transition-colors ${
//               heading.level === 1 ? 'font-semibold text-gray-900' :
//               heading.level === 2 ? 'font-medium text-gray-800 ml-4' :
//               'text-gray-600 ml-8'
//             }`}
//           >
//             {heading.text}
//           </a>
//         ))}
//       </nav>
//     </div>
//   );
// };

// const RelatedPosts: React.FC<RelatedPostsProps> = ({
//   relatedPostIds,
//   blogData,
// }) => {
//   const relatedPosts = relatedPostIds.map(id => blogData[id]).filter(Boolean);

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//       <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {relatedPosts.map((post) => (
//           <div key={post?.id} className="group cursor-pointer">
//             <div className="aspect-video bg-gradient-to-br from-[#EEF6FF] to-[#FCF2F2] rounded-lg p-4 flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
//               <div className="w-12 h-12 bg-[#C50202] rounded-full flex items-center justify-center">
//                 <Tag className="w-6 h-6 text-white" />
//               </div>
//             </div>
//             <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#C50202] transition-colors">
//               {post?.title}
//             </h4>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Calendar className="w-4 h-4" />
//               <span>{post?.date}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <button
//       className={`fixed bottom-8 right-8 p-3 bg-[#C50202] text-white rounded-full shadow-lg hover:bg-[#C5020280] transition-all z-40 ${
//         isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
//       }`}
//       onClick={scrollToTop}
//     >
//       <ChevronUp className="w-6 h-6" />
//     </button>
//   );
// };

// // Main Blog Detail Component
// export default function BlogDetailPage({ params }) {
//   // In a real app, you'd get the ID from params and fetch data
//   const blogId = params?.id || 1; // Default to 1 for demo
//   const blog = blogData[blogId];
  
//   const [shareModalOpen, setShareModalOpen] = useState(false);
//   const [isLiked, setIsLiked] = useState(blog?.isLiked || false);
//   const [isBookmarked, setIsBookmarked] = useState(blog?.isBookmarked || false);
//   const [likes, setLikes] = useState(blog?.likes || 0);

//   if (!blog) {
//     return (
//       <div className="min-h-screen bg-[#EEF6FF] flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
//           <button
//             onClick={() => window.history.back()}
//             className="bg-[#C50202] text-white px-6 py-3 rounded-lg hover:bg-[#C5020280] transition-all"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     setLikes(isLiked ? likes - 1 : likes + 1);
//   };

//   const handleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   const formatContent = (content) => {
//     return content
//       .split('\n')
//       .map((line, index) => {
//         if (line.startsWith('# ')) {
//           const text = line.substring(2);
//           const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//           return <h1 key={index} id={id} className="text-3xl font-bold text-gray-900 mb-6 mt-8">{text}</h1>;
//         } else if (line.startsWith('## ')) {
//           const text = line.substring(3);
//           const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//           return <h2 key={index} id={id} className="text-2xl font-bold text-gray-900 mb-4 mt-8">{text}</h2>;
//         } else if (line.startsWith('### ')) {
//           const text = line.substring(4);
//           const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//           return <h3 key={index} id={id} className="text-xl font-bold text-gray-900 mb-3 mt-6">{text}</h3>;
//         } else if (line.startsWith('| ')) {
//           // Simple table handling - you might want to enhance this
//           return <div key={index} className="font-mono text-sm bg-gray-50 p-2 rounded mb-2">{line}</div>;
//         } else if (line.startsWith('- ')) {
//           return <li key={index} className="text-gray-700 leading-relaxed mb-1">{line.substring(2)}</li>;
//         } else if (line.trim() === '') {
//           return <br key={index} />;
//         } else if (line.startsWith('**') && line.endsWith('**')) {
//           return <p key={index} className="font-bold text-gray-900 mb-3">{line.slice(2, -2)}</p>;
//         } else {
//           return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
//         }
//       });
//   };

//   return (
//     <div className="min-h-screen bg-[#EEF6FF]">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-2 text-[#C50202] hover:text-[#C5020280] transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-medium">Back to Blog</span>
//           </button>
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               {/* Article Header */}
//               <div className="p-6 md:p-8 border-b border-gray-100">
//                 <div className="flex flex-wrap items-center gap-2 mb-4">
//                   <span className="px-3 py-1 bg-[#C5020233] text-[#C50202] rounded-full text-sm font-medium">
//                     {blog.category}
//                   </span>
//                   {blog.tags.map((tag, index) => (
//                     <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>

//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
//                   {blog.title}
//                 </h1>

//                 <p className="text-lg text-gray-600 mb-6 leading-relaxed">
//                   {blog.excerpt}
//                 </p>

//                 {/* Meta Information */}
//                 <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-[#C50202] text-white rounded-full flex items-center justify-center font-semibold">
//                       {blog.authorImage}
//                     </div>
//                     <span>{blog.author}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{blog.date}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-4 h-4" />
//                     <span>{blog.readTime}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Eye className="w-4 h-4" />
//                     <span>{blog.views} views</span>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={handleLike}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                       isLiked 
//                         ? 'bg-[#C50202] text-white' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202]'
//                     }`}
//                   >
//                     <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//                     <span>{likes}</span>
//                   </button>

//                   <button
//                     onClick={() => setShareModalOpen(true)}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202] transition-all"
//                   >
//                     <Share2 className="w-5 h-5" />
//                     <span>Share</span>
//                   </button>

//                   <button
//                     onClick={handleBookmark}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                       isBookmarked 
//                         ? 'bg-[#ffc700] text-white' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202]'
//                     }`}
//                   >
//                     <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
//                     <span>{isBookmarked ? 'Saved' : 'Save'}</span>
//                   </button>

//                   <div className="flex items-center gap-1 text-gray-500">
//                     <MessageCircle className="w-5 h-5" />
//                     <span>{blog.comments} comments</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Article Content */}
//               <div className="p-6 md:p-8">
//                 <div className="prose prose-lg max-w-none">
//                   {formatContent(blog.content)}
//                 </div>
//               </div>

//               {/* Author Bio */}
//               <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
//                 <div className="flex items-start gap-4">
//                   <div className="w-16 h-16 bg-[#C50202] text-white rounded-full flex items-center justify-center font-bold text-xl">
//                     {blog.authorImage}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-gray-900 mb-2">About {blog.author}</h3>
//                     <p className="text-gray-600 leading-relaxed">{blog.authorBio}</p>
//                   </div>
//                 </div>
//               </div>
//             </article>

//             {/* Related Posts */}
//             <div className="mt-8">
//               <RelatedPosts relatedPostIds={blog.relatedPosts} />
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               <TableOfContents content={blog.content} />
              
//               {/* Quick Stats */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Article Stats</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Views</span>
//                     <span className="font-semibold text-gray-900">{blog.views}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Likes</span>
//                     <span className="font-semibold text-gray-900">{likes}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Comments</span>
//                     <span className="font-semibold text-gray-900">{blog.comments}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Reading Time</span>
//                     <span className="font-semibold text-gray-900">{blog.readTime}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       <ShareModal 
//         isOpen={shareModalOpen} 
//         onClose={() => setShareModalOpen(false)} 
//         blog={blog} 
//       />

//       {/* Scroll to Top */}
//       <ScrollToTop />
//     </div>
//   );
// }