"use client";
import React from "react";
import { SectionHeader } from "src/_components/ui";
import { testimonials } from "public/data/testimonials";
import { ReusableSlider } from "src/_components/molecules";
import { TestimonialCard } from "src/_components/molecules";
import type { Testimonial } from "src/_components/sections/types/testimonial.type";

export const CustomerTestimonials = () => {
  return (
    // py-20

    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="">
        <SectionHeader
          heading="CUSTOMER TESTIMONIALS"
          headingText="The Talk of The Shivansh Infosys"
        />
      </div>

      {/* Testimonial Section */}
      <div className="to-red-40 rounded-3xl bg-gradient-to-t from-red-100 p-6 lg:p-12">
        {/* <SectionHeader heading="WHAT OUR CUSTOMERS SAY" /> */}

        {/* Testimonial Cards Container */}

        <ReusableSlider
          items={testimonials}
          renderItem={(testimonial) => (
            <TestimonialCard testimonial={testimonial as Testimonial} />
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
  );
};
