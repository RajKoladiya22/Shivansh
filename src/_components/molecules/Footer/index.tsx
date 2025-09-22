// "use client";
// import React from "react";
// import Link from "next/link";
// import { Mail, MapPin, Phone } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { FaWhatsapp } from "react-icons/fa";
// import { navItems, PRIVACY, ProductServices, SITEMAP, TERM } from "public/data/Navigation";
// import { SocialMedia } from "public/data/Contact";
// import { btn_color } from "src/config/constants";
// import Image from "next/image";

// export const Footer: React.FC = () => {
//   const pathname = usePathname();

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-b from-gray-900 to-gray-950 pt-16 pb-8 text-gray-300">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
//           {/* Company Info Section */}
//           <div className="lg:col-span-1">
//             <div className="mb-6">
//               <div className="flex items-center">
//                 <Image
//                   src="/images/logo/Logo-name.svg"
//                   alt="Company Logo"
//                   width={40}
//                   height={40}
//                   className="h-13 w-13"
//                 />
//               <div className="">
//                   <h2 className="text-2xl font-bold m-0">
//                   <span className="text-[#C50202]">SHIVANSH</span>{" "}
//                   <span className="text-white">INFOSYS</span>
//                 </h2>
//               <p className="mt- text-sm font-medium text-gray-400 flex flex-wrap">
//                 <span>Quick Response</span> - <span>Quick Support</span>
//               </p>
//               </div>
//               </div>
//             </div>

//             <p className="mb-6 text-sm leading-relaxed text-gray-400">
//               Founded in April 2007, Shivansh Infosys has been dedicated to
//               providing exceptional Tally solutions and services to businesses
//               across India.
//             </p>

//             {/* Social Media Icons */}
//             <div className="flex space-x-3">
//               {SocialMedia.map((social, index) => (
//                 <Link
//                   key={index}
//                   href={social.href}
//                   className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:scale-110 hover:bg-red-600"
//                   aria-label={`Follow us on social media`}
//                 >
//                   {social.icon}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div>
//             <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
//               <span className="mr-2 h-3 w-3 rounded-full bg-red-600"></span>
//               Useful Links
//             </h3>
//             <ul className="space-y-3">
//               {navItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`group flex items-center text-sm text-gray-400 transition-all duration-300 hover:pl-2 hover:text-red-400 ${pathname === item.href ? "font-medium text-red-400" : ""} `}
//                   >
//                     <span className="mr-3 h-1 w-1 rounded-full bg-red-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Product & Services */}
//           <div>
//             <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
//               <span className="mr-2 h-3 w-3 rounded-full bg-red-600"></span>
//               Product & Services
//             </h3>
//             <ul className="space-y-3">
//               {ProductServices.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`group flex items-center text-sm text-gray-400 transition-all duration-300 hover:pl-2 hover:text-red-400 ${pathname === item.href ? "font-medium text-red-400" : ""} `}
//                   >
//                     <span className="mr-3 h-1 w-1 rounded-full bg-red-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contacts */}
//           <div>
//             <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
//               <span className="mr-2 h-3 w-3 rounded-full bg-red-600"></span>
//               Contact Us
//             </h3>
//             <div className="space-y-4">
//               {/* Address */}
//               <div className="flex items-start">
//                 <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <MapPin className="h-3 w-3 text-white" />
//                 </div>
//                 <p className="text-sm leading-relaxed text-gray-400">
//                   SHOP NO.105, AJIT PLAZA, M.G ROAD, OPP. BANK OF BARODA, VAPI,
//                   VALSAD, GUJARAT, 396191
//                 </p>
//               </div>

//               {/* Phone Numbers */}
//               <div className="flex flex-col space-y-2">
//                 <Link
//                   href="tel:+918141703007"
//                   className="flex items-center transition-colors hover:text-red-400"
//                 >
//                   <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                     <Phone className="h-3 w-3 text-white" />
//                   </div>
//                   <span>+91 81417 03007</span>
//                 </Link>

//                 <Link
//                   href="tel:+919484843007"
//                   className="flex items-center transition-colors hover:text-red-400"
//                 >
//                   <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                     <Phone className="h-3 w-3 text-white" />
//                   </div>
//                   <span>+91 94848 43007</span>
//                 </Link>

//                 <Link
//                   href="https://wa.me/918141703007"
//                   className="flex items-center transition-colors hover:text-red-400"
//                 >
//                   <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                     <FaWhatsapp className="h-3 w-3 text-white" />
//                   </div>
//                   <span>WhatsApp: +91 81417 03007</span>
//                 </Link>
//               </div>

//               {/* Email */}
//               <div className="flex items-start">
//                 <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <Mail className="h-3 w-3 text-white" />
//                 </div>
//                 <Link
//                   href="mailto:info@shivanshinfosys.in"
//                   className="text-sm text-gray-400 transition-colors hover:text-red-400"
//                 >
//                   info@shivanshinfosys.in
//                 </Link>
//               </div>

//               {/* Business Hours */}
//               <div className="mt-6 flex items-start">
//                 <div className="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <span className="h-2 w-2 rounded-full bg-white"></span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-100">
//                     Business Hours
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Mon-Sat: 9:30 AM - 6:30 PM
//                   </p>
//                   <p className="text-sm text-gray-400">Sunday: Closed</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Newsletter Subscription */}
//         <div className="mt-16 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-6">
//           <div className="flex flex-col items-center justify-between md:flex-row">
//             <div className="mb-4 md:mb-0">
//               <h3 className="mb-2 text-lg font-semibold text-white">
//                 Stay Updated
//               </h3>
//               <p className="max-w-md text-sm text-gray-400">
//                 Subscribe to our WhatsApp Chanal for the latest updates, offers,
//                 and Tally tips.
//               </p>
//             </div>
//             <div className="flex w-full md:w-auto">

//               <Link
//                 href="https://whatsapp.com/channel/0029Vb5y41dLNSaBHDTIi82B"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`${btn_color} flex items-center rounded-lg px-6 py-3 font-medium`}
//               >
//                 <FaWhatsapp size={24} className="pr-1" />
//                 Subscribe
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="ml-2 h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="mt-12 border-t border-gray-800 pt-8">
//           <div className="flex flex-col items-center justify-between md:flex-row">
//             <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
//               © {currentYear} Shivansh Infosys. All rights reserved.
//             </p>
//             <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
//               {/* Tally 3 Star Certified Partner */}
//               Crafted with passion by our team of creative professionals.
//             </p>
//             <div className="flex space-x-6">
//               <Link
//                 href={TERM}
//                 className="text-sm text-gray-500 transition-colors hover:text-gray-300"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 href={PRIVACY}
//                 className="text-sm text-gray-500 transition-colors hover:text-gray-300"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href={SITEMAP}
//                 className="text-sm text-gray-500 transition-colors hover:text-gray-300"
//               >
//                 Sitemap
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

"use client";
import React, { memo, useMemo } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import {
  navItems,
  PRIVACY,
  ProductServices,
  SITEMAP,
  TERM,
} from "public/data/Navigation";
import { SocialMedia } from "public/data/Contact";
import { btn_color } from "src/config/constants";
import Image from "next/image";

// Constants to prevent recreation
const COMPANY_ADDRESS =
  "SHOP NO.105, AJIT PLAZA, M.G ROAD, OPP. BANK OF BARODA, VAPI, VALSAD, GUJARAT, 396191";
const BRANCH_ADDRESS =
  "214,215, SOHAM ARCAD, ADAJAN, SUART, GUJARAT, 395009";
const PHONE_NUMBERS = [
  { number: "+916353061867", display: "+91 63530 61867" },
  { number: "+917863818924", display: "+91 78638 18924" },
] as const;
const EMAIL = "info@shivanshinfosys.in";
const WHATSAPP_URL = "https://wa.me/918141703007";
const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029Vb5y41dLNSaBHDTIi82B";

// Memoized icon components for better performance
const IconWrapper = memo(
  ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 ${className}`}
    >
      {children}
    </div>
  ),
);
IconWrapper.displayName = "IconWrapper";

const SectionHeader = memo(({ title }: { title: string }) => (
  <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
    <span className="mr-2 h-3 w-3 rounded-full bg-red-600"></span>
    {title}
  </h3>
));
SectionHeader.displayName = "SectionHeader";

// Memoized navigation link component
const NavLink = memo(
  ({
    item,
    isActive,
    className,
  }: {
    item: { href: string; label: string };
    isActive: boolean;
    className?: string;
  }) => (
    <li>
      <Link
        href={item.href}
        className={`group flex items-center text-sm text-gray-400 transition-all duration-300 hover:pl-2 hover:text-red-400 ${
          isActive ? "font-medium text-red-400" : ""
        } ${className ?? ""}`}
      >
        <span className="mr-3 h-1 w-1 rounded-full bg-red-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
        {item.label}
      </Link>
    </li>
  ),
);
NavLink.displayName = "NavLink";

// Memoized social media component
const SocialMediaLinks = memo(() => (
  <div className="flex space-x-3">
    {SocialMedia.map((social, index) => (
      <Link
        key={index} // Using href as key is more stable than index
        href={social.href}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:scale-110 hover:bg-red-600"
        aria-label="Follow us on social media"
        target="_blank"
        rel="noopener noreferrer"
      >
        {social.icon}
      </Link>
    ))}
  </div>
));
SocialMediaLinks.displayName = "SocialMediaLinks";

// Memoized company logo component
const CompanyLogo = memo(() => (
  <div className="mb-6">
    <div className="flex items-center">
      <Image
        src="/images/logo/Logo-name.svg"
        alt="Shivansh Infosys Logo"
        width={40}
        height={40}
        className="h-13 w-13"
        loading="lazy"
      />
      <div className="">
        <h2 className="m-0 text-2xl font-bold">
          <span className="text-[#C50202]">SHIVANSH</span>{" "}
          <span className="text-white">INFOSYS</span>
        </h2>
        <p className="mt- flex flex-wrap text-sm font-medium text-gray-400">
          <span>Quick Response</span> - <span>Quick Support</span>
        </p>
      </div>
    </div>
  </div>
));
CompanyLogo.displayName = "CompanyLogo";

// Memoized contact info components
const ContactAddress = memo(() => (
  <>
    <div className="flex items-start">
      <IconWrapper>
        <MapPin className="h-3 w-3 text-white" />
      </IconWrapper>
      <p className="text-sm leading-relaxed text-gray-400">{COMPANY_ADDRESS}</p>
    </div>
    <div className="flex items-start">
      <IconWrapper>
        <MapPin className="h-3 w-3 text-white" />
      </IconWrapper>
      <p className="text-sm leading-relaxed text-gray-400">{BRANCH_ADDRESS}</p>
    </div>
  </>
));
ContactAddress.displayName = "ContactAddress";

const PhoneNumbers = memo(() => (
  <div className="flex flex-col space-y-2">
    {PHONE_NUMBERS.map((phone) => (
      <Link
        key={phone.number}
        href={`tel:${phone.number}`}
        className="flex items-center transition-colors hover:text-red-400"
      >
        <IconWrapper>
          <Phone className="h-3 w-3 text-white" />
        </IconWrapper>
        <span>{phone.display}</span>
      </Link>
    ))}

    <Link
      href={WHATSAPP_URL}
      className="flex items-center transition-colors hover:text-red-400"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconWrapper>
        <FaWhatsapp className="h-3 w-3 text-white" />
      </IconWrapper>
      <span>WhatsApp: +91 81417 03007</span>
    </Link>
  </div>
));
PhoneNumbers.displayName = "PhoneNumbers";

const EmailContact = memo(() => (
  <div className="flex items-start">
    <IconWrapper>
      <Mail className="h-3 w-3 text-white" />
    </IconWrapper>
    <Link
      href={`mailto:${EMAIL}`}
      className="text-sm text-gray-400 transition-colors hover:text-red-400"
    >
      {EMAIL}
    </Link>
  </div>
));
EmailContact.displayName = "EmailContact";

const BusinessHours = memo(() => (
  <div className="mt-6 flex items-start">
    <IconWrapper>
      <span className="h-2 w-2 rounded-full bg-white"></span>
    </IconWrapper>
    <div>
      <p className="text-sm font-medium text-gray-100">Business Hours</p>
      <p className="text-sm text-gray-400">Mon-Sat: 10:00 AM - 6:00 PM</p>
      <p className="text-sm text-gray-400">Sunday: Closed</p>
    </div>
  </div>
));
BusinessHours.displayName = "BusinessHours";

// Memoized newsletter section
const NewsletterSection = memo(() => (
  <div className="mt-16 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-6">
    <div className="flex flex-col items-center justify-between md:flex-row">
      <div className="mb-4 md:mb-0">
        <h3 className="mb-2 text-lg font-semibold text-white">Stay Updated</h3>
        <p className="max-w-md text-sm text-gray-400">
          Subscribe to our WhatsApp Channel for the latest updates, offers, and
          Tally tips.
        </p>
      </div>
      <div className="flex w-full md:w-auto">
        <Link
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn_color} flex items-center rounded-lg px-6 py-3 font-medium`}
        >
          <FaWhatsapp size={24} className="pr-1" />
          Subscribe
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
));
NewsletterSection.displayName = "NewsletterSection";

// Memoized copyright section
const CopyrightSection = memo(({ currentYear }: { currentYear: number }) => (
  <div className="mt-12 border-t border-gray-800 pt-8">
    <div className="flex flex-col items-center justify-between md:flex-row">
      <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
        © {currentYear} Shivansh Infosys. All rights reserved.
      </p>
      <p className="mb-4 text-center text-sm text-gray-500 md:mb-0">
        Crafted with passion by our team of creative professionals.
      </p>
      <div className="flex space-x-6">
        <Link
          href={TERM}
          className="text-sm text-gray-500 transition-colors hover:text-gray-300"
        >
          Terms of Service
        </Link>
        <Link
          href={PRIVACY}
          className="text-sm text-gray-500 transition-colors hover:text-gray-300"
        >
          Privacy Policy
        </Link>
        <Link
          href={SITEMAP}
          className="text-sm text-gray-500 transition-colors hover:text-gray-300"
        >
          Sitemap
        </Link>
      </div>
    </div>
  </div>
));
CopyrightSection.displayName = "CopyrightSection";

export const Footer = memo(() => {
  const pathname = usePathname();

  // Memoize current year calculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 pt-16 pb-8 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <CompanyLogo />

            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Founded in April 2007, Shivansh Infosys has been dedicated to
              providing exceptional Tally solutions and services to businesses
              across India.
            </p>

            <SocialMediaLinks />
          </div>

          {/* Useful Links */}
          <div>
            <SectionHeader title="Useful Links" />
            <ul className="space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </ul>
          </div>

          {/* Product & Services */}
          <div>
            <SectionHeader title="Product & Services" />
            <ul className="space-y-3">
              {ProductServices.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <SectionHeader title="Contact Us" />
            <div className="space-y-4">
              <ContactAddress />
              <PhoneNumbers />
              <EmailContact />
              <BusinessHours />
            </div>
          </div>
        </div>

        <NewsletterSection />
        <CopyrightSection currentYear={currentYear} />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
