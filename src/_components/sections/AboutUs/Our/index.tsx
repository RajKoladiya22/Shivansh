"use client";
import React, { useState } from "react";
import { Phone, Users, Brain, Zap, Shield, X } from "lucide-react";
import type { StatCardProps } from "src/_components/sections/types/startItem.type";
import Image from "next/image";

const StatCard: React.FC<StatCardProps> = ({ icon, number, label, color }) => (
  <div className="group rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
    <div
      className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${color} mb-6 transition-transform duration-300 group-hover:scale-110`}
    >
      {icon}
    </div>
    <h3 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
      {number}
    </h3>
    <p className="text-lg font-medium text-gray-600">{label}</p>
  </div>
);

const CertificationBadge: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
    <div className="bg-gray-300 mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
      {/* <Award className="h-8 w-8 text-white" /> */}
      <Image
        src="/images/industry_logo/tally_white.jpg"
        alt="Tally Logo"
        width={64}
        height={64}
        className="inset-0 object-contain"
        // style={{
        //   margin: "auto",
        //   top: "60%",
        //   left: "50%",
        //   transform: "translate(-50%, -40%)",
        // }}
      />
    </div>
    <h4 className="text-center font-bold text-gray-900">{title}</h4>
    <p className="text-center text-sm text-gray-600">{subtitle}</p>
  </div>
);

export const OurSection: React.FC = () => {
  //   const handleCallNow = () => {
  //     window.location.href = 'tel:+1234567890'; // Replace with your actual phone number
  //   };

  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleImageClick = () => {
    setShowImagePreview(true);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setShowImagePreview(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      className="bg-gradient-to-b from-white via-red-50 to-white py-16 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-6">
            <StatCard
              icon={<Users />}
              number="600+"
              label="Companies Trust Us"
              color="bg-red-200"
            />
            <StatCard
              icon={<Shield />}
              number="500+"
              label="Success Stories"
              color="bg-red-200"
            />
            <StatCard
              icon={<Brain />}
              number="18+"
              label="Years of Experience"
              color="bg-red-200"
            />
            <StatCard
              icon={<Zap />}
              number="99.9+"
              label="Client Satisfaction"
              color="bg-red-200"
            />
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white md:p-12">
            <div className="mt-auto">
              <span className="text-6xl font-bold opacity-90 md:text-7xl">
                2007
              </span>
              <h3 className="mt-4 mb-4 text-2xl font-bold md:text-3xl">
                We Established on
              </h3>
              <p className="mb-6 text-lg opacity-90 md:text-xl">
                Our company has a great history of delivering innovative…
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <a
                href="tel:+918141703007"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600"
              >
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </div>

            <div className="absolute top-4 right-4 h-24 w-24 rounded-full bg-white opacity-10"></div>
            <div className="absolute right-12 bottom-4 h-16 w-16 rounded-full bg-white opacity-10"></div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Our Certifications
            </h3>
            <p className="mx-auto max-w-4xl text-gray-600">

              We are Certify that <span className="font-semibold">Shivansh Infosys</span>{" "}
              is Reconised as a <span className="font-semibold">3 Starr Sakes & Implementation Partner</span>{" "}
            </p>
          </div>

          <div
            className="mx-auto grid max-w-2xl cursor-pointer grid-cols-1 gap-6 transition-all duration-300 hover:scale-105 md:grid-cols-1"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
            aria-label="View Tally Certificate"
          >
            <CertificationBadge
              title="Tally"
              subtitle="3 Star Certified Partner"
            />
            {/* <CertificationBadge
              title="ISO 27001:2022"
              subtitle="Information Security"
            /> */}
          </div>
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-gray-700">
            Trusted by start-ups, enterprises, and Fortune 500 companies
          </p>
        </div>
      </div>

      {showImagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 transition-opacity duration-300"
          onClick={closePreview}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:bg-black/50"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/certificate/tally_certificate.png"
                  alt="Tally 3 Star Sales & Implementation Partner Certificate for Shivansh Infosys - Full Size"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <p className="text-center font-medium text-gray-800">
                  Tally 3 Star Certified Partner - Shivansh Infosys
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// export default OurSection;
