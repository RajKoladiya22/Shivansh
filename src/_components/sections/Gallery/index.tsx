"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Award, Users, Calendar, Trophy, HomeIcon } from "lucide-react";
import { GalleryItemComponent } from "./GalleryItem";
import { Lightbox } from "./Lightbox";
import GalleryHero from "./GalleryHero";
import Link from "next/link";
import { CAREER } from "public/data/Navigation";

export type CategoryKey =
  | "all"
  | "achievement"
  | "team-fun"
  | "event"
  | "milestone";

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: CategoryKey;
  date: string;
  tags: string[];
}

// Sample data with placeholder images
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Annual Team Retreat 2024",
    description:
      "Amazing team bonding experience at the mountains with adventure activities, strategic planning sessions, and unforgettable memories. Our team came together to strengthen relationships and align our vision for the future.",
    category: "team-fun",
    date: "March 2024",
    tags: ["Team Building", "Adventure", "Planning", "Mountains"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Best Innovation Award 2024",
    description:
      "Recognized by the Industry Excellence Council for outstanding innovation in technology solutions. This award reflects our commitment to pushing boundaries and creating impactful solutions.",
    category: "achievement",
    date: "February 2024",
    tags: ["Innovation", "Award", "Recognition", "Excellence"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Major Project Success",
    description:
      "Celebrating the successful launch of our flagship product that has impacted thousands of users. The entire team worked tirelessly to make this dream a reality.",
    category: "milestone",
    date: "January 2024",
    tags: ["Success", "Launch", "Milestone", "Product"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Annual Sports Championship",
    description:
      "Fun-filled sports activities promoting health, wellness, and healthy competition among teams. Cricket, football, badminton, and many more exciting games.",
    category: "team-fun",
    date: "December 2023",
    tags: ["Sports", "Competition", "Health", "Wellness"],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Regional Hackathon Champions",
    description:
      "Our development team won the prestigious regional hackathon with an innovative AI-powered solution. 48 hours of intense coding and creativity paid off brilliantly.",
    category: "achievement",
    date: "November 2023",
    tags: ["Hackathon", "AI", "Championship", "Innovation"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Festival of Lights Celebration",
    description:
      "Colorful Diwali celebrations bringing everyone together. Traditional decorations, delicious food, cultural performances, and the joy of being together as one big family.",
    category: "event",
    date: "October 2023",
    tags: ["Festival", "Culture", "Unity", "Tradition"],
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Monthly Team Lunch",
    description:
      "Regular team bonding over delicious food and great conversations. These monthly gatherings help us stay connected beyond work.",
    category: "team-fun",
    date: "September 2023",
    tags: ["Bonding", "Food", "Conversations", "Monthly"],
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Client Appreciation Event",
    description:
      "Special event to thank our amazing clients for their trust and partnership. Building lasting relationships beyond business.",
    category: "event",
    date: "August 2023",
    tags: ["Clients", "Appreciation", "Partnership", "Gratitude"],
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Team Certification Achievement",
    description:
      "Proud moment as our team members received industry certifications, showcasing their dedication to continuous learning and professional growth.",
    category: "achievement",
    date: "July 2023",
    tags: ["Certification", "Learning", "Growth", "Professional"],
  },
];

export const categoryIcons: Record<CategoryKey, React.ElementType> = {
  achievement: Award,
  "team-fun": Users,
  event: Calendar,
  milestone: Trophy,
  all: HomeIcon,
};

export const categoryColors: Record<CategoryKey, string> = {
  achievement: "bg-yellow-500",
  "team-fun": "bg-blue-500",
  event: "bg-purple-500",
  milestone: "bg-green-500",
  all: "bg‑red‑500",
};

export const categoryLabels: Record<Exclude<CategoryKey, "all">, string> = {
  achievement: "Achievements",
  "team-fun": "Team Fun",
  event: "Events",
  milestone: "Milestones",
};

// Main Gallery Component
export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    return selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Memoized category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: galleryItems.length };
    Object.keys(categoryLabels).forEach((category) => {
      counts[category] = galleryItems.filter(
        (item) => item.category === category,
      ).length;
    });
    return counts;
  }, []);

  const openLightbox = useCallback((item: GalleryItem, index: number) => {
    setCurrentItem(item);
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setCurrentItem(null);
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    setCurrentItem(filteredItems[newIndex] ?? null);
    setCurrentIndex(newIndex);
  }, [currentIndex, filteredItems]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentItem(filteredItems[newIndex] ?? null);
    setCurrentIndex(newIndex);
  }, [currentIndex, filteredItems]);

  return (
    <div
      className="min-h-screen bg-white"
    >
      <section className="py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <GalleryHero />

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <button aria-label="Click"
                onClick={() => setSelectedCategory("all")}
                className={`transform rounded-full px-4 py-1 font-medium transition-all duration-300 hover:scale-100 focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-6 sm:py-3 ${
                  selectedCategory === "all"
                    ? "text-white shadow-lg"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
                }`}
                style={
                  selectedCategory === "all"
                    ? { backgroundColor: "#C50202" }
                    : {}
                }
              >
                All Moments ({categoryCounts.all})
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => {
                const k = key as CategoryKey;
                // const Icon = categoryIcons[k];
                return (
                  <button aria-label="Click"
                    key={k}
                    onClick={() => setSelectedCategory(k)}
                    className={`flex transform items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-6 sm:py-3 ${
                      selectedCategory === k
                        ? `${categoryColors[k]} text-white shadow-lg`
                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
                    }`}
                  >
                    {React.createElement(categoryIcons[k], {
                      className: "w-4 h-4",
                    })}
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(" ")[0]}</span>(
                    {categoryCounts[key]})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-gray-400">
                <Calendar className="mx-auto h-16 w-16" />
              </div>
              <p className="text-lg text-gray-500">
                No items found for this category.
              </p>
            </div>
          ) : (
            <>
              {/* Gallery Grid */}
              <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                {/* Featured/Main Image */}
                <div className="lg:col-span-2">
                  {filteredItems[0] ? (
                    <GalleryItemComponent
                      item={filteredItems[0]}
                      index={0}
                      onClick={() => openLightbox(filteredItems[0]!, 0)}
                      className="h-80 sm:h-96 lg:h-[510px]"
                    />
                  ) : null}
                </div>

                {/* Side Images */}
                {filteredItems.length > 1 && (
                  <div className="space-y-6 lg:space-y-8">
                    {filteredItems.slice(1, 3).map((item, index) => (
                      <GalleryItemComponent
                        key={item.id}
                        item={item}
                        index={index + 1}
                        onClick={() => openLightbox(item, index + 1)}
                        className="h-55 sm:h-85 lg:h-60"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Images Grid */}
              {filteredItems.length > 3 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.slice(3).map((item, index) => (
                    <GalleryItemComponent
                      key={item.id}
                      item={item}
                      index={index + 3}
                      onClick={() => openLightbox(item, index + 3)}
                      className="h-64"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div
              className="rounded-2xl p-6 text-white shadow-2xl sm:p-8 bg-gradient-to-r from-gray-900 to-black"
              
            >
              <h3 className="mb-4 text-xl font-bold sm:text-2xl">
                Want to Join Our Amazing Journey?
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:text-lg">
                Be part of a team that celebrates success, embraces fun, and
                creates memorable experiences together.
              </p>
              <Link href={CAREER}> 
              <button aria-label="Click" 
                className="cursor-pointer bg-white text-gray-700 transform rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-8 sm:py-3"
              
              >
               Join Our Team
              </button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentItem={currentItem}
        currentIndex={currentIndex}
        items={filteredItems}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
}
