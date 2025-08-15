// "use client";

// import { useEffect, useState, useCallback, memo, useMemo } from "react";
// import {
//   Navbar,
//   NavBody,
//   NavItems,
//   MobileNav,
//   NavbarLogo,
//   NavbarButton,
//   MobileNavHeader,
//   MobileNavToggle,
//   MobileNavMenu,
// } from "src/_components/ui/resizable-navbar";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import Image from "next/image";
// import { ArrowRight, Phone } from "lucide-react";
// import { CONTACT, HOME, navItems } from "public/data/Navigation";
// import { btn_color } from "src/config/constants";
// import { Button } from "../Buttons/Button";

// // Constants to prevent recreation
// const SCROLL_THRESHOLD = 10;
// const PHONE_NUMBER = "+918141703007";
// const LOGO_ALT_TEXT = "Shivansh Infosys - Quick Response, Quick Support";

// // Memoized icon components
// const PhoneIcon = memo(() => (
//   <Phone size={14} className="mr-1" aria-hidden="true" />
// ));
// PhoneIcon.displayName = "PhoneIcon";

// const ArrowIcon = memo(() => (
//   <ArrowRight
//     size={16}
//     strokeWidth={1.5}
//     className="ml-1 rotate-315 transform transition-all duration-200 ease-in-out"
//     aria-hidden="true"
//   />
// ));
// ArrowIcon.displayName = "ArrowIcon";

// // Memoized hamburger menu component
// const HamburgerIcon = memo(({ isOpen }: { isOpen: boolean }) => (
//   <div className="relative h-6 w-6" aria-hidden="true">
//     <span
//       className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//         isOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
//       }`}
//     />
//     <span
//       className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//         isOpen ? "opacity-0" : "opacity-100"
//       }`}
//     />
//     <span
//       className={`absolute top-2 block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
//         isOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
//       }`}
//     />
//   </div>
// ));
// HamburgerIcon.displayName = "HamburgerIcon";

// // Memoized navigation item component
// const NavItem = memo(
//   ({
//     item,
//     isActive,
//     className,
//     onClick,
//   }: {
//     item: { href: string; label: string };
//     isActive: boolean;
//     className?: string;
//     onClick?: () => void;
//   }) => (
//     <Link
//       href={item.href}
//       className={className}
//       onClick={onClick}
//       aria-current={isActive ? "page" : undefined}
//     >
//       <span className="relative z-10">{item.label}</span>
//       <span
//         className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
//           isActive ? "w-full" : "w-0 group-hover:w-full"
//         }`}
//         aria-hidden="true"
//       />
//     </Link>
//   ),
// );
// NavItem.displayName = "NavItem";

// // Memoized logo component
// const Logo = memo(() => (
//   <Link
//     href={HOME}
//     className="group flex items-center space-x-2 rounded-lg px-1 sm:space-x-3"
//     aria-label="Shivansh Infosys - Go to homepage"
//   >
//     <div className="relative flex-shrink-0">
//       <Image
//         src="/images/logo/Logo-name-black.svg"
//         alt={LOGO_ALT_TEXT}
//         width={40}
//         height={40}
//         className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
//         priority
//         sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
//       />
//     </div>
//     <div className="min-w-0 flex-1">
//       <h2 className="text-lg leading-tight font-bold sm:text-xl lg:text-2xl">
//         <span className="text-[#C50202]">SHIVANSH</span>{" "}
//         <span className="text-gray-900">INFOSYS</span>
//       </h2>
//       <p className="text-xs leading-tight font-medium text-gray-500 lg:text-sm">
//         <span className="whitespace-nowrap">Quick Response</span>
//         <span className="mx-1">-</span>
//         <span className="whitespace-nowrap">Quick Support</span>
//       </p>
//     </div>
//   </Link>
// ));
// Logo.displayName = "Logo";

// // Memoized contact info component
// const ContactInfo = memo(({ isMobile = false }: { isMobile?: boolean }) => {
//   const baseClasses = isMobile
//     ? "rounded-lg bg-gray-50 px-4 py-3"
//     : "flex items-center space-x-4 border-l border-gray-200 pl-6";

//   return (
//     <div className={baseClasses}>
//       <div
//         className={
//           isMobile ? "flex items-center justify-between" : "flex flex-col"
//         }
//       >
//         <div>
//           <span
//             className={`flex items-center text-xs font-medium tracking-wide text-(--primery-color) uppercase ${
//               isMobile ? "text-gray-500" : ""
//             }`}
//           >
//             <PhoneIcon />
//             Call Us
//             {!isMobile && <ArrowIcon />}
//           </span>
//           <a
//             href={`tel:${PHONE_NUMBER}`}
//             className={`${isMobile ? "block text-sm" : "text-lg"} font-bold text-gray-800 transition-colors duration-200 hover:text-red-600`}
//             aria-label={`Call us at ${PHONE_NUMBER}`}
//           >
//             {PHONE_NUMBER}
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// });
// ContactInfo.displayName = "ContactInfo";

// export const Header = memo(() => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   // Optimized scroll handler with throttling
//   const handleScroll = useCallback(() => {
//     const scrolled = window.pageYOffset > SCROLL_THRESHOLD;
//     if (scrolled !== isScrolled) {
//       setIsScrolled(scrolled);
//     }
//   }, [isScrolled]);

//   // Throttled scroll listener
//   useEffect(() => {
//     let ticking = false;

//     const throttledScrollHandler = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", throttledScrollHandler, {
//       passive: true,
//     });
//     return () => window.removeEventListener("scroll", throttledScrollHandler);
//   }, [handleScroll]);

//   // Optimized click outside handler
//   const handleClickOutside = useCallback(
//     (event: MouseEvent) => {
//       if (mobileOpen && event.target instanceof Element) {
//         if (!event.target.closest("header")) {
//           setMobileOpen(false);
//         }
//       }
//     },
//     [mobileOpen],
//   );

//   useEffect(() => {
//     if (mobileOpen) {
//       document.addEventListener("click", handleClickOutside, { passive: true });
//       return () => document.removeEventListener("click", handleClickOutside);
//     }
//   }, [mobileOpen, handleClickOutside]);

//   // Body scroll lock effect
//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileOpen]);

//   // Memoized mobile menu toggle
//   const toggleMobileMenu = useCallback(() => {
//     setMobileOpen((prev) => !prev);
//   }, []);

//   // Memoized mobile menu close
//   const closeMobileMenu = useCallback(() => {
//     setMobileOpen(false);
//   }, []);

//   // Memoized header classes
//   const headerClasses = useMemo(
//     () =>
//       `fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
//         isScrolled
//           ? "bg-white/95 shadow-lg backdrop-blur-lg"
//           : "bg-white/95 shadow-lg backdrop-blur-lg"
//       }`,
//     [isScrolled],
//   );

//   // Memoized mobile menu classes
//   const mobileMenuClasses = useMemo(
//     () =>
//       `overflow-hidden shadow-[0px_90px_100px_-0px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out lg:hidden ${
//         mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//       }`,
//     [mobileOpen],
//   );

//   return (
//     <header className={headerClasses} role="banner">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
//           {/* Logo Section */}
//           <div className="min-w-0 flex-shrink-0">
//             <Logo />
//           </div>

//           {/* Desktop Navigation */}
//           <nav
//             className="hidden items-center space-x-1 lg:flex lg:space-x-2"
//             role="navigation"
//             aria-label="Main navigation"
//           >
//             {navItems.map((item) => {
//               const isActive =
//                 pathname === item.href || pathname.startsWith(item.href + "/");
//               return (
//                 <NavItem
//                   key={item.href}
//                   item={item}
//                   isActive={isActive}
//                   className={`group relative rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-300 lg:text-base xl:px-3 2xl:px-4 ${
//                     isActive
//                       ? "text-red-600"
//                       : "text-gray-700 hover:text-red-600"
//                   }`}
//                 />
//               );
//             })}
//           </nav>

//           {/* Contact Info - Desktop */}
//           <div className="hidden items-center xl:flex">
//             <ContactInfo />
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
//               onClick={toggleMobileMenu}
//               aria-label={
//                 mobileOpen ? "Close navigation menu" : "Open navigation menu"
//               }
//               aria-expanded={mobileOpen}
//               aria-controls="mobile-menu"
//               className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-600"
//               type="button"
//             >
//               <HamburgerIcon isOpen={mobileOpen} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div
//         id="mobile-menu"
//         className={mobileMenuClasses}
//         role="navigation"
//         aria-label="Mobile navigation"
//         aria-hidden={!mobileOpen}
//       >
//         <div className="border-t border-gray-100 bg-white/95 shadow-lg backdrop-blur-lg">
//           <nav className="space-y-1 px-4 py-4">
//             {navItems.map((item) => (
//               <NavItem
//                 key={item.href}
//                 item={item}
//                 isActive={pathname === item.href}
//                 onClick={closeMobileMenu}
//                 className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
//                   pathname === item.href
//                     ? "border-l-4 border-red-600 bg-red-50 text-red-600"
//                     : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
//                 }`}
//               />
//             ))}

//             {/* Mobile Contact Info */}
//             <div className="mt-4 border-t border-gray-200 pt-4">
//               <ContactInfo isMobile />
//             </div>

//             {/* Mobile CTA */}
//             <div className="pt-2">
//               <Button
//                 href={CONTACT}
//                 className="w-full rounded-lg bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
//                 onClick={closeMobileMenu}
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
// });

// Header.displayName = "Header";

// export function NavbarDemo() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="relative w-full">
//       <Navbar>
//         {/* Desktop Navigation */}
//         <NavBody>
//           <Logo />
//           <NavItems items={navItems} />
//           <div className="flex items-center gap-4">
//             {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
//             <ContactInfo />
//             <Button
//               href={CONTACT}
//               className={`${btn_color} rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md lg:px-6`}
//               aria-label="Contact us - Get in touch"
//             >
//               Get in Touch
//             </Button>
//           </div>
//         </NavBody>

//         {/* Mobile Navigation */}
//         <MobileNav>
//           <MobileNavHeader>
//             <Logo />
//             <MobileNavToggle
//               isOpen={isMobileMenuOpen}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             />
//           </MobileNavHeader>

//           <MobileNavMenu
//             isOpen={isMobileMenuOpen}
//             onClose={() => setIsMobileMenuOpen(false)}
//           >
//             {navItems.map((item, idx) => (
//               <a
//                 key={`mobile-link-${idx}`}
//                 href={item.href}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="relative text-neutral-600 dark:text-neutral-300"
//               >
//                 <span className="block">{item.label}</span>
//               </a>
//             ))}
//             <div className="flex w-full flex-col gap-4">
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="primary"
//                 className="w-full"
//               >
//                 Login
//               </NavbarButton>
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="primary"
//                 className="w-full"
//               >
//                 Book a call
//               </NavbarButton>
//             </div>
//           </MobileNavMenu>
//         </MobileNav>
//       </Navbar>
//       <DummyContent />

//       {/* Navbar */}
//     </div>
//   );
// }

// const DummyContent = () => {
//   return (
//     <div className="container mx-auto p-8 pt-24">
//       <h1 className="mb-4 text-center text-3xl font-bold">
//         Check the navbar at the top of the container
//       </h1>
//       <p className="mb-10 text-center text-sm text-zinc-500">
//         For demo purpose we have kept the position as{" "}
//         <span className="font-medium">Sticky</span>. Keep in mind that this
//         component is <span className="font-medium">fixed</span> and will not
//         move when scrolling.
//       </p>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//         {[
//           {
//             id: 1,
//             title: "The",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 2,
//             title: "First",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 3,
//             title: "Rule",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 4,
//             title: "Of",
//             width: "md:col-span-3",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 5,
//             title: "F",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 6,
//             title: "Club",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 7,
//             title: "Is",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 8,
//             title: "You",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 9,
//             title: "Do NOT TALK about",
//             width: "md:col-span-2",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//           {
//             id: 10,
//             title: "F Club",
//             width: "md:col-span-1",
//             height: "h-60",
//             bg: "bg-neutral-100 dark:bg-neutral-800",
//           },
//         ].map((box) => (
//           <div
//             key={box.id}
//             className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
//           >
//             <h2 className="text-xl font-medium">{box.title}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

"use client";
import { useEffect, useState, useCallback, memo, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Image from "next/image";
import { ArrowRight, Phone, Menu, X } from "lucide-react";
import { CONTACT, HOME, navItems } from "public/data/Navigation";
import { btn_color } from "src/config/constants";
import { Button } from "../Buttons/Button";

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

// Animated hamburger menu component
const AnimatedHamburgerIcon = memo(({ isOpen }: { isOpen: boolean }) => (
  <div className="relative h-6 w-6" aria-hidden="true">
    <motion.span
      className="absolute top-2 block h-0.5 w-6 bg-current"
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -8,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute top-2 block h-0.5 w-6 bg-current"
      animate={{
        opacity: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
    <motion.span
      className="absolute top-2 block h-0.5 w-6 bg-current"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 8,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </div>
));
AnimatedHamburgerIcon.displayName = "AnimatedHamburgerIcon";

// Animated navigation item component
const AnimatedNavItem = memo(
  ({
    item,
    isActive,
    className,
    onClick,
    index,
  }: {
    item: { href: string; label: string };
    isActive: boolean;
    className?: string;
    onClick?: () => void;
    index: number;
  }) => (
    <motion.div
    // initial={{ opacity: 0, y: -20 }}
    // animate={{ opacity: 1, y: 0 }}
    // transition={{ delay: index * 0.1, duration: 0.5 }}
    // whileHover={{ scale: 1.05 }}
    // whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className={`${className} group relative focus:outline-none focus-visible:outline-none`}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
      >
        {/* <span className="relative z-10">{item.label}</span> */}
        <span className="relative z-10">{item.label}</span>
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
          aria-hidden="true"
        />
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-red-600"
          initial={{ width: 0 }}
          animate={{ width: isActive ? "100%" : 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  ),
);
AnimatedNavItem.displayName = "AnimatedNavItem";

// Animated logo component
const AnimatedLogo = memo(() => (
  <motion.div
  // initial={{ opacity: 0, x: -20 }}
  // animate={{ opacity: 1, x: 0 }}
  // transition={{ duration: 0.5 }}
  // whileHover={{ scale: 1.02 }}
  >
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
  </motion.div>
));
AnimatedLogo.displayName = "AnimatedLogo";

// Animated contact info component
const AnimatedContactInfo = memo(
  ({ isMobile = false }: { isMobile?: boolean }) => {
    const baseClasses = isMobile
      ? "rounded-lg bg-gray-50 px-4 py-3"
      : "flex items-center space-x-4 border-l border-gray-200 pl-6";

    return (
      <motion.div
        className={baseClasses}
        // initial={{ opacity: 0, x: 20 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.5, delay: 0.3 }}
        // whileHover={{ scale: 1.05 }}
      >
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
      </motion.div>
    );
  },
);
AnimatedContactInfo.displayName = "AnimatedContactInfo";

export const Header = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Handle scroll changes with framer motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > SCROLL_THRESHOLD;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  });

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

  return (
    <motion.header
      ref={ref}
      className="fixed top-0 left-0 z-50 w-full"
      role="banner"
    >
      {/* Desktop Navigation */}
      <motion.div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        animate={{
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          boxShadow: isScrolled
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "0 0 0 0 rgba(0,0,0,0)",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.95)",
          borderRadius: isScrolled ? "5rem" : "0rem",
          // margin: isScrolled ? "0.5rem 1rem" : "0rem",
          width: isScrolled ? "90%" : "100%",
          y: isScrolled ? 8 : 0,
        }}
        // transition={{
        //   type: "spring",
        //   stiffness: 200,
        //   damping: 25,
        // }}
      >
        <div className="flex h-16 items-center justify-between sm:h-18 lg:h-20">
          {/* Logo Section */}
          <div className="min-w-0 flex-shrink-0">
            <AnimatedLogo />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-1 lg:flex lg:space-x-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <AnimatedNavItem
                  key={item.href}
                  item={item}
                  isActive={isActive}
                  index={index}
                  className={`rounded-lg px-2 py-2 text-sm font-semibold transition-all duration-300 lg:text-base xl:px-3 2xl:px-4 ${
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
            <AnimatedContactInfo />
          </div>

          {/* CTA Button - Desktop */}
          <motion.div
            className="hidden items-center lg:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              href={CONTACT}
              className={`${btn_color} rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md transition-all duration-200 lg:px-6`}
              aria-label="Contact us - Get in touch"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="flex items-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={toggleMobileMenu}
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-600"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatedHamburgerIcon isOpen={mobileOpen} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            aria-hidden={!mobileOpen}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-20 right-4 left-4 z-40 lg:hidden"
          >
            <motion.div
              className="rounded-2xl border border-gray-100 bg-white/95 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] backdrop-blur-lg"
              layoutId="mobile-menu"
            >
              <nav className="space-y-2 p-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <AnimatedNavItem
                      item={item}
                      isActive={pathname === item.href}
                      onClick={closeMobileMenu}
                      index={index}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "border-l-4 border-red-600 bg-red-50 text-red-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                      }`}
                    />
                  </motion.div>
                ))}

                {/* Mobile Contact Info */}
                <motion.div
                  className="mt-6 border-t border-gray-200 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <AnimatedContactInfo isMobile />
                </motion.div>

                {/* Mobile CTA */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    href={CONTACT}
                    className="w-full rounded-lg bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
                    onClick={closeMobileMenu}
                    aria-label="Contact us - Get in touch"
                  >
                    Get in Touch
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Header.displayName = "Header";
