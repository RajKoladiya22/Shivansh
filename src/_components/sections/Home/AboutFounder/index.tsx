"use client";
import React, { useState, useEffect, useRef } from "react";

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

export const AboutTheFounder = () => {
  const { ref: statsRef, isIntersecting } = useIntersectionObserver(0.3);
  const animatedNumber = useCountAnimation(13, 2000, isIntersecting);

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-red-600 tracking-wide uppercase mb-3">
            ABOUT THE FOUNDER
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hello, We're Shivansh Infosys
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are a digital agency with a team of passionate individuals. The journey started with a single man's dream to 
            build a company with providing remarkable IT services and here we are!!
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20">
          
          {/* Left Side - Stats and Office Image */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Years Since Inception */}
            <div ref={statsRef} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-600">
                  {isIntersecting ? `${animatedNumber}+` : '0+'}
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">Years Since</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">Inception</p>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Office environment" 
                className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              />
            </div>
          </div>

          {/* Right Side - Founder Image and Content */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Founder Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Founder" 
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                  />
                </div>
                
                {/* Since 2007 Badge */}
                <div className="absolute -bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold tracking-wide">SINCE 2007</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Our reputation grew and we began taking on bigger projects. We never lost sight of 
                  our main goal: building long-term relationships and making certain our clients are 
                  happy. Our reputation grew and we began taking on bigger projects. We never lost 
                  sight of our main goal: building long-term relationships and making certain our 
                  clients are happy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-red-600 tracking-wide uppercase mb-3">
            HOW IT WORKS?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Story Behind of Shivansh
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Finding a business with congruent values and business culture is important choosing a partner. When this first 
            tier of trust is established, it is more likely that each party will continue with a valued level of 
            transparency and communication. You can count on us. We are always here to help our clients.
          </p>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Vision Card */}
          <div className="bg-red-600 text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold opacity-80">01</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Vision</h3>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Transparency is not just a buzzword. It's one of our core values 
                that continue to impress our clients.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Transparency is not just a buzzword. It's one of our core values 
                that continue to impress our clients.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-red-600 text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold opacity-80">02</div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Mission</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              We have partnered with some of the world's most exciting 
              companies to deliver exceptional IT Solutions. We 
              successfully work alongside clients to identify the problem 
              and develop effective solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};