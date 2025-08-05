// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "../molecules/Buttons/Button";
// import Image from "next/image";
// import { ArrowRight, Phone } from "lucide-react";
// import { CONTACT, HOME, navItems } from "public/data/Navigation";
// import { btn_color } from "src/config/constants";

// export function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.pageYOffset);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target;

//       if (mobileOpen && target instanceof Element) {
//         // Now TypeScript knows target is an Element with closest()
//         if (!target.closest("header")) {
//           setMobileOpen(false);
//         }
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [mobileOpen]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileOpen]);

//   const logoAltText = "Shivansh Infosys - Quick Response, Quick Support";

//   return (
//     <header
//       className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
//         scrollPosition > 10
//           ? "bg-white/95 shadow-lg backdrop-blur-lg"
//           : "bg-white/95 shadow-lg backdrop-blur-lg"
//       }`}
//       role="banner"
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
//           {/* Logo Section */}
//           <div className="min-w-0 flex-shrink-0">
//             <Link
//               href={HOME}
//               className="group flex items-center space-x-2 rounded-lg px-1 sm:space-x-3"
//               aria-label="Shivansh Infosys - Go to homepage"
//             >
//               {/* Logo Image */}
//               <div className="relative flex-shrink-0">
//                 <Image
//                   src="/images/logo/Logo-name-black.svg"
//                   alt={logoAltText}
//                   width={40}
//                   height={40}
//                   className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
//                   priority
//                   sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
//                 />
//               </div>

//               {/* Company Name and Tagline */}
//               <div className="min-w-0 flex-1">
//                 <h1 className="text-lg leading-tight font-bold sm:text-xl lg:text-2xl">
//                   <span className="text-[#C50202]">SHIVANSH</span>{" "}
//                   <span className="text-gray-900">INFOSYS</span>
//                 </h1>
//                 <p className="text-xs leading-tight font-medium text-gray-500 lg:text-sm">
//                   <span className="whitespace-nowrap">Quick Response</span>
//                   <span className="mx-1">-</span>
//                   <span className="whitespace-nowrap">Quick Support</span>
//                 </p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav
//             className="hidden items-center space-x-1 lg:flex lg:space-x-2"
//             role="navigation"
//             aria-label="Main navigation"
//           >
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`group relative rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-300 lg:text-base xl:px-3 2xl:px-4 ${
//                   pathname === item.href
//                     ? "text-red-600"
//                     : "text-gray-700 hover:text-red-600"
//                 }`}
//                 aria-current={pathname === item.href ? "page" : undefined}
//               >
//                 <span className="relative z-10">{item.label}</span>
//                 <span
//                   className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
//                     pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
//                   }`}
//                   aria-hidden="true"
//                 />
//               </Link>
//             ))}
//           </nav>

//           {/* Contact Info - Desktop */}
//           <div className="hidden items-center xl:flex">
//             <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
//               <div className="flex flex-col">
//                 <span className="flex items-center text-xs font-medium tracking-wide text-(--primery-color) uppercase">
//                   <Phone size={14} className="mr-1" aria-hidden="true" />
//                   Call Us
//                   <ArrowRight
//                     size={16}
//                     strokeWidth={1.5}
//                     className="ml-1 rotate-315 transform transition-all duration-200 ease-in-out"
//                     aria-hidden="true"
//                   />
//                 </span>
//                 <a
//                   href="tel:+918141703007"
//                   className="text-lg font-bold text-gray-800 transition-colors duration-200 hover:text-red-600"
//                   aria-label="Call us at +91 81417 03007"
//                 >
//                   +91 81417 03007
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* CTA Button - Desktop */}
//           <div className="hidden items-center lg:flex">
//             <Button
//               href={CONTACT}
//               className={`${btn_color} rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md lg:px-6`}
//               aria-label="Contact us - Get in touch"
//             >
//               Get in Touch
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex items-center lg:hidden">
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               aria-label={
//                 mobileOpen ? "Close navigation menu" : "Open navigation menu"
//               }
//               aria-expanded={mobileOpen}
//               aria-controls="mobile-menu"
//               className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-600"
//             >
//               <div className="relative h-6 w-6" aria-hidden="true">
//                 <span
//                   className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//                     mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
//                   }`}
//                 />
//                 <span
//                   className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//                     mobileOpen ? "opacity-0" : "opacity-100"
//                   }`}
//                 />
//                 <span
//                   className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//                     mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
//                   }`}
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div
//         id="mobile-menu"
//         className={`overflow-hidden shadow-[0px_90px_100px_-0px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out lg:hidden ${
//           mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         }`}
//         role="navigation"
//         aria-label="Mobile navigation"
//         aria-hidden={!mobileOpen}
//       >
//         <div className="border-t border-gray-100 bg-white/95 shadow-lg backdrop-blur-lg">
//           <nav className="space-y-1 px-4 py-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
//                   pathname === item.href
//                     ? "border-l-4 border-red-600 bg-red-50 text-red-600"
//                     : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
//                 }`}
//                 onClick={() => setMobileOpen(false)}
//                 aria-current={pathname === item.href ? "page" : undefined}
//               >
//                 {item.label}
//               </Link>
//             ))}

//             {/* Mobile Contact Info */}
//             <div className="mt-4 border-t border-gray-200 pt-4">
//               <div className="rounded-lg bg-gray-50 px-4 py-3">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className="flex items-center text-xs font-medium tracking-wide text-gray-500 uppercase">
//                       <Phone size={14} className="mr-1" aria-hidden="true" />
//                       Call Us
//                     </span>
//                     <a
//                       href="tel:+918141703007"
//                       className="block text-sm font-bold text-gray-800 transition-colors duration-200 hover:text-red-600"
//                       aria-label="Call us at +91 81417 03007"
//                     >
//                       +91 81417 03007
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile CTA */}
//             <div className="pt-2">
//               <Button
//                 href="/contact"
//                 className="w-full rounded-lg bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
//                 onClick={() => setMobileOpen(false)}
//                 aria-label="Contact us - Get in touch"
//               >
//                 Get in Touch
//               </Button>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState, useCallback, memo, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../molecules/Buttons/Button";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT, HOME, navItems } from "public/data/Navigation";
import { btn_color } from "src/config/constants";

// Constants to prevent recreation
const SCROLL_THRESHOLD = 10;
const PHONE_NUMBER = "+918141703007";
const LOGO_ALT_TEXT = "Shivansh Infosys - Quick Response, Quick Support";

// Memoized icon components
const PhoneIcon = memo(() => (
  <Phone size={14} className="mr-1" aria-hidden="true" />
));
PhoneIcon.displayName = "PhoneIcon";

const ArrowIcon = memo(() => (
  <ArrowRight
    size={16}
    strokeWidth={1.5}
    className="ml-1 rotate-315 transform transition-all duration-200 ease-in-out"
    aria-hidden="true"
  />
));
ArrowIcon.displayName = "ArrowIcon";

// Memoized hamburger menu component
const HamburgerIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <div className="relative h-6 w-6" aria-hidden="true">
    <span
      className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
      }`}
    />
    <span
      className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
      }`}
    />
  </div>
));
HamburgerIcon.displayName = "HamburgerIcon";

// Memoized navigation item component
const NavItem = memo(
  ({
    item,
    isActive,
    className,
    onClick,
  }: {
    item: { href: string; label: string };
    isActive: boolean;
    className?: string;
    onClick?: () => void;
  }) => (
    <Link
      href={item.href}
      className={className}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{item.label}</span>
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
        aria-hidden="true"
      />
    </Link>
  ),
);
NavItem.displayName = "NavItem";

// Memoized logo component
const Logo = memo(() => (
  <Link
    href={HOME}
    className="group flex items-center space-x-2 rounded-lg px-1 sm:space-x-3"
    aria-label="Shivansh Infosys - Go to homepage"
  >
    <div className="relative flex-shrink-0">
      <Image
        src="/images/logo/Logo-name-black.svg"
        alt={LOGO_ALT_TEXT}
        width={40}
        height={40}
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
        priority
        sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
      />
    </div>
    <div className="min-w-0 flex-1">
      <h2 className="text-lg leading-tight font-bold sm:text-xl lg:text-2xl">
        <span className="text-[#C50202]">SHIVANSH</span>{" "}
        <span className="text-gray-900">INFOSYS</span>
      </h2>
      <p className="text-xs leading-tight font-medium text-gray-500 lg:text-sm">
        <span className="whitespace-nowrap">Quick Response</span>
        <span className="mx-1">-</span>
        <span className="whitespace-nowrap">Quick Support</span>
      </p>
    </div>
  </Link>
));
Logo.displayName = "Logo";

// Memoized contact info component
const ContactInfo = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  const baseClasses = isMobile
    ? "rounded-lg bg-gray-50 px-4 py-3"
    : "flex items-center space-x-4 border-l border-gray-200 pl-6";

  return (
    <div className={baseClasses}>
      <div
        className={
          isMobile ? "flex items-center justify-between" : "flex flex-col"
        }
      >
        <div>
          <span
            className={`flex items-center text-xs font-medium tracking-wide text-(--primery-color) uppercase ${
              isMobile ? "text-gray-500" : ""
            }`}
          >
            <PhoneIcon />
            Call Us
            {!isMobile && <ArrowIcon />}
          </span>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={`${isMobile ? "block text-sm" : "text-lg"} font-bold text-gray-800 transition-colors duration-200 hover:text-red-600`}
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </div>
  );
});
ContactInfo.displayName = "ContactInfo";

export const Header = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.pageYOffset > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  // Optimized click outside handler
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (mobileOpen && event.target instanceof Element) {
        if (!event.target.closest("header")) {
          setMobileOpen(false);
        }
      }
    },
    [mobileOpen],
  );

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside, { passive: true });
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileOpen, handleClickOutside]);

  // Body scroll lock effect
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Memoized mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  // Memoized mobile menu close
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Memoized header classes
  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/95 shadow-lg backdrop-blur-lg"
          : "bg-white/95 shadow-lg backdrop-blur-lg"
      }`,
    [isScrolled],
  );

  // Memoized mobile menu classes
  const mobileMenuClasses = useMemo(
    () =>
      `overflow-hidden shadow-[0px_90px_100px_-0px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out lg:hidden ${
        mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`,
    [mobileOpen],
  );

  return (
    <header className={headerClasses} role="banner">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
          {/* Logo Section */}
          <div className="min-w-0 flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-1 lg:flex lg:space-x-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={isActive}
                  className={`group relative rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-300 lg:text-base xl:px-3 2xl:px-4 ${
                    isActive
                      ? "text-red-600"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                />
              );
            })}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden items-center xl:flex">
            <ContactInfo />
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden items-center lg:flex">
            <Button
              href={CONTACT}
              className={`${btn_color} rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md lg:px-6`}
              aria-label="Contact us - Get in touch"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-600"
              type="button"
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={mobileMenuClasses}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="border-t border-gray-100 bg-white/95 shadow-lg backdrop-blur-lg">
          <nav className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                onClick={closeMobileMenu}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "border-l-4 border-red-600 bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                }`}
              />
            ))}

            {/* Mobile Contact Info */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <ContactInfo isMobile />
            </div>

            {/* Mobile CTA */}
            <div className="pt-2">
              <Button
                href={CONTACT}
                className="w-full rounded-lg bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
                onClick={closeMobileMenu}
                aria-label="Contact us - Get in touch"
              >
                Get in Touch
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
