"use client";
import { useState, useEffect } from "react";
import HeroContent from "./content";
import TeamCard from "./team";
import { TeamData } from "public/data/team";

export default function Hero() {
  const [chunkIndex, setChunkIndex] = useState(0);
  const chunkSize = 4;

  useEffect(() => {
    const total = TeamData.length;
    const interval = setInterval(() => {
      setChunkIndex((prev) =>
        prev < Math.ceil(total / chunkSize) - 1 ? prev + 1 : 0,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const start = chunkIndex * chunkSize;
  const visible = TeamData.slice(start, start + chunkSize);


  //   const [currentIndex, setCurrentIndex] = useState(0);
  // const itemsPerPage = 4; // Show one card at a time

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex(prev => (prev + 1) % TeamData.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="relative bg-white pt-24 pb-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Text Content */}
        <HeroContent />

        {/* Hero Image */}
        <div className="relative h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]">
          <TeamCard
            name="Heena Patel"
            role="CEO & Founder"
            rating={4.8}
            reviews={120}
            description="Heena is a visionary leader with over a decade of experience in the tech industry, driving innovation and excellence."
            imgSrc="/images/team/hero/team1.png"
            imagePosition="left"
          />
          {/* {visible.map((member, i) => (
            // <div 
            //   key={i}
            //   className={`absolute inset-0 transition-opacity duration-500 ${
            //     i === chunkIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            //   }`}
            // >
            <TeamCard
              key={i}
              {...member}
              imagePosition={member.imagePosition as "left" | "right"}
            />
            //  </div>
          ))} */}
            {/* {TeamData.map((member, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <TeamCard
                {...member}
                imagePosition={member.imagePosition as "left" | "right"}
              />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}
