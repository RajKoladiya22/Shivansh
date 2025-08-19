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
  CheckCircle,
  ChevronDown,
  Clock,
  Users,
  Check,
  Phone,
  Settings,
  Calculator,
  BarChart3,
  Upload,
  BookOpen,
  Layers,
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
    icon: <Calculator className="h-6 w-6" />,
    title: "Complete Tally Setup",
    description:
      "Full installation and configuration of Tally ERP software tailored to your business needs",
    details: [
      "Fresh Tally ERP installation",
      "Company data structure setup",
      "Chart of accounts configuration",
      "Initial settings and preferences",
    ],
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "License Activation & Configuration",
    description:
      "Professional license activation and system configuration for optimal performance",
    details: [
      "Tally license procurement and activation",
      "Multi-user setup configuration",
      "Network and security settings",
      "Backup and data security setup",
    ],
  },
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Data Migration",
    description:
      "Seamless migration of existing accounting data from old systems to Tally ERP",
    details: [
      "Legacy system data extraction",
      "Data cleaning and validation",
      "Structured data import to Tally",
      "Historical data preservation",
    ],
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Custom Reports",
    description:
      "Design and setup of customized reports to meet your specific business requirements",
    details: [
      "Business-specific report design",
      "Automated report generation",
      "Dashboard and analytics setup",
      "MIS report configuration",
    ],
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "User Training",
    description:
      "Comprehensive training program for your team to effectively use Tally ERP",
    details: [
      "Basic to advanced Tally training",
      "Role-based user training sessions",
      "Hands-on practice sessions",
      "Training materials and documentation",
    ],
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Integration Services",
    description: "Seamless integration with existing business systems and third-party applications",
    details: [
      "API integration with other systems",
      "Bank reconciliation setup",
      "E-commerce platform integration",
      "Payment gateway connectivity",
    ],
  },
];

const whyNeeded = [
  {
    icon: <Calculator className="h-8 w-8" />,
    title: "Streamlined Accounting",
    description:
      "Automate your accounting processes with Tally ERP implementation, reducing manual work and improving accuracy in financial management.",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Better Reporting",
    description:
      "Get real-time financial insights with customized reports and dashboards that help you make informed business decisions quickly.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Improved Efficiency",
    description:
      "Boost your team's productivity with streamlined workflows, automated calculations, and integrated business processes.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Cost Control",
    description:
      "Better track expenses, monitor cash flow, and control costs with comprehensive financial management and budgeting features.",
  },
];

const benefits = [
  "Complete Tally ERP installation and setup",
  "Professional license activation and configuration",
  "Seamless data migration from existing systems",
  "Custom report design and implementation",
  "Comprehensive user training and support",
  "Third-party system integration services",
  "Backup and security configuration",
  "Ongoing technical support and maintenance",
];

const faqs = [
  {
    question: "What does a complete Tally implementation include?",
    answer:
      "Our Tally implementation includes software installation, license activation, company setup, chart of accounts configuration, data migration, custom reports, user training, and system integration with existing business processes.",
  },
  {
    question: "How long does the Tally implementation process take?",
    answer:
      "A standard Tally implementation takes 4-6 business days, depending on the complexity of your business requirements, data migration needs, and customization requirements.",
  },
  {
    question: "Can you migrate data from our existing accounting software?",
    answer:
      "Yes, we provide comprehensive data migration services from various accounting systems including Excel, other ERP software, and legacy systems, ensuring no data loss during the transition.",
  },
  {
    question: "Do you provide training for our accounting staff?",
    answer:
      "Absolutely! We provide comprehensive training covering basic to advanced Tally features, role-based training for different users, and hands-on practice sessions with documentation.",
  },
  {
    question: "What kind of ongoing support do you provide after implementation?",
    answer:
      "We offer ongoing technical support including troubleshooting, software updates, additional customizations, user queries resolution, and periodic system optimization services.",
  },
];

const testimonials = [
  {
    name: "Suresh Agarwal",
    company: "Agarwal Trading Co.",
    rating: 5,
    text: "The Tally implementation was seamless. Our entire accounting process is now automated and we're saving 4-5 hours daily on bookkeeping tasks.",
  },
  {
    name: "Meera Shah",
    company: "Shah Industries Ltd.",
    rating: 5,
    text: "Excellent service! The team migrated all our historical data perfectly and the custom reports they created are exactly what we needed for our business.",
  },
  {
    name: "Rakesh Patel",
    company: "Patel Manufacturing",
    rating: 5,
    text: "Professional implementation with great attention to detail. The training provided was comprehensive and our team is now fully confident using Tally ERP.",
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "600+",
    label: "Implementations",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "4-6",
    label: "Days Setup Time",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "100%",
    label: "Data Migration",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.8",
    label: "Client Rating",
  },
];

const pricingFeatures = [
  "Complete Tally ERP Installation",
  "License Activation & Configuration",
  "Data Migration from Existing Systems",
  "Custom Reports & Dashboard Setup",
  "Comprehensive User Training",
  "System Integration Services",
  "Backup & Security Configuration",
  "30-Day Implementation Support",
];

export const TheTallyImplementationPage = () => {
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
                Complete Tally Solution
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
                Professional Tally{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Implementation Services
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Complete Tally ERP setup and customization for your business with data migration, training, and seamless integration services.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 mb-16 flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
              <button
                              aria-label="Click"
                              className={`flex transform cursor-pointer items-center justify-center gap-2 rounded-lg ${btn_color} px-6 py-3 font-bold tracking-wide text-white`}
                              onClick={() => {
                                window.location.href = "tel:+918141703007";
                              }}
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
                heading="Our Services"
                headingText="Complete Tally Implementation"
                headingDescription="Everything you need for successful Tally ERP implementation, from installation to training and ongoing support."
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
              heading="Why Tally Implementation"
              headingText="Transform Your Accounting Process"
              headingDescription="Professional Tally implementation streamlines your financial management and provides the foundation for business growth."
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
                heading="Benefits"
                headingText="Streamline Your Business"
                headingDescription="Get your accounting system running efficiently with our comprehensive Tally implementation services designed for business success."
                alignment="left"
                containerClassName="!px-0"
                descriptionClassName="mb-8"
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
                      ₹95,000/-
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
                      <div className="text-sm text-gray-600">Data Migration</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button aria-label="Click"
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
              heading="FAQ"
              headingText="Frequently Asked Questions"
              headingDescription="Get answers to common questions about our comprehensive Tally implementation service."
            />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-[#C502021A] bg-white"
              >
                <button aria-label="Click"
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
              heading="Testimonials"
              headingText="What Our Clients Say"
              headingDescription="Don't just take our word for it. Here's what our satisfied clients have to say about our Tally implementation service."
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
               Ready to Implement Tally ERP?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join 600+ businesses that trust us with their Tally implementation. Get your accounting system up and running with professional setup and support!`}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="tel:+918141703007"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                Call Now: +91 8141703007
              </Link>
              <button aria-label="Click"
                onClick={() => window.open("https://wa.me/918141703007", "_blank")}
                className="cursor-pointer rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                WhatsApp
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Professional Setup • Data Migration • Comprehensive Training
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
