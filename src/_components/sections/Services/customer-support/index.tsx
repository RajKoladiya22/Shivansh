"use client";
import { useState } from "react";
import {
  //   Headphones,
  //   Phone,
  //   MessageCircle,
  //   Clock,
  //   Shield,
  //   Users,
  //   CheckCircle,
  Star,
  //   ArrowRight,
  Zap,
  Target,
  Award,
  //   Calculator,
  Settings,
  BookOpen,
  //   ChevronDown,
  ChevronUp,
  Monitor,
  Globe,
} from "lucide-react";
import {
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";

export const TheCustomerSupportPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    {
      label: "Happy Clients",
      value: "500+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Issues Resolved",
      value: "10,000+",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      label: "Average Response",
      value: "<5 min",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      label: "Customer Rating",
      value: "4.9/5",
      icon: <Star className="h-6 w-6" />,
    },
  ];

  const supportChannels = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "24/7 Phone Support",
      description: "Immediate assistance via phone call",
      availability: "Available 24/7",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat Support",
      description: "Real-time chat assistance",
      availability: "Available 24/7",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Remote Desktop Support",
      description: "Direct system access for complex issues",
      availability: "On-demand",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multi-language Support",
      description: "Support in multiple regional languages",
      availability: "Business Hours",
    },
  ];

  const whyNeeded = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Minimize Business Downtime",
      description:
        "Quick resolution of technical issues ensures your business operations continue without interruption.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Complex Software Management",
      description:
        "Tally ERP and accounting software require expert knowledge for optimal performance and troubleshooting.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Security & Compliance",
      description:
        "Professional support ensures your financial data remains secure and compliant with regulations.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Maximize Software ROI",
      description:
        "Expert guidance helps you utilize all features effectively, maximizing your software investment.",
    },
  ];

  const tallyServices = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Tally ERP Setup & Configuration",
      description:
        "Complete installation, configuration, and customization of Tally ERP according to your business needs.",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "TDL (Tally Definition Language) Setup",
      description:
        "Custom TDL development and integration for enhanced functionality and automated processes.",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Tally Training & Certification",
      description:
        "Comprehensive training programs for your team to master Tally ERP features and best practices.",
    },
  ];

  const benefits = [
    "Reduced operational downtime by 90%",
    "Faster issue resolution within 5 minutes",
    "Expert Tally ERP guidance and troubleshooting",
    "Custom TDL solutions for business automation",
    "Comprehensive staff training programs",
    "24/7 multi-channel support availability",
    "Proactive system monitoring and maintenance",
    "Compliance with GST and accounting standards",
  ];

  const faqs = [
    {
      question: "What types of Tally issues do you resolve?",
      answer:
        "We handle all Tally-related issues including installation problems, data corruption, TDL errors, GST compliance issues, report generation problems, and performance optimization.",
    },
    {
      question: "How quickly can you resolve technical issues?",
      answer:
        "Our average response time is under 5 minutes, and most issues are resolved within 30 minutes. Complex problems may take longer but we provide regular updates throughout the process.",
    },
    {
      question: "Do you provide TDL customization services?",
      answer:
        "Yes, we specialize in TDL (Tally Definition Language) development and customization. We create custom forms, reports, and automation solutions tailored to your business requirements.",
    },
    {
      question: "Is remote support secure for accessing our systems?",
      answer:
        "Absolutely. We use enterprise-grade secure remote access tools with end-to-end encryption. Access is granted only with your permission and all sessions are logged for security.",
    },
    {
      question: "Do you provide training for our staff?",
      answer:
        "Yes, we offer comprehensive Tally training programs covering basic operations to advanced features. Training can be conducted on-site or remotely based on your preference.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "ABC Manufacturing Ltd.",
      rating: 5,
      text: "Their Tally support is exceptional. They resolved our complex TDL issue within hours and provided excellent training to our team.",
    },
    {
      name: "Priya Sharma",
      company: "XYZ Trading Co.",
      rating: 5,
      text: "24/7 support is a game-changer for our business. Quick responses and expert solutions every time.",
    },
    {
      name: "Amit Patel",
      company: "PQR Services Pvt. Ltd.",
      rating: 5,
      text: "The TDL customization they provided automated our entire billing process. Highly recommended!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white  text-black pt-20 lg:pt-32">
        {/* <div className="absolute inset-0 bg-black/10"></div> */}
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-center">
              {/* Badge */}
              <div className="relative inline-block">
                <p className={`z-10 ${hero_heading_font}`}>
                  24/7 Expert Support Available
                </p>
                <div
                  className={`absolute top-0 h-[50%] rounded-lg bg-(--pink) sm:h-full`}
                  style={{
                    width: "calc(40% + 20px)",
                    right: "0",
                    transform: "translate(10%, -40%)",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className={`${hero_headline_font}`}>
                  Professional Customer{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-(--primery-color)">
                      Support Services
                    </span>
                    <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                  </span>
                </h1>

                {/* Subheading */}
                <p className={`max-w-2xl ${hero_content_font}`}>
                  {`Expert Tally ERP support, TDL customization, and comprehensive training solutions to keep your business running smoothly 24/7.`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
                <button
                  className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primery-color) from-blue-600 to-indigo-700 px-6 py-3 font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() =>
                    window.open("https://bitly.cx/rNEH4", "_blank")
                  }
                >
                  Get Instant Support
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <button
                  className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-(--primery-color) bg-white px-6 py-3 font-bold tracking-wide text-(--primery-color) shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-(--primery-color) hover:text-white hover:shadow-lg"
                  onClick={() => window.open("tel:+918141703007", "_self")}
                >
                  Schedule Consultation
                  <svg
                    className="ml-2 h-5 w-5 transform transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* <div className="relative">
              <div className="rounded-2xl border border-red-200 bg-white/10 p-8 backdrop-blur-lg">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-3 flex justify-center text-black">
                        {stat.icon}
                      </div>
                      <div className="mb-1 text-2xl font-bold">
                        {stat.value}
                      </div>
                      <div className="text-sm text-black">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="Reach Us"
              headingText=" From Multiple Ways  "
              headingDescription="Choose your preferred communication channel. We're available
              whenever you need us."
              // descriptionClassName="mx-auto"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {supportChannels.map((channel, idx) => (
              <div
                key={idx}
                className="flex h-full flex-col rounded-2xl border border-[#C502021A] bg-[#FCF2F2] p-8 text-center transition-colors duration-300 hover:bg-[#FFCCD6]"
              >
                <div className="mb-4 flex justify-center text-[#C50202]">
                  {channel.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#000000]">
                  {channel.title}
                </h3>
                <p className="mb-4 flex-grow text-gray-600">
                  {channel.description}
                </p>
                <span className="mt-auto rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#C50202]">
                  {channel.availability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customer Support is Needed */}
      <section className="bg-gradient-to-b from-white via-white to-red-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="Why"
              headingText=" Professional Support is Essential  "
              headingDescription="In today's fast-paced business environment, technical issues can't
              wait. Our expert support ensures your operations never stop."
              // descriptionClassName="mx-auto"
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyNeeded.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#C502021A] bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mb-4 text-[#C50202]">{item.icon}</div>
                <h3 className="mb-4 text-xl font-bold text-[#000000]">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tally Expertise Section */}
      <section className="bg-gradient-to-b from-red-50 via-white to-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="tally erp & TDL"
              headingText="  Expertise & Solutions "
              headingDescription="Specialized support for Tally ERP software with custom TDL
              development and comprehensive training programs."
              // descriptionClassName="mx-auto"
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {tallyServices.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#C502021A] bg-white p-8 shadow-lg transition-all duration-300 hover:border-[#C50202] hover:shadow-xl"
              >
                <div className="mb-6 text-[#C50202]">{service.icon}</div>
                <h3 className="mb-4 text-2xl font-bold text-[#000000]">
                  {service.title}
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <button className="flex items-center font-semibold text-[#C50202] transition-colors duration-300 hover:text-[#C5020280]">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-white via-white to-red-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
            <SectionHeader
              heading="How Our Support"
              headingText="Helps Your Business "
              headingDescription="Our comprehensive support services are designed to enhance your
                business efficiency, reduce costs, and ensure smooth operations."
              descriptionClassName="mb-8 "
              alignment="left"
              containerClassName="!px-0"
            />

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-[#C50202]" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#FCF2F2] to-[#FFCCD6] p-8 lg:p-12">
              <div className="text-center">
                <div className="mb-4 text-6xl font-bold text-[#C50202]">
                  90%
                </div>
                <div className="mb-2 text-xl font-semibold text-[#000000]">
                  Faster Issue Resolution
                </div>
                <div className="mb-8 text-gray-600">
                  Compared to traditional support methods
                </div>

                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="rounded-lg border border-[#C502021A] bg-white p-4">
                    <div className="text-2xl font-bold text-[#C50202]">
                      ₹ XXX/-
                    </div>
                    <div className="text-sm text-gray-600">Starting Price</div>
                  </div>
                  <div className="rounded-lg border border-[#C502021A] bg-white p-4">
                    <div className="text-2xl font-bold text-[#C50202]">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-red-50 via-white to-white py-14 sm:py-18">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="faq"
              headingText="Frequently Asked Questions"
              headingDescription="Got questions? We've got answers to help you understand our
              support services better."
              // descriptionClassName="mx-auto"
            />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-[#C502021A] bg-white"
              >
                <button
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-[#FCF2F2]"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className="text-lg font-semibold text-[#000000]">
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-[#C50202]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#C50202]" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="testimonials"
              headingText="What Our Clients Say"
              headingDescription="Don't just take our word for it. Here's what our satisfied clients
              have to say."
              // descriptionClassName="mx-auto"
            />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#C502021A] bg-[#FCF2F2] p-8"
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-[#C50202]"
                    />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-gray-700">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-[#000000]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="">
        <div className="mx-auto mb-15 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-center text-white sm:rounded-2xl sm:p-8 md:p-12">
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Ready to Get Expert Support?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join 500+ satisfied clients who trust us with their Tally ERP and business support needs. Get started today!`}
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
            <p className="mt-2 text-xs text-gray-500">
              24/7 Support Available • Quick Response Guaranteed • Expert Team
              Ready
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// pages/support.tsx
import React, { type JSX } from "react";
import Head from "next/head";
import {
  Headphones,
  FileText,
  Truck,
  Shield,
  Calculator,
  GraduationCap,
  Clock,
  Phone,
  MessageCircle,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "src/_components/ui";
