"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import { testimonials } from "public/data/testimonials";
import { ReusableSlider } from "src/_components/molecules/Slider";
import { TestimonialCard } from "./Card/card";


export const CustomerTestimonials = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="py-4">
          <SectionHeader
            heading="CUSTOMER TESTIMONIALS"
            headingText="The Talk of The Shivansh Infosys"
          />
        </div>

        {/* Testimonial Section */}
        <div className="mb-8 rounded-3xl bg-pink-50 p-6 lg:p-12">
          <SectionHeader heading="WHAT OUR CUSTOMERS SAY" />

          {/* Testimonial Cards Container */}

          <ReusableSlider
            items={testimonials}
            renderItem={(testimonial) => (
              <TestimonialCard testimonial={testimonial} />
            )}
            layout="row"
            itemsPerSlide={{
              mobile: 1,
              tablet: 1,
              desktop: 2,
            }}
            autoPlay={true}
            autoPlayInterval={5000}
            showArrows={true}
            showDots={true}
            // arrowPosition="inside"
            gap="1.5rem"
            className="py-8"
          />



        </div>
      </div>
    </div>
  );
};
