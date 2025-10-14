"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LightBulbIcon,
  FlagIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Eye, Target } from "lucide-react";
import { SectionHeader } from "src/_components/ui";

export const HowItWork = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="row">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              heading="HOW IT WORKS?"
              headingText="The Story Behind Shivansh"
              headingDescription="Finding a business with congruent values and business culture is important when choosing a partner. 
              When this first tier of trust is established, it is more likely that each party will continue with 
              a valued level of transparency and communication."
              // headingTextClassName="pb-10"
            />
          </motion.div>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-8 text-white shadow-2xl transition duration-300 ease-out hover:scale-101"
          >
            <div className="absolute top-6 right-6 z-0 opacity-10">
              <LightBulbIcon className="h-24 w-24" />
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex flex-wrap items-start gap-5 sm:flex-nowrap">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-3xl font-bold">01</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                    {/* <LightBulbIcon className="h-6 w-6 text-yellow-300" /> */}
                    <Eye className="h-8 w-8 text-yellow-300" />
                    Our Vision
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-300"></div>
                      <p className="text-base leading-relaxed opacity-90">
                        {`To be the most trusted Tally partner, driving efficiency and growth with innovative solutions.
`}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-300"></div>
                      <p className="text-base leading-relaxed opacity-90">
                        Creating innovative solutions that transform businesses
                        and exceed expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/20 pt-6">
                <div className="flex items-center">
                  <ArrowPathIcon className="mr-2 h-5 w-5 text-yellow-300" />

                  <span className="text-sm font-medium">
                    Continuous innovation since 2007
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 to-red-500 p-8 text-white shadow-2xl transition duration-300 ease-out hover:scale-101"
          >
            <div className="absolute top-6 right-6 z-0 opacity-10">
              <FlagIcon className="h-24 w-24" />
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex flex-wrap items-start gap-5 sm:flex-nowrap">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-3xl font-bold">02</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                    {/* <FlagIcon className="h-6 w-6 text-yellow-300" /> */}
                    <Target className="h-8 w-8 text-yellow-300" />
                    Our Mission
                  </h3>

                  <div className="space-y-4">
                    <p className="text-base leading-relaxed opacity-90">
                      {`To deliver reliable Tally services and customizations that solve business challenges and support mutual success.`}
                    </p>
                    <p className="text-base leading-relaxed opacity-90">
                      We work alongside clients to identify problems and develop
                      effective, tailored solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/20 pt-6">
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "3000+", label: "End Users" },
                    { value: "450+", label: "Companies" },
                    { value: "66K+", label: "YouTube Subs" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-white/10 px-4 py-2"
                    >
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white shadow-xl"
        >
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Our Core Values
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                {
                  title: "Integrity",
                  desc: "Honest communication and ethical business",
                },
                {
                  title: "Innovation",
                  desc: "Continually seeking better solutions",
                },
                {
                  title: "Excellence",
                  desc: "Quality in everything we deliver",
                },
                {
                  title: "Partnership",
                  desc: "Building long-term relationships",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="transform rounded-xl bg-white/10 p-5 shadow-2xl transition duration-300 ease-out hover:scale-103"
                >
                  <div className="mb-2 text-lg font-bold">{value.title}</div>
                  <p className="text-sm opacity-80">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
