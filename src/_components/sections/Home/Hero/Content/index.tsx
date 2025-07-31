"use client";
import { useState, useEffect } from "react";
import { btn_color } from "src/config/constants";

export const HeroContent = () => {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Animation for stats counter
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          {/* Content Column */}
          <div className="space-y-6 md:space-y-8 ">
            {/* Top Badge */}
            <div className="relative inline-block ">
              <p className="z-10 text-base font-[400] tracking-[3px] text-(--primery-color) sm:text-lg lg:text-xl">
                Quick Response – Quick Support
              </p>
              <div
                className={`absolute top-0 sm:h-full h-[50%] rounded-lg bg-(--pink)`}
                style={{
                  width: "calc(40% + 20px)",
                  right: "0",
                  transform: "translate(10%, -40%)",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
              The Team Behind Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-(--primery-color)">Trusted Tally Support</span>
                <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
              Tally Certified 3-Star Partner · 3000+ Customers Served in all
              Over India
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 gap-3 py-1 sm:grid-cols-2">
              {[
                "Expert Tally Consultants",
                "24/7 Customer Service",
                "Custom Solutions",
                "Training & Setup",
              ].map((feature, index) => (
                <div key={index} className="group flex items-center space-x-3">
                  <div className="h-3 w-3 flex-shrink-0 rounded-full bg-(--primery-color) group-hover:animate-pulse"></div>
                  <span className="font-medium text-gray-700 transition-colors group-hover:text-(--primery-color)">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pt-2">
              <button
                className={`${btn_color} flex transform items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold tracking-wide shadow-lg`}
                onClick={() => window.open("https://bitly.cx/rNEH4", "_blank")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
              </button>

              <button
                className="flex transform items-center justify-center gap-2 rounded-lg border-2 border-(--primery-color) bg-white px-6 py-3 font-bold tracking-wide text-(--primery-color) shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C50202] hover:text-white hover:shadow-lg cursor-pointer"
                onClick={() => window.open("tel:+91 8141703007", "_self")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 22.621l-3.521-3.511c-1.22 1.22-3.07 1.27-4.56.27-1.761-1.22-2.399-2.64-2.62-3.84-.239-1.27.13-2.39.91-3.4 1.47-1.91 3.79-2.41 5.74-1.15.66.38 1.29.97 1.71 1.66l3.521-3.521c.27.94.33 1.85.17 2.72-.16.87-.54 1.72-1.11 2.48-.7.94-1.73 1.79-2.79 2.66-1.19 1-2.41 2.04-3.57 3.23-.98.95-1.82 1.89-2.42 2.72l4.25 4.25zm-8.79-22.621c-5.29-.539-6.03 5.57-6 8 .03 2.89.78 5.55 2.07 7.59.54 1.09 1.46 1.98 2.53 2.37l1.15.43c.56.2 1.17.12 1.7-.23 1.01-.65 1.86-1.69 2.89-2.99 1.52-1.93 3.17-4.03 4.71-6.13 1.34-1.81 2.56-3.92 1.86-6.01-.24-.73-.87-1.31-1.72-1.57-3.45-1.06-9.08-.98-12.19.54zm1.32 5.96c-.33 0-.64.14-.86.39-.22.25-.33.58-.29.92.04.34.22.65.5.86 1.12.88 2.28 1.7 3.49 2.45.33.19.73.17 1.04-.06.31-.23.49-.61.46-1-.03-.39-.26-.74-.62-.91-1.15-.63-2.27-1.37-3.35-2.15-.18-.15-.4-.23-.62-.23z" />
                </svg>
                Call For Demo
              </button>
            </div>
          </div>

          {/* Stats Column */}
          <div className=" pt-6 sm:pt-8">
            <div className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200"></div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "65k+", label: "YouTube Subscribers" },
                { value: "13+", label: "Years Experience" },
                { value: "1M+", label: "Happy Customers" },
                { value: "50+", label: "Team Members" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`from-blue-50 to-indigo-50 p-5 rounded-xl  transition-all duration-700 ease-out ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl sm:text-3xl font-bold text-(--primery-color) mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Trusted by industry leaders:</p>
              <div className="flex flex-wrap gap-4 items-center">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default HeroContent;
