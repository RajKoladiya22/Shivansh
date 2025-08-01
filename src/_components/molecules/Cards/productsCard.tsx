import { Play } from "lucide-react";
import Link from "next/link";
import { ProductSocialShareButton } from "src/_components/sections/Product/SocialShare";
import { btn_color } from "src/config/constants";

// Define a Review type for clarity
export interface Review {
  averageRating: number;
  reviewCount: number;
}

// Main product interface
export interface Product {
  id: number;
  title: string;
  description: string;
  actualPrice: number;
  salePrice: number;
  image: string; // URL to the product image
  videoId: string; // e.g. a YouTube video ID
  category: string;
  industry: string;
  isTopProduct: boolean;
  isLatest: boolean;
  createdAt: string; // ISO date string, e.g. "2024-01-15"
  features: string[]; // list of key features
  benefits: string[]; // list of benefits
  review: Review; // aggregated review data
  tags: string[]; // free‑form tags
  relatedProductIds: number[]; // IDs of related products
}

export interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Callback when the play button is clicked */
  onVideoPlay: (videoId: string) => void;
  onInquiryClick: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onVideoPlay,
  onInquiryClick,
}: ProductCardProps) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Image and badges container */}
      <div className="group relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
        <button
          onClick={() => onVideoPlay(product.videoId)}
          className="bg-opacity-50 absolute inset-0 flex cursor-pointer items-center justify-center bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="bg-opacity-30 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Ripple */}
              <span className="bg-opacity-3 absolute inset-0 inline-flex animate-ping rounded-full bg-red-600 opacity-75"></span>
              {/* Button */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-(--primery-color) text-white transition-all duration-300 group-hover:scale-110">
                <Play className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </button>
        {product.isTopProduct && (
          <span className="absolute top-2 left-2 rounded bg-[#C50202] px-2 py-1 text-xs font-semibold text-white">
            Top Product
          </span>
        )}
        {product.isLatest && (
          <span className="absolute top-2 right-2 rounded bg-[#FFCCD6] px-2 py-1 text-xs font-semibold text-[#C50202]">
            Latest
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-semibold hover:text-red-700 md:text-lg">
            {product.title}
          </h3>
        </Link>
        <Link href={`/product/${product.id}`}>
          <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
            {product.description}
          </p>
        </Link>

        {/* Pricing section */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-[#C50202]">
            ₹{product.salePrice.toLocaleString()}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              ₹{product.actualPrice.toLocaleString()}
            </span>

            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-600">
              {Math.round(
                ((product.actualPrice - product.salePrice) /
                  product.actualPrice) *
                  100,
              )}
              % OFF
            </span>
          </div>
        </div>

        {/* Enquiry button - always at bottom */}
        {/* <button className="mt-auto w-full transform cursor-pointer rounded-lg bg-[#C50202] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A00303] hover:shadow-[0_6px_12px_rgba(197,2,2,0.25)] focus:ring-2 focus:ring-[#C50202] focus:outline-none md:py-2 md:text-base">
          Enquiry Now
        </button> */}

        <div className="mt-auto flex items-center gap-2">
          <button onClick={() => onInquiryClick(product)} className={`${btn_color} mt-auto w-full transform rounded-lg  px-4 py-2.5 text-sm font-medium md:py-2 md:text-base`}>
            Inquiry Now
          </button>
          {/* <div className="bg-[#C50202] p-1 rounded-lg"> */}
            <ProductSocialShareButton
            product={product}
            variant="minimal"
            showText={false}
            ProID={product.id}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
