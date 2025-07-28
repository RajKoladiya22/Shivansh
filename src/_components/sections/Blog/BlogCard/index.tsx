// import { Calendar, Eye, Heart, Share2, Tag, User } from "lucide-react";

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

// interface BlogCardProps {
//   blog: Blog;
//   onLike: (id: number) => void;
//   onShare?: (blog: Blog) => void;
// }

// export const BlogCard = ({ blog, onLike, onShare }: BlogCardProps) => {
//   return (
//     <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
//       <div className="aspect-video bg-gradient-to-br from-[#EEF6FF] to-[#FCF2F2] p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-[#C50202] rounded-full flex items-center justify-center mb-4 mx-auto">
//             <Tag className="w-8 h-8 text-white" />
//           </div>
//           <span className="text-[#C50202] font-semibold">{blog.category}</span>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//           <div className="flex items-center gap-1">
//             <Calendar className="w-4 h-4" />
//             <span>{blog.date}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <User className="w-4 h-4" />
//             <span>{blog.author}</span>
//           </div>
//         </div>
        
//         <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
//           {blog.title}
//         </h3>
        
//         <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
//           {blog.excerpt}
//         </p>
        
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => onLike(blog.id)}
//               className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
//                 blog.isLiked 
//                   ? 'bg-[#C50202] text-white' 
//                   : 'bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202]'
//               }`}
//             >
//               <Heart className={`w-4 h-4 ${blog.isLiked ? 'fill-current' : ''}`} />
//               <span>{blog.likes}</span>
//             </button>
            
//             <div className="flex items-center gap-1 text-gray-500 text-sm">
//               <Eye className="w-4 h-4" />
//               <span>{blog.views}</span>
//             </div>
//           </div>
          
//           <button
//             // onClick={() => onShare(blog)}
//             className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202] transition-all text-sm"
//           >
//             <Share2 className="w-4 h-4" />
//             <span>Share</span>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// };

'use client';
import { useRouter } from "next/navigation";
import { Calendar, Eye, Heart, Share2, Tag, User, ArrowRight } from "lucide-react";

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

interface BlogCardProps {
  blog: Blog;
  onLike: (id: number | string) => void;
  onShare?: (blog: Blog) => void;
}

export const BlogCard = ({ blog, onLike, onShare }: BlogCardProps) => {
  const router = useRouter(); // For Next.js routing
  
  // Alternative: For React Router, use:
  // import { useNavigate } from "react-router-dom";
  // const navigate = useNavigate();

  const handleReadMore = () => {
    // For Next.js:
    router.push(`/blog/${blog.id}`);
    
    // For React Router:
    // navigate(`/blog/${blog.id}`);
    
    // For vanilla routing:
    // window.location.href = `/blog/${blog.id}`;
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video bg-gradient-to-br from-[#EEF6FF] to-[#FCF2F2] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#C50202] rounded-full flex items-center justify-center mb-4 mx-auto">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <span className="text-[#C50202] font-semibold">{blog.category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.author.name}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight cursor-pointer hover:text-[#C50202] transition-colors"
            onClick={handleReadMore}>
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>
        
        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="inline-flex items-center gap-2 text-[#C50202] font-semibold hover:text-[#A50202] transition-colors mb-4 group"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(blog.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                blog.isLiked 
                  ? 'bg-[#C50202] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202]'
              }`}
            >
              <Heart className={`w-4 h-4 ${blog.isLiked ? 'fill-current' : ''}`} />
              <span>{blog.likes}</span>
            </button>
            
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Eye className="w-4 h-4" />
              <span>{blog.views}</span>
            </div>
          </div>
          
          <button
            onClick={() => onShare?.(blog)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-[#FCF2F2] hover:text-[#C50202] transition-all text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};