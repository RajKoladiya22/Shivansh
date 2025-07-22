"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../molecules/Buttons/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Product", href: "/product" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
        scrollPosition > 10
          ? "bg-white/95 shadow-lg backdrop-blur-lg"
          : "bg-transparent shadow-lg"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="flex h-16 items-center justify-between sm:h-18 lg:h-19">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                width={200}
                height={200}
                src="/images/logo/logo.png"
                alt="Shivansh Infosys"
                className="h-8 w-auto transition-transform duration-300 hover:scale-105"
                // priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-1 md:flex lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-md px-4 py-2 text-md font-semibold transition-all duration-300 ${
                  pathname === item.href
                    ? "text-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Call Us Info - Desktop */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center space-x-4 border-x border-gray-200 px-6">
              <div className="flex flex-col">
                <span className="flex text-xs font-medium tracking-wide text-(--primery-color) uppercase">
                  Call Us{" "}
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="ml-1 rotate-315 transform text-(--primery-color) transition-all duration-200 ease-in-out group-hover:rotate-0 group-hover:text-red-600"
                  />
                </span>
                <a
                  href="tel:+918141703007"
                  className="text-lg font-bold text-gray-800 transition-colors duration-200 hover:text-red-600"
                >
                  +91 81417 03007
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action - Desktop */}
          <div className="hidden items-center md:flex">
            <Button
              href="/contact"
              className="transform rounded-lg bg-(--primery-color) px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-center pt-5 md:hidden">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:outline-none"
            >
              <div className="relative h-6 w-6">
                <span
                  className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                    mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
                    mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden shadow-[0px_90px_100px_-0px_rgba(0,0,0,0.5)] ${
          mobileOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 bg-white/95 shadow-lg backdrop-blur-lg">
          <nav className="space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "border-l-4 border-red-600 text-red-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Call Info */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div>
                  <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                    Call Us
                  </span>
                  <a
                    href="tel:+918141703007"
                    className="block text-sm font-bold text-gray-800 transition-colors duration-200 hover:text-red-600"
                  >
                    +91 918141 703007
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-2">
              <Button
                href="/contact"
                className="w-full rounded-lg bg-(--primery-color) px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
                onClick={() => setMobileOpen(false)}
              >
                Get in Touch
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// "use client";

// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Team", href: "/team" },
//   { label: "Blog", href: "/blog" },
//   { label: "Products", href: "/products" },
//   { label: "Gallery", href: "/gallery" },
//   { label: "Contact", href: "/contact" },
// ];

// export function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const pathname = usePathname();
//   const mobileMenuRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.pageYOffset);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     // Close mobile menu when clicking outside
//     const handleClickOutside = (event:any) => {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setMobileOpen(false);
//       }
//     };

//     if (mobileOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.body.style.overflow = 'auto';
//     };
//   }, [mobileOpen]);

//   const handleSubmenuHover = (index:any) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveSubmenu(index);
//   };

//   const handleSubmenuLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveSubmenu(null);
//     }, 300);
//   };

//   const closeMobileMenu = () => {
//     setMobileOpen(false);
//   };

//   // Sample dropdown items
//   const productDropdown = [
//     { label: "Tally Software", href: "/products/tally" },
//     { label: "Custom Solutions", href: "/products/custom" },
//     { label: "Business ERP", href: "/products/erp" },
//   ];

//   const serviceDropdown = [
//     { label: "Implementation", href: "/services/implementation" },
//     { label: "Training", href: "/services/training" },
//     { label: "Support", href: "/services/support" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${
//         scrollPosition > 10
//           ? "bg-white/90 backdrop-blur-md shadow-md py-0"
//           : "bg-transparent py-3"
//       }`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex-shrink-0 z-50">
//             <Link href="/" className="flex items-center">
//               <Image
//                 width={200}
//                 height={200}
//                 src="/images/logo/logo.png"
//                 alt="Shivansh Infosys"
//                 className="h-10 w-auto transition-all duration-300 hover:opacity-80"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
//             {navItems.map((item, index) => (
//               <div
//                 key={item.href}
//                 className="relative group"
//                 onMouseEnter={() => handleSubmenuHover(index)}
//                 onMouseLeave={handleSubmenuLeave}
//               >
//                 <Link
//                   href={item.href}
//                   className={`
//                     px-3 py-2 text-sm lg:text-base font-medium rounded-lg transition-colors duration-300
//                     relative inline-flex items-center
//                     ${
//                       pathname === item.href
//                         ? "text-red-600 font-semibold"
//                         : "text-gray-700 hover:text-red-600"
//                     }
//                   `}
//                 >
//                   {item.label}
//                   {(item.label === "Products" || item.label === "Services") && (
//                     <svg
//                       className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   )}
//                 </Link>

//                 {/* Dropdown Menus */}
//                 {(item.label === "Products" && activeSubmenu === index) && (
//                   <div
//                     className="absolute left-0 mt-1 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden animate-fadeIn"
//                     onMouseEnter={() => handleSubmenuHover(index)}
//                     onMouseLeave={handleSubmenuLeave}
//                   >
//                     <div className="py-1">
//                       {productDropdown.map((subItem) => (
//                         <Link
//                           key={subItem.href}
//                           href={subItem.href}
//                           className={`block px-4 py-3 text-sm transition-colors duration-200 ${
//                             pathname === subItem.href
//                               ? "bg-red-50 text-red-600 font-medium"
//                               : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
//                           }`}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(item.label === "Services" && activeSubmenu === index) && (
//                   <div
//                     className="absolute left-0 mt-1 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden animate-fadeIn"
//                     onMouseEnter={() => handleSubmenuHover(index)}
//                     onMouseLeave={handleSubmenuLeave}
//                   >
//                     <div className="py-1">
//                       {serviceDropdown.map((subItem) => (
//                         <Link
//                           key={subItem.href}
//                           href={subItem.href}
//                           className={`block px-4 py-3 text-sm transition-colors duration-200 ${
//                             pathname === subItem.href
//                               ? "bg-red-50 text-red-600 font-medium"
//                               : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
//                           }`}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* CTA Button */}
//           <div className="hidden md:flex">
//             <Link
//               href="/contact"
//               className="ml-4 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Get in Touch
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden z-50">
//             <button
//               onClick={() => setMobileOpen(!mobileOpen)}
//               aria-label="Toggle menu"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
//             >
//               {mobileOpen ? (
//                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         ref={mobileMenuRef}
//         className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
//           mobileOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full overflow-y-auto">
//           <div className="p-5 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <Link href="/" onClick={closeMobileMenu}>
//                 <Image
//                   width={200}
//                   height={200}
//                   src="/images/logo/logo.png"
//                   alt="Shivansh Infosys"
//                   className="h-8 w-auto"
//                 />
//               </Link>
//               <button
//                 onClick={closeMobileMenu}
//                 className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
//                 aria-label="Close menu"
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           <nav className="flex-1 px-5 py-6">
//             <div className="space-y-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`
//                     block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200
//                     ${pathname === item.href
//                       ? "bg-red-50 text-red-600 font-semibold"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-red-600"}
//                   `}
//                   onClick={closeMobileMenu}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Mobile dropdowns */}
//             <div className="mt-4 space-y-2 pl-6">
//               <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Products
//               </h3>
//               {productDropdown.map((subItem) => (
//                 <Link
//                   key={subItem.href}
//                   href={subItem.href}
//                   className={`
//                     block px-4 py-3 rounded-lg text-sm transition-colors duration-200
//                     ${pathname === subItem.href
//                       ? "bg-red-50 text-red-600 font-medium"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-red-600"}
//                   `}
//                   onClick={closeMobileMenu}
//                 >
//                   {subItem.label}
//                 </Link>
//               ))}
//             </div>
//           </nav>

//           <div className="p-5 border-t border-gray-200">
//             <Link
//               href="/contact"
//               onClick={closeMobileMenu}
//               className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Background overlay for mobile menu */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
//           onClick={closeMobileMenu}
//         />
//       )}

//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//       `}</style>
//     </header>
//   );
// }
