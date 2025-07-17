"use client";
import React, { useState } from 'react';

export const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "We use shivansh infosys often to update our website and their work is always top-notch. They are efficient and always complete projects in a timely manner.",
      name: "Chelsea Davidson",
      title: "FOUNDER AT FORTRESS OF INCA",
      avatar: "/api/placeholder/80/80",
      document: "/api/placeholder/300/400",
      rating: 5
    },
    {
      id: 2,
      quote: "Outstanding service and exceptional quality. The team at Shivansh Infosys exceeded our expectations in every way. Highly recommended!",
      name: "John Smith",
      title: "CEO AT TECH SOLUTIONS",
      avatar: "/api/placeholder/80/80",
      document: "/api/placeholder/300/400",
      rating: 5
    },
    {
      id: 3,
      quote: "Professional, reliable, and innovative. Working with Shivansh Infosys has been a game-changer for our business growth and digital presence.",
      name: "Sarah Johnson",
      title: "MARKETING DIRECTOR AT GLOBAL CORP",
      avatar: "/api/placeholder/80/80",
      document: "/api/placeholder/300/400",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index : number) => {
    setCurrentTestimonial(index);
  };

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, i) => (
    <span key={i} className="text-yellow-400 text-xl">★</span>
  ));
};

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            CUSTOMER TESTIMONIALS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Talk of The Shivansh Infosys
          </h1>
        </div>

        {/* Testimonial Section */}
        <div className="bg-pink-50 rounded-3xl p-8 lg:p-12 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              WHAT OUR CUSTOMERS SAY
            </div>
            <blockquote className="text-xl lg:text-2xl text-gray-800 font-medium leading-relaxed max-w-4xl mx-auto">
              {`"${currentData?.quote}"`}
            </blockquote>
          </div>

          {/* Document/Certificate Image */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Document Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-1 bg-red-500 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1">
              {renderStars(currentData?.rating ?? 0)}
            </div>
          </div>

          {/* Customer Info */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-1">{currentData?.name}</h3>
            <p className="text-gray-600 text-sm font-medium">{currentData?.title}</p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-red-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows (for mobile/tablet) */}
        <div className="flex justify-between items-center mt-8 lg:hidden">
          <button
            onClick={prevTestimonial}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

 