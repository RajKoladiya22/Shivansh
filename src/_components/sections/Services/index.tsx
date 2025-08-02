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
    number: "2000+",
    label: "Happy Clients",
  },
  {
    icon: <Award className="h-6 w-6" />,
    number: "99.9%",
    label: "Success Rate",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    number: "24/7",
    label: "Support Available",
  },
  {
    icon: <Star className="h-6 w-6" />,
    number: "4.8/5",
    label: "Client Rating",
  },
];
export const TheServicesPage = () => {
//   const [activeService, setActiveService] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

  const services = [
    {
      id: "customer-support",
      title: "Customer Support",
      icon: <Headphones className="h-8 w-8" />,
      shortDescription:
        "24/7 dedicated customer support to resolve your queries instantly",
      fullDescription:
        "Our expert customer support team provides round-the-clock assistance to ensure your business operations run smoothly without any interruptions.",
      features: [
        "24/7 Phone & Chat Support",
        "Expert Technical Assistance",
        "Quick Issue Resolution",
        "Multi-language Support",
        "Remote Desktop Support",
      ],
      benefits: [
        "Reduced Downtime",
        "Improved Productivity",
        "Expert Guidance",
        "Peace of Mind",
      ],
      pricing: "Starting from ₹5,000/month",
      duration: "Ongoing Support",
      clients: "500+",
      rating: 4.9,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "e-invoice-setup",
      title: "E-Invoice Setup",
      icon: <FileText className="h-8 w-8" />,
      shortDescription: "Complete e-invoicing system setup for GST compliance",
      fullDescription:
        "Streamline your billing process with our comprehensive e-invoice setup service, ensuring 100% GST compliance and automated invoice generation.",
      features: [
        "GST Compliant Setup",
        "Automated Invoice Generation",
        "API Integration",
        "Bulk Invoice Processing",
        "Real-time Validation",
      ],
      benefits: [
        "GST Compliance",
        "Faster Processing",
        "Reduced Errors",
        "Cost Savings",
      ],
      pricing: "Starting from ₹15,000",
      duration: "3-5 Business Days",
      clients: "300+",
      rating: 4.8,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "e-way-bill-setup",
      title: "E-Way Bill Setup",
      icon: <Truck className="h-8 w-8" />,
      shortDescription:
        "Automated e-way bill generation for seamless goods transportation",
      fullDescription:
        "Ensure smooth goods movement with our e-way bill setup service, featuring automated generation and real-time tracking capabilities.",
      features: [
        "Automated Bill Generation",
        "Real-time Tracking",
        "Bulk Processing",
        "Integration with ERP",
        "Compliance Monitoring",
      ],
      benefits: [
        "Legal Compliance",
        "Smooth Transportation",
        "Time Saving",
        "Error Reduction",
      ],
      pricing: "Starting from ₹12,000",
      duration: "2-4 Business Days",
      clients: "250+",
      rating: 4.7,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "security-setup",
      title: "Security Setup",
      icon: <Shield className="h-8 w-8" />,
      shortDescription:
        "Comprehensive security solutions to protect your business data",
      fullDescription:
        "Safeguard your business with our multi-layered security setup including firewall configuration, data encryption, and access controls.",
      features: [
        "Advanced Firewall Setup",
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
      pricing: "Starting from ₹25,000",
      duration: "5-7 Business Days",
      clients: "400+",
      rating: 4.9,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: "tally-implementation",
      title: "Tally Implementation",
      icon: <Calculator className="h-8 w-8" />,
      shortDescription:
        "Complete Tally ERP setup and customization for your business",
      fullDescription:
        "Get your accounting system up and running with our comprehensive Tally implementation service, including customization and data migration.",
      features: [
        "Complete Tally Setup",
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
      pricing: "Starting from ₹20,000",
      duration: "4-6 Business Days",
      clients: "600+",
      rating: 4.8,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "data-entry-training",
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
      pricing: "Starting from ₹8,000/person",
      duration: "1-2 Weeks",
      clients: "200+",
      rating: 4.7,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

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
              headingText="Complete Business Solutions"
              headingDescription="From customer support to security setup, we provide end-to-end solutions 
              to help your business thrive in the digital age."
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group rounded-2xl border bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.borderColor} overflow-hidden`}
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
                  <div className="mb-6 rounded-xl bg-gray-50 p-4">
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
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      className={`flex-1 bg-gradient-to-r ${service.color} group rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105`}
                      onClick={() =>
                        (window.location.href = `/services/${service.id}`)
                      }
                    >
                      Learn More
                      <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50">
                      Get Quote
                    </button>
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
                    desc: "24/7 customer support and maintenance services",
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
