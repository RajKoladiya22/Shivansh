"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  Menu,
  X,
  FileText,
  Shield,
  Users,
  AlertCircle,
} from "lucide-react";

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "services",
      title: "Description of Services",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "eligibility",
      title: "Eligibility",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "account",
      title: "User Accounts",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "conduct",
      title: "User Conduct",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "termination",
      title: "Termination",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      id: "limitation",
      title: "Limitation of Liability",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "governing",
      title: "Governing Law",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <Users className="h-4 w-4" />,
    },
  ];

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
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#000000]">
                  Terms of Service
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
              <div className="mb-12">
                <div className="mb-8 rounded-xl bg-[#EEF6FF] p-6">
                  <h2 className="mb-4 text-2xl font-bold text-[#000000]">
                    Welcome to Our Terms of Service
                  </h2>
                  <p className="leading-relaxed text-gray-700">
                    {`These Terms of Service ("Terms") govern your access to and
                    use of our services, including our website, software, and
                    any other services provided by Shivansh Infosys Pvt. Ltd.
                    ("Company", "we", "us", or "our"). By accessing or using our
                    services, you agree to be bound by these Terms.`}
                  </p>
                </div>
              </div>

              {/* Section 1: Acceptance of Terms */}
              <section id="acceptance" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  1. Acceptance of Terms
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    By accessing and using our services, you acknowledge that
                    you have read, understood, and agree to be bound by these
                    Terms of Service and our Privacy Policy. If you do not agree
                    to these terms, please do not use our services.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    These Terms constitute a legally binding agreement between
                    you and Shivansh Infosys Pvt. Ltd. Your continued use of our
                    services signifies your acceptance of any modifications to
                    these Terms.
                  </p>
                </div>
              </section>

              {/* Section 2: Description of Services */}
              <section id="services" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  2. Description of Services
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    {`We provide software development services, web applications,
                    mobile applications, and related technology solutions. Our
                    services may include but are not limited to:`}
                  </p>
                  <div className="mb-4 rounded-lg bg-[#FCF2F2] p-4">
                    <ul className="list-inside list-disc space-y-2 text-gray-700">
                      <li>
                        Custom software development and programming services
                      </li>
                      <li>Web application development and maintenance</li>
                      <li>
                        Mobile application development for various platforms
                      </li>
                      <li>Technology consulting and support services</li>
                      <li>Cloud-based solutions and hosting services</li>
                    </ul>
                  </div>
                  <p className="leading-relaxed text-gray-700">
                    {`We reserve the right to modify, suspend, or discontinue any
                    aspect of our services at any time without prior notice.`}
                  </p>
                </div>
              </section>

              {/* Section 3: Eligibility */}
              <section id="eligibility" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  3. Eligibility
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You must be at least 18 years old to use our services. By
                    using our services, you represent and warrant that:
                  </p>
                  <div className="rounded-lg bg-[#EEF6FF] p-4">
                    <ul className="list-inside list-disc space-y-2 text-gray-700">
                      <li>You are at least 18 years of age</li>
                      <li>
                        You have the legal capacity to enter into these Terms
                      </li>
                      <li>
                        You are not prohibited from using our services under
                        applicable law
                      </li>
                      <li>
                        All information you provide is accurate and truthful
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4: User Accounts */}
              <section id="account" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  4. User Accounts
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    To access certain features of our services, you may be
                    required to create an account. You agree to:
                  </p>
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-[#FCF2F2] p-4">
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Account Security
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Maintain confidentiality of login credentials</li>
                        <li>Use strong, unique passwords</li>
                        <li>Notify us of unauthorized access</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-[#EEF6FF] p-4">
                      <h4 className="mb-2 font-semibold text-[#000000]">
                        Account Information
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Provide accurate and current information</li>
                        <li>Update information as necessary</li>
                        <li>Accept responsibility for account activity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: User Conduct */}
              <section id="conduct" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  5. User Conduct
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    You agree not to use our services for any unlawful purpose
                    or in any way that could damage, disable, or impair our
                    services. Prohibited activities include:
                  </p>
                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-4">
                    <h4 className="mb-3 font-semibold text-[#000000]">
                      Prohibited Activities
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Violating any applicable laws or regulations</li>
                        <li>Infringing on intellectual property rights</li>
                        <li>Transmitting malware or harmful code</li>
                        <li>Attempting unauthorized access to systems</li>
                      </ul>
                      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                        <li>Harassing or abusing other users</li>
                        <li>Distributing spam or unsolicited messages</li>
                        <li>
                          Impersonating others or providing false information
                        </li>
                        <li>Interfering with service functionality</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Privacy Policy */}
              <section id="privacy" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  6. Privacy Policy
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    Your privacy is important to us. Our Privacy Policy explains
                    how we collect, use, and protect your personal information
                    when you use our services.
                  </p>
                  <div className="rounded-lg bg-[#EEF6FF] p-6">
                    <h4 className="mb-3 font-semibold text-[#000000]">
                      Data Protection Principles
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-700">
                      We are committed to protecting your personal data in
                      accordance with applicable privacy laws and regulations.
                      We collect only necessary information, use it
                      transparently, and implement appropriate security measures
                      to safeguard your data.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7: Intellectual Property */}
              <section id="intellectual" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  7. Intellectual Property
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    All content, features, and functionality of our services are
                    owned by Shivansh Infosys Pvt. Ltd. and are protected by
                    intellectual property laws.
                  </p>
                  <div className="rounded-lg bg-[#FCF2F2] p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                      You may not reproduce, distribute, modify, or create
                      derivative works of our content without explicit written
                      permission. Any feedback or suggestions you provide may be
                      used by us without compensation or acknowledgment.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8: Termination */}
              <section id="termination" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  8. Termination
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    We may suspend or terminate your access to our services at
                    any time, with or without cause, with or without notice. You
                    may also terminate your account at any time.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    Upon termination, your right to use our services will cease
                    immediately, and we may delete your account and data as
                    permitted by law.
                  </p>
                </div>
              </section>

              {/* Section 9: Limitation of Liability */}
              <section id="limitation" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  9. Limitation of Liability
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="rounded-lg border border-[#C50202] bg-[#FFCCD6] p-6">
                    <p className="mb-3 text-sm leading-relaxed text-gray-700">
                      <strong>IMPORTANT:</strong> {`Our services are provided "as`}
                      {`is" without warranties of any kind. We shall not be liable
                      for any indirect, incidental, special, or consequential
                      damages arising from your use of our services.`}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {`Our total liability for any claims related to our services
                      shall not exceed the amount paid by you for our services
                      in the 12 months preceding the claim.`}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 10: Governing Law */}
              <section id="governing" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  10. Governing Law
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="leading-relaxed text-gray-700">
                    These Terms shall be governed by and construed in accordance
                    with the laws of India. Any disputes arising under these
                    Terms shall be subject to the exclusive jurisdiction of the
                    courts in Gujarat, India.
                  </p>
                </div>
              </section>

              {/* Section 11: Changes to Terms */}
              <section id="changes" className="mb-12">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#000000]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C50202]">
                    <AlertCircle className="h-4 w-4 text-white" />
                  </div>
                  11. Changes to Terms
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 leading-relaxed text-gray-700">
                    {`We reserve the right to modify these Terms at any time. We
                    will notify you of significant changes by posting the
                    updated Terms on our website and updating the "Last updated"
                    date.`}
                  </p>
                  <div className="rounded-lg bg-[#EEF6FF] p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                      Your continued use of our services after any modifications
                      constitutes acceptance of the updated Terms. We recommend
                      reviewing these Terms periodically for any changes.
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
                  12. Contact Information
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

export default TermsOfService;
