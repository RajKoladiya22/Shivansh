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
  Phone,
  Settings,
  Truck,
  Navigation,
  Route,
} from "lucide-react";
import {
  btn_color,
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";
import { MoreService } from "src/_components/molecules/Section/service";
import { FaWhatsapp } from "react-icons/fa";

const serviceFeatures = [
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Tally-E-Way Bill Portal Setup",
    description:
      "Complete integration between your Tally system and the government e-way bill portal",
    details: [
      "Direct API integration with GSTN portal",
      "Automatic data synchronization",
      "Seamless bill generation from Tally",
      "Real-time status updates and tracking",
    ],
  },
  {
    icon: <Navigation className="h-6 w-6" />,
    title: "Real-time Tracking",
    description:
      "Monitor your goods movement with live tracking and status updates",
    details: [
      "GPS-based vehicle tracking integration",
      "Real-time e-way bill status monitoring",
      "Automatic alerts for expiry and updates",
      "Route optimization suggestions",
    ],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "30-Day Post-Setup Support",
    description:
      "Extended support period to ensure smooth operations after implementation",
    details: [
      "Priority technical support for one month",
      "Quick resolution of integration issues",
      "Performance monitoring and optimization",
      "Regular system health checks",
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Hands-On Staff Training",
    description:
      "Comprehensive training program for your logistics and accounting teams",
    details: [
      "Interactive training sessions for staff",
      "Step-by-step process documentation",
      "Best practices for compliance management",
      "Ongoing support during learning phase",
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance Monitoring",
    description:
      "Continuous monitoring to ensure legal compliance and avoid penalties",
    details: [
      "Automated compliance validation checks",
      "Regular audit and verification reports",
      "Alert system for regulatory changes",
      "Documentation management and backup",
    ],
  },
  {
    icon: <Route className="h-6 w-6" />,
    title: "Automated Generation & Updates",
    description: "Streamlined process for generating and updating e-way bills",
    details: [
      "Bulk e-way bill generation capabilities",
      "Automatic vehicle and transporter updates",
      "Smart validation before submission",
      "Integration with transport management systems",
    ],
  },
];

const whyNeeded = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Mandatory for Goods Movement",
    description:
      "E-way bills are mandatory for goods transportation above ₹50,000. Ensure legal compliance for all your shipments.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Avoid Transportation Delays",
    description:
      "Automated e-way bill generation prevents delays at checkpoints and ensures smooth goods movement across states.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Streamline Logistics Operations",
    description:
      "Integrate your transportation management with government portals for efficient logistics and compliance management.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Reduce Compliance Risks",
    description:
      "Minimize the risk of penalties and legal issues with automated compliance monitoring and real-time tracking.",
  },
];

const benefits = [
  "100% legal compliance for goods transportation",
  "Automated e-way bill generation from Tally",
  "Real-time tracking and status monitoring",
  "Reduced transportation delays by 70%",
  "Elimination of manual documentation errors",
  "Seamless integration with existing systems",
  "Comprehensive staff training and support",
  "30-day dedicated technical assistance",
];

const faqs = [
  {
    question: "What is an e-way bill and when is it required?",
    answer:
      "E-way bill is a digital document required for goods transportation worth more than ₹50,000. It's mandatory for inter-state movement and certain intra-state movements as per GST rules.",
  },
  {
    question: "How long does the e-way bill setup take?",
    answer:
      "Our standard setup takes 2-4 business days, including system integration, testing, and staff training. This ensures your team is ready to use the system effectively.",
  },
  {
    question: "Can this integrate with my existing Tally version?",
    answer:
      "Yes, we support integration with all modern versions of Tally ERP. Our team will assess your current setup and ensure seamless integration or recommend necessary updates.",
  },
  {
    question: "What happens if there are issues after setup?",
    answer:
      "We provide 30 days of dedicated support post-setup. Our team will resolve any integration issues, technical problems, or compliance queries at no additional cost.",
  },
  {
    question: "Do you provide training for our logistics team?",
    answer:
      "Absolutely! Comprehensive hands-on training is included for both your accounting and logistics teams. We ensure everyone is comfortable with the new system and processes.",
  },
];

const testimonials = [
  {
    name: "Vikash Singh",
    company: "Singh Transport Ltd.",
    rating: 5,
    text: "The e-way bill setup has revolutionized our logistics operations. No more delays at checkpoints and 100% compliance assured.",
  },
  {
    name: "Anjali Mehta",
    company: "Gujarat Logistics Co.",
    rating: 5,
    text: "Seamless integration with our Tally system. The real-time tracking feature has improved our customer service significantly.",
  },
  {
    name: "Rahul Joshi",
    company: "Joshi Trading House",
    rating: 5,
    text: "Professional service and excellent support. The automated system has reduced our documentation work by 80%.",
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "250+",
    label: "Successful Setups",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "2-4",
    label: "Days Setup Time",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "100%",
    label: "Legal Compliance",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.7",
    label: "Client Rating",
  },
];

const pricingFeatures = [
  "Complete Tally-E-Way Bill Portal Setup",
  "Real-time Tracking Configuration",
  "Staff Training & Documentation",
  "30-Day Dedicated Support",
  "Compliance Monitoring Setup",
  "Automated Generation System",
  "Integration with Transport Systems",
  "24/7 Technical Assistance",
];

export const TheEWayBillPage = () => {
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
                Seamless Goods Transportation
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
                Professional E-Way Bill{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Setup Services
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Automated e-way bill generation for seamless goods transportation with real-time tracking and compliance monitoring.`}
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
                heading="Our Services"
                headingText="Complete E-Invoice Solution"
                headingDescription="Everything you need for seamless e-way bill implementation, from setup to ongoing compliance monitoring."
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
              heading="Why E-Way Bill"
              headingText="Essential for Goods Transportation"
              headingDescription="E-way bills are mandatory for legal goods movement and help streamline your logistics operations while ensuring compliance."
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
                headingText="Streamline Your Logistics"
                headingDescription="Experience hassle-free goods transportation with our comprehensive e-way bill setup and monitoring services."
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
              heading="FAQ"
              headingText="Frequently Asked Questions"
              headingDescription="Get answers to common questions about our e-way bill setup service."
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
              heading="Testimonials"
              headingText="What Our Clients Say"
              headingDescription="Don't just take our word for it. Here's what our satisfied clients have to say about our e-way bill service."
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
                  "{testimonial.text}"
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
              Ready for Seamless Goods Transportation?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join 250+ businesses who have streamlined their logistics with our expert e-way bill setup service. Get started today!`}
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
              2-4 Days Setup • Real-time Tracking • 30-Day Free Support • Legal Compliance Guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
