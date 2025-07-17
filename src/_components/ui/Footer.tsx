"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaPinterest } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product & Service", href: "/product" },
  { label: "Offers", href: "/Offers" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
const ProductServices = [
  { label: "Tally Software", href: "/tally" },
  { label: "Mobile Apps for Tally", href: "/mobilr" },
  { label: "Tally Customized", href: "/tallyCust" },
  { label: "Privacy Policy", href: "/pp" },
  { label: "App Privacy Policy", href: "/appPP" },
  { label: "Partner App Privacy Policy", href: "/pappPP" },
];

export const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">
                <span className="text-red-600">SHIVANSH</span>{" "}
                <span className="text-gray-800">INFOSYS</span>
              </h2>
              <p className="text-sm font-medium text-gray-600">
                Quick Response - Quick Support
              </p>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              I would like to say something about our company Shivansh Infosys.
              We have started our company in April -2007 with a vision of
              serving the best to our client.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              >
                <Facebook className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              >
                <Twitter className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              >
                <FaPinterest className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              >
                <Youtube className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                    relative text-sm text-gray-600 transition-colors
                     before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] 
                     before:w-0 before:bg-red-600 before:transition-all before:duration-300 
                     hover:text-red-600 hover:before:w-full
                     ${pathname === item.href ? "text-red-600 underline underline-offset-6 before:bg-transparent" : "text-gray-700 hover:text-red-600"}
                     `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product & Services */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Product & Services
            </h3>
            <ul className="space-y-3">
              {ProductServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative text-sm text-gray-600 transition-colors before:absolute 
                    before:bottom-[-4px] before:left-0 before:h-[1px] before:w-0
                     before:bg-red-600 before:transition-all before:duration-300 hover:text-red-600 hover:before:w-full
                     ${pathname === item.href ? "text-red-600 underline underline-offset-6 before:bg-transparent" : "text-gray-700 hover:text-red-600"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">
              Contacts
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  SHOP NO.105, AJIT PLAZA, M.G ROAD, OPP. BANK OF BARODA, VAPI,
                  VALSAD, GUJARAT, 396191
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>+91 81417 03007</div>
                  <div>+91 94848 43007</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                <Link
                  href="mailto:info@shivanshinfosys.in"
                  className="text-sm text-gray-600 transition-colors hover:text-red-600"
                >
                  info@shivanshinfosys.in
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © shivansh infosys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};








