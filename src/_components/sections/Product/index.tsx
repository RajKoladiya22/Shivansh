"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { SidebarFilters } from "./filtter";
import { ContactWidget } from "../Blog/Sidebar";
import { ProductCard } from "src/_components/molecules/Cards/productsCard";
import { categories, industries, ProductsList } from "public/data/Product";
import { VideoModal } from "./VideoModal";
import { LoadingSpinner } from "./loader";
import { ProductInquiryPopup, type InquiryFormData } from "./ProductInquiry";

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

type SortBy = "all" | "top" | "latest" | "priceAsc" | "priceDesc" | "newest";
type ViewMode = "grid" | "list";

interface PriceRange {
  min: string;
  max: string;
}

export const TheProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: "",
    max: "",
  });
  const [sortBy, setSortBy] = useState<SortBy>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const productsPerPage = 9;

  // Initialize products
  useEffect(() => {
    setProducts(ProductsList);
    setFilteredProducts(ProductsList);
  }, []);

  // Filter products based on criteria
  useEffect(() => {
    let filtered = [...products];

    // Filter by sort (Top Products, Latest Products)
    if (sortBy === "top") {
      filtered = filtered.filter((p) => p.isTopProduct);
    } else if (sortBy === "latest") {
      filtered = filtered.filter((p) => p.isLatest);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Industry filter
    if (selectedIndustry !== "All") {
      filtered = filtered.filter((p) => p.industry === selectedIndustry);
    }

    // Price filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((p) => {
        const price = p.salePrice;
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
    // Reset displayed products when filters change
    setDisplayedProducts(filtered.slice(0, productsPerPage));
    setHasMore(filtered.length > productsPerPage);
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedIndustry,
    priceRange,
    sortBy,
  ]);

  // Load more products function
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = filteredProducts.slice(startIndex, endIndex);

      if (newProducts.length > 0) {
        setDisplayedProducts((prev) => [...prev, ...newProducts]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < filteredProducts.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 1000); // 1 second delay to simulate API call
  }, [currentPage, filteredProducts, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore && !isLoading) {
            loadMore();
            break; // only need to load once
          }
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  const handleVideoPlay = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedIndustry("All");
    setPriceRange({ min: "", max: "" });
    setSortBy("all");
  };

  // Fixed: Proper inquiry handling
  const handleInquiryClick = (product:Product) => {
    setSelectedProduct(product);
    setIsInquiryOpen(true);
  };

  const handleInquiryClose = () => {
    setIsInquiryOpen(false);
    setSelectedProduct(null);
  };

  const handleInquirySubmit = (data : InquiryFormData) => {
    console.log('Inquiry submitted:', data);
    // Here you would typically send the data to your backend API
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-white via-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            Our Products
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[#C50202]"
            />
          </div>

          {/* Sort and View Controls */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSortBy("all")}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                  sortBy === "all"
                    ? "bg-[#C50202] text-white"
                    : "bg-white text-gray-700 hover:bg-[#FCF2F2]"
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSortBy("top")}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                  sortBy === "top"
                    ? "bg-[#C50202] text-white"
                    : "bg-white text-gray-700 hover:bg-[#FCF2F2]"
                }`}
              >
                Top Products
              </button>
              <button
                onClick={() => setSortBy("latest")}
                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                  sortBy === "latest"
                    ? "bg-[#C50202] text-white"
                    : "bg-white text-gray-700 hover:bg-[#FCF2F2]"
                }`}
              >
                Latest Products
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-[#FCF2F2] lg:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-[#FCF2F2]"
              >
                {viewMode === "grid" ? (
                  <List className="h-4 w-4" />
                ) : (
                  <Grid className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <SidebarFilters
            showFilters={showFilters}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            clearFilters={clearFilters}
            categories={categories}
            industries={industries}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              products
              {isLoading && " (Loading more...)"}
            </div>

            {displayedProducts.length === 0 && !isLoading ? (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {displayedProducts.map((product) => (
                    <>
                    <ProductCard
                      key={product.id}
                      product={product}
                      onVideoPlay={handleVideoPlay}
                      onInquiryClick={handleInquiryClick}
                    />
            </>
                  ))}
                </div>

                {/* Loading Spinner */}
                {isLoading && <LoadingSpinner />}

                {/* Intersection Observer Target */}
                {hasMore && !isLoading && (
                  <div ref={observerRef} className="h-10" />
                )}

                {/* End of Results Message */}
                {!hasMore && displayedProducts.length > 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                     {` You've reached the end of the product list.`}
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Total: {filteredProducts.length} products loaded
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="block pt-5 sm:hidden">
              <ContactWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        videoId={currentVideo}
        onClose={() => setCurrentVideo(null)}
      />

            {/* Fixed: Single Product Inquiry Popup */}
      <ProductInquiryPopup
        product={selectedProduct}
        isOpen={isInquiryOpen}
        onClose={handleInquiryClose}
        onSubmit={handleInquirySubmit}
      />
            
    </div>
  );
};
