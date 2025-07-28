import { Heart, Calendar, Search, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

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

interface SearchWidgetProps {
  onSearch: (searchTerm: string) => void;
}

interface CategoriesWidgetProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryName: string) => void;
}

interface TopLikedWidgetProps {
  topLikedBlogs: Pick<Blog, 'id' | 'title' | 'likes'>[];
}

interface RecentPostsWidgetProps {
  recentPosts: Pick<Blog, 'id' | 'title' | 'date'>[];
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Search Articles</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C5020233] focus:border-[#C50202] transition-all"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <button
          onClick={() => onSearch(searchTerm)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-[#C50202] text-white rounded-md hover:bg-[#C5020280] transition-all text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export const CategoriesWidget: React.FC<CategoriesWidgetProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
              selectedCategory === category.name
                ? 'bg-[#C50202] text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]'
            }`}
          >
            <span className="font-medium">{category.name}</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.name 
                ? 'bg-white text-[#C50202]' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const TopLikedWidget: React.FC<TopLikedWidgetProps> = ({
  topLikedBlogs,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Most Liked</h3>
      <div className="space-y-4">
        {topLikedBlogs.map((blog, index) => (
          <div key={blog.id} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#C50202] text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                {blog.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 fill-current text-[#C50202]" />
                <span>{blog.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RecentPostsWidget: React.FC<RecentPostsWidgetProps> = ({
  recentPosts,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
              {post.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContactWidget = () => {
  return (
    <div className="bg-gradient-to-br from-[#C50202] to-[#C5020280] rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Contact Us</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5" />
          <span className="text-sm">+91 98765 43210</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5" />
          <span className="text-sm">info@shivanshinfosys.com</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <span className="text-sm">Mumbai, India</span>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
          <Facebook className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
          <Twitter className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
          <Linkedin className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
          <Instagram className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};