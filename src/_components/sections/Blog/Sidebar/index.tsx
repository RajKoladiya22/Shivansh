import {
  Heart,
  Calendar,
  Search,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

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
  topLikedBlogs: Pick<Blog, "id" | "title" | "likes">[];
}

interface RecentPostsWidgetProps {
  recentPosts: Pick<Blog, "id" | "title" | "date">[];
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Search Articles</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-10 transition-all focus:border-[#C50202] focus:ring-2 focus:ring-[#C5020233]"
        />
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <button
          onClick={() => onSearch(searchTerm)}
          className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-md bg-[#C50202] px-3 py-1 text-sm text-white transition-all hover:bg-[#C5020280]"
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
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all ${
              selectedCategory === category.name
                ? "bg-[#C50202] text-white"
                : "bg-gray-50 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
            }`}
          >
            <span className="font-medium">{category.name}</span>
            <span
              className={`rounded-full px-2 py-1 text-sm ${
                selectedCategory === category.name
                  ? "bg-white text-[#C50202]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export const HrCategoriesWidget: React.FC<CategoriesWidgetProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      {/* <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3> */}
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`m-0 rounded-lg p-2 text-left transition-all ${
              selectedCategory === category.name
                ? "bg-[#C50202] text-white"
                : "bg-gray-50 text-gray-700 hover:bg-[#FCF2F2] hover:text-[#C50202]"
            }`}
          >
            <span className="pr-2 font-medium">{category.name}</span>
            <span
              className={`rounded-full px-2 py-1 text-sm ${
                selectedCategory === category.name
                  ? "bg-white text-[#C50202]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
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
  const pathname = usePathname();
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Most Liked</h3>
      <div className="space-y-4">
        {topLikedBlogs.map((blog, index) => {
          const href = pathname === '/blog' ? `/blog/${blog.id}` : `/blog/${blog.id}`;
          return (
            <div key={blog.id} className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#C50202] text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={href}>
                  <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-red-600">
                    {blog.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Heart className="h-3 w-3 fill-current text-[#C50202]" />
                  <span>{blog.likes} likes</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RecentPostsWidget: React.FC<RecentPostsWidgetProps> = ({
  recentPosts,
}) => {
  const pathname = usePathname();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.map((post) => {
          
          const href = pathname === '/blog' ? `/blog/${post.id}` : `/blog/${post.id}`;


          return (
            <div
              key={post.id}
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <Link href={href}>
                <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-red-600">
                  {post.title}
                </h4>
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ContactWidget = () => {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#C50202] to-[#C5020299] p-6 text-white">
      <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5" />
          <span className="text-sm">+91 8141703007</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5" />
          <span className="text-sm">info@shivanshinfosys.com</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">Gujarat, India</span>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-green-500 transition-all">
          <FaWhatsapp className="h-4 w-4" />
        </button>
        <button className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-500 transition-all">
          <FaFacebook className="h-4 w-4" />
        </button>
        <button className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-700 transition-all">
          <FaYoutube className="h-4 w-4" />
        </button>
        <button className="bg-opacity-20 hover:bg-opacity-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-600 transition-all">
          <FaInstagram className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
