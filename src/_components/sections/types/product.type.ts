import type { ComponentType, SVGProps } from "react";

export interface ReviewItem {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

// Define a Review type for clarity
export interface Review {
  averageRating: number;
  reviewCount: number;
  latestReviews?: ReviewItem[];
  allReviews: ReviewItem[]; // Add this for all reviews
}

export interface ProductSpec {
  key: string
  value: string
}

// Main product interface
export interface Product {
  id: number;
  stepsID: number;
  title: string;
  description: string;
  actualPrice: number;
  salePrice: number;
  image: string;
  introVideoId: string;
  detailedVideoId: string;
  category: string[];
  industry: string[];
  isTopProduct: boolean;
  isLatest: boolean;
  createdAt: string;
  features: string[];
  benefits: string[];
  specs?: ProductSpec[];
  review: Review;
  tags: string[];
  relatedProductIds: number[];
  isActive?: boolean;
}

export interface PriceRange {
  min: string;
  max: string;
}

export type SortBy = "all" | "top" | "latest" | "priceAsc" | "priceDesc" | "newest";
export type ViewMode = "grid" | "list";

export interface SidebarFiltersProps {
  showFilters: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  clearFilters: () => void;
  categories: string[];
  industries: string[];
}

export type TabId = "features" | "benefits" | "specifications" | "reviews" | "faq";

export interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  inquiryType: "general" | "pricing" | "demo" | "support";
  message: string;
  preferredContact: "email" | "phone" | "both";
  urgency: "low" | "medium" | "high";
}

export interface ProductInquiryPopupProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: InquiryFormData & { productId: number | string }) => void;
}

export interface ProductSocialShareModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  currentUrl?: string;
  ProID?: string | number;
}

// Product Share Button Component
export interface ProductSocialShareButtonProps {
  product: Product;
  className?: string;
  showText?: boolean;
  variant?: "default" | "minimal" | "prominent";
  ProID?: string | number;
}

export interface VideoModalProps {
  videoId?: string | null;
  onClose: () => void;
}

export interface ProductCardProps {
  product: Product;
  onVideoPlay: (VideoId: string) => void;
  onInquiryClick: (product: Product) => void;
}

/**
 * A card/listing model describing a "service offering"
 */
export interface StepItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  borderColor: string;
  bgColor: string;
  duration: string;
  status: string;
  details: string[];
}
export interface FlowGroup {
  id: number;
  steps: StepItem[];
}

export interface PurchaseFlowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  stepId: number | null;
}