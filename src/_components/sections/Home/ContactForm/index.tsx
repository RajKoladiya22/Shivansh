"use client";
import React, { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    helpFor: '',
    message: ''
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  return (
    <div className="bg-red-600 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {`Let's Keep in Touch`}
          </h1>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Shivansh Infosys"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="support@shivanshinfosys.com"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Phone and Help For Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                Phone*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90510 58963"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="helpFor" className="block text-white text-sm font-medium mb-2">
                Help for?*
              </label>
              <input
                type="text"
                id="helpFor"
                name="helpFor"
                value={formData.helpFor}
                onChange={handleChange}
                placeholder="What can we help you with?"
                className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Drop Your Message"
              rows={6}
              className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-white text-red-600 font-semibold py-3 px-12 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 text-sm tracking-wider"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

