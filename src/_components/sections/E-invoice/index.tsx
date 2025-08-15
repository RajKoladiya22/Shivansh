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
  Shield,
  CheckCircle,
  ChevronDown,
  Clock,
  Users,
  Check,
  FileText,
  Phone,
  Workflow,
  Database,
  Settings,
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
    icon: <Workflow className="h-6 w-6" />,
    title: "Seamless E-Invoice Portal → Tally Integration",
    description:
      "Direct integration between your Tally system and government e-invoice portal",
    details: [
      "Automatic data sync between Tally and IRP portal",
      "Real-time invoice registration and IRN generation",
      "Seamless GST return preparation",
      "Zero manual data entry required",
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Staff Training on E-Invoice Generation",
    description:
      "Comprehensive training program for your team on e-invoice processes",
    details: [
      "Hands-on training sessions for accounting staff",
      "Step-by-step process documentation",
      "Best practices for error-free invoicing",
      "Ongoing support during transition period",
    ],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "1-Month Post-Setup Error Resolution & Support",
    description:
      "Dedicated support for one month after implementation to ensure smooth operations",
    details: [
      "Priority technical support for any issues",
      "Quick resolution of integration problems",
      "Performance optimization and fine-tuning",
      "Regular system health monitoring",
    ],
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Bulk Invoice Processing",
    description:
      "Efficient handling of large volumes of invoices with automated processing",
    details: [
      "Batch processing of multiple invoices",
      "Automated validation and error checking",
      "Quick bulk upload to e-invoice portal",
      "Progress tracking and reporting",
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Real-time Validation",
    description:
      "Instant validation of invoice data to prevent errors and rejections",
    details: [
      "Pre-upload data validation checks",
      "Real-time error detection and alerts",
      "Automatic correction suggestions",
      "Compliance verification before submission",
    ],
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Custom Configuration & Setup",
    description: "Tailored setup based on your specific business requirements",
    details: [
      "Business-specific workflow configuration",
      "Custom field mapping and validation rules",
      "Integration with existing ERP systems",
      "Automated backup and recovery setup",
    ],
  },
];

const whyNeeded = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "GST Compliance Mandatory",
    description:
      "E-invoicing is mandatory for businesses with turnover above ₹5 crores. Ensure 100% compliance with government regulations.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Eliminate Manual Errors",
    description:
      "Automated e-invoice generation reduces human errors, ensuring accurate tax calculations and faster processing.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Streamline Business Operations",
    description:
      "Integrate your billing system with government portals for seamless invoice management and real-time compliance.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Future-Ready Business",
    description:
      "Stay ahead of regulatory changes and prepare your business for digital transformation in taxation and compliance.",
  },
];

const benefits = [
  "100% GST compliance with government regulations",
  "Automated invoice generation and validation",
  "Real-time integration with IRP portal",
  "Reduced processing time by 80%",
  "Elimination of manual data entry errors",
  "Seamless integration with existing Tally setup",
  "Comprehensive staff training and support",
  "24/7 technical assistance during transition",
];

const faqs = [
  {
    question: "What is e-invoicing and why is it mandatory?",
    answer:
      "E-invoicing is a system where invoice details are uploaded to government portal (IRP) in real-time. It's mandatory for businesses with turnover above ₹5 crores to ensure transparency and reduce tax evasion.",
  },
  {
    question: "How long does the e-invoice setup take?",
    answer:
      "Our standard setup takes 3-5 business days, including system integration, testing, and staff training. Complex customizations may require additional time.",
  },
  {
    question: "Will this work with my existing Tally version?",
    answer:
      "We support all modern versions of Tally ERP. Our team will assess your current setup and ensure compatibility or recommend necessary upgrades.",
  },
  {
    question: "What happens if there are errors after setup?",
    answer:
      "We provide 1-month dedicated support post-setup. Our team will resolve any integration issues, errors, or performance problems at no additional cost.",
  },
  {
    question: "Do you provide training for our accounting staff?",
    answer:
      "Yes, comprehensive staff training is included in our service. We provide hands-on training, documentation, and ongoing support to ensure your team is confident with the new system.",
  },
];

const testimonials = [
  {
    name: "Suresh Gupta",
    company: "Gujarat Textiles Ltd.",
    rating: 5,
    text: "The e-invoice setup was seamless. Our billing process is now 80% faster and completely error-free. Excellent service!",
  },
  {
    name: "Meera Shah",
    company: "Shah Enterprises",
    rating: 5,
    text: "Professional team with deep expertise. The integration with our existing Tally system was flawless. Highly recommended!",
  },
  {
    name: "Rakesh Patel",
    company: "Patel Trading Co.",
    rating: 5,
    text: "Outstanding support during the transition. The staff training was comprehensive and the ongoing support is excellent.",
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "300+",
    label: "Successful Setups",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "3-5",
    label: "Days Setup Time",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "100%",
    label: "GST Compliance",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.8",
    label: "Client Rating",
  },
];

const pricingFeatures = [
  "Complete E-Invoice Portal Integration",
  "Tally ERP Configuration & Setup",
  "Staff Training & Documentation",
  "1-Month Dedicated Support",
  "Real-time Validation Setup",
  "Bulk Processing Configuration",
  "Error Resolution & Optimization",
  "24/7 Technical Assistance",
];

export const TheEInvoicePage = () => {
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
                GST Compliance Made Simple
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
                Professional E-Invoice{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Setup Services
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Complete e-invoicing system setup for GST compliance with seamless Tally integration and expert support.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 mb-16 flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
              <button aria-label="Click"
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
                heading="Our Services"
                headingText="Complete E-Invoice Solution"
                headingDescription="Everything you need for seamless e-invoice implementation, from setup to ongoing support."
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
              heading="Why E-Invoice"
              headingText="Essential for Modern Business "
              headingDescription="E-invoicing is not just compliance—it's a strategic advantage for your business operations and growth."
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
                heading="Benefits"
                headingText="Transform Your Billing Process"
                headingDescription="Experience the power of automated e-invoicing with our comprehensive setup and support services."
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
                      ₹25,000/-
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
              heading="faq"
              headingText="Frequently Asked Questions"
              headingDescription="Get answers to common questions about our e-invoice setup service."
              // descriptionClassName="mx-auto"
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
              heading="testimonials"
              headingText="What Our Clients Say"
              headingDescription="Don't just take our word for it. Here's what our satisfied clients have to say about our e-invoice service."
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
              Ready for GST-Compliant E-Invoicing?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join 400+ businesses that trust us with their security needs. Get comprehensive protection for your business data and systems today!`}
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
              3-5 Days Setup • Expert Team • 1-Month Free Support • GST Compliance Guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
