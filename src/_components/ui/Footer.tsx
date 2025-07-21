// "use client";
// import React from "react";
// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { FaPinterest } from "react-icons/fa";

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Product & Service", href: "/product" },
//   { label: "Offers", href: "/Offers" },
//   { label: "Team", href: "/team" },
//   { label: "Blog", href: "/blog" },
//   { label: "Gallery", href: "/gallery" },
//   { label: "Contact", href: "/contact" },
// ];
// const ProductServices = [
//   { label: "Tally Software", href: "/tally" },
//   { label: "Mobile Apps for Tally", href: "/mobilr" },
//   { label: "Tally Customized", href: "/tallyCust" },
//   { label: "Privacy Policy", href: "/pp" },
//   { label: "App Privacy Policy", href: "/appPP" },
//   { label: "Partner App Privacy Policy", href: "/pappPP" },
// ];

// export const Footer: React.FC = () => {
//   const pathname = usePathname();
//   return (
//     <footer className="bg-gray-50 pt-16 pb-8">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
//           {/* Company Info Section */}
//           <div className="lg:col-span-1">
//             <div className="mb-6">
//               <h2 className="mb-2 text-2xl font-bold">
//                 <span className="text-red-600">SHIVANSH</span>{" "}
//                 <span className="text-gray-800">INFOSYS</span>
//               </h2>
//               <p className="text-sm font-medium text-gray-600">
//                 Quick Response - Quick Support
//               </p>
//             </div>

//             <p className="mb-6 text-sm leading-relaxed text-gray-600">
//               I would like to say something about our company Shivansh Infosys.
//               We have started our company in April -2007 with a vision of
//               serving the best to our client.
//             </p>

//             {/* Social Media Icons */}
//             <div className="flex space-x-3">
//               <Link
//                 href="#"
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
//               >
//                 <Facebook className="h-5 w-5 text-white" />
//               </Link>
//               <Link
//                 href="#"
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
//               >
//                 <Twitter className="h-5 w-5 text-white" />
//               </Link>
//               <Link
//                 href="#"
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
//               >
//                 <Instagram className="h-5 w-5 text-white" />
//               </Link>
//               <Link
//                 href="#"
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
//               >
//                 <FaPinterest className="h-5 w-5 text-white" />
//               </Link>
//               <Link
//                 href="#"
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
//               >
//                 <Youtube className="h-5 w-5 text-white" />
//               </Link>
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div className="lg:col-span-1">
//             <h3 className="mb-6 text-lg font-semibold text-gray-800">
//               Useful Links
//             </h3>
//             <ul className="space-y-3">
//               {navItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`
//                     relative text-sm text-gray-600 transition-colors
//                      before:absolute before:bottom-[-4px] before:left-0 before:h-[1px] 
//                      before:w-0 before:bg-red-600 before:transition-all before:duration-300 
//                      hover:text-red-600 hover:before:w-full
//                      ${pathname === item.href ? "text-red-600 underline underline-offset-6 before:bg-transparent" : "text-gray-700 hover:text-red-600"}
//                      `}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Product & Services */}
//           <div className="lg:col-span-1">
//             <h3 className="mb-6 text-lg font-semibold text-gray-800">
//               Product & Services
//             </h3>
//             <ul className="space-y-3">
//               {ProductServices.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`relative text-sm text-gray-600 transition-colors before:absolute 
//                     before:bottom-[-4px] before:left-0 before:h-[1px] before:w-0
//                      before:bg-red-600 before:transition-all before:duration-300 hover:text-red-600 hover:before:w-full
//                      ${pathname === item.href ? "text-red-600 underline underline-offset-6 before:bg-transparent" : "text-gray-700 hover:text-red-600"}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contacts */}
//           <div className="lg:col-span-1">
//             <h3 className="mb-6 text-lg font-semibold text-gray-800">
//               Contacts
//             </h3>
//             <div className="space-y-4">
//               {/* Address */}
//               <div className="flex items-start space-x-3">
//                 <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <div className="h-2 w-2 rounded-full bg-white"></div>
//                 </div>
//                 <p className="text-sm leading-relaxed text-gray-600">
//                   SHOP NO.105, AJIT PLAZA, M.G ROAD, OPP. BANK OF BARODA, VAPI,
//                   VALSAD, GUJARAT, 396191
//                 </p>
//               </div>

//               {/* Phone Numbers */}
//               <div className="flex items-start space-x-3">
//                 <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <div className="h-2 w-2 rounded-full bg-white"></div>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <div>+91 81417 03007</div>
//                   <div>+91 94848 43007</div>
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="flex items-start space-x-3">
//                 <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
//                   <div className="h-2 w-2 rounded-full bg-white"></div>
//                 </div>
//                 <Link
//                   href="mailto:info@shivanshinfosys.in"
//                   className="text-sm text-gray-600 transition-colors hover:text-red-600"
//                 >
//                   info@shivanshinfosys.in
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="mt-12 border-t border-gray-200 pt-8">
//           <p className="text-center text-sm text-gray-500">
//             © shivansh infosys. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };










"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaPinterest, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product & Service", href: "/product" },
  { label: "Offers", href: "/offers" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const ProductServices = [
  { label: "Tally Software", href: "/tally" },
  { label: "Mobile Apps for Tally", href: "/mobile" },
  { label: "Tally Customized", href: "/tally-customized" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "App Privacy Policy", href: "/app-privacy-policy" },
  { label: "Partner App Privacy Policy", href: "/partner-app-privacy" },
];

export const Footer: React.FC = () => {
  const pathname = usePathname();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-red-600 to-red-700 w-10 h-10 rounded-lg mr-3"></div>
                <h2 className="text-2xl font-bold">
                  <span className="text-red-500">SHIVANSH</span>{" "}
                  <span className="text-gray-100">INFOSYS</span>
                </h2>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-400">
                Quick Response - Quick Support
              </p>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Founded in April 2007, Shivansh Infosys has been dedicated to providing 
              exceptional Tally solutions and services to businesses across India.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "#" },
                // { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Instagram className="h-5 w-5" />, href: "#" },
                // { icon: <FaPinterest className="h-5 w-5" />, href: "#" },
                { icon: <Youtube className="h-5 w-5" />, href: "#" },
                { icon: <FaWhatsapp className="h-5 w-5" />, href: "#" }
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:bg-red-600 hover:scale-110"
                  aria-label={`Follow us on social media`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white flex items-center">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
              Useful Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center text-sm text-gray-400 transition-all duration-300
                      hover:text-red-400 hover:pl-2 group
                      ${pathname === item.href ? "text-red-400 font-medium" : ""}
                    `}
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product & Services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white flex items-center">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
              Product & Services
            </h3>
            <ul className="space-y-3">
              {ProductServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center text-sm text-gray-400 transition-all duration-300
                      hover:text-red-400 hover:pl-2 group
                      ${pathname === item.href ? "text-red-400 font-medium" : ""}
                    `}
                  >
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white flex items-center">
              <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
                  SHOP NO.105, AJIT PLAZA, M.G ROAD, OPP. BANK OF BARODA, VAPI,
                  VALSAD, GUJARAT, 396191
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="flex flex-col space-y-2">
                <Link 
                  href="tel:+918141703007" 
                  className="flex items-center transition-colors hover:text-red-400"
                >
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                    <Phone className="h-3 w-3 text-white" />
                  </div>
                  <span>+91 81417 03007</span>
                </Link>
                
                <Link 
                  href="tel:+919484843007" 
                  className="flex items-center transition-colors hover:text-red-400"
                >
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                    <Phone className="h-3 w-3 text-white" />
                  </div>
                  <span>+91 94848 43007</span>
                </Link>
                
                <Link 
                  href="https://wa.me/918141703007" 
                  className="flex items-center transition-colors hover:text-red-400"
                >
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                    <FaWhatsapp className="h-3 w-3 text-white" />
                  </div>
                  <span>WhatsApp: +91 81417 03007</span>
                </Link>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                  <Mail className="h-3 w-3 text-white" />
                </div>
                <Link
                  href="mailto:info@shivanshinfosys.in"
                  className="text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  info@shivanshinfosys.in
                </Link>
              </div>
              
              {/* Business Hours */}
              <div className="flex items-start mt-6">
                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 mr-3">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Business Hours</p>
                  <p className="text-sm text-gray-400">Mon-Sat: 9:30 AM - 6:30 PM</p>
                  <p className="text-sm text-gray-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Subscribe to our WhatsApp Chanal for the latest updates, offers, and Tally tips.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your WhatsApp Number"
                className="px-4 py-3 w-full md:w-64 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r-lg text-white font-medium transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-center text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} Shivansh Infosys. All rights reserved.
            </p>
            <p className="text-center text-sm text-gray-500">
              Tally 3 Star Certified Partner
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* <div className="mt-4 text-center text-xs text-gray-600">
            
          </div> */}
        </div>
      </div>
    </footer>
  );
};