"use client";
import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import type { InputChangeEvent } from "src/_components/sections/types/contact.type";
import { contactInfo } from "public/data/Contact";
import { OurArchivements } from "public/data/Reason";
import { hero_heading_font, hero_headline_font } from "src/config/constants";

export const ContactHeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    reason: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState({ submitted: false, message: '', type: '', note: '' });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface FormResponse {
    success: boolean;
    error?: string;
  }

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydaEtap8EIr60R9NBzndNdQjTerddJEdO3RgzFWNRY3c-wwB0kNxrn3BYWo_dszowM/exec";

  type SubmissionResponse = {
    success: boolean;
    error?: string | null;
    received?: Record<string, unknown>;
  };

  function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }

function isSubmissionResponse(obj: unknown): obj is SubmissionResponse {
  if (!isRecord(obj)) return false;
  const rec = obj as Record<string, unknown>;

  // success must exist and be boolean
  if (typeof rec.success !== "boolean") return false;

  // if error exists it must be string or null or undefined
  if ("error" in rec) {
    const e = rec.error;
    // Fixed: Check for the actual types allowed by SubmissionResponse
    if (e !== null && e !== undefined && typeof e !== "string") return false;
  }

  // if received exists it must be an object (non-null) or undefined
  if ("received" in rec) {
    const r = rec.received;
    if (r !== undefined && !isRecord(r)) return false;
  }

  return true;
}

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = new URLSearchParams();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== null) body.append(k, String(v));
    });

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body,
      });

      // parse JSON as unknown (not `any`) and validate
      const raw = (await response.json()) as unknown;

      if (!isSubmissionResponse(raw)) {
        console.error("Invalid response shape", raw);
        throw new Error("Invalid server response");
      }

      // `raw` is now narrowed to SubmissionResponse
      const result = raw;

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", company: "", reason: "", subject: "", message: "" });
        setStatus({
          submitted: true,
          message: "Message sent successfully!",
          type: "success",
          note: "Thank you for reaching out. We'll get back to you within 24 hours.",
        });
      } else {
        setIsSubmitted(true);
        setStatus({
          submitted: false,
          message: result.error ?? "Submission failed. Please try again.",
          type: "error",
          note: "Sorry for inconvenience please refresh page or call us +91 63530 61867",
        });
      }
    } catch (err: unknown) {
      setIsSubmitted(true);
      setStatus({
        submitted: false,
        message: "Submission failed. Please try again.",
        type: "error",
        note: "Sorry for inconvenience please refresh page or call us +91 63530 61867",
      });
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="relative min-h-screen overflow-hidden pt-3 sm:pt-10">
      {/* Hero Section + Form */}
      <div className="relative z-10 mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              <p className={`text-center ${hero_heading_font}`}>
                Contact Our
              </p>
              <div
                className="absolute top-0 h-[50%] rounded-lg bg-[var(--pink)] sm:h-full"
                style={{
                  width: "calc(40% + 20px)",
                  right: "0",
                  transform: "translate(10%, -40%)",
                  zIndex: 1,
                }}
              />
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center">
            {/* <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div> */}

            <h1 className={`${hero_headline_font}`}>
              Expert
              <span className="relative inline-block">
                <span className="relative z-10 text-(--primery-color)">
                  Team
                </span>
                <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
              </span>
            </h1>
          </div>

          {/* Main Grid Container */}
          <div className="grid gap-8 py-16 lg:grid-cols-2 xl:px-8 2xl:px-50">
            {/* Left Side - Contact Form */}
            <div className="hover:shadow-3xl transform rounded-2xl border border-red-100 bg-white p-6 shadow-2xl transition-all duration-500 sm:rounded-3xl sm:p-8">
              {isSubmitted ? (
                <div className="py-8 text-center sm:py-12">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-700 sm:mb-6 sm:h-20 sm:w-20">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-red-700 sm:mb-4 sm:text-2xl">

                    {status.message && (
                      <>
                        {status.message}
                      </>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    {status.note && (
                      <>
                        {status.note}
                      </>
                    )}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {/* Form Header */}
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                      Get In Touch
                    </h2>
                    <p className="text-gray-600">
                      {`Send us a message and we'll respond as soon as possible.`}
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-red-700">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Reason for Contact *
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                    >
                      <option value="">Select a reason</option>
                      <option value="consultation">Expert Consultation</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-red-700">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-gray-200 px-3 py-2 text-sm transition-colors duration-300 focus:border-red-600 focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                      placeholder="Tell us more about your project or inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button aria-label="Click"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex w-full transform items-center justify-center space-x-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white sm:h-5 sm:w-5"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Stats and Contact Info */}
            <div className="justify-cente flex h-full items-stretch space-y-6 text-center lg:text-left">
              <div className="grid grid-cols-2 justify-items-center gap-6 sm:gap-1">
                {/* Stats Section */}
                <div className="rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-pink-50 p-6 sm:p-8">
                  <h3 className="mb-6 text-lg font-semibold text-red-700 sm:text-xl">
                    Our Achievements
                  </h3>
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-1">
                    {OurArchivements.map((stat, index) => (
                      <div
                        key={index}
                        className="group border-b border-gray-300 py-4 text-center last:border-b-0 sm:py-6"
                      >
                        {/* <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg sm:mb-4 sm:h-14 sm:w-14">
                          <div className="text-red-700">{stat.icon}</div>
                        </div> */}
                        <div className="mb-1 text-xl font-bold text-red-700 sm:mb-2 sm:text-2xl lg:text-xl xl:text-2xl">
                          {stat.number}
                        </div>
                        <div className="text-xs font-medium text-gray-600 sm:text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info Section */}
                <div className="rounded-xl border border-red-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8">
                  <h3 className="mb-6 text-lg font-semibold text-red-700 sm:text-xl">
                    Contact Info
                  </h3>
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-1">
                    {contactInfo.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-3 border-b border-gray-300 py-4 last:border-b-0 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4 sm:py-6 lg:flex-col lg:items-center lg:space-y-2 lg:space-x-0 xl:flex-row xl:items-start xl:space-y-0 xl:space-x-4"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-red-700 shadow-md sm:h-12 sm:w-12">
                          {contact.icon}
                        </div>
                        <div className="text-center sm:text-left lg:text-center xl:text-left">
                          <h4 className="mb-2 text-sm font-semibold text-red-700 sm:text-base">
                            {contact.title}
                          </h4>
                          {contact.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-xs text-gray-600 sm:text-sm"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
