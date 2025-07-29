"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Play,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
  Truck,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { ProductsList } from "public/data/Product";
import type { Product } from "..";
import Link from "next/link";
import Image from "next/image";

type TabId = "features" | "benefits" | "specifications" | "reviews";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const tabs: { id: TabId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "benefits", label: "Benefits" },
  { id: "specifications", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
];

export const TheProductDetailPage: React.FC<ProductDetailPageProps> = ({
  params,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>("features");
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const prod = ProductsList.find((p) => p.id.toString() === params.id);
    setProduct(prod);
  }, [params.id]);

  //   console.log("product", product);

  // don't try to build images array until product is loaded
  const productImages = product
    ? [
        product.image,
        `${product.image}&variant=1`,
        `${product.image}&variant=2`,
        `${product.image}&variant=3`,
      ]
    : [];

  const relatedProducts = product
    ? ProductsList.filter((p) => product.relatedProductIds.includes(p.id))
    : [];

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <button
            onClick={() => window.history.back()}
            className="text-[#C50202] hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    // if (navigator.share) {
    //   navigator.share({
    //     title: product.title,
    //     text: product.description,
    //     url: window.location.href,
    //   });
    // } else {
    //   navigator.clipboard.writeText(window.location.href);
    //   alert("Product link copied to clipboard!");
    // }
  };

  const handleEnquiry = () => {
    // Handle enquiry submission
    console.log("Enquiry for product:", product.id, "Quantity:", quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Navigation Bar */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`rounded-full p-2 transition-colors ${
                  isFavorite
                    ? "bg-red-50 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="rounded-full p-2 text-gray-400 hover:text-gray-600"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                width={100}
                height={100}
                src={productImages[selectedImageIndex] ?? ''}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              {/* Video Play Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20"
              >
                <div className="rounded-full bg-white/90 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-8 w-8 text-[#C50202]" />
                </div>
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isTopProduct && (
                  <span className="rounded-full bg-[#C50202] px-3 py-1 text-sm font-medium text-white">
                    Top Product
                  </span>
                )}
                {product.isLatest && (
                  <span className="rounded-full bg-[#FFCCD6] px-3 py-1 text-sm font-medium text-[#C50202]">
                    Latest
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
                  {Math.round(
                    ((product.actualPrice - product.salePrice) /
                      product.actualPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index
                      ? "border-[#C50202]"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-500">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {product.industry}
                </span>
              </div>

              <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.review.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {product.review.averageRating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.review.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-3xl font-bold text-[#C50202]">
                  ₹{product.salePrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.actualPrice.toLocaleString()}
                </span>
              </div>

              <div className="mb-4 text-sm text-green-600">
                You save ₹
                {(product.actualPrice - product.salePrice).toLocaleString()}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="border-x px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEnquiry}
                  className="w-full rounded-lg bg-[#C50202] py-3 font-medium text-white transition-colors hover:bg-[#C5020280]"
                >
                  Send Enquiry
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm text-white transition-colors hover:bg-green-700">
                    <Phone className="h-4 w-4" />
                    Call
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm text-white transition-colors hover:bg-blue-700">
                    <Mail className="h-4 w-4" />
                    Email
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-green-500 py-2 text-sm text-white transition-colors hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Quality Assured</div>
                  <div className="text-xs text-gray-500">
                    Certified Products
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Truck className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Fast Delivery</div>
                  <div className="text-xs text-gray-500">Quick Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`border-b-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-[#C50202] text-[#C50202]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "features" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#C50202]"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-medium text-gray-900">
                      Product Details
                    </h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Category:</dt>
                        <dd className="text-gray-900">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Industry:</dt>
                        <dd className="text-gray-900">{product.industry}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Product ID:</dt>
                        <dd className="text-gray-900">#{product.id}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="mb-3 font-medium text-gray-900">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="py-8 text-center">
                  <div className="mb-2 text-6xl font-bold text-[#C50202]">
                    {product.review.averageRating}
                  </div>
                  <div className="mb-2 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(product.review.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600">
                    Based on {product.review.reviewCount} reviews
                  </p>
                  <button className="text-[#C50202] hover:underline">
                    View All Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link href={`${relatedProduct.id}`}>
                  <div
                    key={relatedProduct.id}
                    className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#C50202]">
                          ₹{relatedProduct.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.actualPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-medium">Product Video</h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="flex aspect-video items-center justify-center bg-gray-100">
              <div className="text-center">
                <Play className="mx-auto mb-2 h-16 w-16 text-gray-400" />
                <p className="text-gray-500">Video Player Placeholder</p>
                <p className="text-sm text-gray-400">
                  Video ID: {product.videoId}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
