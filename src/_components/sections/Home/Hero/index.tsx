"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { TeamData } from "public/data/Team";
import { TeamCard } from "src/_components/molecules";
import { HeroContent } from "./Content";

const CARD_POSITIONS = {
  2: [
    { top: "5%", right: "3%", imagePosition: "right" },
    { top: "52%", left: "3%", imagePosition: "left" },
  ],
  3: [
    { top: "2%", right: "2%", imagePosition: "right" },
    { top: "33.5%", left: "2%", imagePosition: "left" },
    { top: "65%", right: "2%", imagePosition: "right" },
  ],
  4: [
    { top: "5%", right: "3%", imagePosition: "right" },
    { top: "28%", left: "0%", imagePosition: "left" },
    { top: "50%", right: "2%", imagePosition: "right" },
    { top: "73%", left: "4%", imagePosition: "left" },
  ],
} as const;

// Breakpoints for cards per screen
const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1620,
} as const;

const AUTO_CYCLE_INTERVAL = 6000;

// Loading component to reduce bundle size
const LoadingPlaceholder = () => (
  <section className="relative min-h-screen overflow-hidden bg-white">
    <div className="mx-auto px-4 pt-20 sm:px-6 lg:px-8">
      <div className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <HeroContent />
        </div>
        <div className="relative order-2 h-[500px] md:h-[600px] lg:order-2 lg:h-[700px]">
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Main Hero Component
export const Hero = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [cardsPerScreen, setCardsPerScreen] = useState(2); // Start with 2 cards

  // Determine cards per screen based on screen size
  const getCardsPerScreen = useCallback(() => {
    if (typeof window === "undefined") return 2;

    const width = window.innerWidth;
    if (width < BREAKPOINTS.MOBILE) return 2;
    if (width < BREAKPOINTS.TABLET) return 3;
    return 4;
  }, []);

  // Optimized resize handler with debouncing
  const handleResize = useCallback(() => {
    const newCardsPerScreen = getCardsPerScreen();
    if (newCardsPerScreen !== cardsPerScreen) {
      setCardsPerScreen(newCardsPerScreen);
      setCurrentPage(0); // Reset to first page on layout change
    }
  }, [cardsPerScreen, getCardsPerScreen]);

  // Set client flag and get correct cards per screen
  useEffect(() => {
    setIsClient(true);
    setCardsPerScreen(getCardsPerScreen());
  }, [getCardsPerScreen]);

  // Update cards per screen on resize
  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedHandleResize, { passive: true });

    const handleResize = () => {
      setCardsPerScreen(getCardsPerScreen());
    };

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedHandleResize);
    };

    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, [isClient, handleResize]);

  // Auto-cycle through team members
  useEffect(() => {
    if (!isClient || TeamData.length === 0) return;

    const totalPages = Math.ceil(TeamData.length / cardsPerScreen);
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setAnimationKey((prev) => prev + 1);
    }, AUTO_CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [cardsPerScreen, isClient]);

  // Get current team members to display
  const currentTeamMembers = useMemo(() => {
    const start = currentPage * cardsPerScreen;
    return TeamData.slice(start, start + cardsPerScreen);
  }, [currentPage, cardsPerScreen]);

  // Define card positions for different screen sizes
  const cardPositions = useMemo(() => {
    return (
      CARD_POSITIONS[cardsPerScreen as keyof typeof CARD_POSITIONS] ||
      CARD_POSITIONS[2]
    );
  }, [cardsPerScreen]);

  // Don't render cards until client-side hydration is complete
  if (!isClient) {
    return <LoadingPlaceholder />;
  }

  return (
    <section className="from-red-20 relative min-h-screen overflow-hidden bg-gradient-to-b to-white">
      <div className="mx-auto px-4 pt-15 sm:px-6 sm:pt-19 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Left Content */}
          <div className="order-1 pt-6 lg:order-1 lg:pt-0">
            <HeroContent />
          </div>

          {/* Right Side - Floating Team Cards */}
          <div className="relative order-2 h-[500px] md:h-[600px] lg:order-2 lg:h-[700px]">
            {currentTeamMembers.map((member, index) => (
              <TeamCard
                key={`card-${index}-${animationKey}`}
                {...member}
                imagePosition={
                  cardPositions[index]?.imagePosition as "left" | "right"
                }
                style={{
                  ...cardPositions[index],
                  animation: "fadeInUp 1s ease-out",
                  animationDelay: `${0.2 + index * 0.3}s`,
                  animationFillMode: "both",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .container .grid > div:nth-child(2) {
            height: 400px !important;
          }

          .absolute[style*="top"][style*="right"],
          .absolute[style*="top"][style*="left"],
          .absolute[style*="bottom"] {
            width: 280px !important;
            height: 120px !important;
          }
        }

        /* Tablet responsive styles */
        @media (min-width: 769px) and (max-width: 1023px) {
          .container .grid > div:nth-child(2) {
            height: 500px !important;
          }

          .absolute[style*="top"][style*="right"],
          .absolute[style*="top"][style*="left"],
          .absolute[style*="bottom"] {
            width: 300px !important;
            height: 130px !important;
          }
        }

        /* Add floating animation to all cards */
        .absolute[style*="top"],
        .absolute[style*="bottom"] {
          animation: float 6s ease-in-out infinite !important;
        }

        .absolute[style*="top"]:nth-child(1) {
          animation-delay: 0s !important;
        }

        .absolute[style*="top"]:nth-child(2) {
          animation-delay: 1.5s !important;
        }

        .absolute[style*="top"]:nth-child(3) {
          animation-delay: 3s !important;
        }

        .absolute[style*="top"]:nth-child(4) {
          animation-delay: 4.5s !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
