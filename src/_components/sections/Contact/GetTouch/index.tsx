"use client";
import React from "react";
import { Award, TrendingUp, MessageSquare, Headphones } from "lucide-react";

export const reasons = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Get Expert Consultation",
    description:
      "Connect with our specialists for personalized solutions tailored to your business needs.",
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "24/7 Customer Support",
    description:
      "Need help? Our dedicated support team is here to assist you around the clock.",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Scale Your Business",
    description:
      "Discuss growth strategies and learn how we can help you reach your next milestone.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Partnership Opportunities",
    description:
      "Explore collaboration possibilities and join our network of successful partners.",
  },
];

export function Gettouch() {
  return (
    <div className="bg-white">
      {/* Why Contact Us Section */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2
              className="mb-6 text-3xl font-bold md:text-4xl"
              style={{ color: "#C50202" }}
            >
              Why Get In Touch With Us?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {`Whether you're looking to start a new project, need expert advice,
              or want to explore partnership opportunities, we're here to help
              you succeed.`}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <div key={index} className="group">
                <div className="h-full rounded-2xl border border-2 border-red-100 border-transparent bg-pink-50 p-8 transition-all duration-300 hover:border-pink-200 hover:shadow-xl">
                  <div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "#C502021A", color: "#C50202" }}
                  >
                    {reason.icon}
                  </div>
                  <h3
                    className="mb-4 text-xl font-bold"
                    style={{ color: "#C50202" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
