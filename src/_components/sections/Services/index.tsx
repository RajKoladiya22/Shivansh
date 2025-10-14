"use client";
import React from "react";
import {
  Headphones,
  FileText,
  Truck,
  Shield,
  Calculator,
  GraduationCap,
  ArrowRight,
  Check,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { HeroService } from "./ServiceHero";
import { SectionHeader } from "src/_components/ui";
import Link from "next/link";
export const stats = [
  {
    icon: <Users className="h-6 w-6" />,
    number: "3000+",
    label: "Happy Clients",
  },
  {
    icon: <Award className="h-6 w-6" />,
    number: "99.9%",
    label: "Success Rate",
  },
  {
    icon: <Star className="h-6 w-6" />,
    number: "4.6/5",
    label: "Client Rating",
  },
];
export const services = [
  {
    id: "tally-customer-support",
    title: "Customer Support",
    icon: <Headphones className="h-8 w-8" />,
    shortDescription:
      "Dedicated customer support to resolve your queries instantly",
    fullDescription:
      "Our expert customer support team provides round-the-clock assistance to ensure your business operations run smoothly without any interruptions.",
    features: [
      "One-year dedicated support for Tally users",
      "Expert Technical Assistance",
      "GST, E-Invoice & E-Way Bill Guide",
      "Multi-language Support",
      "Remote Desktop Support",
    ],
    benefits: [
      "Reduced Downtime",
      "Improved Productivity",
      "Expert Guidance",
      "Peace of Mind",
    ],
    pricing: "Starting from ₹ **0/year",
    duration: "Ongoing Support",
    clients: "1000+",
    rating: 4.9,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    id: "tally-e-invoice",
    title: "E-Invoice Setup",
    icon: <FileText className="h-8 w-8" />,
    shortDescription: "Complete e-invoicing system setup for GST compliance",
    fullDescription:
      "Streamline your billing process with our comprehensive e-invoice setup service, ensuring 100% GST compliance and automated invoice generation.",
    features: [
      "Seamless E‑Invoice portal → Tally integration",
      "staff training on E‑Invoice generation",
      "1-month post‑setup error resolution & support",
      "Bulk Invoice Processing",
      "Real-time Validation",
    ],
    benefits: [
      "GST Compliance",
      "Faster Processing",
      "Reduced Errors",
      "Cost Savings",
    ],
    pricing: "Starting from ₹ **0/-",
    duration: "3-5 Business Days",
    clients: "800+",
    rating: 4.8,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "tally-e-way-bill-setup",
    title: "E-Way Bill Setup",
    icon: <Truck className="h-8 w-8" />,
    shortDescription:
      "Automated e-way bill generation for seamless goods transportation",
    fullDescription:
      "Ensure smooth goods movement with our e-way bill setup service, featuring automated generation and real-time tracking capabilities.",
    features: [
      "Tally-E‑Way Bill Portal Setup",
      "Real-time Tracking",
      "1-month Post‑Setup Support",
      "Hands‑On Staff Training",
      "Compliance Monitoring",
    ],
    benefits: [
      "Legal Compliance",
      "Smooth Transportation",
      "Time Saving",
      "Error Reduction",
    ],
    pricing: "Starting from ₹ **0/-",
    duration: "2-4 Business Days",
    clients: "700+",
    rating: 4.7,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "tally-security-setup",
    title: "Security Setup",
    icon: <Shield className="h-8 w-8" />,
    shortDescription:
      "Comprehensive security solutions to protect your business data",
    fullDescription:
      "Safeguard your business with our multi-layered security setup including firewall configuration, data encryption, and access controls.",
    features: [
      "Role-Based Access Controls",
      "Admin & User Setup",
      "Data Encryption",
      "Access Control Systems",
      "Security Auditing",
      "Threat Monitoring",
    ],
    benefits: [
      "Data Protection",
      "Cyber Security",
      "Compliance",
      "Risk Mitigation",
    ],
    pricing: "Starting from ₹ **0/-",
    duration: "5-7 Business Days",
    clients: "800+",
    rating: 4.9,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "tally",
    title: "Tally Implementation",
    icon: <Calculator className="h-8 w-8" />,
    shortDescription:
      "Complete Tally Prime setup and customization for your business",
    fullDescription:
      "Get your accounting system up and running with our comprehensive Tally implementation service, including customization and data migration.",
    features: [
      "Complete Tally Setup",
      "License activation and configuration",
      "Data Migration",
      "Custom Reports",
      "User Training",
      "Integration Services",
    ],
    benefits: [
      "Streamlined Accounting",
      "Better Reporting",
      "Improved Efficiency",
      "Cost Control",
    ],
    pricing: "Starting from ₹ **0/-",
    duration: "4-6 Business Days",
    clients: "1000+",
    rating: 4.8,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "tally-data-entry",
    title: "Data Entry Training",
    icon: <GraduationCap className="h-8 w-8" />,
    shortDescription:
      "Professional training programs to enhance data entry skills",
    fullDescription:
      "Boost your team's productivity with our comprehensive data entry training covering accuracy, speed, and best practices.",
    features: [
      "Hands-on Training",
      "Speed & Accuracy Focus",
      "Software Proficiency",
      "Best Practices",
      "Certification Program",
    ],
    benefits: [
      "Improved Accuracy",
      "Increased Speed",
      "Better Productivity",
      "Skill Development",
    ],
    pricing: "Starting from ₹ **0/person",
    duration: "1-2 Weeks",
    clients: "700+",
    rating: 4.7,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
];
export const TheServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags would go in head */}

      {/* Hero Section */}
      <HeroService />

      {/* Services Grid Section */}
      <section className="bg-gradient-to-t from-white via-red-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <SectionHeader
              heading="OUR SERVICE"
              headingText="Complete Tally Services"
              headingDescription="From customer support to security setup, we provide end-to-end solutions 
              to help your business thrive in the digital age."
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group rounded-2xl border bg-white shadow-lg transition-all duration-500 hover:-translate-y-1.03 hover:shadow-2xl ${service.borderColor} overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Service Header */}
                <div
                  className={`${service.bgColor} relative overflow-hidden p-6`}
                >
                  <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-0 left-0 h-16 w-16 -translate-x-8 translate-y-8 rounded-full bg-white/10"></div>

                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-r ${service.color} mb-4 rounded-xl text-white shadow-lg`}
                  >
                    {service.icon}
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <div className="mb-3 flex items-center">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(service.rating)
                              ? "fill-current text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {service.rating} ({service.clients} clients)
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {service.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Duration */}
                  {/* <div className="mb-6 rounded-xl bg-gray-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Starting Price:
                      </span>
                      <span className="font-bold text-gray-900">
                        {service.pricing}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Timeline:</span>
                      <span className="font-medium text-gray-700">
                        {service.duration}
                      </span>
                    </div>
                  </div> */}

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/${service.id}`}
                      className={`flex-1 bg-gradient-to-r text-center ${service.color} group cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="tel:+918141703007"
                      className="flex-1 cursor-pointer rounded-xl border-2 border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300 hover:border-gray-300 hover:bg-gray-50"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Choose Our Services?
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                {`With over a decade of experience, we've helped thousands of
                businesses streamline their operations and achieve their goals.`}
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Expert Team",
                    desc: "Certified professionals with extensive industry experience",
                  },
                  {
                    title: "Quick Implementation",
                    desc: "Fast deployment with minimal business disruption",
                  },
                  {
                    title: "Ongoing Support",
                    desc: "On Time customer support and maintenance services",
                  },
                  {
                    title: "Cost-Effective",
                    desc: "Competitive pricing with transparent cost structure",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
                      <Check className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-red-50 to-purple-50 p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white p-6 text-center shadow-sm"
                    >
                      <div className="mb-3 flex justify-center text-red-600">
                        {stat.icon}
                      </div>
                      <div className="mb-1 text-2xl font-bold text-gray-900">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="mx-auto mb-15 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-center text-white sm:rounded-2xl sm:p-8 md:p-12">
          <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
            Ready to Transform Your Business?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
            {`Get started with our professional services today and experience the difference.`}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="tel:+918141703007"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
            >
              Call Now: +91 8141703007
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
