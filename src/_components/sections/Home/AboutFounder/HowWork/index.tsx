"use client";
// import Image from "next/image";
import React from "react";
import { SectionHeader } from "src/_components/ui";

// Hook for intersection observer
// const useIntersectionObserver = (threshold = 0.1) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry?.isIntersecting) {
//           setIsIntersecting(true);
//         }
//       },
//       { threshold },
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => observer.disconnect();
//   }, [threshold]);

//   return { ref, isIntersecting };
// };

// Hook for number animation
// const useCountAnimation = (
//   targetValue: number,
//   duration = 2000,
//   start = false,
// ) => {
//   const [currentValue, setCurrentValue] = useState(0);

//   useEffect(() => {
//     if (!start) return;

//     let startTime: number;
//     let animationFrame: number;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1);

//       const easeOutQuart = 1 - Math.pow(1 - progress, 4);
//       const value = Math.floor(easeOutQuart * targetValue);

//       setCurrentValue(value);

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrame) {
//         cancelAnimationFrame(animationFrame);
//       }
//     };
//   }, [targetValue, duration, start]);

//   return currentValue;
// };

export const HowItWork = () => {
  return (
    <>
      <div className="py-5">
        {/* How It Works Section */}
        <div className="mb-12 text-center sm:mb-16">
          <SectionHeader
            heading="HOW IT WORKS?"
            headingText="Story Behind of Shivansh"
            headingDescription="Finding a business with congruent values and business culture is
            important choosing a partner. When this first tier of trust is
            established, it is more likely that each party will continue with a
            valued level of transparency and communication. You can count on us.
            We are always here to help our clients."
          />
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Vision Card */}
          <div className="transform rounded-2xl bg-[var(--primery-color)] p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="text-4xl font-bold opacity-80 sm:text-5xl lg:text-6xl">
                01
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Vision</h3>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                    {`Transparency is not just a buzzword. It's one of our core values
                that continue to impress our clients.`}
                  </p>
                  <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                    {`Transparency is not just a buzzword. It's one of our core values
                that continue to impress our clients.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="transform rounded-2xl bg-[var(--primery-color)] p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <div className="text-4xl font-bold opacity-80 sm:text-5xl lg:text-6xl">
                02
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Mission</h3>

                <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                  {`We have partnered with some of the world's most exciting companies
              to deliver exceptional IT Solutions. We successfully work
              alongside clients to identify the problem and develop effective
              solutions.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
