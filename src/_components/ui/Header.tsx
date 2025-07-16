"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../molecules/Button";
import Image from "next/image";

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
      // className="fixed top-0 left-0 z-50 w-full bg-white/50 backdrop-blur-md"
      className={`fixed pt-[10px] top-0 left-0 z-50 w-full transition-all transition-colors duration-300 ease-in-out ${
        scrollPosition
          ? "bg-white/50 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                width={200}
                height={200}
                src="/images/logo/logo.png"
                alt="Shivansh Infosys"
                className="h-8 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden 2xl:space-x-15 sm:space-x-3 md:space-x-3  rounded-[50px] bg-(--light-pink) px-[40px] py-[15px] md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-[600] text-gray-700 hover:text-red-600 ${pathname === item.href ? "text-red-600 underline underline-offset-4" : "text-gray-700 hover:text-red-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex">
            <Button
              href="/contact"
              padding="px-[20px] py-[10px] sm:px-[16px] sm:py-[8px]"
              className="tracking-[2px] md:tracking-tight lg:tracking-[0px]"
            >
              Get in Touch
            </Button>
            {/* <style jsx>
              {`
                @media (min-width: 768px) and (max-width: 821px) {
                  .your-button-class {
                    letter-spacing: 0px !important;
                  }
                }
              `}
            </style> */}
          </div>

          {/* Mobile button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-inset"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="space-y-1 px-2 pt-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* <Link
              href="/contact"
              className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
              onClick={() => setMobileOpen(false)}
            >
              Get in Touch
            </Link> */}
            <Button
              href="/contact"
              // className="w-full mt-2"
              className="tracking-[3px]"
            >
              Get in Touch..
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
