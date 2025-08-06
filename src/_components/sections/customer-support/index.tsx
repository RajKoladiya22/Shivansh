"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "src/_components/ui";
import {
  Star,
  Zap,
  Target,
  Award,
  ChevronUp,
  Monitor,
  Globe,
  Shield,
  CheckCircle,
  ChevronDown,
  Video,
  Clock,
  Users,
  Check,
  FileText,
  Phone,
} from "lucide-react";
import {
  btn_color,
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";
import { MoreService } from "src/_components/molecules/Section/service";

const serviceFeatures = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "One-year dedicated support for Tally users",
    description:
      "Comprehensive annual support package covering all your Tally ERP needs",
    details: [
      "12 months of unlimited technical support",
      "Priority queue access for faster resolution",
      "Dedicated account manager assigned",
      "Regular system health checks and optimization",
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Technical Assistance",
    description:
      "Certified professionals with deep Tally and accounting software expertise",
    details: [
      "Tally certified support engineers",
      "Average 5+ years of experience",
      "Specialized in GST, taxation, and compliance",
      "Regular training on latest updates and features",
    ],
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "GST, E-Invoice & E-Way Bill Guide",
    description:
      "Complete guidance for all GST compliance and e-invoicing requirements",
    details: [
      "Step-by-step GST return filing assistance",
      "E-invoice setup and troubleshooting",
      "E-way bill configuration and automation",
      "Compliance audit and validation",
    ],
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-language Support",
    description:
      "Support available in multiple regional languages for better communication",
    details: [
      "Hindi, English, Gujarati support",
      "Regional language documentation",
      "Native language speaking experts",
      "Cultural understanding of business practices",
    ],
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Remote Desktop Support",
    description:
      "Direct system access for complex troubleshooting and configuration",
    details: [
      "Secure remote access with permission",
      "Real-time problem diagnosis",
      "Hands-on configuration and setup",
      "Screen sharing for training sessions",
    ],
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: "Monthly Webinars & Training",
    description: "Stay updated with the latest features and industry practices",
    details: [
      "Monthly live webinars on Tally updates and features",
      "Interactive Q&A sessions with experts",
      "Training on new tools and compliance changes",
      "Session recordings and learning materials provided",
    ],
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

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "1000+",
    label: "Happy Clients",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "5 min",
    label: "Response Time",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "99%",
    label: "Resolution Rate",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "24/7",
    label: "Support Available",
  },
];

const pricingFeatures = [
  "One-year dedicated support for Tally users",
  "Expert Technical Assistance",
  "GST, E-Invoice & E-Way Bill Guide",
  "Multi-language Support",
  "Remote Desktop Support",
];

export const TheCustomerSupportPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-14 text-black sm:pb-18 lg:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
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
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Expert assistance for all your Tally ERP and business software needs with round-the-clock availability.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 mb-16 flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
              <button
                className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primery-color) from-blue-600 to-indigo-700 px-6 py-3 font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => window.open("https://bitly.cx/rNEH4", "_blank")}
              >
                <Phone className="h-5 w-5" />
                Instant Support
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 rounded-2xl border border-red-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mb-3 flex justify-center text-red-600">
                    {stat.icon}
                  </div>
                  <div className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="bg-gradient-to-b from-white via-gray-100 to-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="mb-16 text-center">
              <SectionHeader
                heading="Reach Us"
                headingText="Complete Service Package"
                headingDescription="Choose your preferred communication channel. We're available
              whenever you need us."
                // descriptionClassName="mx-auto"
              />
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {serviceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-red-100 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-red-100 p-3">
                      <div className="text-red-600">{feature.icon}</div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mb-4 font-semibold text-gray-600">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Customer Support is Needed */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="Why"
              headingText=" Businesses Choose Our Support "
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
            <div>
              <div className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-8 lg:p-12">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl text-gray-500 line-through">
                      ₹5,000/-
                    </span>
                    <div className="text-6xl font-bold text-red-600">
                      ₹ **0/-
                    </div>
                  </div>
                  <div className="mb-2 text-xl font-semibold text-gray-900">
                    Starting Price
                  </div>
                  <div className="mb-8 text-gray-600">
                    *Limited time offer for qualifying businesses
                  </div>

                  <div className="mb-8 space-y-3">
                    {pricingFeatures.slice(0, 4).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <Check className="mr-2 h-4 w-4 flex-shrink-0 text-red-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="rounded-lg border border-red-200 bg-white p-4">
                      <div className="text-2xl font-bold text-red-600">3-5</div>
                      <div className="text-sm text-gray-600">Days Setup</div>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-white p-4">
                      <div className="text-2xl font-bold text-red-600">
                        100%
                      </div>
                      <div className="text-sm text-gray-600">Compliance</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                  className={`${btn_color} inline-flex w-full transform items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white`}
                  onClick={() => window.open("tel:+918141703007", "_self")}
                >
                  <Phone className="h-5 w-5" />
                  Call +91 8141703007
                </button>
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
      <section className="bg-gradient-to-b from-white via-white to-red-50 py-14 sm:py-18">
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
                className="relative rounded-2xl border border-red-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="absolute top-4 right-4 text-red-100">
                  <svg
                    className="h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zM22 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                  </svg>
                </div>

                <div className="mb-4 flex">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mb-6 leading-relaxed text-gray-700 italic">
                  {`"${testimonial.text}"`}
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <span className="text-lg font-semibold text-red-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tally Expertise Service Section */}
      <section className="bg-gradient-to-b from-red-50 via-white to-white py-14 sm:py-18">
        <MoreService />
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
              <button
                onClick={() => window.open("https://wa.me/918141703007", "_blank")}
                className="cursor-pointer rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                WhatsApp
              </button>
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
