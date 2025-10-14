"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Play,
  Check,
  Shield,
  Truck,
  Phone,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { ProductsList } from "public/data/Product";
import ProductsList from 'public/data/Product/products.json';
import Link from "next/link";
import Image from "next/image";
import { ProductSocialShareButton } from "../SocialShare";
import { VideoModal } from "../VideoModal";
import { ProductInquiryPopup } from "../ProductInquiry";
import type {
  InquiryFormData,
  Product,
  ProductDetailPageProps,
  TabId,
} from "../../types/product.type";
import { FaWhatsapp } from "react-icons/fa";
import { getYouTubeThumbnail } from "src/_components/molecules/Thumbnail";
import { PurchaseFlowPopup } from "../productFlow";
import { btn_color } from "src/config/constants";

const tabs: { id: TabId; label: string }[] = [
  { id: "features", label: "Features" },
  { id: "benefits", label: "Benefits" },
  { id: "specifications", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQs" },
];

const faqs = [
  {
    question: "What is the warranty for this product?",
    answer:
      "We offer a 1-year warranty on all our products against manufacturing defects. Warranty covers parts and labor for any issues arising during normal use.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express shipping options are available at checkout with delivery in 2-3 business days. International shipping times vary by location.",
  },
  {
    question: "Can I return the product if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. Products must be in original condition with all packaging. Return shipping costs are the responsibility of the customer.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and UPI payments. Corporate billing options are available for business customers.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, we offer volume discounts for orders over 10 units. Discounts range from 5-15% depending on quantity. Contact our sales team for custom quotes on large orders.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can track your package using our order tracking page or directly with the shipping carrier.",
  },
];

export const CallChat = () => {
  const encodedMessage =
    "Hi! I'm interested in your products. Could you please provide more information?";
  return (
    <div className="grid grid-cols-2 gap-2">
      <Link
        href={"tel:+91 81417 03007"}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm text-white transition-colors hover:bg-green-700"
      >
        <Phone className="h-4 w-4" />
        Call
      </Link>
      <Link
        href={`https://wa.me/+918141703007?text=${encodeURIComponent(encodedMessage)}`}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm text-white transition-colors hover:bg-green-700"
      >
        <FaWhatsapp className="h-4 w-4" />
        Chat
      </Link>
    </div>
  );
};

export const TheProductDetailPage: React.FC<ProductDetailPageProps> = ({
  params,
}) => {
  const router = useRouter();
  // const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("features");
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedVideoType, setSelectedVideoType] = useState<
    "intro" | "detail"
  >("intro");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [isPurchaseFlowOpen, setIsPurchaseFlowOpen] = useState(false);
  const [stepId, setStepId] = useState<number | null>(null);

  const [showAllReviews, setShowAllReviews] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          <button aria-label="Click"
            onClick={() => window.history.back()}
            className="text-[#C50202] hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBackToBlogs = () => {
    router.push("/product");
  };

  // const handleEnquiry = () => {
  //   // Handle enquiry submission
  //   console.log("Enquiry for product:", product.id, "Quantity:");
  // };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleVideoPlay = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  const handleInquiryClick = (product: Product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  const handleInquiryClose = () => {
    setIsInquiryOpen(false);
    setSelectedProduct(null);
  };

  const handleInquirySubmit = (data: InquiryFormData) => {
    console.log("Inquiry submitted:", data);
  };

  const HowToUse = (id: number) => {
    setIsPurchaseFlowOpen(true);
    setStepId(id);
    // console.log("stepId", stepId);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Navigation Bar */}
      <nav className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button aria-label="Click"
              onClick={handleBackToBlogs}
              className="group mb-6 inline-flex cursor-pointer items-center gap-2 text-[#C50202] transition-colors hover:text-[#A50202]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Products</span>
            </button>

            <div className="flex items-center gap-4">
              {/* <button aria-label="Click"
                onClick={() => handleShare(product)}
                className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:text-[#A50202]"
              >
                <Share2 className="h-5 w-5" />
              </button> */}

              <ProductSocialShareButton
                product={product}
                variant="minimal"
                showText={false}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="py- mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}

          <div className="space-y-4">
            {/* Video Selection Tabs */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button aria-label="Click"
                onClick={() => setSelectedVideoType("intro")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${selectedVideoType === "intro"
                    ? "bg-white text-[#C50202] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Intro Video
              </button>
              <button aria-label="Click"
                onClick={() => setSelectedVideoType("detail")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${selectedVideoType === "detail"
                    ? "bg-white text-[#C50202] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Detail Video
              </button>
            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                width={100}
                height={100}
                src={getYouTubeThumbnail(
                  selectedVideoType === "intro"
                    ? product.introVideoId
                    : product.detailedVideoId,
                )}
                // src={productImages[selectedImageIndex] ?? ""}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              {/* Video Play Button */}
              <button aria-label="Click"
                onClick={() =>
                  handleVideoPlay(
                    selectedVideoType === "intro"
                      ? product.introVideoId
                      : product.detailedVideoId,
                  )
                }
                className="group absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/20"
              >
                <div className="bg-opacity-30 opacity absolute inset-0 flex cursor-pointer items-center justify-center transition-opacity group-hover:opacity-100">
                  <div className="relative">
                    {/* Ripple */}
                    <span className="bg-opacity-3 absolute inset-0 inline-flex animate-ping rounded-full bg-red-600 opacity-75"></span>
                    {/* Button */}
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#C50202] text-white transition-all duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-5 w-5" />
                    </div>
                  </div>
                </div>
              </button>

              {/* Video Type Indicator */}
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-black/70 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {selectedVideoType === "intro"
                    ? "📹 Intro Video"
                    : "🎬 Detail Video"}
                </span>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isTopProduct && (
                  <span className="rounded-full bg-[#C50202] px-3 py-1 text-sm font-medium text-white">
                    Top Product
                  </span>
                )}
                {product.isLatest && (
                  <span className="rounded-full bg-[#C50202] px-3 py-1 text-center text-sm font-medium text-white">
                    Latest
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-[#FFCCD6] px-3 py-1 text-sm font-bold text-black">
                  {Math.round(
                    ((product.actualPrice - product.salePrice) /
                      product.actualPrice) *
                    100,
                  )}
                  % OFF
                </span>
              </div>
            </div>

            <button aria-label="Click"
              onClick={() => HowToUse(product.stepsID)}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#C50202] to-[#A00000] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#A00000] hover:to-[#800000] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#C50202] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {/* Animated background on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFCCD6] to-[#FCF2F2] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>

              {/* Button content with icon */}
              <span className="relative flex items-center justify-center gap-2">
                How To Buy?
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
            {/* Thumbnail Images */}
            {/* <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button aria-label="Click"
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
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-500">
                 
                  {product.industry.map((ind, idx) => (
                    <span key={idx}>
                      {ind}
                      {idx < product.industry.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">

                  {product.category.map((cat, idx) => (
                    <span key={idx}>
                      {cat}
                      {idx < product.category.length - 1 ? ", " : ""}
                    </span>
                  ))}
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
                        className={`h-5 w-5 ${i < Math.floor(product.review.averageRating)
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
              {/* <div className="mb-6 flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center rounded-lg border">
                  <button aria-label="Click"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="border-x px-4 py-2">{quantity}</span>
                  <button aria-label="Click"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button aria-label="Click"
                  onClick={() => handleInquiryClick(product)}
                  className={`${btn_color} flex w-full items-center justify-center space-x-2 rounded-lg px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:text-base`}
                >
                  Send Enquiry
                </button>
                <CallChat />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Shield className="h-8 w-8 text-[#C50202]" />
                <div>
                  <div className="text-sm font-medium">Quality Assured</div>
                  <div className="text-xs text-gray-500">
                    Certified Products
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Truck className="h-8 w-8 text-[#C50202]" />
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
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            {/* Tab Navigation */}
            <div className="border-b">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button aria-label="Click"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-w-max border-b-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
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
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFCCD6]">
                        <Check className="h-4 w-4 text-[#C50202]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#C50202]"></div>
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
                    <dl className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <dt className="text-gray-500">Category:</dt>
                        <dd className="font-medium text-gray-900">
                          {product.category.map((cat, idx) => (
                            <span key={idx}>
                              {cat}
                              {idx < product.category.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <dt className="text-gray-500">Industry:</dt>
                        <dd className="font-medium text-gray-900">
                          {product.industry}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <dt className="text-gray-500">Product ID:</dt>
                        <dd className="font-medium text-gray-900">
                          #{product.id}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <dt className="text-gray-500">Weight:</dt>
                        <dd className="font-medium text-gray-900">2.5 kg</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Dimensions:</dt>
                        <dd className="font-medium text-gray-900">
                          30 × 20 × 15 cm
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="mb-3 font-medium text-gray-900">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#FCF2F2] px-3 py-1 text-sm text-[#C50202]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="py-8">
                  <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
                    <div className="mb-6 text-center md:mb-0 md:text-left">
                      <div className="text-6xl font-bold text-[#C50202]">
                        {product.review.averageRating}
                      </div>
                      <div className="mb-2 flex justify-center md:justify-start">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${i < Math.floor(product.review.averageRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Based on {product.review.reviewCount} reviews
                      </p>
                    </div>

                    <div className="w-full max-w-md">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">5</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <div className="ml-2 h-2 w-40 rounded-full bg-gray-200">
                            <div className="h-2 w-4/5 rounded-full bg-yellow-400"></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">80%</span>
                      </div>

                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">4</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <div className="ml-2 h-2 w-40 rounded-full bg-gray-200">
                            <div className="h-2 w-2/5 rounded-full bg-yellow-400"></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">40%</span>
                      </div>

                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">3</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <div className="ml-2 h-2 w-40 rounded-full bg-gray-200">
                            <div className="h-2 w-1/5 rounded-full bg-yellow-400"></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">20%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">1-2</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <div className="ml-2 h-2 w-40 rounded-full bg-gray-200">
                            <div className="h-2 w-1/10 rounded-full bg-yellow-400"></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button aria-label="Click"
                      onClick={() => {
                        setShowAllReviews(!showAllReviews);
                        if (!showAllReviews) {
                          setVisibleReviewsCount(5); // Reset to 5 when showing all reviews
                        }
                      }}
                      className="rounded-lg bg-[#C50202] px-6 py-2 font-medium text-white transition-colors hover:bg-[#A00303]"
                    >
                      {showAllReviews ? "Hide Reviews" : "View All Reviews"}
                    </button>
                  </div>

                  {/* Individual Reviews List */}
                  {showAllReviews && (
                    <div className="mt-8 space-y-4">
                      <h3 className="mb-4 text-xl font-semibold text-gray-900">
                        Customer Reviews
                      </h3>

                      {product.review.allReviews
                        .slice(0, visibleReviewsCount)
                        .map((review, index) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 pb-4 last:border-b-0"
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <span className="font-medium text-gray-900">
                                    {review.author}
                                  </span>
                                  {review.verified && (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                      <Check className="mr-1 h-3 w-3" />
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.date)}
                              </span>
                            </div>

                            <div className="mb-2 flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(review.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                    }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">
                                {review.rating}/5
                              </span>
                            </div>

                            <p className="leading-relaxed text-gray-700">
                              {review.comment}
                            </p>
                          </div>
                        ))}

                      {/* Load More Button */}
                      {visibleReviewsCount <
                        product.review.allReviews.length && (
                          <div className="mt-6 text-center">
                            <button aria-label="Click"
                              onClick={() =>
                                setVisibleReviewsCount((prev) => prev + 5)
                              }
                              className="rounded-lg border border-[#C50202] px-6 py-2 font-medium text-[#C50202] transition-colors hover:bg-[#C50202] hover:text-white"
                            >
                              Load More Reviews
                              {/* (
                            {Math.min(
                              5,
                              product.review.allReviews.length -
                                visibleReviewsCount,
                            )}{" "}
                            more) */}
                            </button>
                          </div>
                        )}

                      {/* Show fewer reviews button when all are loaded */}
                      {visibleReviewsCount >=
                        product.review.allReviews.length &&
                        product.review.allReviews.length > 5 && (
                          <div className="mt-6 text-center">
                            <button aria-label="Click"
                              onClick={() => setVisibleReviewsCount(5)}
                              className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              Show Fewer Reviews
                            </button>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-[#FFCCD6]"
                    >
                      <button aria-label="Click"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-[#FCF2F2]"
                      >
                        <span>{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-[#C50202]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#C50202]" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="border-t border-[#FFCCD6] bg-white p-4 text-gray-600">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="my-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <Link href={`${relatedProduct.id}`} key={relatedProduct.id}>
                  <div
                    key={relatedProduct.id}
                    className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Image
                      width={100}
                      height={100}
                      // src={relatedProduct.image}
                      src={getYouTubeThumbnail(product.detailedVideoId)}
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
      {/* {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-medium">Product Video</h3>
              <button aria-label="Click"
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
      )} */}
      {/* Video Modal */}
      <VideoModal
        videoId={currentVideo}
        onClose={() => setCurrentVideo(null)}
      />

      <ProductInquiryPopup
        product={selectedProduct}
        isOpen={isInquiryOpen}
        onClose={handleInquiryClose}
        onSubmit={handleInquirySubmit}
      />

      <PurchaseFlowPopup
        isOpen={isPurchaseFlowOpen}
        onClose={() => setIsPurchaseFlowOpen(false)}
        productName={product.title}
        stepId={stepId}
      />
    </div>
  );
};
