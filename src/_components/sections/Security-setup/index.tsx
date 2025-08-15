"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "src/_components/ui";
import {
  Star,
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
  Lock,
  Eye,
  UserCheck,
  AlertTriangle,
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
    icon: <UserCheck className="h-6 w-6" />,
    title: "Role-Based Access Controls",
    description:
      "Implement comprehensive user access management with role-based permissions and controls",
    details: [
      "Multi-level user role definitions",
      "Department-wise access restrictions",
      "Time-based access controls",
      "Granular permission management",
    ],
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Admin & User Setup",
    description:
      "Complete administrative and user account configuration with security best practices",
    details: [
      "Secure administrator account setup",
      "User onboarding and training",
      "Password policy implementation",
      "Multi-factor authentication setup",
    ],
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Data Encryption",
    description:
      "Advanced encryption solutions to protect sensitive business data at rest and in transit",
    details: [
      "End-to-end data encryption",
      "Database security hardening",
      "File-level encryption setup",
      "Secure backup encryption",
    ],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Access Control Systems",
    description:
      "Implement robust access control mechanisms to prevent unauthorized system access",
    details: [
      "Network access control setup",
      "VPN configuration for remote access",
      "IP-based access restrictions",
      "Session management controls",
    ],
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Security Auditing",
    description:
      "Comprehensive security audit and monitoring systems for continuous protection",
    details: [
      "Real-time security event monitoring",
      "Audit trail configuration",
      "Compliance reporting setup",
      "Security incident response procedures",
    ],
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Threat Monitoring",
    description: "Advanced threat detection and monitoring systems to identify security risks",
    details: [
      "24/7 threat monitoring setup",
      "Intrusion detection systems",
      "Malware protection configuration",
      "Real-time alert mechanisms",
    ],
  },
];

const whyNeeded = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Data Protection",
    description:
      "Protect your valuable business data from cyber threats, unauthorized access, and data breaches with comprehensive security measures.",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Cyber Security",
    description:
      "Implement robust cyber security protocols to defend against evolving threats like ransomware, phishing, and malware attacks.",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Compliance",
    description:
      "Ensure your business meets industry security standards and regulatory compliance requirements for data protection.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Risk Mitigation",
    description:
      "Minimize security risks through proactive threat detection, access controls, and continuous monitoring systems.",
  },
];

const benefits = [
  "Multi-layered security architecture implementation",
  "Role-based access control with granular permissions",
  "Advanced data encryption and protection",
  "24/7 threat monitoring and detection",
  "Comprehensive security audit trails",
  "Incident response and recovery procedures",
  "Staff security training and awareness",
  "Ongoing security maintenance and updates",
];

const faqs = [
  {
    question: "What types of security threats does this setup protect against?",
    answer:
      "Our security setup protects against various threats including malware, ransomware, phishing attacks, unauthorized access, data breaches, and insider threats through multi-layered security measures.",
  },
  {
    question: "How long does the complete security setup take?",
    answer:
      "A comprehensive security setup typically takes 5-7 business days, including system analysis, security implementation, testing, and staff training to ensure complete protection.",
  },
  {
    question: "Do you provide ongoing security maintenance?",
    answer:
      "Yes, we offer ongoing security maintenance including regular updates, threat monitoring, security audits, and incident response support to keep your systems protected.",
  },
  {
    question: "Can you integrate with our existing business systems?",
    answer:
      "Absolutely! We design security solutions that seamlessly integrate with your existing infrastructure including Tally, CRM systems, and other business applications.",
  },
  {
    question: "What kind of training do you provide for our staff?",
    answer:
      "We provide comprehensive security awareness training covering password best practices, phishing recognition, safe internet usage, and incident reporting procedures.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    company: "Sharma Industries Ltd.",
    rating: 5,
    text: "The security setup has given us complete peace of mind. Our data is now fully protected and we haven't had any security incidents since implementation.",
  },
  {
    name: "Rajesh Kumar",
    company: "Kumar Trading Co.",
    rating: 5,
    text: "Professional service with excellent attention to detail. The team implemented robust security measures that perfectly suit our business needs.",
  },
  {
    name: "Anita Patel",
    company: "Patel Manufacturing",
    rating: 5,
    text: "Outstanding security solution! The role-based access controls and monitoring systems have significantly improved our data security posture.",
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "400+",
    label: "Secure Setups",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "5-7",
    label: "Days Setup Time",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    value: "99.9%",
    label: "Security Uptime",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.9",
    label: "Client Rating",
  },
];

const pricingFeatures = [
  "Complete Security Architecture Setup",
  "Role-Based Access Control Implementation",
  "Data Encryption and Protection",
  "Threat Monitoring Configuration",
  "Security Audit and Compliance Setup",
  "Staff Training and Documentation",
  "Incident Response Procedures",
  "30-Day Security Support",
];

export const TheSecuritySetupPage = () => {
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
                Comprehensive Tally Protection
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
                Professional Security{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Setup Services
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Multi-layered security solutions to protect your tally data with advanced threat monitoring, access controls, and comprehensive protection.`}
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
                headingText="Complete Security Solution"
                headingDescription="Everything you need for comprehensive tally security, from access controls to threat monitoring and data protection."
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
              heading="Why Security Setup"
              headingText="Essential for Tally Protection"
              headingDescription="In today's digital landscape, robust security measures are crucial to protect your business from cyber threats and ensure data integrity."
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
                headingText="Secure Your Tally"
                headingDescription="Protect your tally with our comprehensive security solutions designed to defend against modern cyber threats and ensure data integrity."
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
                      ₹35,000/-
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
                        27/7
                      </div>
                      <div className="text-sm text-gray-600">Monitoring</div>
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
              headingDescription="Get answers to common questions about our comprehensive security setup service."
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
              headingDescription="Don't just take our word for it. Here's what our satisfied clients have to say about our security setup service."
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
              Ready to Secure Your Business?
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
              24/7 Security Monitoring • Expert Response Team • Advanced Protection
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
