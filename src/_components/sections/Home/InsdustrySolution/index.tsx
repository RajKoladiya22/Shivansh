// "use client";
// import React from "react";
// import { IndustryCard } from "src/_components/molecules";
// import { SectionHeader } from "src/_components/ui";

// export const WiseSolutionsIndustry = () => {
//   const industries = [
//     {
//       id: "manufacturers",
//       title: "Manufacturers",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//     {
//       id: "distributors",
//       title: "Distributors",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//     {
//       id: "retailers",
//       title: "Retailers",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//     {
//       id: "service-providers",
//       title: "Service Providers",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//     {
//       id: "service",
//       title: "Service",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//     {
//       id: "ca-tax",
//       title: "CA & Tax Consultants",
//       description:
//         "Short description of team expertise and commitment to service. discounts to customers. With AIOD, merchants can easily create & manage offers.",
//     },
//   ];

//   return (
//     <div className="py-3 sm:py-6 md:py-6 lg:py-10 ">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-16 text-center">
//           <SectionHeader 
//           heading="INDUSTRY" 
//           headingText="Solutions Show how you help"
//           showDescription={false} />
//         </div>

//         {/* Industries Grid */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {industries.map((industry) => (
//             <IndustryCard key={industry.id} industry={industry} />
//           ))}
//         </div>

//         {/* Optional: Add some spacing at the bottom */}
//         <div className="mt-16"></div>
//       </div>
//     </div>
//   );
// };



"use client";
import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
import { FactoryIcon, TruckIcon, ShoppingCartIcon, WrenchIcon, UsersIcon, CalculatorIcon } from "lucide-react";
export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string; // e.g., "from-red-600 to-red-700"
}
export const WiseSolutionsIndustry = () => {
  const industries : IndustryItem[]= [
    {
      id: "manufacturers",
      title: "Manufacturers",
      description: "Streamline production processes with our specialized Tally solutions for manufacturing efficiency and inventory management.",
      icon: <FactoryIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
    {
      id: "distributors",
      title: "Distributors",
      description: "Optimize your supply chain with distribution-focused tools for order tracking, logistics management, and route optimization.",
      icon: <TruckIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
    {
      id: "retailers",
      title: "Retailers",
      description: "Transform retail operations with point-of-sale integration, inventory tracking, and customer relationship management tools.",
      icon: <ShoppingCartIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
    {
      id: "service-providers",
      title: "Service Providers",
      description: "Manage service contracts, scheduling, and billing with our specialized solutions for service-based businesses.",
      icon: <WrenchIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
    {
      id: "enterprises",
      title: "Enterprises",
      description: "Comprehensive ERP solutions for large organizations with multi-location management and consolidated reporting.",
      icon: <UsersIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
    {
      id: "ca-tax",
      title: "CA & Tax Consultants",
      description: "Specialized tools for accounting professionals with GST compliance, tax filing, and client management features.",
      icon: <CalculatorIcon className="h-8 w-8 text-white" />,
      color: "from-red-600 to-red-700"
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block text-(--primery-color) px-4 py-1 rounded-full text-sm font-medium mb-4">
            INDUSTRY SOLUTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tailored Solutions for Every Industry
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our specialized Tally solutions can transform your business operations, regardless of your industry.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need a Custom Solution?</h3>
              <p className="text-gray-300 max-w-xl">
                We specialize in developing tailored Tally solutions for unique business requirements.
              </p>
            </div>
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 whitespace-nowrap">
              Request Custom Solution
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const IndustryCard = ({ industry, index }: { industry: IndustryItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        {/* Icon with gradient background */}
        <div className={`bg-gradient-to-r ${industry.color} p-6`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-sm">
              {industry.icon}
            </div>
            <div className="text-4xl font-bold text-white/20">{`0${index + 1}`}</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
          <p className="text-gray-600 mb-6 flex-1">{industry.description}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center group-hover:underline">
              Explore Solutions
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};