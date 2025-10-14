"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "src/_components/ui";
import Link from "next/link";
import { ProductCard } from "src/_components/molecules/Cards/productsCard";
// import { ProductsList } from "public/data/Product";
import ProductsList from 'public/data/Product/products.json';
import { VideoModal } from "../../Product/VideoModal";
import { btn_color } from "src/config/constants";
import type { InquiryFormData, Product } from "../../types/product.type";
import { ProductInquiryPopup } from "../../Product/ProductInquiry";

const topProducts = ProductsList.filter((product) => product.isTopProduct);

export const ProductShowcaseSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(topProducts.length / getItemsPerSlide()),
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(topProducts.length / getItemsPerSlide())) %
        Math.ceil(topProducts.length / getItemsPerSlide()),
    );
  };

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm
    }
    return 4; // default
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
      setCurrentSlide(0); // Reset slide on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return topProducts.slice(startIndex, startIndex + itemsPerSlide);
  };

  const handleVideoPlay = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  const totalSlides = Math.ceil(topProducts.length / itemsPerSlide);

  // Fixed: Proper inquiry handling
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
    // Here you would typically send the data to your backend API
  };

  return (
    <div className="bg-gradient-to-b from-white via-red-50 to-white">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <SectionHeader heading="Our Top " headingText="Products" />
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button aria-label="Click"
                onClick={prevSlide}
                className="absolute sm:top-1/2 sm:-left-10 left-3 top-108 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-shadow duration-200 hover:bg-gray-50 hover:shadow-xl"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <button aria-label="Click"
                onClick={nextSlide}
                className="absolute sm:top-1/2 sm:-right-10 right-3 z-10 top-108 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-shadow duration-200 hover:bg-gray-50 hover:shadow-xl"
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getCurrentSlideProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onVideoPlay={handleVideoPlay}
                onInquiryClick={handleInquiryClick}
              />
            ))}
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button aria-label="Click"
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-[#C50202]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Products Button */}
        <div className="mt-12 text-center">
          <Link
            href={"/product"}
            className={`${btn_color} inline-flex items-center gap-2 rounded-lg px-8 py-3 text-lg font-medium`}
          >
            View All Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Statistics */}
        {/* <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-bold text-[#C50202]">
              {topProducts.length}+
            </div>
            <div className="mt-1 text-gray-600">Top Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C50202]">50+</div>
            <div className="mt-1 text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C50202]">1000+</div>
            <div className="mt-1 text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C50202]">4.6★</div>
            <div className="mt-1 text-gray-600">Average Rating</div>
          </div>
        </div> */}
      </div>
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
    </div>
  );
};
