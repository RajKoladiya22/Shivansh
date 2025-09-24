import React, { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowLeft,
  Shield,
  Zap,
  Award,
} from "lucide-react";
import { btn_color } from "src/config/constants";
import type { ProductInquiryPopupProps } from "../../types/product.type";
import { CallChat } from "../ProductDetail";
import Image from "next/image";
import { getYouTubeThumbnail } from "src/_components/molecules/Thumbnail";
import Link from "next/link";

export const ProductInquiryPopup: React.FC<ProductInquiryPopupProps> = ({
  product,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    inquiryType: "general",
    message: "",
    preferredContact: "email",
    urgency: "medium",
  });

  // console.log(onSubmit);

  // Reset form when modal opens with new product
  useEffect(() => {
    if (isOpen && product) {
      setSubmitStatus("idle");
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'm interested in learning more about ${product.title}. Please provide more details about pricing, features, and implementation.`,
      }));
    }
  }, [isOpen, product]);

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!product) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");

      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not open or no product
  if (!isOpen || !product) return null;

  const inquiryTypeLabels = {
    general: "General Information",
    pricing: "Pricing & Packages",
    demo: "Request Demo",
    support: "Technical Support",
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <button aria-label="Click"
            onClick={onClose}
            className="group inline-flex cursor-pointer items-center gap-2 text-[#C50202] transition-colors hover:text-[#A50202]"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Product Inquiry
          </h1>

          <button aria-label="Click"
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#A50202]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto">
        <div className="mx-auto max-w-4xl">
          {/* Product Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-2xl bg-white shadow-lg">
                  <Image
                    width={100}
                    height={100}
                    src={getYouTubeThumbnail(product.detailedVideoId)}
                    // src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -bottom-3 left-4 flex gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-md">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.review.averageRating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.review.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {product.industry}
                  </span>
                </div>

                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  {product.title}
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  {product.description}
                </p>

                <div className="mb-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    ₹{product.salePrice.toLocaleString()}
                  </span>
                  {product.actualPrice > product.salePrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.actualPrice.toLocaleString()}
                      </span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                        Save{" "}
                        {Math.round(
                          ((product.actualPrice - product.salePrice) /
                            product.actualPrice) *
                            100,
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure & Trusted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Quick Implementation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-0">
            <CallChat />
          </div>
          {/* Form Section */}
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              {/* Form Header */}
              <div className="mb-8 text-center">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Get Detailed Information
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and our experts will contact you
                  within 24 hours with a personalized solution.
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Inquiry Submitted Successfully!
                      </h4>
                      <p className="mt-1 text-sm text-green-700">
                        Our team will contact you within 24 hours with detailed
                        information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800">
                        Something went wrong!
                      </h4>
                      <p className="mt-1 text-sm text-red-700">
                        Please try again or contact us directly at +91
                        8141703007
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <User className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Inquiry Details
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        {Object.entries(inquiryTypeLabels).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="both">Both Email & Phone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us more about your requirements..."
                      required
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button aria-label="Click"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || submitStatus === "success"}
                    className={`${btn_color} flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-semibold transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Submitting Your Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Call To Action */}

              <div className="mx-auto my-15 mb-25 max-w-7xl sm:mb-0">
                <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-center text-white sm:rounded-2xl sm:p-8 md:p-12">
                  <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                    Need Immediate Assistance?
                  </h3>
                  <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-lg">
                    {`Get your free consultation call today and see how we can help your business grow`}
                  </p>
                  <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                      href="tel:+918141703007"
                      className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
                    >
                      Call Now
                    </Link>
                    <Link
                      href="/gallery"
                      className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
                    >
                      Email Us
                    </Link>
                  </div>
                  {/* <p className="mt-2 text-xs text-gray-500">
                No commitment • Free consultation • Expert guidance
              </p> */}
                  <p className="mt-2 text-xs text-gray-500">
                    Business Hours • Mon-Sat: 10AM-6PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
