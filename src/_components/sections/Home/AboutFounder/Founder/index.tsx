"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export const TheFounder = () => {
  const [years, setYears] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 13;
      const duration = 2000;
      // const incrementTime = 50;
      
      const timer = setInterval(() => {
        start += 1;
        setYears(start);
        if (start >= end) clearInterval(timer);
      }, duration / end);
    }
  }, [isInView]);

  return (
    // py-16 sm:py-20 md:pb-24
    <div className="py-12 sm:py-16 md:py-20 lg:py-15">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3">
              ABOUT THE FOUNDER
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {`Hello, We're Shivansh Infosys`}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {`We are a digital agency with a team of passionate individuals. The journey started with a single man's dream to build a company providing remarkable IT services.`}
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Image Section - Left Column */}
          <div 
            ref={ref}
            className="relative lg:col-span-7 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
          >
            {/* Founder Image */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="absolute bottom-0 right-0 h-[85%] w-[75%] z-20 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* <div className="bg-gray-200 border-2 border-dashed w-full h-full" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <Image
                src="/images/founder/founder.png"
                alt="Founder"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            {/* Office Image */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute top-0 left-0 h-[70%] w-[65%] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Office environment"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
              <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-4 left-4 z-30 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3"
            >
              <div className="text-3xl md:text-4xl font-bold">{years}+</div>
              <div className="text-sm font-medium max-w-[100px]">
                Years of Excellence
              </div>
            </motion.div>
            
            {/* Since 2007 Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-4 right-4 z-30 bg-white px-5 py-3 rounded-full shadow-md"
            >
              <div className="text-red-600 font-bold tracking-wider text-sm sm:text-base">
                SINCE 2007
              </div>
            </motion.div>
          </div>
          
          {/* Text Content - Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {`Our Founder's Vision`}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Our reputation grew as we began taking on bigger projects, but we never lost sight of our main goal: building long-term relationships and ensuring our clients are happy.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {`With over a decade of experience, we've maintained our commitment to excellence in every project we undertake. Our founder's passion for technology continues to drive our innovation.`}
              </p>
              
              <div className="pt-4">
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "1500+", label: "End Users" },
                    { value: "450+", label: "Companies" },
                    { value: "65K+", label: "YouTube Subs" }
                  ].map((stat, index) => (
                    <div key={index} className="flex-1 min-w-[120px] bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="text-xl font-bold text-red-600">{stat.value}</div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link href={"/about"} className="mt-6 px-8 py-3 bg-(--primery-color) text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Read Full Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};