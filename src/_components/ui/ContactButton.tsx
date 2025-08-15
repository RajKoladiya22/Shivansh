"use client";
import React, { useState, useEffect } from "react";
import { Phone, X, Headphones } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Floating Contact Button Component
export const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Your contact details - Replace with actual numbers
  const phoneNumber = "+918141703007"; 
  const whatsappNumber = "+918141703007"; 
  const inquiryMessage =
    "Hi! I'm interested in your products. Could you please provide more information?";

  // Handle scroll to show/hide button on mobile for better UX
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button when scrolling up or at top, hide when scrolling down fast
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 100) {
        setIsVisible(false);
        setIsOpen(false); // Close menu when hiding
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (isOpen && target && !target.closest(".floating-contact-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`);
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(inquiryMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`cursor-pointer floating-contact-menu fixed right-6 bottom-6 z-50 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-16 opacity-0"
      }`}
    >
      {/* Action Buttons - Appear when menu is open */}
      <div
        className={`mb-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 transform opacity-100"
            : "pointer-events-none translate-y-4 scale-95 transform opacity-0"
        }`}
      >
        {/* WhatsApp Button */}
        <div className="group relative">
          <button aria-label="Click"
            onClick={handleWhatsApp}
            className="animate-bounce-in flex h-12 w-12 transform items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-xl sm:h-14 sm:w-14"
            style={{ animationDelay: "0.1s" }}
          >
            {/* <MessageCircle  /> */}
            <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7"/>
          </button>

          {/* Tooltip */}
          <div className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 transform rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            WhatsApp Inquiry
            <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 transform bg-gray-800"></div>
          </div>
        </div>

        {/* Call Button */}
        <div className="group relative">
          <button aria-label="Click"
            onClick={handleCall}
            className="animate-bounce-in flex h-12 w-12 transform items-center justify-center rounded-full bg-[#C50202] text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#A50202] hover:shadow-xl sm:h-14 sm:w-14"
            style={{ animationDelay: "0.2s" }}
          >
            <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Tooltip */}
          <div className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 transform rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Call Now
            <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 transform bg-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        aria-label="contact button"
        onClick={toggleMenu}
        className={`cursor-pointer group relative flex h-16 w-16 transform items-center justify-center rounded-full bg-gradient-to-r from-[#C50202] to-[#E50202] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#A50202] hover:to-[#C50202] hover:shadow-2xl sm:h-18 sm:w-18 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 animate-ping rounded-full bg-[#C50202] opacity-30"></div>

        {/* Icon */}
        <div
          className={`transform transition-all duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
        >
          {isOpen ? (
            <X className="h-8 w-8 sm:h-9 sm:w-9" />
          ) : (
            <Headphones className="h-8 w-8 sm:h-9 sm:w-9" />
          )}
        </div>

        {/* Pulse Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-[#C50202] ${
            !isOpen ? "animate-pulse-ring" : ""
          }`}
        ></div>
      </button>

      {/* Mobile-only label */}
      {/* <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 transform transition-all duration-300 sm:hidden ${
          !isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-lg bg-gray-800 px-3 py-1 text-xs whitespace-nowrap text-white">
          Contact Us
        </div>
      </div> */}
    </div>
  );
};
