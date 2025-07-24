"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../molecules/Buttons/Button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { navItems } from "public/data/Navigation";

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
          : "bg-blur-lg bg-white/95 shadow-lg"
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
                className={`group text-md relative rounded-md px-4 py-2 font-semibold transition-all duration-300 ${
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
        className={`overflow-hidden shadow-[0px_90px_100px_-0px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out md:hidden ${
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
