"use client";
import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import type { InputChangeEvent } from "src/_components/sections/types/contact.type";
import { contactInfo } from "public/data/Contact";
import { btn_color } from "src/config/constants";

export const ContactForm = () => {
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

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        reason: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    // py-12
    <div className="px-4  sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-15" id="contact">
      {/* Success Message */}
      {/* {isSuccess && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
          <div className="flex items-center rounded-lg bg-green-500 p-4 text-white shadow-lg">
            <svg
              className="mr-3 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-semibold">Message sent successfully!</p>
              <p className="text-sm opacity-90">
                {`We'll get back to you within 24 hours.`}
              </p>
            </div>
          </div>
        </div>
      )} */}

      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            {`Let's Work Together`}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            {`Have a project in mind? We'd love to hear about it. Send us a
            message and we'll respond within 24 hours.`}
          </p>
        </div>

        <div className="flex max-w-6xl flex-col justify-center gap-6 lg:flex-row">
          {/* Contact Form */}
          <div className="w-full overflow-hidden rounded-2xl border border-red-100 bg-white shadow-2xl lg:w-[70%]">
            {/* Form Header */}
            {/* <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-semibold text-white">
                Tell us about your project
              </h2>
              <p className="mt-2 text-red-100">
                {`Fill out the form below and we'll get back to you soon.`}
              </p>
            </div> */}

            {/* Form Body */}
            <div className="px-6 py-8 sm:px-8">
              {isSubmitted ? (
                <div className="py-8 text-center sm:py-12">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-700 sm:mb-6 sm:h-20 sm:w-20">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-red-700 sm:mb-4 sm:text-2xl">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 sm:text-base">
                    {`Thank you for reaching out. We'll get back to you within
                      24 hours.`}
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
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`${btn_color} flex w-full transform items-center justify-center space-x-2 rounded-lg  px-6 py-3 text-sm font-semibold disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base`}
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
          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 grid hidden w-full gap-10 rounded-xl border border-red-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 lg:mt-0 lg:grid lg:w-[30%]">
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
  );
};
