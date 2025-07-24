"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IndustryCard } from "src/_components/molecules";
import { industries } from "public/data/Solutions";

export const WiseSolutionsIndustry = () => {
  return (
    // py-16 sm:py-20 md:py-24
    <section className="py-12 sm:py-16 md:py-20 lg:py-15">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-(--primery-color)">
            INDUSTRY SOLUTIONS
          </div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Tailored Solutions for Every Industry
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Discover how our specialized Tally solutions can transform your
            business operations, regardless of your industry.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 rounded-2xl bg-gradient-to-r from-gray-900 to-black p-8 text-white"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 text-xl font-bold">
                Need a Custom Solution?
              </h3>
              <p className="max-w-xl text-gray-300">
                We specialize in developing tailored Tally solutions for unique
                business requirements.
              </p>
            </div>
            <Link
              href={"tel:+918141703007"}
              className="transform rounded-lg bg-white px-8 py-3 font-bold whitespace-nowrap text-gray-900 shadow-lg transition-all hover:-translate-y-1 hover:bg-gray-100"
            >
              Call for Custom Solution
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
