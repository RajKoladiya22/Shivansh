"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Shield,
  Eye,
  Lock,
  Database,
  Cookie,
  UserCheck,
  Globe,
  Mail,
  AlertTriangle,
  Users,
  ChevronUp,
} from "lucide-react";

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = useMemo(
    () => [
      {
        id: "introduction",
        title: "Introduction",
        icon: <Shield className="h-4 w-4" />,
      },
      {
        id: "information",
        title: "Information We Collect",
        icon: <Database className="h-4 w-4" />,
      },
      {
        id: "usage",
        title: "How We Use Information",
        icon: <Eye className="h-4 w-4" />,
      },
      {
        id: "sharing",
        title: "Information Sharing",
        icon: <Globe className="h-4 w-4" />,
      },
      {
        id: "cookies",
        title: "Cookies & Tracking",
        icon: <Cookie className="h-4 w-4" />,
      },
      {
        id: "security",
        title: "Data Security",
        icon: <Lock className="h-4 w-4" />,
      },
      {
        id: "retention",
        title: "Data Retention",
        icon: <Database className="h-4 w-4" />,
      },
      {
        id: "rights",
        title: "Your Rights",
        icon: <UserCheck className="h-4 w-4" />,
      },
      {
        id: "children",
        title: "Children's Privacy",
        icon: <Shield className="h-4 w-4" />,
      },
      {
        id: "contact",
        title: "Contact Us",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
    [],
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 200; // Adjust based on your sticky header height + desired padding
      const elementPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      const headerOffset = 200; // Same offset as scrollToSection
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset:
          (document.getElementById(section.id)?.offsetTop ?? 0) - headerOffset,
      }));

      const currentSection = sectionElements.find((section, index) => {
        const nextSection = sectionElements[index + 1];
        const scrollPosition = window.scrollY;

        return (
          scrollPosition >= section.offset &&
          (!nextSection || scrollPosition < nextSection.offset)
        );
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-15 z-40 border-b border-[#C502021A] bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] sm:top-19">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C50202]">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#000000]">
                  Privacy Policy
                </h1>
                <p className="text-sm text-gray-600">
                  Last updated: July 24, 2025
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-[#C502021A] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 max-h-80 overflow-y-auto rounded-lg border border-[#C502021A] bg-white shadow-lg lg:hidden">
              <div className="p-4">
                <h3 className="mb-3 font-semibold text-[#000000]">
                  Table of Contents
                </h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-[#C50202] text-white"
                          : "text-gray-700 hover:bg-[#FCF2F2]"
                      }`}
                    >
                      {section.icon}
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden w-80 lg:block">
            <div className="sticky top-40">
              <div className="rounded-2xl bg-[#FCF2F2] p-6">
                <h2 className="mb-4 font-bold text-[#000000]">
                  Table of Contents
                </h2>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-[#C50202] text-white shadow-md"
                          : "text-gray-700 hover:bg-[#FFCCD6]"
                      }`}
                    >
                      {section.icon}
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl flex-1">
            <div className="rounded-2xl border border-[#C502021A] bg-white p-6 shadow-sm lg:p-8">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <div className="mb-8 rounded-xl bg-[#EEF6FF] p-6">
                  <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-[#000000]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    Privacy Policy Overview
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-700">
                    At Shivansh Infosys Pvt. Ltd., we are committed to
                    protecting your privacy and ensuring the security of your
                    personal information. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our website or use our services.
                  </p>
                  <div className="rounded-lg border-l-4 border-[#C50202] bg-white p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> By using our services, you
                      consent to the data practices described in this policy.
                      Please read this policy carefully to understand our views
                      and practices regarding your personal data.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 1: Information We Collect */}
              <section id="information" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  1. Information We Collect
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-6 leading-relaxed text-gray-700">
                    We collect several types of information from and about users
                    of our services:
                  </p>

                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-[#000000]">
                        <UserCheck className="h-4 w-4 text-[#C50202]" />
                        Personal Information
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Name and contact information</li>
                        <li>Email address and phone number</li>
                        <li>Company and job title</li>
                        <li>Address and location data</li>
                        <li>Account credentials</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#EEF6FF] p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-[#000000]">
                        <Eye className="h-4 w-4 text-[#C50202]" />
                        Usage Information
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Website usage and navigation patterns</li>
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Time and date of visits</li>
                        <li>Pages viewed and links clicked</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-4">
                    <h4 className="mb-2 font-semibold text-[#000000]">
                      Automatically Collected Data
                    </h4>
                    <p className="text-sm text-gray-700">
                      We automatically collect certain information when you
                      visit our website, including your IP address, browser
                      type, operating system, referring URLs, and information
                      about your usage of our website through cookies and
                      similar technologies.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: How We Use Information */}
              <section id="usage" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  2. How We Use Information
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-6 leading-relaxed text-gray-700">
                    We use the information we collect for various purposes,
                    including:
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Service Provision
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Provide, operate, and maintain our services</li>
                        <li>
                          Process transactions and send related information
                        </li>
                        <li>
                          Provide customer support and respond to inquiries
                        </li>
                        <li>Send administrative information and updates</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#EEF6FF] p-4">
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Communication & Marketing
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Send promotional communications (with consent)</li>
                        <li>Respond to comments and questions</li>
                        <li>Provide news and updates about our services</li>
                        <li>Conduct surveys and gather feedback</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Analytics & Improvement
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Analyze usage patterns and trends</li>
                        <li>Improve our website and services</li>
                        <li>Develop new features and functionality</li>
                        <li>Monitor and analyze effectiveness of marketing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Information Sharing */}
              <section id="sharing" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  3. Information Sharing and Disclosure
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except in
                    the following circumstances:
                  </p>

                  <div className="mb-6 rounded-lg border border-[#C50202] bg-[#FFCCD6] p-6">
                    <h4 className="mb-3 font-semibold text-[#000000]">
                      When We May Share Information
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                        <li>With your explicit consent</li>
                        <li>To comply with legal obligations</li>
                        <li>To protect our rights and safety</li>
                        <li>In connection with business transfers</li>
                      </ul>
                      <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                        <li>With trusted service providers</li>
                        <li>For fraud prevention and security</li>
                        <li>To enforce our terms of service</li>
                        <li>In emergency situations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#EEF6FF] p-4">
                    <h4 className="mb-2 font-semibold text-[#000000]">
                      Third-Party Service Providers
                    </h4>
                    <p className="text-sm text-gray-700">
                      We may share your information with third-party service
                      providers who perform services on our behalf, such as
                      payment processing, data analysis, email delivery, hosting
                      services, and customer service. These providers are
                      contractually obligated to protect your information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Cookies & Tracking */}
              <section id="cookies" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Cookie className="h-4 w-4 text-white" />
                  </div>
                  4. Cookies and Tracking Technologies
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-6 leading-relaxed text-gray-700">
                    We use cookies and similar tracking technologies to enhance
                    your experience on our website:
                  </p>

                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-[#FCF2F2] p-4 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C50202]">
                        <Cookie className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Essential Cookies
                      </h4>
                      <p className="text-xs text-gray-700">
                        Required for website functionality and cannot be
                        disabled
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#EEF6FF] p-4 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C50202]">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Analytics Cookies
                      </h4>
                      <p className="text-xs text-gray-700">
                        Help us understand how visitors interact with our
                        website
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#FCF2F2] p-4 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C50202]">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Marketing Cookies
                      </h4>
                      <p className="text-xs text-gray-700">
                        Used to deliver personalized advertisements and content
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#EEF6FF] p-4">
                    <h4 className="mb-2 font-semibold text-[#000000]">
                      Cookie Management
                    </h4>
                    <p className="text-sm text-gray-700">
                      You can control cookie preferences through your browser
                      settings. However, disabling certain cookies may limit
                      your ability to use some features of our website.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5: Data Security */}
              <section id="security" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                  5. Data Security
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-6 leading-relaxed text-gray-700">
                    We implement appropriate technical and organizational
                    security measures to protect your personal information:
                  </p>

                  <div className="mb-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-[#000000]">
                        <Lock className="h-4 w-4 text-[#C50202]" />
                        Technical Safeguards
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>SSL/TLS encryption for data transmission</li>
                        <li>Secure servers and databases</li>
                        <li>Regular security audits and updates</li>
                        <li>Access controls and authentication</li>
                        <li>Data backup and recovery systems</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#EEF6FF] p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-[#000000]">
                        <Shield className="h-4 w-4 text-[#C50202]" />
                        Operational Safeguards
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Employee training on data protection</li>
                        <li>Limited access on need-to-know basis</li>
                        <li>Regular security awareness programs</li>
                        <li>Incident response procedures</li>
                        <li>Confidentiality agreements</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-[#000000]">
                      <AlertTriangle className="h-4 w-4 text-[#C50202]" />
                      Important Security Notice
                    </h4>
                    <p className="text-sm text-gray-700">
                      While we strive to protect your personal information, no
                      method of transmission over the internet or electronic
                      storage is 100% secure. We cannot guarantee absolute
                      security, but we continuously work to improve our security
                      measures.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Data Retention */}
              <section id="retention" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  6. Data Retention
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes for which it was
                    collected:
                  </p>

                  <div className="rounded-lg bg-[#EEF6FF] p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-3 font-semibold text-[#000000]">
                          Retention Periods
                        </h4>
                        <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                          <li>
                            Account information: Duration of account plus 3
                            years
                          </li>
                          <li>
                            Transaction records: 7 years for legal compliance
                          </li>
                          <li>Marketing data: Until withdrawal of consent</li>
                          <li>Website analytics: 2 years maximum</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 font-semibold text-[#000000]">
                          Deletion Criteria
                        </h4>
                        <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                          <li>Purpose fulfillment completion</li>
                          <li>Legal retention period expiration</li>
                          <li>User request for deletion</li>
                          <li>Account closure or termination</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Your Rights */}
              <section id="rights" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                  7. Your Privacy Rights
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-6 leading-relaxed text-gray-700">
                    Depending on your location, you may have the following
                    rights regarding your personal information:
                  </p>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-3 font-semibold text-[#000000]">
                        Access & Control
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Right to access your personal data</li>
                        <li>Right to rectify inaccurate information</li>
                        <li>Right to delete your personal data</li>
                        <li>Right to restrict processing</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-[#EEF6FF] p-4">
                      <h4 className="mb-3 font-semibold text-[#000000]">
                        Portability & Consent
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Right to data portability</li>
                        <li>Right to withdraw consent</li>
                        <li>Right to object to processing</li>
                        <li>Right to file complaints</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-4">
                    <h4 className="mb-2 font-semibold text-[#000000]">
                      How to Exercise Your Rights
                    </h4>
                    <p className="text-sm text-gray-700">
                      {`To exercise any of these rights, please contact us using
                      the information provided in the "Contact Us" section. We
                      will respond to your request within 30 days and may
                      require verification of your identity.`}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8: Children's Privacy */}
              <section id="children" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  {`8. Children's Privacy`}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-6">
                    <h4 className="mb-3 font-semibold text-[#000000]">
                      Age Restrictions
                    </h4>
                    <p className="mb-4 leading-relaxed text-gray-700">
                      Our services are not intended for children under the age
                      of 18. We do not knowingly collect personal information
                      from children under 18 years of age.
                    </p>
                    <p className="text-sm text-gray-700">
                      If we become aware that we have collected personal
                      information from a child under 18, we will take steps to
                      delete such information immediately. If you believe we
                      have collected information from a child, please contact us
                      immediately.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 12: Contact Information */}
              <section id="contact" className="mb-8">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  9. Contact Information
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <div className="rounded-lg bg-[#FCF2F2] p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 font-semibold text-[#000000]">
                          Company Information
                        </h4>
                        <p className="mb-1 text-sm text-gray-700">
                          Shivansh Infosys Pvt. Ltd.
                        </p>
                        <p className="text-sm text-gray-700">
                          Surat, Gujarat, India
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-[#000000]">
                          Contact Details
                        </h4>
                        <p className="mb-1 text-sm text-gray-700">
                          Phone: +91-72260 56106
                        </p>
                        <p className="text-sm text-gray-700">
                          Email: legal@Shivansh.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t border-[#C502021A] pt-6">
                <div className="rounded-lg bg-[#EEF6FF] p-4 text-center">
                  <p className="text-sm text-gray-600">
                    These Terms of Service are effective as of July 24, 2025.
                    Thank you for using our services responsibly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-50 rounded-full bg-[#C50202] p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#C5020280]"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
