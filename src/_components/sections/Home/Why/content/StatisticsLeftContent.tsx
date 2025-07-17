// "use client";
// import React from "react";

// interface StatItem {
//   number: string;
//   description: string;
//   icon: string;
// }

// const stats: StatItem[] = [
//   {
//     number: '13+',
//     description: 'Years of Experience',
//     icon: 'fas fa-chart-line'
//   },
//   {
//     number: '1000+',
//     description: 'Happy Tally Customers (All Over India)',
//     icon: 'fas fa-users'
//   },
//   {
//     number: '3000+',
//     description: 'Happy Customers Base All Over India',
//     icon: 'fas fa-handshake'
//   },
//   {
//     number: '65,000+',
//     description: 'Youtube Subscribers',
//     icon: 'fas fa-star'
//   },
//   {
//     number: '12',
//     description: 'GST Expert & Tally Certified Team',
//     icon: 'fas fa-certificate'
//   },
//   {
//     number: '400+',
//     description: 'Tally Customization Tool',
//     icon: 'fas fa-tools'
//   }
// ];

// export const StatisticsLeftContent = () => {
//   return (
//     <div className="relative px-6 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800" />
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {/* Header */}
//         <div className="mb-8 lg:mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
//             Why Shivansh Infosys
//           </h2>
//         </div>
        
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="group">
//               <div className="flex items-start gap-4">
//                 {/* Icon */}
//                 <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 transition-all duration-300 group-hover:bg-red-200 group-hover:scale-110">
//                   <i className={`${stat.icon} text-xl text-red-600`} aria-hidden="true" />
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <div className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
//                     {stat.number}
//                   </div>
//                   <div className="mt-1 text-sm text-gray-600 sm:text-base">
//                     {stat.description}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



"use client";
import React, { useState, useEffect, useRef } from "react";

interface StatItem {
  number: string;
  description: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    number: '13+',
    description: 'Years of Experience',
    icon: 'fas fa-chart-line'
  },
  {
    number: '1000+',
    description: 'Happy Tally Customers (All Over India)',
    icon: 'fas fa-users'
  },
  {
    number: '3000+',
    description: 'Happy Customers Base All Over India',
    icon: 'fas fa-handshake'
  },
  {
    number: '65,000+',
    description: 'Youtube Subscribers',
    icon: 'fas fa-star'
  },
  {
    number: '12',
    description: 'GST Expert & Tally Certified Team',
    icon: 'fas fa-certificate'
  },
  {
    number: '400+',
    description: 'Tally Customization Tool',
    icon: 'fas fa-tools'
  }
];

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isIntersecting };
};

// Hook for number animation
const useCountAnimation = (targetValue: number, duration: number = 2000, start: boolean = false) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeOutQuart * targetValue);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, start]);

  return currentValue;
};

// Extract number from string (e.g., "1000+" -> 1000)
const extractNumber = (str: string): number => {
  const match = str.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, '')) : 0;
};

// Format number with commas and preserve suffix
const formatNumber = (value: number, originalString: string): string => {
  const suffix = originalString.replace(/[\d,]/g, '');
  const formattedNumber = value.toLocaleString();
  return formattedNumber + suffix;
};

// Individual stat component with animation
const AnimatedStat: React.FC<{ stat: StatItem; index: number; startAnimation: boolean }> = ({ 
  stat, 
  index, 
  startAnimation 
}) => {
  const targetNumber = extractNumber(stat.number);
  const currentNumber = useCountAnimation(targetNumber, 2000 + (index * 200), startAnimation);

  return (
    <div className="group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 transition-all duration-300 group-hover:bg-red-200 group-hover:scale-110">
          <i className={`${stat.icon} text-xl text-red-600`} aria-hidden="true" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl transition-all duration-300">
            {startAnimation ? formatNumber(currentNumber, stat.number) : '0'}
          </div>
          <div className="mt-1 text-sm text-gray-600 sm:text-base">
            {stat.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatisticsLeftContent = () => {
  const { ref, isIntersecting } = useIntersectionObserver(0.3);

  return (
    <div className="relative px-6 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Why Shivansh Infosys
          </h2>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat 
              key={index}
              stat={stat}
              index={index}
              startAnimation={isIntersecting}
            />
          ))}
        </div>
      </div>
    </div>
  );
};