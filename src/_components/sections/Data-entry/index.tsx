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
  ArrowRight,
  ChevronDown,
  Video,
  Clock,
  Users,
  Check,
  FileText,
  MessageCircle,
  Phone,
  Workflow,
  Database,
  Settings,
  Calculator,
  BarChart3,
  FileSpreadsheet,
  Upload,
  BookOpen,
  Layers,
  GraduationCap,
  Trophy,
  TrendingUp,
  MousePointer,
  Keyboard,
  Eye,
  Brain,
  Lightbulb,
  PenTool,
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
    icon: <Keyboard className="h-6 w-6" />,
    title: "Hands-on Training",
    description:
      "Interactive practical sessions with real-world data entry scenarios and live exercises",
    details: [
      "Live data entry practice sessions",
      "Real business document exercises",
      "Interactive keyboard shortcuts training",
      "Practical workflow simulations",
    ],
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Speed & Accuracy Focus",
    description:
      "Specialized training to improve typing speed while maintaining high accuracy standards",
    details: [
      "Typing speed improvement techniques",
      "Accuracy measurement and tracking",
      "Error reduction strategies",
      "Performance benchmarking",
    ],
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Software Proficiency",
    description:
      "Comprehensive training on popular data entry software and tools used in business",
    details: [
      "Microsoft Excel advanced features",
      "Tally ERP data entry mastery",
      "Database management systems",
      "Web-based data entry platforms",
    ],
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Best Practices",
    description:
      "Industry-standard methodologies and techniques for efficient and error-free data entry",
    details: [
      "Data validation techniques",
      "Quality control procedures",
      "Time management strategies",
      "Ergonomic workspace setup",
    ],
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certification Program",
    description:
      "Recognized certification upon successful completion of the training program",
    details: [
      "Industry-recognized certificates",
      "Skill assessment and evaluation",
      "Performance-based certification",
      "Continuing education credits",
    ],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Personalized Coaching",
    description:
      "Individual attention and customized learning paths based on skill level and requirements",
    details: [
      "One-on-one coaching sessions",
      "Personalized learning plans",
      "Progress tracking and feedback",
      "Flexible training schedules",
    ],
  },
];

const whyNeeded = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Improved Accuracy",
    description:
      "Reduce data entry errors by up to 95% with proper training techniques and validation methods, ensuring data integrity.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Increased Speed",
    description:
      "Boost typing speed and data processing efficiency by 50-70% through specialized techniques and practice.",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Better Productivity",
    description:
      "Enhance overall team productivity with streamlined data entry processes and optimized workflows.",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Skill Development",
    description:
      "Develop transferable skills that enhance career prospects and increase employee value in the job market.",
  },
];

const benefits = [
  "Comprehensive hands-on training with real scenarios",
  "Speed and accuracy improvement techniques",
  "Proficiency in multiple software platforms",
  "Industry best practices and methodologies",
  "Recognized certification upon completion",
  "Personalized coaching and feedback",
  "Flexible training schedules and formats",
  "Ongoing support and skill assessment",
];

const faqs = [
  {
    question: "What does the data entry training program include?",
    answer:
      "Our comprehensive program includes hands-on practice, speed and accuracy training, software proficiency (Excel, Tally, databases), best practices, ergonomics, and certification upon completion.",
  },
  {
    question: "How long does the training program take?",
    answer:
      "The standard program duration is 1-2 weeks, with flexible scheduling options including full-time, part-time, and weekend batches to accommodate different needs.",
  },
  {
    question:
      "Do you provide training for specific software like Tally or Excel?",
    answer:
      "Yes, we provide specialized training for various software including Microsoft Excel, Tally ERP, database systems, and other popular data entry platforms used in business.",
  },
  {
    question: "Is certification provided after completing the training?",
    answer:
      "Absolutely! Upon successful completion of the program and passing the assessment, participants receive an industry-recognized certificate that validates their data entry skills.",
  },
  {
    question: "Can you provide training for our entire team on-site?",
    answer:
      "Yes, we offer on-site corporate training programs for teams of any size. We can customize the curriculum based on your specific business requirements and software needs.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    company: "DataTech Solutions",
    rating: 5,
    text: "The training transformed our team's efficiency. Our data entry speed increased by 60% and accuracy improved dramatically. Excellent program!",
  },
  {
    name: "Rajesh Kumar",
    company: "Kumar Enterprises",
    rating: 5,
    text: "Professional training with practical approach. The trainers were knowledgeable and the certification has helped our employees advance their careers.",
  },
  {
    name: "Meera Patel",
    company: "Patel Trading Co.",
    rating: 5,
    text: "Outstanding results! Our data processing time reduced by half and the quality of work improved significantly. Highly recommend this training.",
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "200+",
    label: "Trained Professionals",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "1-2",
    label: "Weeks Duration",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: "70%",
    label: "Speed Improvement",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.7",
    label: "Training Rating",
  },
];

const pricingFeatures = [
  "Comprehensive Hands-on Training",
  "Speed & Accuracy Development",
  "Multiple Software Proficiency",
  "Industry Best Practices",
  "Certification Program",
  "Personalized Coaching",
  "Flexible Schedule Options",
  "30-Day Post-Training Support",
];

const trainingModules = [
  {
    icon: <Keyboard className="h-6 w-6" />,
    title: "Typing & Keyboard",
    duration: "2-3 Days",
    topics: [
      "Touch typing techniques",
      "Keyboard shortcuts mastery",
      "Speed building exercises",
      "Ergonomic practices",
    ],
  },
  {
    icon: <FileSpreadsheet className="h-6 w-6" />,
    title: "Excel Mastery",
    duration: "3-4 Days",
    topics: [
      "Advanced formulas",
      "Data validation",
      "Pivot tables",
      "Macro basics",
    ],
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Tally ERP Training",
    duration: "2-3 Days",
    topics: [
      "Voucher entry",
      "Inventory management",
      "Report generation",
      "Data import/export",
    ],
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Quality & Accuracy",
    duration: "1-2 Days",
    topics: [
      "Error detection",
      "Quality control",
      "Data verification",
      "Best practices",
    ],
  },
];

export const TheDataEntryPage = () => {
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
                Professional Training Program
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
                Data Entry{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--primery-color)">
                    Training
                  </span>
                  <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className={`mx-auto max-w-2xl ${hero_content_font}`}>
                {`Professional training programs to enhance data entry skills, improve accuracy, and boost productivity with hands-on practice and certification.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 mb-16 flex flex-col justify-center space-y-4 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center">
              <button
                className="flex transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-(--primery-color) px-6 py-3 font-bold tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => window.open("https://bitly.cx/rNEH4", "_blank")}
              >
                <GraduationCap className="h-5 w-5" />
                Start Training
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

      {/* Training Modules Overview */}
      <section className="bg-gradient-to-b from-white via-red-50 to-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionHeader
              heading="Training Curriculum"
              headingText="Comprehensive Learning Modules"
              headingDescription="Our structured training program covers all essential aspects of professional data entry skills development."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trainingModules.map((module, index) => (
              <div
                key={index}
                className="rounded-xl border border-red-200 bg-white p-6 transition-all hover:border-red-300 hover:shadow-lg"
              >
                <div className="mb-4 text-red-600">{module.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {module.title}
                </h3>
                <div className="mb-4 text-sm font-semibold text-red-600">
                  Duration: {module.duration}
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400"></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="bg-gradient-to-b from-white via-gray-100 to-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="mb-16 text-center">
              <SectionHeader
                heading="Our Training Features"
                headingText="Complete Skill Development Program"
                headingDescription="Everything you need to master data entry skills with professional training, practice, and certification."
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
              heading="Why Data Entry Training"
              headingText="Transform Your Team's Performance"
              headingDescription="Professional data entry training enhances productivity, reduces errors, and creates valuable skills for career growth."
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
                heading="Training Benefits"
                headingText="Enhance Your Skills"
                headingDescription="Get comprehensive data entry training designed to improve your team's performance and career prospects."
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
                      ₹5,000/-
                    </span>
                    <div className="text-6xl font-bold text-red-600">
                      ₹ **0/-
                    </div>
                  </div>
                  <div className="mb-2 text-xl font-semibold text-gray-900">
                    Per Person
                  </div>
                  <div className="mb-8 text-gray-600">
                    *Special pricing for group training programs
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
                      <div className="text-2xl font-bold text-red-600">1-2</div>
                      <div className="text-sm text-gray-600">Weeks</div>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-white p-4">
                      <div className="text-2xl font-bold text-red-600">
                        Certified
                      </div>
                      <div className="text-sm text-gray-600">Program</div>
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
              headingDescription="Get answers to common questions about our comprehensive data entry training program."
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
              headingText="Success Stories"
              headingDescription="Don't just take our word for it. Here's what our training participants have achieved after completing our program."
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
              Ready to Enhance Your Data Entry Skills?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`Join 200+ professionals who have improved their careers with our comprehensive data entry training program!`}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="tel:+918141703007"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                Call Now: +91 8141703007
              </Link>
              <button
                onClick={() =>
                  window.open("https://wa.me/918141703007", "_blank")
                }
                className="cursor-pointer rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                WhatsApp
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Professional Training • Certification Program • Skill Development
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
