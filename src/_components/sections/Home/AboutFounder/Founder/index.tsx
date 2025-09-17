"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { btn_color } from "src/config/constants";
import { ABOUT } from "public/data/Navigation";
import { SectionHeader } from "src/_components/ui";

export const TheFounder = () => {
  const [years, setYears] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 14;
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

    <div className="container mx-auto px-4">
      <div className="row">
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <SectionHeader
              heading="ABOUT THE FOUNDER"
              headingText="Hello, We're Shivansh Infosys"
              headingDescription="We are a digital agency with a team of passionate individuals. The journey started with a single man's dream to build a company providing remarkable IT services."
              // headingTextClassName="pb-10"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Image Section - Left Column */}
          <div
            ref={ref}
            className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:col-span-7 lg:h-[600px]"
          >
            {/* Founder Image */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="absolute right-0 bottom-0 z-20 h-[85%] w-[75%] overflow-hidden rounded-2xl shadow-xl"
            >
              {/* <div className="bg-gray-200 border-2 border-dashed w-full h-full" /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <Image
                src="/images/founder/mehul_patel.jpg"
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
              className="absolute top-0 left-0 h-[70%] w-[65%] overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src="/images/founder/founder_back_.jpg"
                alt="Office environment"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
              <div className="h-full w-full border-2 border-dashed bg-gray-200" />
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-2 right-0 z-30 flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-2 py-1 text-white shadow-lg sm:top-4 sm:right-4 sm:px-4 sm:py-2"
            >
              <div className="text-3xl font-bold md:text-4xl">{years}+</div>
              <div className="max-w-[100px] text-sm font-medium">
                Years of Excellence
              </div>
            </motion.div>

            {/* Since 2007 Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute left-50 bottom-4 z-30 rounded-full bg-white px-5 py-2 shadow-md"
            >
              <div className="text-sm font-bold tracking-wider text-red-600 sm:text-base">
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

              <p className="leading-relaxed text-gray-600">
                Our reputation grew as we began taking on bigger projects, but
                we never lost sight of our main goal: building long-term
                relationships and ensuring our clients are happy.
              </p>

              <p className="leading-relaxed text-gray-600">
                {`With over a decade of experience, we've maintained our commitment to excellence in every project we undertake. Our founder's passion for technology continues to drive our innovation.`}
              </p>

              <div className="pt-4">
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "1500+", label: "End Users" },
                    { value: "450+", label: "Companies" },
                    { value: "65K+", label: "YouTube Subs" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="min-w-[120px] flex-1 rounded-lg border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="text-xl font-bold text-red-600">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={ABOUT}
                className={`${btn_color} mt-6 rounded-lg px-8 py-3 font-medium shadow-lg`}
              >
                Read Full Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
